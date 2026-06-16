# Lazuli Café

Statikus weboldal (HTML + CSS) a Lazuli Café számára — Figma dizájn alapján újraépítve.

## Felépítés
- `index.html` — az egyoldalas weboldal
- `style.css` — stílusok (CSS-változókkal, reszponzív: desktop + tablet + mobil)
- `assets/` — képek, ikonok, logó (SVG/JPG/PNG) és PDF-ek (étlap, ÁSZF, adatkezelés)

## Helyi futtatás
Bármilyen statikus szerverrel, pl.:
```bash
npx serve .
# vagy
python3 -m http.server 8080
```

## Deploy
A `main` ágra történő push automatikusan FTP-vel kirakja a fájlokat a tárhelyre
(`.github/workflows/deploy.yml`). Ehhez a GitHub repo **Settings → Secrets and variables → Actions**
alatt be kell állítani:

| Secret | Érték |
|--------|-------|
| `FTP_SERVER` | a tárhely FTP hosztja (pl. `ftp.sajatdomain.hu`) |
| `FTP_USERNAME` | FTP felhasználónév |
| `FTP_PASSWORD` | FTP jelszó |

Amíg ezek nincsenek beállítva, a deploy lépés kimarad (a workflow zölden lefut).
A célmappát a workflow `server-dir` értékénél lehet megadni (alapból `./`).
