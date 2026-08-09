# Lucius — Personal Research Website

Personal research website for **Lucius (贺孟元)** — Independent Researcher
in multi-agent systems, AI × capital allocation, and complex systems.

Built as a **static GitHub Pages site**: plain HTML, CSS, and vanilla
JavaScript. No framework, no build step, no dependencies. Push to GitHub and
it deploys.

---

## File structure

```
.
├── index.html      # Single-page site (all content lives here)
├── style.css       # All styling — tokens at the top, easy to tweak
├── script.js       # Vanilla JS: header state, scroll reveal, WeChat modal
├── favicon.svg     # Asterisk mark used as the browser tab icon
├── .nojekyll       # Tells GitHub Pages not to run Jekyll
├── assets/
│   ├── README.md   # Drop-in instructions for the QR code
│   └── wechat-qr.webp   # your WeChat QR (currently the WeChat card image)
└── research/
    ├── phase-reversal-brief.html   # Working note — the "Read Brief" target
    └── phase-reversal-full.html    # Working note — the "Full Research Note" target
```

---

## Links & content — where everything lives now

All initial placeholders are wired up. To change anything:

| Item                            | Where to edit                                        |
| ------------------------------- | ---------------------------------------------------- |
| Contact email                   | `index.html` → `mailto:huimouye@qq.com`              |
| GitHub profile URL              | `index.html` → nav / hero / contact                  |
| SwarmAlpha repo (`meeting-room`)| `index.html` → the two SwarmAlpha buttons            |
| Phase Reversal brief            | `research/phase-reversal-brief.html` (edit the page) |
| Phase Reversal full note        | `research/phase-reversal-full.html` (edit the page)  |
| Canonical / OG URLs             | `<head>` of `index.html` and the two research pages  |

All internal links are relative, so the site works from any domain or
sub-path — nothing to reconfigure when you change hosting.

---

## How to run locally

Any static server works — no build tools needed.

**Option A — Python (easiest if installed):**

```bash
cd mulasakee17.github.io
python -m http.server 8000
# open http://localhost:8000
```

**Option B — VS Code:** install the *Live Server* extension, right-click
`index.html` → *Open with Live Server*.

**Option C — quick check:** double-click `index.html` to open it directly.
Everything is static, so this works fine for a first look.

---

## How to modify research projects

Each project is one `<article class="project">` block in `index.html` under
`<section id="research">`:

- Change the title, subtitle, and description text directly.
- Add or remove keywords in the `.project-keywords` list.
- Update the buttons' `href` attributes.

The two projects are connected by the **Constraint Migration** section —
keep that section short; it exists to link them, not to stand alone.

---

## How to edit the research pages

The two Phase Reversal documents are plain HTML pages in `research/`:

- `research/phase-reversal-brief.html` — linked from "Read Brief"
- `research/phase-reversal-full.html` — linked from "Full Research Note"

They reuse the site's `style.css`, so they inherit the same design
automatically. Each section has a `<!-- EDIT -->` marker and a placeholder
paragraph — replace those with your actual content.

Prefer PDFs? Drop a `.pdf` into `research/` and change the two buttons'
`href` attributes to the file paths. GitHub Pages serves PDFs as-is, no extra
setup needed.

---

## How to replace the WeChat QR code

1. Export your WeChat QR (a square crop of just the QR is recommended) as a `.webp`.
2. Save it as `assets/wechat-qr.webp` (overwrite the file).

The current file is the full WeChat card image (640 × 838). A clean square
crop of the QR scans more reliably and keeps the modal compact.

If the image is missing, the WeChat modal gracefully shows
*"WeChat QR coming soon."* — nothing breaks.

---

## How to deploy to GitHub Pages

1. Commit and push your changes to the `main` branch.
2. On GitHub, open the repo → **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, choose
   **"Deploy from a branch"**.
4. Set **Branch** to `main` and **folder** to `/` (root) → **Save**.
5. Wait ~1 minute. Your site is live at
   `https://<your-username>.github.io/`.

The `.nojekyll` file ensures GitHub Pages serves your files as-is (no Jekyll
processing).

---

## Privacy & maintenance notes

- No analytics, no tracking scripts, no cookies.
- The footer states *"No tracking"* — keep it that way.
- Favicon, styles, and scripts are all local files; the page makes **zero**
  external requests, which keeps QR-code scans fast even on slow connections.

Built with plain HTML5, CSS3, and vanilla JavaScript.
