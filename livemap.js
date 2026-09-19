/* livemap.js — a self-contained animated world map with travelling arcs,
   a live event feed and a counter. Used by TYPHON (threat map) and
   BIGFOOT VPN (route map), recoloured per page. No external dependencies. */
(function (global) {
  // Continent land approximated as overlapping circles [lng, lat, radiusDeg].
  var LAND = [
    // North America
    [-100,48,15],[-115,55,13],[-90,40,12],[-75,45,9],[-108,63,15],[-145,63,9],[-95,25,9],[-83,11,5],[-70,50,7],[-120,40,9],
    [-42,72,9], // Greenland
    // South America
    [-60,-8,13],[-64,-22,11],[-70,-38,7],[-52,-10,9],[-58,-30,7],[-72,-15,7],
    // Europe
    [10,50,8],[22,52,8],[2,46,6],[26,58,7],[15,45,6],[38,58,8],[-3,54,3.5],
    // Africa
    [18,8,13],[25,-8,13],[20,-28,7],[12,12,9],[35,8,8],[30,-20,8],[45,-19,3.5],
    // Asia
    [75,45,20],[100,55,20],[60,42,13],[110,35,14],[130,52,13],[90,25,10],[78,22,8],[100,15,6],[125,-2,6],[140,63,13],[105,20,7],[112,-5,5],[138,37,3.5],
    // Australia
    [134,-25,11],[120,-27,8],[146,-33,6],[145,-20,6]
  ];
  var HUBS = [
    ['New York',-74,40.7,'USA'],['Los Angeles',-118.2,34,'USA'],['Toronto',-79.4,43.7,'CAN'],
    ['London',-0.1,51.5,'GBR'],['Amsterdam',4.9,52.4,'NLD'],['Frankfurt',8.7,50.1,'DEU'],
    ['Moscow',37.6,55.7,'RUS'],['Dubai',55.3,25.2,'ARE'],['Mumbai',72.8,19,'IND'],
    ['Singapore',103.8,1.35,'SGP'],['Beijing',116.4,39.9,'CHN'],['Tokyo',139.7,35.7,'JPN'],
    ['Seoul',126.9,37.5,'KOR'],['Sydney',151.2,-33.9,'AUS'],['Sao Paulo',-46.6,-23.5,'BRA'],['Lagos',3.4,6.5,'NGA']
  ];

  function hexA(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }
  function bez(p0, p1, p2, t) {
    var u = 1 - t;
    return [u*u*p0[0] + 2*u*t*p1[0] + t*t*p2[0], u*u*p0[1] + 2*u*t*p1[1] + t*t*p2[1]];
  }

  function initLiveMap(opts) {
    var canvas = document.getElementById(opts.canvas);
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var feedEl = opts.feed ? document.getElementById(opts.feed) : null;
    var counterEl = opts.counter ? document.getElementById(opts.counter) : null;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var pal = opts.palette || {};
    // Colours can come from CSS vars (--map-dot/--map-hub/--map-arcs) so a page's
    // theme switch recolours the map live; otherwise fall back to opts.palette.
    function readPal() {
      var cs = getComputedStyle(canvas);
      function v(n, f) { var x = cs.getPropertyValue(n).trim(); return x || f; }
      var raw = v('--map-arcs', '');
      return {
        dot: v('--map-dot', pal.dot || 'rgba(120,140,170,.32)'),
        hub: v('--map-hub', pal.hub || '#ffcc55'),
        arcs: raw ? raw.split(',').map(function (s) { return s.trim(); }) : (pal.arcs || ['#e8622a', '#f2b229', '#ff5c68'])
      };
    }
    var P = readPal();
    setInterval(function () { P = readPal(); }, 600);
    var TYPES = opts.types || ['Port scan','Brute force','SQL probe','Malware C2','Exploit attempt','Recon'];

    var W, H, dpr = Math.min(window.devicePixelRatio || 1, 2), dots = [];
    function project(lng, lat) { return [(lng + 180) / 360 * W, (90 - lat) / 180 * H]; }
    function isLand(lng, lat) {
      for (var i = 0; i < LAND.length; i++) {
        var c = LAND[i], dl = lng - c[0];
        if (dl > 180) dl -= 360; if (dl < -180) dl += 360;
        var db = lat - c[1];
        if (dl*dl + db*db < c[2]*c[2]) return true;
      }
      return false;
    }
    function size() {
      var r = canvas.getBoundingClientRect(); W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      var step = Math.max(5, Math.round(W / 170));
      for (var y = 0; y < H; y += step)
        for (var x = 0; x < W; x += step) {
          var lng = x / W * 360 - 180, lat = 90 - y / H * 180;
          if (isLand(lng, lat)) dots.push([x, y]);
        }
    }

    var arcs = [], impacts = [], count = 0;
    function spawn() {
      var a = HUBS[(Math.random()*HUBS.length)|0], b = HUBS[(Math.random()*HUBS.length)|0];
      if (a === b) return;
      arcs.push({ a:a, b:b, t:0, speed:0.006 + Math.random()*0.009, color:P.arcs[(Math.random()*P.arcs.length)|0] });
      count++;
      if (counterEl) counterEl.textContent = count.toLocaleString();
      if (feedEl) {
        var row = document.createElement('div'); row.className = 'fm-row';
        var t = TYPES[(Math.random()*TYPES.length)|0];
        row.innerHTML = '<span class="fm-src">' + a[3] + '</span><span class="fm-ar">&rarr;</span>' +
          '<span class="fm-dst">' + b[3] + '</span><span class="fm-t">' + t + '</span>';
        feedEl.insertBefore(row, feedEl.firstChild);
        while (feedEl.childNodes.length > 8) feedEl.removeChild(feedEl.lastChild);
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = P.dot;
      for (var i = 0; i < dots.length; i++) ctx.fillRect(dots[i][0], dots[i][1], 1.7, 1.7);
      for (var h = 0; h < HUBS.length; h++) {
        var p = project(HUBS[h][1], HUBS[h][2]);
        ctx.beginPath(); ctx.arc(p[0], p[1], 1.7, 0, 6.283); ctx.fillStyle = hexA(P.hub, .7); ctx.fill();
      }
      for (var k = arcs.length - 1; k >= 0; k--) {
        var ar = arcs[k], pa = project(ar.a[1], ar.a[2]), pb = project(ar.b[1], ar.b[2]);
        var mx = (pa[0]+pb[0])/2, my = (pa[1]+pb[1])/2;
        var dist = Math.hypot(pb[0]-pa[0], pb[1]-pa[1]);
        var cx = mx, cy = my - Math.min(dist*0.32, 140);
        ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.quadraticCurveTo(cx, cy, pb[0], pb[1]);
        ctx.strokeStyle = hexA(ar.color, .16); ctx.lineWidth = 1; ctx.stroke();
        if (!reduce) ar.t += ar.speed;
        var tt = Math.min(ar.t, 1), t0 = Math.max(0, tt - 0.18);
        ctx.beginPath();
        for (var s = t0; s <= tt; s += 0.02) { var pt = bez(pa, [cx,cy], pb, s); s === t0 ? ctx.moveTo(pt[0], pt[1]) : ctx.lineTo(pt[0], pt[1]); }
        ctx.strokeStyle = ar.color; ctx.lineWidth = 1.7; ctx.stroke();
        var q = bez(pa, [cx,cy], pb, tt);
        ctx.beginPath(); ctx.arc(q[0], q[1], 2.3, 0, 6.283); ctx.fillStyle = ar.color;
        ctx.shadowColor = ar.color; ctx.shadowBlur = 9; ctx.fill(); ctx.shadowBlur = 0;
        if (ar.t >= 1) { impacts.push({ x:pb[0], y:pb[1], r:2, color:ar.color }); arcs.splice(k, 1); }
      }
      for (var m = impacts.length - 1; m >= 0; m--) {
        var im = impacts[m];
        ctx.beginPath(); ctx.arc(im.x, im.y, im.r, 0, 6.283);
        ctx.strokeStyle = hexA(im.color, Math.max(0, .6 - im.r/26)); ctx.lineWidth = 1.4; ctx.stroke();
        if (!reduce) im.r += 0.6; if (im.r > 16) impacts.splice(m, 1);
      }
      requestAnimationFrame(draw);
    }
    size(); window.addEventListener('resize', size);
    if (reduce) { for (var z = 0; z < 6; z++) spawn(); }
    else setInterval(spawn, opts.rate || 850);
    draw();
  }
  global.initLiveMap = initLiveMap;
})(window);
