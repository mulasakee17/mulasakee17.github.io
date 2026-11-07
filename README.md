# Lucius He — Personal website

A static portfolio for Lucius He (贺孟元). Plain HTML, CSS, and vanilla JavaScript; no framework, analytics, or external runtime dependencies. A Python standard-library generator publishes six complete English/Chinese page pairs.

## Pages and evidence

- `index.html`: introduction, three project entries, approach, about, and contact.
- `work/moonblade/`: engineering prototype and an eight-input synthetic software trace. The interactive browser reads the published HTML record; it makes no model or hardware calls. Full records remain readable without JavaScript.
- `work/swarmalpha/`: stopped research archive and engineering handoff, with the public experimental design and its interpretation boundaries.
- `work/ancestors/`: a bounded public reading path; the personal collection remains private.
- `assets/evidence/`: published JSON evidence exports and the SwarmAlpha license notice. Preserve provenance and limitations when changing their presentation.
- `archive/`: earlier systems and research, with PDFs in `research/`.
- `rizhichi/`: secondary RIZHICHI page.

`style.css` owns shared tokens and layout. `script.js` provides progressive enhancement: header state, motion-aware reveals, and the Moonblade record browser. Contact email, GitHub, and WeChat QR use ordinary links.

## Local preview

From the repository root:

```sh
python -m http.server 8000
```

Open `http://localhost:8000/`. No installation is required. Serve the repository root so language paths and shared assets resolve correctly. Content and language links remain available without JavaScript.

## Editing and checks

Keep claims within the published source boundaries. Preserve existing anchor destinations and relative links. Check the homepage and each case at desktop and phone widths, including keyboard focus and reduced motion. The Moonblade browser must match the full record and remain usable at its first and last inputs.

```sh
python i18n/build.py --check
python i18n/check.py
node --check script.js
node --check i18n/language.js
git diff --check
```

The social image is `assets/og-image.png`; metadata lives in each page head. The WeChat image is `assets/wechat-qr.webp`, opened as an ordinary image link.

## Publication

The repository is configured for static GitHub Pages. A push to a publishing branch may publish changes. Completed and verified changes may be committed and pushed under the owner’s standing authorization. Do not merge or deploy without separate explicit authorization.

## Bilingual publishing / 双语发布

English lives at the original six routes; Simplified Chinese lives under `/zh/`. Edit the English HTML in `i18n/source/`, translations in `i18n/zh-CN.json`, and shared UI in `style.css`, `script.js`, and `i18n/language.js`. Run `python i18n/build.py` to regenerate all twelve pages and the sitemap, then run the checks above. Generated pages must never be edited alone. `i18n/GLOSSARY.md` records terminology and evidence boundaries; `AGENTS.md` makes paired publication permanent.

英文保留原有六个路径，简体中文位于 `/zh/`。修改英文源文件和中文词典后，运行生成器并检查全部十二页；新增公开内容须同步提供双语。共享证据文件、PDF、状态标识符及专名保持原样，完整个人收藏继续保密。

Language links connect counterpart pages and preserve fragments with JavaScript. An explicit Chinese route or English choice takes precedence over browser preference; otherwise a first visit can use the browser’s preferred language. Storage access is optional and guarded. No translation service or tracking is used. Canonical URLs, reciprocal `hreflang`, localized social metadata, `robots.txt`, and the generated twelve-route sitemap support discovery.
