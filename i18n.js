/* =====================================================================
   Lazuli Café — i18n (HU / EN / DE)
   A data-i18n attribútumú elemek innerHTML-jét cseréli a választott
   nyelvre. A választás localStorage-ban tárolódik. Alapértelmezett: HU.
   ===================================================================== */
(function () {
  var T = {
    hu: {
      "nav.home": "főoldal",
      "nav.menu": "étlap-itallap",
      "nav.lazuli": "Lazuli",
      "nav.contact": "Kapcsolat",
      "btn.book": "asztalfoglalás",
      "btn.menu": "étlap-itallap",
      "btn.call": "Hívj minket&nbsp;&nbsp;→",

      "hero.h1": "Nem csak<br><span class=\"pink\">kávé.</span>",
      "hero.sub": "Minőségi ízek, nyugodt pillanatok és egy találkozóhely Hegykő szívében.",

      "intro.eyebrow": "Minőség minden részletben",
      "intro.h2": "Minőségi ízek,<br><span class=\"pink\">közös pillanatok.</span>",
      "intro.p1": "Családi vállalkozásként hisszük, hogy a vendéglátás a személyes figyelemről és a részletekről szól.",
      "intro.p2": "A minőségi alapanyagok, az olasz Musetti kávé, a kiváló minőségű sütemények és a természetközeli, nyugodt környezet együtt teremtik meg azt a hangulatot, amely miatt jó visszatérni.",
      "intro.quote": "A legnagyobb elismerés számunkra, amikor vendégeink újra és újra visszatérnek.",

      "tt.eyebrow": "A Te ritmusodban",
      "tt.h2": "Lazuli <span class=\"pink\">minden alkalomra</span>",
      "card1.eyebrow": "Elvitelre",
      "card1.h": "Vidd haza az <span class=\"pink\">élményt</span>",
      "card1.body": "Egy gyors coffee to go, kedvenc süteményeid otthonra vagy egy torta különleges alkalmakra – számos finomságunk elvitelre és előrendelésre is kérhető.",
      "card1.li1": "kávé elvitelre",
      "card1.li2": "tortaszeletek elvitelre",
      "card1.li3": "tortarendelés",
      "card1.li4": "előrendelési lehetőség",
      "card2.eyebrow": "Helyben a legjobb",
      "card2.h": "Maradj a <span class=\"pink\">pillanatért</span>",
      "card2.body": "Nyugodt terasz, klimatizált belső tér és természetközeli környezet vár Hegykő egyik kedvelt találkozóhelyén.",
      "card2.li1": "tágas terasz",
      "card2.li2": "klimatizált belső tér",
      "card2.li3": "ingyenes parkolás",
      "card2.li4": "figyelmes kiszolgálás",

      "menu.eyebrow": "A kínálatból",
      "menu.h2": "<span class=\"pink\">Kedvencek</span><br>reggeltől estig",
      "menu.body": "Az állandó kedvencek mellett mindig találsz nálunk valami újat is – legyen szó szezonális finomságokról vagy helyi különlegességekről.",
      "cat1.name": "KÁVÉ", "cat1.desc": "Musetti kávék és kávékülönlegességek",
      "cat2.name": "SÜTI", "cat2.desc": "Minőségi sütemények és torták",
      "cat3.name": "MENTES SÜTI", "cat3.desc": "Csütörtöktől vasárnapig",
      "cat4.name": "REGGELI", "cat4.desc": "Frissen készített reggelik",
      "cat5.name": "BÁR", "cat5.desc": "Long drinkek, borok és röviditalok",

      "rev.eyebrow": "Ti mondtátok",
      "rev.h2": "Ilyen a <span class=\"pink\">Lazuli.</span>",
      "rev.q1": "„Fantasztikusan jó hely! Kedves és türelmes személyzet, kiszolgálás 5*, finom ízek, vizuális élmény tökéletes. <span class=\"pink\">Igazán vendégnek éreztük magunkat.</span>”",
      "rev.q2": "<span class=\"pink\">„Kiváló kávézó nagyszerű desszertekkel.</span> Nem volt könnyű választani. És a kávé annyira finom, hogy egy sem lesz elég. Kellemes kiszolgálás, szép kilátás. Nagyon kellemes ülőhelyek.”",

      "loc.eyebrow": "Gyere be",
      "loc.h2": "Hegykő szívében,<br><span class=\"pink\">minden nap.</span>",
      "loc.body": "Legyen a Lazuli a következő találkozásotok helyszíne – vagy egyszerűen csak egy nyugodt megálló a nap során.",
      "loc.hkey1": "HÉTFŐ — VASÁRNAP", "loc.hval1": "8:00 — 18:00",
      "loc.hkey2": "ASZTALFOGLALÁS", "loc.hval2": "ajánlott P-Szo",
      "loc.ckey1": "CÍM", "loc.cval1": "9437 Hegykő, Alsószer utca 18.",
      "loc.ckey2": "TELEFON", "loc.cval2": "+36 (30) 376 7800",
      "loc.ckey3": "EMAIL", "loc.cval3": "hegyko@lazuli.hu",

      "soc.eyebrow": "Kövess minket",
      "soc.h2": "Pillanatok a <span class=\"pink\">Lazuli café-ból.</span>",
      "soc.ig": "Instagram&nbsp;&nbsp;→",
      "soc.fb": "Facebook&nbsp;&nbsp;→",

      "world.eyebrow": "A Lazuli élmény",
      "world.h2": "Fedezd fel a <span class=\"pink\">Lazuli világát</span>",
      "world.apt.title": "Lazuli Apartment",
      "world.apt.body": "12 apartman Hegykőn, a termálfürdőtől öt perc sétára. Egy intelligens menedék, ahol a technológia a Te kényelmedért dolgozik.",
      "world.med.title": "Lazuli Med",
      "world.med.body": "Részletes állapotfelmérés és célzott terápiák. Akár gyors feltöltődés, akár hosszú távú egészségprogram a célod: szakértőink segítenek.",

      "foot.explore": "FELFEDEZÉS",
      "foot.l.apartman": "Apartman",
      "foot.l.longevity": "Longevity",
      "foot.l.location": "Helyszín",
      "foot.contact": "KAPCSOLAT",
      "foot.addr": "9437 Hegykő, Alsószer utca 18.",
      "foot.email": "hegyko@lazuli.hu",
      "foot.phone": "+36 (30) 376 7800",
      "foot.follow": "KÖVESS",
      "foot.routes": "Útvonaltervezés:",
      "foot.copyright": "© 2026 Lazuli Café · MINDEN JOG FENNTARTVA",
      "foot.privacy": "ADATVÉDELEM",
      "foot.terms": "ÁSZF"
    },

    en: {
      "nav.home": "home",
      "nav.menu": "menu",
      "nav.lazuli": "Lazuli",
      "nav.contact": "contact",
      "btn.book": "book a table",
      "btn.menu": "menu",
      "btn.call": "Call us&nbsp;&nbsp;→",

      "hero.h1": "More than<br><span class=\"pink\">coffee.</span>",
      "hero.sub": "Quality flavours, peaceful moments, and a place to come together in the heart of Hegykő.",

      "intro.eyebrow": "Quality in every detail",
      "intro.h2": "Quality flavours,<br><span class=\"pink\">shared moments.</span>",
      "intro.p1": "As a family business, we believe that hospitality is all about personal attention and attention to detail.",
      "intro.p2": "Premium ingredients, Italian Musetti coffee, high-quality pastries, and a peaceful setting close to nature come together to create an atmosphere guests love to return to.",
      "intro.quote": "The greatest compliment for us is when our guests return again and again.",

      "tt.eyebrow": "At your own rhythm",
      "tt.h2": "Lazuli <span class=\"pink\">for every occasion</span>",
      "card1.eyebrow": "Takeaway",
      "card1.h": "<span class=\"pink\">Take</span> the experience home",
      "card1.body": "Whether it is a quick coffee to go, your favourite pastries for home, or a cake for a special occasion, many of our delicacies are available for takeaway or pre-order.",
      "card1.li1": "Coffee to go",
      "card1.li2": "Pastries to take away",
      "card1.li3": "Cake orders",
      "card1.li4": "Pre-order available",
      "card2.eyebrow": "Best enjoyed here",
      "card2.h": "<span class=\"pink\">Stay</span> a little longer",
      "card2.body": "A spacious terrace, air-conditioned indoor seating, and a peaceful natural setting await you at one of Hegykő's favourite meeting places.",
      "card2.li1": "Spacious terrace",
      "card2.li2": "Air-conditioned interior",
      "card2.li3": "Free parking",
      "card2.li4": "Attentive service",

      "menu.eyebrow": "From our selection",
      "menu.h2": "<span class=\"pink\">Favourites</span><br>from morning to evening",
      "menu.body": "Alongside our beloved classics, you will always find something new – from seasonal treats to local specialities.",
      "cat1.name": "COFFEE", "cat1.desc": "Musetti coffee and coffee specialities",
      "cat2.name": "CAKES & PASTRIES", "cat2.desc": "Premium pastries and cakes",
      "cat3.name": "FREE-FROM TREATS", "cat3.desc": "Available from Thursday to Sunday",
      "cat4.name": "BREAKFAST", "cat4.desc": "Freshly prepared breakfasts",
      "cat5.name": "BAR", "cat5.desc": "Long drinks, wines and spirits",

      "rev.eyebrow": "What our guests say",
      "rev.h2": "This is <span class=\"pink\">Lazuli.</span>",
      "rev.q1": "„Fantastic place! Friendly and patient staff, five-star service, delicious flavours, and a perfect visual experience. <span class=\"pink\">We truly felt like valued guests.</span>”",
      "rev.q2": "<span class=\"pink\">„An excellent café with wonderful desserts.</span> It was not easy to choose. And the coffee is so delicious that one cup is simply not enough. Pleasant service, beautiful views, and very comfortable seating.”",

      "loc.eyebrow": "Visit us",
      "loc.h2": "<span class=\"pink\">Every day,</span><br>a moment to enjoy.",
      "loc.body": "Whether you are meeting friends, stopping by for a coffee, or simply taking a moment for yourself, you are warmly welcome at Lazuli every day.",
      "loc.hkey1": "MONDAY — SUNDAY", "loc.hval1": "8:00 AM – 6:00 PM",
      "loc.hkey2": "TABLE RESERVATION", "loc.hval2": "Recommended Fri–Sat",
      "loc.ckey1": "ADDRESS", "loc.cval1": "9437 Hegykő, Alsószer utca 18.",
      "loc.ckey2": "PHONE", "loc.cval2": "+36 (30) 376 7800",
      "loc.ckey3": "EMAIL", "loc.cval3": "hegyko@lazuli.hu",

      "soc.eyebrow": "Follow us",
      "soc.h2": "Moments from <span class=\"pink\">Lazuli Café.</span>",
      "soc.ig": "Instagram&nbsp;&nbsp;→",
      "soc.fb": "Facebook&nbsp;&nbsp;→",

      "world.eyebrow": "The Lazuli experience",
      "world.h2": "Discover the <span class=\"pink\">world of Lazuli.</span>",
      "world.apt.title": "Lazuli Apartment",
      "world.apt.body": "12 apartments in Hegykő, just a five-minute walk from the thermal spa. A smart retreat where technology works for your comfort.",
      "world.med.title": "Lazuli Med",
      "world.med.body": "Comprehensive health assessments and targeted therapies. Whether you're looking for a quick boost or a long-term health programme, our experts are here to guide you.",

      "foot.explore": "EXPLORE",
      "foot.l.apartman": "Apartment",
      "foot.l.longevity": "Longevity",
      "foot.l.location": "Location",
      "foot.contact": "CONTACT",
      "foot.addr": "9437 Hegykő, Alsószer utca 18.",
      "foot.email": "hegyko@lazuli.hu",
      "foot.phone": "+36 (30) 376 7800",
      "foot.follow": "FOLLOW",
      "foot.routes": "Directions:",
      "foot.copyright": "© 2026 Lazuli Café · ALL RIGHTS RESERVED",
      "foot.privacy": "PRIVACY",
      "foot.terms": "TERMS"
    },

    de: {
      "nav.home": "Startseite",
      "nav.menu": "Speisekarte",
      "nav.lazuli": "Lazuli",
      "nav.contact": "Kontakt",
      "btn.book": "Tisch reservieren",
      "btn.menu": "Speisekarte",
      "btn.call": "Rufen Sie uns an&nbsp;&nbsp;→",

      "hero.h1": "Mehr als nur<br><span class=\"pink\">Kaffee.</span>",
      "hero.sub": "Hochwertige Genussmomente, entspannte Augenblicke und ein Ort der Begegnung im Herzen von Hegykő.",

      "intro.eyebrow": "Qualität bis ins kleinste Detail",
      "intro.h2": "Hochwertiger Geschmack,<br><span class=\"pink\">gemeinsame Momente.</span>",
      "intro.p1": "Als Familienunternehmen sind wir überzeugt, dass Gastfreundschaft von persönlicher Aufmerksamkeit und Liebe zum Detail lebt.",
      "intro.p2": "Hochwertige Zutaten, italienischer Musetti-Kaffee, erstklassige Mehlspeisen sowie die naturnahe und ruhige Umgebung schaffen gemeinsam eine Atmosphäre, zu der man gerne zurückkehrt.",
      "intro.quote": "Die schönste Anerkennung für uns ist es, wenn unsere Gäste immer wieder den Weg zu uns finden.",

      "tt.eyebrow": "In Ihrem eigenen Rhythmus",
      "tt.h2": "Lazuli <span class=\"pink\">für jeden Anlass</span>",
      "card1.eyebrow": "Zum Mitnehmen",
      "card1.h": "<span class=\"pink\">Genuss</span> für zu Hause",
      "card1.body": "Ob ein schneller Coffee to go, Ihre Lieblingsmehlspeisen für zu Hause oder eine Torte für besondere Anlässe – viele unserer Köstlichkeiten sind auch zum Mitnehmen oder auf Vorbestellung erhältlich.",
      "card1.li1": "Kaffee zum Mitnehmen",
      "card1.li2": "Mehlspeisen zum Mitnehmen",
      "card1.li3": "Tortenbestellung",
      "card1.li4": "Vorbestellung möglich",
      "card2.eyebrow": "Am besten vor Ort",
      "card2.h": "<span class=\"pink\">Zeit</span> zum Verweilen",
      "card2.body": "Eine ruhige Terrasse, ein klimatisierter Innenbereich und eine naturnahe Umgebung erwarten Sie an einem beliebten Treffpunkt in Hegykő.",
      "card2.li1": "Großzügige Terrasse",
      "card2.li2": "Klimatisierter Innenbereich",
      "card2.li3": "Kostenlose Parkplätze",
      "card2.li4": "Aufmerksamer Service",

      "menu.eyebrow": "Aus unserem Angebot",
      "menu.h2": "<span class=\"pink\">Lieblinge</span><br>von morgens bis abends",
      "menu.body": "Neben unseren beliebten Klassikern finden Sie bei uns immer wieder Neues – von saisonalen Köstlichkeiten bis hin zu regionalen Spezialitäten.",
      "cat1.name": "KAFFEE", "cat1.desc": "Musetti-Kaffee und Kaffeespezialitäten",
      "cat2.name": "KUCHEN & TORTEN", "cat2.desc": "Hochwertige Mehlspeisen und Torten",
      "cat3.name": "ALTERNATIVE MEHLSPEISEN", "cat3.desc": "Von Donnerstag bis Sonntag",
      "cat4.name": "FRÜHSTÜCK", "cat4.desc": "Frisch zubereitete Frühstücksangebote",
      "cat5.name": "BAR", "cat5.desc": "Longdrinks, Weine und Spirituosen",

      "rev.eyebrow": "Das sagen unsere Gäste",
      "rev.h2": "So fühlt sich <span class=\"pink\">Lazuli</span> an.",
      "rev.q1": "„Ein fantastischer Ort! Freundliches und geduldiges Personal, erstklassiger Service, köstliche Geschmacksrichtungen und ein perfektes visuelles Erlebnis. <span class=\"pink\">Wir haben uns wirklich als willkommene Gäste gefühlt.</span>”",
      "rev.q2": "<span class=\"pink\">„Ein ausgezeichnetes Café mit hervorragenden Desserts.</span> Die Auswahl fiel uns nicht leicht. Und der Kaffee ist so gut, dass eine Tasse einfach nicht ausreicht. Freundlicher Service, schöne Aussicht und sehr angenehme Sitzmöglichkeiten.”",

      "loc.eyebrow": "Kommen Sie vorbei",
      "loc.h2": "Zeit für Genuss –<br><span class=\"pink\">jeden Tag</span>",
      "loc.body": "Machen Sie das Lazuli zu Ihrem nächsten Treffpunkt – oder gönnen Sie sich einfach eine entspannte Pause im Laufe des Tages.",
      "loc.hkey1": "MONTAG — SONNTAG", "loc.hval1": "8:00 – 18:00",
      "loc.hkey2": "TISCHRESERVIERUNG", "loc.hval2": "Fr–Sa empfohlen",
      "loc.ckey1": "ADRESSE", "loc.cval1": "9437 Hegykő, Alsószer utca 18.",
      "loc.ckey2": "TELEFON", "loc.cval2": "+36 (30) 376 7800",
      "loc.ckey3": "E-MAIL", "loc.cval3": "hegyko@lazuli.hu",

      "soc.eyebrow": "Folgen Sie uns",
      "soc.h2": "Momente aus dem <span class=\"pink\">Lazuli Café.</span>",
      "soc.ig": "Instagram&nbsp;&nbsp;→",
      "soc.fb": "Facebook&nbsp;&nbsp;→",

      "world.eyebrow": "Das Lazuli-Erlebnis",
      "world.h2": "Entdecken Sie die <span class=\"pink\">Welt von Lazuli.</span>",
      "world.apt.title": "Lazuli Apartment",
      "world.apt.body": "12 Apartments in Hegykő, nur fünf Gehminuten vom Thermalbad entfernt. Ein smartes Refugium, in dem Technologie für Ihren Komfort arbeitet.",
      "world.med.title": "Lazuli Med",
      "world.med.body": "Umfassende Gesundheitsanalysen und gezielte Therapien. Ob Sie eine schnelle Regeneration oder ein langfristiges Gesundheitsprogramm suchen – unsere Expert:innen begleiten Sie.",

      "foot.explore": "ENTDECKEN",
      "foot.l.apartman": "Apartment",
      "foot.l.longevity": "Longevity",
      "foot.l.location": "Standort",
      "foot.contact": "KONTAKT",
      "foot.addr": "9437 Hegykő, Alsószer utca 18.",
      "foot.email": "hegyko@lazuli.hu",
      "foot.phone": "+36 (30) 376 7800",
      "foot.follow": "FOLGEN",
      "foot.routes": "Routenplanung:",
      "foot.copyright": "© 2026 Lazuli Café · ALLE RECHTE VORBEHALTEN",
      "foot.privacy": "DATENSCHUTZ",
      "foot.terms": "AGB"
    }
  };

  var LANGS = ["hu", "en", "de"];

  function applyLang(lang) {
    if (!T[lang]) lang = "hu";
    var dict = T[lang];
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll(".lang-flag").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });
    try { localStorage.setItem("lazuli-lang", lang); } catch (e) {}
  }

  function init() {
    var saved = "hu";
    try { saved = localStorage.getItem("lazuli-lang") || "hu"; } catch (e) {}
    if (LANGS.indexOf(saved) < 0) saved = "hu";
    applyLang(saved);
    document.querySelectorAll(".lang-flag").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
