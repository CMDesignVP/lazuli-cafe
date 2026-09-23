/**
 * Étlap-oldalak generálása a meglévő dokumentum.html sablonból.
 * A fejléc / mobilmenü / lábléc / közös scriptek VÁLTOZATLANUL kerülnek át.
 * Csak a <head>, a <main> és a dokumentum-specifikus script cserélődik.
 */
import { readFile, writeFile } from 'node:fs/promises';

const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const src = await readFile(`${REPO}/dokumentum.html`, 'utf8');

// FONTOS: a blokkokat SZÖVEGJELÖLŐK alapján vesszük ki, nem sorszám szerint.
// (Sorszámmal egyszer már eltört: a dokumentum.html fejlécébe később bekerült a
// noindex blokk, ami elcsúsztatta az összes utána következő sort, és a <main>
// a mobilmenü belsejébe került.)
function between(startMarker, endMarker, { includeEnd = true } = {}) {
  const a = src.indexOf(startMarker);
  if (a === -1) throw new Error(`Nem találom a kezdő jelölőt: ${startMarker}`);
  const b = src.indexOf(endMarker, a);
  if (b === -1) throw new Error(`Nem találom a záró jelölőt: ${endMarker}`);
  return src.slice(a, includeEnd ? b + endMarker.length : b).replace(/\s+$/, '');
}

const BODY_OPEN = between('<body>', '<!-- ============ HEADER', { includeEnd: false });
const HEADER    = between('<!-- ============ HEADER', '</header>');
const MOBILE    = between('<!-- ============ MOBIL', '</aside>');
const FOOTER    = between('<!-- ============ FOOTER', '</footer>');
const SCRIPT_COMMON = between('// off-canvas mobil menü', '// melyik dokumentum?', { includeEnd: false });

// Épőségellenőrzés: ha bármelyik blokk gyanúsan rövid vagy nem záródik, álljunk meg.
for (const [name, blk, mustEnd] of [
  ['HEADER', HEADER, '</header>'],
  ['MOBILE', MOBILE, '</aside>'],
  ['FOOTER', FOOTER, '</footer>'],
]) {
  if (!blk.trimEnd().endsWith(mustEnd)) throw new Error(`${name} blokk nem ${mustEnd}-re végződik`);
  if (blk.length < 200) throw new Error(`${name} blokk gyanúsan rövid (${blk.length} bájt)`);
}
console.log(`blokkok: header ${HEADER.length}B · mobil ${MOBILE.length}B · footer ${FOOTER.length}B · script ${SCRIPT_COMMON.length}B`);

const PDF = 'assets/docs/etlap-itallap.pdf';
const ORIGIN = 'https://cafe.lazuli.hu';

const SECTIONS = {
  hu: ['Kávék', 'Meleg italok', 'Üdítők és limonádék', 'Koktélok', 'Borok és pezsgő', 'Fröccsök', 'Palackozott sörök', 'Röviditalok', 'Lepények'],
  en: ['Coffee', 'Hot beverages', 'Refreshments and lemonades', 'Cocktails', 'Wine and sparkling', 'Spritzers', 'Bottled beer', 'Spirits', 'Flatbread'],
  de: ['Kaffee', 'Heiße Getränke', 'Getränke und Limonaden', 'Cocktails', 'Wein und Schaumwein', 'Spritzer', 'Flaschenbier', 'Spirituosen', 'Fladenbrot'],
};

