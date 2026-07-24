# Lazuli Café

Statikus weboldal (HTML + CSS + vanilla JS) a Lazuli Café számára — Figma dizájn alapján
újraépítve. Háromnyelvű (HU / EN / DE), kliensoldali fordítással.

## Felépítés
- `index.html` — az egyoldalas főoldal
- `dokumentum.html` — közös dokumentum-oldal (étlap-itallap, ÁSZF, adatkezelés PDF-ekhez)
- `style.css` — stílusok (CSS-változókkal, reszponzív: desktop + tablet + mobil)
- `i18n.js` — kliensoldali fordítás (HU/EN/DE), a `[data-i18n]` elemek cseréje;
  a választott nyelv `localStorage`-ban (`lazuli-lang`)
- `404.html` — saját hibaoldal
- `robots.txt`, `sitemap.xml` — SEO
- `assets/`
  - `img/`, `icons/` — képek, ikonok, logó (SVG/JPG/PNG/WEBP)
  - `docs/` — PDF-ek (étlap, ÁSZF, adatkezelés; nyelvenként)
  - `fonts/` + `css/fonts.css` — saját hosztolt betűk (nincs Google Fonts CDN — GDPR)
  - `js/lenis.min.js` — saját hosztolt Lenis smooth-scroll (nincs CDN)

## Nyelvkezelés és útvonalak
A nyelvet az URL adja, a tartalmat a `i18n.js` cseréli kliensoldalon:
- Főoldal: `/` (HU), `/en`, `/de`
- Dokumentumok (a `dokumentum.html` az útvonalból ismeri fel a PDF-et és a nyelvet):
  - étlap: `/etlap` (HU), `/menu` (EN/DE)
  - ÁSZF: `/aszf` (HU), `/terms` (EN), `/agb` (DE)
  - adatkezelés: `/adatkezeles` (HU), `/privacy` (EN), `/datenschutz` (DE)

Az útvonal-átírást a `.htaccess` (SiteGround/Apache) és a `serve.json` (helyi `serve`) kezeli.

A **dokumentum-oldalon a nyelvváltó zászló csak a nav/footer + a cím/alcím/letöltés-link
nyelvét váltja, helyben maradva** (az étlap PDF háromnyelvű). A cím/alcím/letöltés-link
fordítását a `dokumentum.html` beépített `DOC_I18N` táblája adja dokumentumcsaládonként.

## Helyi futtatás
Bármilyen statikus szerverrel, pl.:
```bash
npx serve .
# vagy
python3 -m http.server 8080
```
> A `.htaccess` rewrite-jai csak Apache-on (pl. SiteGround) élnek. Helyi `serve` esetén a
> `serve.json` adja ugyanezeket az útvonalakat; `python3 -m http.server` esetén a tiszta
> URL-ek (`/etlap`) nem működnek, a `dokumentum.html?...`-t közvetlenül kell nyitni.

## Élesítés / biztonsági megjegyzések
- A `.htaccess` tartalmaz HTTPS-átirányítást és biztonsági fejléceket (HSTS, nosniff,
  X-Frame-Options, Referrer-Policy, Permissions-Policy), cache- és tömörítés-szabályokat.
- A **Content-Security-Policy kommentben van** a `.htaccess`-ben — élesítés után teszteld
  a `/etlap` oldalt (Adobe PDF viewer), és csak utána kapcsold be.
- Betűk és a Lenis saját hoszton (nincs harmadik feles CDN — GDPR és sebesség).
- Az Adobe PDF Embed `clientId` domainhez kötött (`cafe.lazuli.hu`).
- Az adatkezelési tájékoztatóban szerepeljen a Google Maps embed és az Adobe viewer.

## Deploy
A `main` ágra történő push automatikusan FTPS-sel kirakja a fájlokat a SiteGround tárhelyre
(`.github/workflows/deploy.yml`). Az action commit-SHA-ra van pinelve. A GitHub repo
**Settings → Secrets and variables → Actions** alatt be kell állítani:

| Secret | Érték |
|--------|-------|
| `FTP_SERVER` | a tárhely FTP hosztja (pl. `ftp.sajatdomain.hu`) |
| `FTP_USERNAME` | FTP felhasználónév |
| `FTP_PASSWORD` | FTP jelszó |

Amíg ezek nincsenek beállítva, a deploy lépés kimarad (a workflow zölden lefut).
A célmappát a workflow `server-dir` értékénél lehet megadni (alapból `./`).
Éles domain: **https://cafe.lazuli.hu**. A `.claude/`, `serve.json`, `README.md` és a
Figma-forrás nem kerül feltöltésre (a workflow `exclude` listája alapján).
