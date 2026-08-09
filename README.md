# Mengyuan He — Personal Research Website

Personal research website for **Mengyuan He (贺孟元)** — Independent Researcher
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
│   └── wechat-qr.webp   # <-- add your WeChat QR here (480×480 recommended)
└── research/       # (optional) drop PDFs here and link them relatively
```

---

## Placeholders to replace

Search `index.html` for these. Each is also marked with an HTML comment.

| Placeholder                  | Where                                                | Replace with                                      |
| ---------------------------- | ---------------------------------------------------- | ------------------------------------------------- |
| `YOUR_EMAIL`                 | Contact section (`mailto:YOUR_EMAIL`)                | Your email address                                |
| `SWARMALPHA_GITHUB_URL`      | SwarmAlpha "View Project" + "GitHub" links           | The SwarmAlpha repo URL                           |
| `PHASE_REVERSAL_BRIEF_URL`   | Phase Reversal "Read Brief"                          | Brief URL, or a local PDF (see below)             |
| `PHASE_REVERSAL_FULL_URL`    | Phase Reversal "Full Research Note"                  | Full note URL, or a local PDF (see below)         |
| GitHub profile URL           | Nav / hero / contact (`https://github.com/mulasakee17`) | Your GitHub profile URL                       |
| Canonical URL                | `<head>` (`https://mulasakee17.github.io/`)          | Your live Pages URL                               |

> The GitHub profile and canonical URLs were pre-filled from this repository's
> name. If your Pages URL ever differs, update them in `index.html`.

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

## How to replace PDFs

Two options:

1. **Link out** — point `PHASE_REVERSAL_BRIEF_URL` / `PHASE_REVERSAL_FULL_URL`
   at wherever you host the documents.
2. **Self-host on GitHub Pages** — create a `research/` folder, drop PDFs in
   (e.g. `research/phase-reversal-brief.pdf`), and use relative paths:

```html
<a href="research/phase-reversal-brief.pdf">Read Brief</a>
<a href="research/phase-reversal-full.pdf">Full Research Note</a>
```

GitHub Pages serves PDFs directly from the repo, so no extra setup is needed.

---

## How to replace the WeChat QR code

1. Export your WeChat QR as a square `.webp` (~480 × 480 px).
2. Save it as `assets/wechat-qr.webp` (overwrite the file).

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
