# Permanent bilingual publishing policy / 长期双语发布政策

- Maintain complete English and Simplified Chinese versions of all six public pages. English routes remain at `/`; Chinese equivalents live under `/zh/`. New public pages must ship in both languages in the same change.
- 全部六个公开页面长期保持英文与简体中文完整对应。英文路径保留，中文位于 `/zh/`；新增公开页面必须同期提供两种语言。
- Edit English HTML only in `i18n/source/`, Chinese translations in `i18n/zh-CN.json`, and shared behavior/style in `script.js`, `i18n/language.js`, and `style.css`. Run `python i18n/build.py` and commit all generated pages. Never fix a generated page alone.
- 只在 `i18n/source/` 修改英文页面源文件，在 `i18n/zh-CN.json` 维护中文；行为和样式共享。运行生成器并提交全部生成页面，禁止单独修改生成页面。
- Translate visible prose, navigation, metadata, image alternatives, accessible labels, and dynamically created UI. Preserve technical identifiers, evidence files, proper names and original source titles when required for verifiability. Consult `i18n/GLOSSARY.md`. Do not strengthen claims or hide limitations in translation.
- 可见正文、导航、元数据、图片替代文本、无障碍标签与动态界面均须翻译。为可核查性保留技术标识符、证据文件、专名与必要的原文标题；遵循术语表，不得在翻译中夸大成果或淡化局限。
- Every page needs an accessible language switch to its counterpart, correct `lang`, canonical URL, reciprocal `hreflang` and localized social metadata. Same-language internal navigation and fragment targets must remain intact. Language choice is an enhancement: content and the switch must work without JavaScript or local storage.
- 每页必须有可访问的对应语言切换、正确的 `lang`、canonical、互相对应的 `hreflang` 与本地化社交元数据。站内导航保持当前语言与锚点；无 JavaScript 或存储权限时正文与语言切换仍须可用。
- Before acceptance, run `python i18n/build.py --check`, `python i18n/check.py`, and JavaScript syntax checks; inspect both languages on desktop and narrow screens. Verify evidence links and dynamic event controls. Deployment and pushing require a separate user instruction.
- 验收前执行构建一致性、结构检查与 JavaScript 语法检查，检查两种语言的桌面和窄屏显示、证据链接及动态事件控件。推送与部署须由用户另行指示。
