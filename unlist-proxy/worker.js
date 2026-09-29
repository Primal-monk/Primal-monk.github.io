// unlist-proxy — Cloudflare Worker
//
// Holds the YouTube Data API key and Google Custom Search key server-side so
// the UNLIST page's visitors never see them and never need their own.
// Everything the browser needs goes through here instead of straight to Google.
//
// One-time setup (Cloudflare dashboard, no CLI needed):
//   1. dash.cloudflare.com -> Workers & Pages -> Create -> "Create Worker"
//   2. Edit code -> paste this whole file in -> Deploy
//   3. Settings -> Variables and Secrets -> add as SECRETS (not plain text):
//        YT_KEY   = your YouTube Data API v3 key
//        CSE_KEY  = your Google Custom Search JSON API key
//        CSE_ID   = your Custom Search Engine ID (cx)
//   4. Copy the workers.dev URL Cloudflare gives the worker, put it in
//      unlist.html's PROXY_BASE constant.
//
// Optional: bind a KV namespace named QUOTA (wrangler.toml or dashboard ->
// Settings -> Bindings) to cap Custom Search calls at ~90/day so one busy day
// doesn't burn through Google's 100/day free tier. Works fine without it too
// — Google will just return its own quota error once exhausted.

const ALLOWED_YT_PATHS = new Set(['channels', 'playlists', 'playlistItems', 'videos', 'search']);
const CSE_DAILY_LIMIT = 90;

function withCors(res) {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS');
  return res;
}

function json(body, status) {
  return withCors(new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } }));
}

async function withinQuota(env) {
  if (!env.QUOTA) return true; // no KV bound — rely on Google's own quota errors
  const key = 'cse_' + new Date().toISOString().slice(0, 10);
  const current = parseInt((await env.QUOTA.get(key)) || '0', 10);
  if (current >= CSE_DAILY_LIMIT) return false;
  await env.QUOTA.put(key, String(current + 1), { expirationTtl: 60 * 60 * 24 * 2 });
  return true;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return withCors(new Response(null, { status: 204 }));

    try {
      if (url.pathname.startsWith('/yt/')) {
        const endpoint = url.pathname.slice(4);
        if (!ALLOWED_YT_PATHS.has(endpoint)) return json({ error: { message: 'Unknown endpoint' } }, 404);
        if (!env.YT_KEY) return json({ error: { message: 'Server is missing YT_KEY — set it in Worker Settings > Variables and Secrets.' } }, 500);
        const upstream = new URL(`https://www.googleapis.com/youtube/v3/${endpoint}`);
        for (const [k, v] of url.searchParams) if (k !== 'key') upstream.searchParams.set(k, v);
        upstream.searchParams.set('key', env.YT_KEY);
        const r = await fetch(upstream.toString());
        return withCors(new Response(r.body, { status: r.status, headers: { 'Content-Type': 'application/json' } }));
      }

      if (url.pathname === '/cse') {
        if (!env.CSE_KEY || !env.CSE_ID) return json({ error: { message: 'Server is missing CSE_KEY/CSE_ID — set them in Worker Settings > Variables and Secrets.' } }, 500);
        if (!(await withinQuota(env))) return json({ error: { message: 'Daily search quota reached — try again tomorrow.' } }, 429);
        const upstream = new URL('https://www.googleapis.com/customsearch/v1');
        for (const [k, v] of url.searchParams) upstream.searchParams.set(k, v);
        upstream.searchParams.set('key', env.CSE_KEY);
        upstream.searchParams.set('cx', env.CSE_ID);
        const r = await fetch(upstream.toString());
        return withCors(new Response(r.body, { status: r.status, headers: { 'Content-Type': 'application/json' } }));
      }

      if (url.pathname === '/wayback/cdx') {
        const target = url.searchParams.get('url');
        if (!target) return json({ error: { message: 'Missing url' } }, 400);
        const upstream = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(target)}&output=json&fl=timestamp,original&collapse=timestamp:6&limit=10`;
        const r = await fetch(upstream);
        return withCors(new Response(r.body, { status: r.status, headers: { 'Content-Type': 'application/json' } }));
      }

      if (url.pathname === '/wayback/snapshot') {
        const ts = url.searchParams.get('ts');
        const target = url.searchParams.get('url');
        if (!ts || !target) return json({ error: { message: 'Missing ts/url' } }, 400);
        const upstream = `https://web.archive.org/web/${ts}id_/${target}`;
        const r = await fetch(upstream);
        const text = await r.text();
        return withCors(new Response(text, { status: r.status, headers: { 'Content-Type': 'text/plain' } }));
      }

      return json({ error: { message: 'Not found' } }, 404);
    } catch (e) {
      return json({ error: { message: e.message } }, 500);
    }
  },
};
