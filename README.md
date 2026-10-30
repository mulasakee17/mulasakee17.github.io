# Lucius He — Personal website

A static portfolio for Lucius He (贺孟元). Plain HTML, CSS, and vanilla JavaScript; no framework, build step, analytics, or external runtime dependencies.

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

Open `http://localhost:8000/`. No installation is required. Direct file opening also supports the static pages and trace browser.

## Editing and checks

Keep claims within the published source boundaries. Preserve existing anchor destinations and relative links. Check the homepage and each case at desktop and phone widths, including keyboard focus and reduced motion. The Moonblade browser must match the full record and remain usable at its first and last inputs.

```sh
node --check script.js
git diff --check
```

The social image is `assets/og-image.png`; metadata lives in each page head. The WeChat image is `assets/wechat-qr.webp`, opened as an ordinary image link.

## Publication

The repository is configured for static GitHub Pages. A push to a publishing branch may publish changes. Local review work should remain local until publication is explicitly authorized; do not push or merge merely to preview.
