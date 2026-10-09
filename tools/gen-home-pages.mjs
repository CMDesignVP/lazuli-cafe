/**
 * Kávézó főoldal: nyelvenként önálló fájl (index.html / en.html / de.html).
 * A <head> nyelvfüggő (title / description / canonical / og:locale).
 *
 * A <body> forrása az index.html, de az EN/DE fájlba a szövegek már
 * STATIKUSAN lefordítva kerülnek (#43706): minden [data-i18n] elem az
 * i18n.js szótárából kapja a tartalmát, a [data-doc] és [data-home] linkek
 * a nyelvi útvonalra mutatnak. Így a kereső JavaScript nélkül is angol /
 * német H1-et és szöveget lát. Az i18n.js futáskor ugyanezt állítja be,
 * tehát a látogató számára nincs változás.
 *
 * Ellenőrzés: a magyar szótárral visszarenderelt törzsnek bájtra azonosnak
 * kell lennie az index.html törzsével — ha nem az, a szkript leáll.
 */
import { readFile, writeFile } from 'node:fs/promises';

const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const ORIGIN = 'https://cafe.lazuli.hu';

const src = await readFile(`${REPO}/index.html`, 'utf8');
const marker = '</head>';
const idx = src.indexOf(marker);
if (idx === -1) throw new Error('Nincs </head> az index.html-ben');
const BODY = src.slice(idx + marker.length); // a </head> UTÁNI teljes törzs

// --- statikus fordítás az i18n.js szótárából ---------------------------------
const I18N = await readFile(`${REPO}/i18n.js`, 'utf8');
// a `var NAME = { ... };` objektum-literált kivágja és kiértékeli
function grabObject(name) {
  const start = I18N.indexOf(`var ${name} = {`);
  if (start === -1) throw new Error(`Nincs "var ${name}" az i18n.js-ben`);
  const open = I18N.indexOf('{', start);
  let depth = 0, end = open;
  for (; end < I18N.length; end++) {
    if (I18N[end] === '{') depth++;
    else if (I18N[end] === '}' && --depth === 0) break;
  }
  return new Function(`return ${I18N.slice(open, end + 1)}`)();
}
const T = grabObject('T');
const DOC_URLS = grabObject('DOC_URLS');