const PAGES = {
  hu: {
    file: 'etlap.html', path: '/etlap', locale: 'hu_HU',
    title: 'Étlap-itallap — Lazuli Café Hegykő',
    desc: 'A Lazuli Café teljes étlapja és itallapja Hegykőn: olasz Musetti kávék, meleg italok, limonádék, koktélok, soproni borok és fröccsök, palackozott sörök, párlatok és frissen sült lepények.',
    sub: 'A KÍNÁLATBÓL',
    h1: 'Étlap-itallap',
    menuName: 'Étlap-itallap',
    intro: 'A Lazuli Café teljes étlap- és itallapja egyetlen, háromnyelvű dokumentumban. Kávékülönlegességek olasz Musetti kávéból, meleg italok, házi limonádék és üdítők, koktélok, soproni borok és fröccsök, palackozott sörök, helyi párlatok, valamint frissen sült lepények. Az allergénjelölések a dokumentum elején találhatók.',
    sectionLead: 'Amit az étlapon találsz:',
    dl: 'PDF megnyitása új lapon',
  },
  en: {
    file: 'menu.html', path: '/menu', locale: 'en_US',
    title: 'Menu — Lazuli Café Hegykő',
    desc: 'The full food and drink menu of Lazuli Café in Hegykő: Italian Musetti coffee, hot beverages, homemade lemonades, cocktails, wines and spritzers from Sopron, bottled beer, spirits and freshly baked flatbreads.',
    sub: 'OUR MENU',
    h1: 'Menu',
    menuName: 'Menu',
    intro: 'The complete food and drink menu of Lazuli Café in a single trilingual document. Coffee specialities made with Italian Musetti beans, hot beverages, homemade lemonades and soft drinks, cocktails, wines and spritzers from the Sopron region, bottled beer, local spirits and freshly baked flatbreads. Allergen information is shown at the beginning of the document.',
    sectionLead: 'What you will find on the menu:',
    dl: 'Open PDF in a new tab',
  },
  de: {
    file: 'speisekarte.html', path: '/speisekarte', locale: 'de_DE',
    title: 'Speisekarte — Lazuli Café Hegykő',
    desc: 'Die komplette Speise- und Getränkekarte des Lazuli Café in Hegykő: italienischer Musetti-Kaffee, heiße Getränke, hausgemachte Limonaden, Cocktails, Weine und Spritzer aus Sopron, Flaschenbier, Obstbrände und frisch gebackenes Fladenbrot.',
    sub: 'SPEISEKARTE',
    h1: 'Speisekarte',
    menuName: 'Speisekarte',
    intro: 'Die vollständige Speise- und Getränkekarte des Lazuli Café in einem einzigen dreisprachigen Dokument. Kaffeespezialitäten aus italienischem Musetti-Kaffee, heiße Getränke, hausgemachte Limonaden und Erfrischungsgetränke, Cocktails, Weine und Spritzer aus der Region Sopron, Flaschenbier, lokale Obstbrände sowie frisch gebackenes Fladenbrot. Die Allergenkennzeichnung finden Sie am Anfang des Dokuments.',
    sectionLead: 'Das erwartet Sie auf der Karte:',
    dl: 'PDF in neuem Tab öffnen',
  },
};

const ALT = {
  hu: `${ORIGIN}/etlap`,
  en: `${ORIGIN}/menu`,
  de: `${ORIGIN}/speisekarte`,
};

for (const [lang, p] of Object.entries(PAGES)) {
  const url = ORIGIN + p.path;
  const sections = SECTIONS[lang];

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Menu',
        '@id': `${url}#menu`,
        name: p.menuName,
        url,
        inLanguage: lang,
        description: p.desc,
        // Szándékosan NINCSENEK egyedi tételek és árak: az étlap PDF-je az
        // ügyféltől érkezik és cserélődik, a beégetett árak elavulnának.
        hasMenuSection: sections.map((s) => ({ '@type': 'MenuSection', name: s })),
        provider: { '@id': `${ORIGIN}/#cafe` },
      },
      {
        '@type': 'CafeOrCoffeeShop',
        '@id': `${ORIGIN}/#cafe`,
        name: 'Lazuli Café',
        url: ORIGIN + '/',
        telephone: '+36303767800',
        email: 'hegyko@lazuli.hu',
        image: `${ORIGIN}/assets/img/hero-bg.jpg`,
        hasMenu: { '@id': `${url}#menu` },
        servesCuisine: ['Coffee', 'Pastry', 'Cafe'],
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
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Lazuli Café', item: ORIGIN + '/' },
          { '@type': 'ListItem', position: 2, name: p.menuName, item: url },
        ],
      },
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
<base href="/">
<title>${p.title}</title>
<meta name="description" content="${p.desc}">

