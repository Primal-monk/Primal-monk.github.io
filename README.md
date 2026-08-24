# PHAROAH — Website

Static site. No build step, no dependencies, no server.

## Files
| File | What it is |
|---|---|
| `index.html` | The whole site — HTML + CSS in one file |
| `pharoah.ico` | Browser-tab icon (the blue PHAROAH icon) |
| `carder222.png` | The crest at the top of the page |

## Test it locally
Double-click `index.html`. That's it — it opens in your browser and looks exactly
as it will online.

## Put it online (GitHub Pages, free)
1. Create a **public** repo on GitHub (e.g. `pharoah`)
2. On the repo page use **"Add file → Upload files"** and drag in all three files
   from this folder — `index.html`, `pharoah.ico`, `carder222.png`
3. Commit
4. **Settings → Pages** → Source: **`main`**, folder: **`/ (root)`** → Save
5. Wait ~2 minutes. Live at `https://<your-username>.github.io/<repo>/`

`index.html` must sit in the repo **root** (not inside a subfolder), or Pages
won't find it.

## Adding the real download later
In `index.html`, find the locked button:

```html
<a class="btn locked" href="#" onclick="return false;">Coming August 23rd</a>
```

Replace it with:

```html
<a class="btn" href="YOUR_RELEASE_LINK_HERE">Download PHAROAH</a>
```

For the link: repo → **Releases** → *Create a new release* → attach your ZIP →
copy the asset URL. GitHub hosts the download for free, so the page stays light.

## Editing
Everything is plain HTML/CSS in one file. Change the text, re-upload, done.
The colour palette is defined once at the top under `:root` — the values are
taken from the app's own PHAROAH sand theme, so the site and the tool match.
