# tools/ — fejlesztői segédszkriptek

Ezek a szkriptek **NEM kerülnek ki a szerverre** (a `.github/workflows/deploy.yml`
`exclude` listája kizárja a `tools/` mappát). Csak helyi generáláshoz és teszteléshez
valók. Node 20+ kell hozzájuk, külső csomag nem.

## Miért van szükség generátorra?

Az oldalnak nincs build lépése: a deploy egyszerű FTP-szinkron. A keresőnek viszont
**URL-enként statikus** `title`, `description`, `canonical` és `hreflang` kell, amit
egyetlen megosztott HTML-ből nem lehet kiszolgálni. Ezért van nyelvenként külön fájl,
és ezért generáljuk őket, hogy a közös fejléc/lábléc ne csússzon szét kézi másolgatástól.

| Fájl | Mit csinál |
|---|---|
| `gen-menu-pages.mjs` | `etlap.html` (hu), `menu.html` (en), `speisekarte.html` (de) |
| `gen-home-pages.mjs` | `index.html` (hu), `en.html` (en), `de.html` (de) |
| `serve-routes.mjs` | helyi tesztszerver, ami leutánozza a `.htaccess` átírásait |

## Használat

```bash
node tools/gen-menu-pages.mjs    # étlap-oldalak újragenerálása
node tools/gen-home-pages.mjs    # főoldalak újragenerálása
node tools/serve-routes.mjs      # http://127.0.0.1:8778 — tiszta URL-eken tesztel
```

A generálás után **a git diffnek üresnek kell lennie**, ha semmit nem módosítottál a
forrásban. Ha nem üres, valami elcsúszott — nézd meg, mielőtt commitolsz.

## Honnan veszik a közös részeket?

- `gen-menu-pages.mjs` a `dokumentum.html`-ből emeli át a fejlécet, a mobilmenüt, a
  láblécet és a közös scripteket. **Szövegjelölők alapján vág, nem sorszám szerint** —
  ez fontos: korábban fix sorszámokkal dolgozott, és amikor a `dokumentum.html`
  fejlécébe bekerült a `noindex` blokk, minden elcsúszott 5 sorral, és a `<main>` a
  mobilmenü belsejébe került (ami `visibility:hidden`, tehát az oldal némán üres lett).
  A szkript ezért épségellenőrzést is futtat, és hibával leáll, ha egy blokk nem a
  várt záró taggel végződik.
- `gen-home-pages.mjs` az `index.html` `</head>` utáni teljes törzsét veszi át
  változatlanul, így a három nyelvi főoldal törzse bájtra azonos marad.

## Amire figyelni kell

- **Nyelvkényszerítés.** A közös `i18n.js` az útvonalból csak a `/en` és `/de`
  **főoldalt** ismeri fel. Az étlap-oldalak (`/menu`, `/speisekarte`) ezért saját
  maguk állítják be a nyelvet (`LazuliI18n.applyLang(PAGE_LANG, false)`), különben a
  fejléc és a lábléc magyarul jelenne meg.
- **CSS cache.** A kiszolgált `style.css` egy évig cache-elődik. Ha a CSS-t módosítod,
  **léptetni kell a `?v=` paramétert** az összes HTML-ben, különben a visszatérő
  látogatók a régi stílust kapják.
- **Strukturált adat.** Az étlap JSON-LD-je szándékosan **nem tartalmaz tételeket és
  árakat**, csak rovatneveket. Az étlap PDF-je az ügyféltől érkezik és cserélődik; a
  beégetett árak a következő cserénél elavulnának, és a Google rossz árat mutatna.