<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="hu" href="${ALT.hu}">
<link rel="alternate" hreflang="en" href="${ALT.en}">
<link rel="alternate" hreflang="de" href="${ALT.de}">
<link rel="alternate" hreflang="x-default" href="${ALT.hu}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Lazuli Café">
<meta property="og:title" content="${p.title}">
<meta property="og:description" content="${p.desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ORIGIN}/assets/img/menu-main.jpg">
<meta property="og:locale" content="${p.locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${p.title}">
<meta name="twitter:description" content="${p.desc}">
<meta name="twitter:image" content="${ORIGIN}/assets/img/menu-main.jpg">

<link rel="icon" type="image/png" href="assets/icons/fav.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-touch-icon.png">
<link rel="stylesheet" href="assets/css/fonts.css?v=20260806">
<link rel="stylesheet" href="style.css?v=20260915">

<script type="application/ld+json">
${JSON.stringify(jsonld, null, 2)}
</script>
</head>`;

  const main = `<!-- ============ ÉTLAP (PDF) ============ -->
<main class="doc" id="tartalom">
  <div class="doc__inner">
    <p class="doc__sub">${p.sub}</p>
    <h1 class="doc__title">${p.h1}</h1>
    <p class="doc__intro">${p.intro}</p>
    <p class="doc__intro doc__intro--sections">${p.sectionLead} ${sections.join(' · ')}</p>
    <div id="adobe-dc-view" style="width:100%;"></div>
    <p class="doc__fallback"><a id="docDownload" href="${PDF}" target="_blank" rel="noopener">${p.dl}</a></p>
  </div>
</main>`;

  const docScript = `<script>
  (function(){
    var PAGE_LANG = "${lang}";
    var URLS = { hu: "/etlap", en: "/menu", de: "/speisekarte" };

    function boot(){
      // A közös i18n.js az útvonalból csak a /en és /de FŐOLDALT ismeri fel, az
      // étlap-oldalak címét (/menu, /speisekarte) nem — ezért magyarra állítaná a
      // fejlécet és a láblécet. Itt kényszerítjük az oldal saját nyelvét.
      // A persist=false szándékos: ne írjuk felül a látogató korábbi választását.
      if (window.LazuliI18n) window.LazuliI18n.applyLang(PAGE_LANG, false);

      // A zászlók a TESTVÉR URL-re navigálnak, nem helyben váltanak nyelvet — így a
      // canonical és a hreflang-klaszter végig konzisztens marad.
      document.querySelectorAll(".lang-flag").forEach(function (b) {
        var clone = b.cloneNode(true);
        b.parentNode.replaceChild(clone, b);
        clone.addEventListener("click", function () {
          var lang = clone.getAttribute("data-lang");
          try { localStorage.setItem("lazuli-lang", lang); } catch (e) {}
          if (URLS[lang]) location.href = URLS[lang];
        });
      });
    }

    // Az i18n.js saját init()-je is DOMContentLoaded-re fut és ELŐBB regisztrált,
    // ezért a miénk utána és felülbírálja.
    if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", boot); }
    else { boot(); }
  })();
</script>

<!-- Adobe PDF Embed -->
<script src="https://documentservices.adobe.com/view-sdk/viewer.js"></script>
<script type="text/javascript">
  var pdfURL = new URL("${PDF}", location.href).href;
  document.addEventListener("adobe_dc_view_sdk.ready", function(){
    var adobeDCView = new AdobeDC.View({ clientId: "6ddde5ab3f7d4e5581de9cc9f273c25e", divId: "adobe-dc-view" });
    adobeDCView.previewFile({
      content:  { location: { url: pdfURL } },
      metaData: { fileName: "${p.menuName}.pdf" }
    }, { embedMode: "IN_LINE" });
  });
</script>`;

  const out = [
    head,
    BODY_OPEN,
    HEADER,
    '',
    MOBILE,
    '',
    main,
    '',
    FOOTER,
    '',
    '<!-- ============ SCRIPTS ============ -->',
    '<script src="i18n.js?v=20260806"></script>',
    '<script>',
    SCRIPT_COMMON,
    '</script>',
    '',
    docScript,
    '</body>',
    '</html>',
    '',
  ].join('\n');

  await writeFile(`${REPO}/${p.file}`, out, 'utf8');
  console.log(`✓ ${p.file} (${lang}) — ${out.length} bájt, canonical: ${url}`);
}