// ugyanaz, amit az i18n.js applyLang() csinál, csak build időben
function localize(body, lang) {
  const dict = T[lang];
  const problems = [];
  let out = body.replace(
    /<(\w+)(\s[^>]*?\sdata-i18n="([^"]+)"[^>]*|\s+data-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g,
    (m, tag, attrs, k1, k2, inner) => {
      const key = k1 || k2;
      if (inner.includes(`<${tag}`)) { problems.push(`beágyazott <${tag}>: ${key}`); return m; }
      if (dict[key] == null) { problems.push(`hiányzó kulcs: ${key}`); return m; }
      return `<${tag}${attrs}>${dict[key]}</${tag}>`;
    });
  out = out.replace(/<a\b[^>]*\sdata-doc="(\w+)"[^>]*>/g, (m, d) =>
    DOC_URLS[d] && DOC_URLS[d][lang] ? m.replace(/href="[^"]*"/, `href="${DOC_URLS[d][lang]}"`) : m);
  out = out.replace(/<a\b[^>]*\sdata-home[\s=>][^>]*>/g, (m) =>
    m.replace(/href="[^"]*"/, `href="${lang === 'hu' ? '/' : '/' + lang}"`));
  if (problems.length) throw new Error(`Fordítási hiba (${lang}):\n` + problems.join('\n'));
  return out;
}
if (localize(BODY, 'hu') !== BODY) {
  throw new Error('A magyar szótárral visszarenderelt törzs eltér az index.html-től — a szótár és a HTML elcsúszott.');
}

const PAGES = {
  hu: {
    file: 'index.html', path: '/', locale: 'hu_HU', menu: '/etlap',
    title: 'Lazuli Café — Fertő-táji cukrászda és kávézó',
    desc: 'Cukrászda és kávézó Hegykő szívében: olasz Musetti kávé, minőségi sütemények és torták, friss reggelik, tágas terasz. Nyitva minden nap 10:00–18:00.',
    ogDesc: 'Cukrászda és kávézó Hegykő szívében: olasz Musetti kávé, minőségi sütemények és torták, friss reggelik, tágas terasz.',
    cuisine: ['Kávé', 'Sütemény', 'Reggeli'],
  },
  en: {
    file: 'en.html', path: '/en', locale: 'en_US', menu: '/menu',
    title: 'Lazuli Café — Patisserie and coffee house by Lake Fertő',
    desc: 'Patisserie and coffee house in the heart of Hegykő: Italian Musetti coffee, quality cakes and pastries, fresh breakfasts, spacious terrace. Open daily 10:00–18:00.',
    ogDesc: 'Patisserie and coffee house in the heart of Hegykő: Italian Musetti coffee, quality cakes and pastries, fresh breakfasts, spacious terrace.',
    cuisine: ['Coffee', 'Pastry', 'Breakfast'],
  },
  de: {
    file: 'de.html', path: '/de', locale: 'de_DE', menu: '/speisekarte',
    title: 'Lazuli Café — Konditorei und Kaffeehaus am Neusiedler See',
    desc: 'Konditorei und Kaffeehaus im Herzen von Hegykő: italienischer Musetti-Kaffee, hochwertige Kuchen und Torten, frische Frühstücke, großzügige Terrasse. Täglich 10:00–18:00 geöffnet.',
    ogDesc: 'Konditorei und Kaffeehaus im Herzen von Hegykő: italienischer Musetti-Kaffee, hochwertige Kuchen und Torten, frische Frühstücke, großzügige Terrasse.',
    cuisine: ['Kaffee', 'Gebäck', 'Frühstück'],
  },
};

const ALT = { hu: `${ORIGIN}/`, en: `${ORIGIN}/en`, de: `${ORIGIN}/de` };

for (const [lang, p] of Object.entries(PAGES)) {
  const url = lang === 'hu' ? `${ORIGIN}/` : `${ORIGIN}${p.path}`;

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    // Az @id stabil horgony: az étlap-oldalak Menu sémája erre hivatkozik vissza.
    '@id': `${ORIGIN}/#cafe`,
    name: 'Lazuli Café',
    image: `${ORIGIN}/assets/img/hero-bg.jpg`,
    url: `${ORIGIN}/`,
    telephone: '+36303767800',
    email: 'hegyko@lazuli.hu',
    servesCuisine: p.cuisine,
    priceRange: '$$',
    hasMenu: `${ORIGIN}${p.menu}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alsószer utca 18.',
      addressLocality: 'Hegykő',
      postalCode: '9437',
      addressCountry: 'HU',
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '18:00',
    }],
    sameAs: [
      'https://www.instagram.com/cafelazuli.hegyko/',
      'https://www.facebook.com/cafelazuli.hegyko',
    ],
  };

  const head = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<!-- CookieYes banner (consent) – a GTM elé töltjük be -->
<script id="cookieyes" type="text/javascript" src="https://cdn-cookieyes.com/client_data/cb4bae2f5099c113811184f11fed3576/script.js"></script>
<!-- End CookieYes -->
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-55VHQCMZ');</script>
<!-- End Google Tag Manager -->

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${p.title}</title>
<meta name="description" content="${p.desc}">

<!-- nyelvi változatok: mindegyiknek ÖNÁLLÓ fájlja és canonicalja van -->
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="hu" href="${ALT.hu}">
<link rel="alternate" hreflang="en" href="${ALT.en}">
<link rel="alternate" hreflang="de" href="${ALT.de}">
<link rel="alternate" hreflang="x-default" href="${ALT.hu}">

<!-- Open Graph / Twitter -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Lazuli Café">
<meta property="og:title" content="${p.title}">
<meta property="og:description" content="${p.ogDesc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ORIGIN}/assets/img/hero-bg.jpg">
<meta property="og:locale" content="${p.locale}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" type="image/png" href="assets/icons/fav.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-touch-icon.png">
<link rel="preload" as="image" href="assets/img/hero-bg.jpg" fetchpriority="high">
<link rel="stylesheet" href="assets/css/fonts.css?v=20260806">
<link rel="stylesheet" href="style.css?v=20260915">

<!-- Strukturált adat a Google találatokhoz (kávézó: cím, nyitvatartás, elérhetőség) -->
<script type="application/ld+json">
${JSON.stringify(jsonld, null, 2)}
</script>
</head>`;

  await writeFile(`${REPO}/${p.file}`, head + localize(BODY, lang), 'utf8');
  console.log(`✓ ${p.file} (${lang}) — canonical: ${url}, hasMenu: ${ORIGIN}${p.menu}`);
}
