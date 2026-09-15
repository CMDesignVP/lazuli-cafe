/**
 * Kávézó főoldal: nyelvenként önálló fájl (index.html / en.html / de.html).
 * A <body> BÁJTRA AZONOS marad mindháromban — a szövegeket továbbra is az
 * i18n.js fordítja az útvonal alapján. Csak a <head> lesz nyelvfüggő, mert
 * a title / description / canonical / og:locale statikusan kell a keresőnek.
 */
import { readFile, writeFile } from 'node:fs/promises';

const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const ORIGIN = 'https://cafe.lazuli.hu';

const src = await readFile(`${REPO}/index.html`, 'utf8');
const marker = '</head>';
const idx = src.indexOf(marker);
if (idx === -1) throw new Error('Nincs </head> az index.html-ben');
const BODY = src.slice(idx + marker.length); // a </head> UTÁNI teljes törzs

const PAGES = {
  hu: {
    file: 'index.html', path: '/', locale: 'hu_HU', menu: '/etlap',
    title: 'Lazuli Café — Fertő-táji pékség és kávézó',
    desc: 'Pékség és kávézó Hegykő szívében: olasz Musetti kávé, minőségi sütemények és torták, friss reggelik, tágas terasz. Nyitva minden nap 10:00–18:00.',
    ogDesc: 'Pékség és kávézó Hegykő szívében: olasz Musetti kávé, minőségi sütemények és torták, friss reggelik, tágas terasz.',
    cuisine: ['Kávé', 'Sütemény', 'Reggeli'],
  },
  en: {
    file: 'en.html', path: '/en', locale: 'en_US', menu: '/menu',
    title: 'Lazuli Café — Bakery and coffee house by Lake Fertő',
    desc: 'Bakery and coffee house in the heart of Hegykő: Italian Musetti coffee, quality cakes and pastries, fresh breakfasts, spacious terrace. Open daily 10:00–18:00.',
    ogDesc: 'Bakery and coffee house in the heart of Hegykő: Italian Musetti coffee, quality cakes and pastries, fresh breakfasts, spacious terrace.',
    cuisine: ['Coffee', 'Pastry', 'Breakfast'],
  },
  de: {
    file: 'de.html', path: '/de', locale: 'de_DE', menu: '/speisekarte',
    title: 'Lazuli Café — Bäckerei und Kaffeehaus am Neusiedler See',
    desc: 'Bäckerei und Kaffeehaus im Herzen von Hegykő: italienischer Musetti-Kaffee, hochwertige Kuchen und Torten, frische Frühstücke, großzügige Terrasse. Täglich 10:00–18:00 geöffnet.',
    ogDesc: 'Bäckerei und Kaffeehaus im Herzen von Hegykő: italienischer Musetti-Kaffee, hochwertige Kuchen und Torten, frische Frühstücke, großzügige Terrasse.',
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

  await writeFile(`${REPO}/${p.file}`, head + BODY, 'utf8');
  console.log(`✓ ${p.file} (${lang}) — canonical: ${url}, hasMenu: ${ORIGIN}${p.menu}`);
}
