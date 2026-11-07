# Lucius — Personal Research Website

## Bilingual maintenance / 双语维护

The six public pages have complete English versions at their existing routes
and Simplified Chinese equivalents under `/zh/`. HTML is pre-generated; reading,
navigation and language switching work without JavaScript. Existing evidence
downloads remain unchanged and retain their original language and identifiers.

六个公开页面均提供英文与简体中文。英文保留原路径，中文位于 `/zh/`。
正文、导航和语言切换无需 JavaScript；证据下载保留原始语言和标识符。

Edit **`i18n/source/`** for English HTML and **`i18n/zh-CN.json`** for Chinese
translations. The source is shared: do not edit generated HTML directly.
Shared CSS and JavaScript stay at the root. No package installation is needed;
Python 3.9+ builds the pages using its standard library.

```powershell
python i18n/build.py
python i18n/build.py --check
python i18n/check.py
node --check script.js
node --check i18n/language.js
python -m http.server 8000
```

Preview at `http://localhost:8000/` and `http://localhost:8000/zh/`, served from
the site root (opening HTML through `file://` is unsupported). Commit source,
translations and generated pages together. The build fails on missing prose or
accessible/metadata translations. Structural checks cover all 12 pages, local
links, anchors, locale pairs, canonical/hreflang metadata and English fidelity.
Before release, also inspect both languages on desktop and mobile, with
JavaScript/storage unavailable, and exercise the event controls.

The language switch retains the current page, query and fragment. An explicit
choice is saved locally when storage is available. Default English URLs, including deep links,
negotiate language: saved choice first, then the browser's primary language
(Chinese → Chinese, otherwise English). Chinese URLs remain explicit. Add `?lang=en` to force an English deep link;
this also saves the English preference.
No tracking, cookies, external translation service or additional runtime
dependency is introduced. Social preview artwork and original evidence remain
shared; their page metadata and alternative descriptions are localized.

语言切换保留当前页面、查询参数与锚点，并在可用时保存明确选择。默认英文路径（含深层链接）
按已保存选择、浏览器首选语言依次决定语言；中文路径直接显示中文，`?lang=en`
明确指定英文并保存英文偏好。
禁用 JavaScript 时直接显示请求页面，语言链接仍可使用。

See `AGENTS.md` for the permanent bilingual policy and `i18n/GLOSSARY.md` for
translation conventions. The historical notes below describe earlier site
iterations; the source tree and generated pages are the current authority.

Personal website for **Lucius (贺孟元)** — Independent Researcher · Founder ·
Builder working on **agent systems, physical AI and collective intelligence**.

Featured work: **Moonblade** (Physical Skill Layer, prototype in development)
and **SwarmAlpha** (experimental research on multi-agent collective
decision-making). Earlier work (Phase Reversal notes, Personal Agent Runtime)
is kept under lower-weight archive sections.

Also hosts **日之炽 · RIZHICHI**, an independent technology venture by Lucius,
at `/rizhichi/`.

Built as a **static GitHub Pages site**: plain HTML, CSS, and vanilla
JavaScript. No framework or runtime dependencies. The bilingual pages are
generated with the standard-library command above before publication.

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
