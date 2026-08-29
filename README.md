# Lucius — Personal Research Website

Personal website for **Lucius (贺孟元)** — Independent Researcher · Founder ·
Builder working on **agent systems, physical AI and collective intelligence**.

Featured work: **Moonblade** (Physical Skill Layer, prototype in development)
and **SwarmAlpha** (experimental research on multi-agent collective
decision-making). Earlier work (Phase Reversal notes, Personal Agent Runtime)
is kept under lower-weight archive sections.

Also hosts **日之炽 · RIZHICHI**, an independent technology venture by Lucius,
at `/rizhichi/`.

Built as a **static GitHub Pages site**: plain HTML, CSS, and vanilla
JavaScript. No framework, no build step, no dependencies. Push to GitHub and
it deploys.

---

## File structure

```
.
├── index.html          # Personal homepage (work + evidence + notes + company entry)
├── style.css           # Shared design system — tokens at the top, easy to tweak
├── script.js           # Vanilla JS: header state, scroll reveal, WeChat modal
├── favicon.svg         # Asterisk mark used as the browser tab icon
├── .nojekyll           # Tells GitHub Pages not to run Jekyll
├── assets/
│   ├── README.md       # Drop-in instructions for the QR code
│   ├── wechat-qr.webp  # your WeChat QR (currently the WeChat card image)
│   └── og-image.png    # 1200×630 social preview (Open Graph / Twitter)
├── rizhichi/           # 日之炽 · RIZHICHI — company page
│   ├── index.html      # Hero, What We Build, Thesis, Founder, Contact
│   ├── rizhichi.css    # Small lab-identity layer over ../style.css
│   └── favicon.svg     # Orbit mark (ring + displaced body)
└── research/
    ├── phase-reversal-brief.pdf            # "Read Brief" target
    └── phase-reversal-whitepaper-cn.pdf    # "Full Research Note" target
```

---

## Page structure (index.html)

1. **Hero** — name, role, one-line identity, the guiding research question.
2. **Selected Work** — the two current headline projects:
   - `01 Moonblade` — Featured Build (no public repo yet; status chip only)
   - `02 SwarmAlpha` — Featured Research (evidence table + GitHub links)
3. **Selected Evidence** — five verifiable facts, nothing louder.
4. **Selected Notes** — earlier research notes (Phase Reversal Hypothesis).
5. **Earlier Systems** — previous explorations (Personal Agent Runtime).
6. **Company** — RIZHICHI entry card.
7. **Research Experience** — current independent research context.
8. **Contact** — email / GitHub / WeChat modal.

---

## Links & content — where everything lives now

All initial placeholders are wired up. To change anything:

| Item                            | Where to edit                                        |
| ------------------------------- | ---------------------------------------------------- |
| Contact email                   | `index.html` / `rizhichi/index.html` → `mailto:huimouye@qq.com` |
| GitHub profile URL              | `index.html` / `rizhichi/index.html` → nav / hero / contact |
| SwarmAlpha repo (`swarmalpha`)  | `index.html` + `rizhichi/index.html` → the SwarmAlpha buttons |
| SwarmAlpha working paper        | `index.html` → "Working Paper" → `PAPER_DRAFT.md` in the swarmalpha repo |
| Personal Agent Runtime link     | `index.html` (Earlier Systems) + `rizhichi/index.html` (What We Build) → `https://github.com/mulasakee17/personal-agent-runtime` |
| Faculty profile (Xiaogang Peng) | `index.html` (Research Experience) → `https://ai.szu.edu.cn/info/1074/1334.htm` |
| Moonblade                       | `index.html` + `rizhichi/index.html` — status chip only; add a repo link when one exists |
| Phase Reversal brief            | `research/phase-reversal-brief.pdf` (replace the file) |
| Phase Reversal full note        | `research/phase-reversal-whitepaper-cn.pdf` (replace the file) |
| Canonical / OG URLs             | `<head>` of `index.html` and `rizhichi/index.html`    |

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

## How to modify the featured projects

Each project is one `<article class="project">` block in `index.html`:

- `project--featured` marks the two headline projects (larger title).
- `project--note` marks archive-tier entries (smaller title).
- The `.evidence` list renders the restrained Research Question / Method /
  Evidence / Status rows.
- Keep claims limited to what the linked repositories actually show.

---

## How to replace the research PDFs

The two Phase Reversal documents are PDFs in `research/`:

- `research/phase-reversal-brief.pdf` — linked from "Read Brief"
- `research/phase-reversal-whitepaper-cn.pdf` — linked from "Full Research Note"

To update a document, overwrite the PDF (keep the same filename) and push —
GitHub Pages serves PDFs as-is, no extra setup. If you rename a file, update
the matching `href` in `index.html`. The buttons open the PDF in a new tab so
visitors stay on the landing page.

---

## How to replace the social preview image

`assets/og-image.png` (1200×630) is the Open Graph / Twitter card image. To
regenerate it, render a new PNG with the same name and push — keep the exact
filename so the `<meta property="og:image">` tags keep working.

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
