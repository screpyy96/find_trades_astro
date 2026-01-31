/**
 * SEO Content pentru toate categoriile de servicii
 * Fiecare categorie are content unic pentru ranking maxim
 */

export interface CategoryData {
  slug: string;
  name: string;
  h1: string;
  description: string;
  keywords: string[];
  stats: { cereriLuna: number; meseriasi: number };
  topServices: { slug: string; name: string; pret: string }[];
  trends: string[];
  faq: { q: string; a: string }[];
  ghidRapid?: string;
}

export const categories: CategoryData[] = [
  // ============================================
  // AMENAJĂRI INTERIOARE (14 servicii)
  // ============================================
  {
    slug: "amenajari-interioare",
    name: "Amenajări Interioare",
    h1: "Amenajări Interioare România – Zugrăveli, Gresie, Parchet, Rigips",
    description: "Găsește meseriași verificați pentru amenajări interioare în orașul tău. Zugrăveli lavabil, montaj gresie faianță, parchet laminat masiv, rigips compartimentări – oferte gratuite în 24h, fără comisioane.",
    keywords: ["zugrăveli lavabil", "montaj gresie faianță", "parchet laminat", "rigips compartimentări", "gletuire pereți", "montaj uși interior"],
    stats: { cereriLuna: 2400, meseriasi: 320 },
    topServices: [
      { slug: "zugraveli-vopsitorii", name: "Zugrăveli și Vopsitorii", pret: "18-28 RON/mp" },
      { slug: "montaj-gresie-faianta-piatra", name: "Montaj Gresie Faianță", pret: "55-90 RON/mp" },
      { slug: "montaj-reconditionare-parchet", name: "Montaj Parchet Masiv", pret: "35-60 RON/mp" },
      { slug: "montaj-rigips-compartimentari", name: "Montaj Rigips", pret: "45-75 RON/mp" },
      { slug: "gletuire-finisare-pereti", name: "Gletuire Pereți", pret: "25-40 RON/mp" },
      { slug: "montaj-usi-interior", name: "Montaj Uși Interior", pret: "150-300 RON/buc" }
    ],
    trends: [
      "Vopsea lavabilă ecologică low-VOC (+35% cereri în 2025)",
      "Parchet vinil SPC rezistent la apă pentru băi și bucătării",
      "Rigips acustic pentru apartamente bloc – izolare fonică",
      "Gresie porțelanată mare format 60x120cm, 80x80cm",
      "Microciment decorativ pentru pereți și podele"
    ],
    faq: [
      { q: "Cât costă zugrav lavabil în România 2026?", a: "18-28 RON/mp pentru lavabil standard cu pompă airless. Vopsea decorativă sau texturată: 30-50 RON/mp. Prețul include manoperă, grund și 2 straturi vopsea." },
      { q: "Cât durează montaj gresie apartament 50mp?", a: "3-5 zile lucrătoare pentru montaj complet. Include pregătire suprafață, montaj, rostuire și curățare. Timpul variază în funcție de complexitate și format gresie." },
      { q: "Ce include prețul montaj parchet laminat?", a: "Montaj parchet, folie antifonică, plinte și finisaje la praguri. Nivelarea suprafeței se taxează separat (15-25 RON/mp). Materialul parchet NU e inclus." },
      { q: "Rigips sau BCA pentru compartimentări?", a: "Rigips: mai rapid, mai ușor, ideal pentru apartamente. BCA: mai rezistent, izolație termică mai bună, recomandat pentru case. Rigips costă 45-75 RON/mp, BCA 80-120 RON/mp." }
    ],
    ghidRapid: "Renovare apartament 2 camere (50mp): zugrav 1500-2000 RON + gresie baie 2000-3000 RON + parchet 2500-3500 RON. Total estimativ: 8.000-15.000 RON fără materiale."
  },

  // ============================================
  // INSTALAȚII & UTILITĂȚI (13 servicii)
  // ============================================
  {
    slug: "instalatii-utilitati",
    name: "Instalații & Utilități",
    h1: "Instalații România – Sanitare, Electrice, Termice, Aer Condiționat",
    description: "Găsește instalatori autorizați pentru instalații sanitare, electrice, termice, gaz și aer condiționat. Meseriași verificați ANRE/ISCIR, oferte gratuite în 24h în toată România.",
    keywords: ["instalator sanitar", "electrician autorizat", "montaj aer condiționat", "centrală termică", "panouri fotovoltaice", "instalații gaz"],
    stats: { cereriLuna: 1850, meseriasi: 280 },
    topServices: [
      { slug: "instalatii-sanitare", name: "Instalații Sanitare", pret: "150-350 RON/punct" },
      { slug: "instalatii-electrice", name: "Instalații Electrice", pret: "80-180 RON/punct" },
      { slug: "montaj-ac-ventilatie", name: "Montaj Aer Condiționat", pret: "250-500 RON/unitate" },
      { slug: "instalatii-termice", name: "Instalații Termice", pret: "200-450 RON/calorifer" },
      { slug: "instalatii-gaz", name: "Instalații Gaz", pret: "350-600 RON/aparat" },
      { slug: "instalare-panouri-solare-fotovoltaice", name: "Panouri Fotovoltaice", pret: "800-1200 EUR/kWp" }
    ],
    trends: [
      "Pompe de căldură aer-apă (+60% cereri) – eficiență COP 4-5",
      "Panouri fotovoltaice cu stocare baterii LiFePO4",
      "Smart home KNX/Zigbee – automatizări integrate",
      "Centrale termice în condensație clasa A+++",
      "Încălzire în pardoseală electrică pentru băi"
    ],
    faq: [
      { q: "Cât costă instalator sanitar punct complet?", a: "150-350 RON/punct sanitar (chiuvetă, WC, cadă). Include racordare apă caldă/rece, canalizare, montaj obiect sanitar. Materialele (țevi, fitinguri) se plătesc separat." },
      { q: "Cât costă montaj aer condiționat 12000 BTU?", a: "250-500 RON manoperă + 1500-3000 RON aparatul. Include montaj unități, traseu frigorific până la 3m, vacuum și încărcare freon. Traseu suplimentar: 80-120 RON/ml." },
      { q: "Ce autorizații trebuie pentru instalații gaz?", a: "Instalatorul TREBUIE să fie autorizat ANRE. Verifică legitimația! După montaj, e obligatorie verificarea de către distribuitorul de gaz și obținerea acordului de funcționare." },
      { q: "Merită panouri fotovoltaice în România?", a: "DA! ROI în 5-7 ani. Sistem 5kWp: 4000-6000 EUR. Producție medie: 5500-6500 kWh/an. Economie: 800-1200 EUR/an la factură. Plus programul Casa Verde cu finanțare 90%." }
    ],
    ghidRapid: "Instalație completă apartament 3 camere: sanitare 3000-5000 RON + electrice 2500-4000 RON + termice 4000-6000 RON. Total: 10.000-15.000 RON fără materiale."
  },

  // ============================================
  // CONSTRUCȚII & STRUCTURI (15 servicii)
  // ============================================
  {
    slug: "constructii-structuri",
    name: "Construcții & Structuri",
    h1: "Construcții România – Case la Roșu, Fundații, Acoperișuri, Zidărie",
    description: "Găsește constructori verificați pentru case la roșu/cheie, fundații, acoperișuri, zidărie și tencuială. Echipe profesioniste cu experiență, oferte gratuite în toată România.",
    keywords: ["construcții case", "fundații beton", "acoperiș țiglă", "zidărie BCA", "tencuială", "izolații termice"],
    stats: { cereriLuna: 980, meseriasi: 185 },
    topServices: [
      { slug: "constructii-case", name: "Construcții Case la Roșu", pret: "350-500 EUR/mp" },
      { slug: "zidarie-tencuiala", name: "Zidărie și Tencuială", pret: "80-150 RON/mp" },
      { slug: "montaj-acoperisuri-pluviale", name: "Montaj Acoperișuri", pret: "120-220 RON/mp" },
      { slug: "realizare-fundatii", name: "Realizare Fundații", pret: "250-450 RON/mp" },
      { slug: "izolatii-cladiri", name: "Izolații Termice", pret: "80-150 RON/mp" },
      { slug: "turnare-beton-sape", name: "Turnare Beton/Șape", pret: "45-80 RON/mp" }
    ],
    trends: [
      "Case pasive nZEB – consum energie aproape zero",
      "Construcții din CLT (lemn lamelar încrucișat)",
      "Izolații vată bazaltică 15-20cm grosime",
      "Fundații cu radier termoizolat",
      "Acoperișuri verzi și panouri solare integrate"
    ],
    faq: [
      { q: "Cât costă construcție casă la roșu 2025?", a: "350-500 EUR/mp pentru structură completă: fundație, zidărie BCA/cărămidă, planșeu, acoperiș cu învelitoare, tâmplărie exterioară. Casă 120mp la roșu: 42.000-60.000 EUR." },
      { q: "Cât durează construcția unei case?", a: "La roșu: 3-5 luni. La cheie: 8-14 luni. Depinde de complexitate, vreme și disponibilitatea materialelor. Recomandăm start primăvara pentru finalizare înainte de iarnă." },
      { q: "Ce include prețul casă la roșu?", a: "Fundație, structură rezistență, zidărie, planșee, scară interioară, acoperiș complet cu învelitoare, tâmplărie exterioară (ferestre, uși). NU include: finisaje, instalații, amenajări." },
      { q: "BCA sau cărămidă pentru zidărie?", a: "BCA: izolație termică excelentă, ușor de prelucrat, construcție rapidă. Cărămidă: rezistență mecanică superioară, inerție termică. Pentru case: BCA 25-30cm + termoizolație. Preț similar: 80-120 RON/mp." }
    ],
    ghidRapid: "Casă 150mp la cheie: 90.000-150.000 EUR total. La roșu: 55.000-75.000 EUR. Finisaje standard: 35.000-50.000 EUR. Instalații complete: 15.000-25.000 EUR."
  },

  // ============================================
  // AMENAJĂRI EXTERIOARE & GRĂDINĂ (12 servicii)
  // ============================================
  {
    slug: "amenajari-exterioare-gradina",
    name: "Amenajări Exterioare & Grădină",
    h1: "Amenajări Exterioare România – Pavaje, Garduri, Piscine, Grădinărit",
    description: "Găsește meseriași pentru amenajări exterioare: pavaje curte, garduri și porți, piscine, grădinărit profesional. Oferte gratuite în 24h pentru proiecte de orice dimensiune.",
    keywords: ["pavaj curte", "gard plasă bordurată", "piscină", "grădinărit", "terasă lemn", "irigații automate"],
    stats: { cereriLuna: 720, meseriasi: 135 },
    topServices: [
      { slug: "montaj-pavaje", name: "Montaj Pavaje Curte", pret: "80-160 RON/mp" },
      { slug: "constructie-garduri-porti", name: "Garduri și Porți", pret: "200-450 RON/ml" },
      { slug: "amenajari-gradina", name: "Amenajări Grădină", pret: "50-120 RON/mp" },
      { slug: "constructie-terase-foisoare", name: "Terase și Foisoare", pret: "350-700 RON/mp" },
      { slug: "constructie-piscine", name: "Construcție Piscine", pret: "800-1500 EUR/mp" },
      { slug: "instalare-irigatii", name: "Sisteme Irigații", pret: "15-30 RON/mp" }
    ],
    trends: [
      "Pavaje ecologice permeabile – drenaj natural",
      "Garduri gabion cu piatră decorativă",
      "Piscine naturale fără clor",
      "Grădini verticale și acoperișuri verzi",
      "Irigații smart cu senzori de umiditate"
    ],
    faq: [
      { q: "Cât costă pavaj curte 100mp?", a: "8.000-16.000 RON manoperă (80-160 RON/mp). Include: excavare 15-20cm, strat nisip compactat, montaj pavaj, rostuire. Pavajul: 35-80 RON/mp separat. Borduri: 25-40 RON/ml." },
      { q: "Cât costă gard plasă bordurată complet?", a: "150-250 RON/ml pentru gard 1.5-2m înălțime. Include: stâlpi metalici la 2.5m, plasă bordurată, montaj în beton. Poartă pietonală: 800-1500 RON. Poartă auto: 2000-4000 RON." },
      { q: "Cât costă piscină 8x4m?", a: "25.000-50.000 EUR pentru piscină completă: excavare, structură beton, hidroizolație, liner/mozaic, sistem filtrare, pompă, scară. Întreținere anuală: 500-1000 EUR." },
      { q: "Ce include amenajare grădină?", a: "Design peisagistic, pregătire teren, gazon rulou/semănat, plante ornamentale, sistem irigații, iluminat exterior, alei decorative. Preț: 50-120 RON/mp în funcție de complexitate." }
    ],
    ghidRapid: "Amenajare curte 200mp: pavaj 16.000-32.000 RON + gard 50ml 10.000-15.000 RON + gazon 4.000-8.000 RON + irigații 3.000-6.000 RON. Total: 35.000-60.000 RON."
  },

  // ============================================
  // TÂMPLĂRIE & MOBILIER (8 servicii)
  // ============================================
  {
    slug: "tamplarie-mobilier",
    name: "Tâmplărie & Mobilier",
    h1: "Tâmplărie România – Mobilier la Comandă, Termopan, Uși, Jaluzele",
    description: "Găsește tâmplari verificați pentru mobilier la comandă, montaj termopan, uși interior/exterior, jaluzele și rulouri. Oferte gratuite de la meșteri cu experiență.",
    keywords: ["mobilier la comandă", "montaj termopan", "uși interior", "jaluzele", "tâmplărie PVC", "dulap dormitor"],
    stats: { cereriLuna: 650, meseriasi: 120 },
    topServices: [
      { slug: "mobilier-la-comanda", name: "Mobilier la Comandă", pret: "400-900 EUR/corp" },
      { slug: "montaj-termopan", name: "Montaj Termopan", pret: "50-120 RON/buc" },
      { slug: "montaj-mobilier", name: "Montaj Mobilier", pret: "80-200 RON/corp" },
      { slug: "montaj-jaluzele-rulouri", name: "Montaj Jaluzele", pret: "40-100 RON/buc" },
      { slug: "tamplarie-pvc-aluminiu-lemn", name: "Tâmplărie PVC/Aluminiu", pret: "180-350 EUR/mp" },
      { slug: "tapiterie-reconditionare", name: "Tapițerie Mobilier", pret: "300-800 RON/canapea" }
    ],
    trends: [
      "Mobilier PAL Egger/Kronospan cu cant ABS 2mm",
      "Ferestre triple vitraj cu coeficient U<0.8",
      "Uși glisante în perete (casete Eclisse)",
      "Rulouri exterioare cu comandă smart",
      "Fronturi MDF vopsit mat – tendință premium"
    ],
    faq: [
      { q: "Cât costă bucătărie la comandă?", a: "2.500-6.000 EUR pentru bucătărie 3ml completă. Include: corpuri PAL 18mm, fronturi MDF/PAL melaminat, blat, montaj. Electrocasnice și chiuvetă separat. Premium cu fronturi vopsite: 5.000-10.000 EUR." },
      { q: "Cât costă înlocuire termopan apartament?", a: "Ferestre PVC 5 camere: 180-280 EUR/mp. Apartament 3 camere (8-10 ferestre): 3.000-5.000 EUR cu montaj. Include: demontare vechi, montaj, spumă, finisaje. Geam triplu: +20-30%." },
      { q: "Cât durează mobilier bucătărie la comandă?", a: "Producție: 2-4 săptămâni. Montaj: 1-3 zile. Total: 3-5 săptămâni de la comandă. Recomandăm să comanzi cu 1-2 luni înainte de mutare." },
      { q: "PAL sau MDF pentru mobilier?", a: "PAL melaminat: economic, rezistent, ideal pentru corpuri. MDF: fronturi vopsite, forme curbate, aspect premium. Recomandare: corpuri PAL 18mm + fronturi MDF vopsit sau PAL mat." }
    ],
    ghidRapid: "Mobilier apartament 2 camere: bucătărie 3.500 EUR + dormitor dulap 1.500 EUR + baie 800 EUR + living 1.200 EUR. Total: 7.000-10.000 EUR."
  },

  // ============================================
  // CURĂȚENIE & IGIENIZARE (7 servicii)
  // ============================================
  {
    slug: "curatenie-igienizare",
    name: "Curățenie & Igienizare",
    h1: "Curățenie Profesională România – DDD, După Constructor, Tapițerii",
    description: "Servicii de curățenie profesională, dezinsecție deratizare dezinfecție (DDD), curățenie după constructor, curățare tapițerii. Echipe verificate, oferte gratuite.",
    keywords: ["curățenie profesională", "DDD dezinsecție", "curățenie după renovare", "curățare canapele", "igienizare", "deratizare"],
    stats: { cereriLuna: 890, meseriasi: 145 },
    topServices: [
      { slug: "curatenie-generala", name: "Curățenie Generală", pret: "12-22 RON/mp" },
      { slug: "curatenie-dupa-constructor", name: "După Constructor", pret: "18-35 RON/mp" },
      { slug: "servicii-ddd", name: "Servicii DDD", pret: "120-280 RON/cameră" },
      { slug: "curatare-tapiterii", name: "Curățare Tapițerii", pret: "80-180 RON/canapea" },
      { slug: "spalare-fatade", name: "Spălare Fațade", pret: "8-18 RON/mp" },
      { slug: "igienizare-climatizare", name: "Igienizare AC", pret: "100-200 RON/unitate" }
    ],
    trends: [
      "Curățenie eco-friendly cu produse biodegradabile",
      "Dezinfecție cu ozon și UV-C",
      "Servicii recurente cu abonament lunar",
      "Curățenie industrială cu echipamente profesionale",
      "Steam cleaning pentru tapițerii și covoare"
    ],
    faq: [
      { q: "Cât costă curățenie apartament 2 camere?", a: "Curățenie generală: 150-250 RON (2-3 ore). După constructor/renovare: 300-500 RON (4-6 ore). Include: praf, aspirat, spălat podele, băi, bucătărie, geamuri interior." },
      { q: "Cât costă dezinsecție apartament?", a: "120-280 RON/cameră pentru tratament complet. Gândaci: 150-250 RON apt 2 camere. Ploșnițe: 300-500 RON (tratament repetat). Efect în 24-48h, garanție 30-90 zile." },
      { q: "Cât durează curățenie după constructor?", a: "Apartament 50mp: 4-6 ore cu echipă 2 persoane. Include: îndepărtare praf fin, curățare urme var/vopsea, geamuri, sanitare, podele. Recomandăm 2-3 zile după finalizare lucrări." },
      { q: "Cum aleg firmă curățenie de încredere?", a: "Verifică: recenzii reale, asigurare de răspundere, echipamente profesionale, produse de calitate. Pe Meserias Local toate firmele sunt verificate cu identitate și referințe confirmate." }
    ],
    ghidRapid: "Curățenie completă apartament nou: după constructor 400 RON + geamuri 150 RON + igienizare AC 150 RON. Total: 700-1000 RON."
  },

  // ============================================
  // SECURITATE & SIGURANȚĂ (7 servicii)
  // ============================================
  {
    slug: "securitate-siguranta",
    name: "Securitate & Siguranță",
    h1: "Securitate România – Alarme, Camere Supraveghere, Interfoane, CCTV",
    description: "Montaj sisteme de securitate: alarme antiefracție, camere supraveghere CCTV, videointerfoane, detectoare incendiu. Instalatori autorizați, oferte gratuite.",
    keywords: ["sistem alarmă", "camere supraveghere", "videointerfon", "CCTV", "detectoare incendiu", "securitate casă"],
    stats: { cereriLuna: 420, meseriasi: 75 },
    topServices: [
      { slug: "instalare-sisteme-alarma", name: "Sisteme Alarmă", pret: "800-2500 RON" },
      { slug: "instalare-camere-supraveghere", name: "Camere CCTV", pret: "200-450 RON/cameră" },
      { slug: "montaj-interfoane", name: "Videointerfoane", pret: "400-900 RON" },
      { slug: "instalare-detectie-incendiu", name: "Detectoare Incendiu", pret: "80-180 RON/buc" },
      { slug: "gratii-securitate", name: "Gratii Securitate", pret: "250-500 RON/mp" },
      { slug: "supraveghere-video-intretinere", name: "Întreținere CCTV", pret: "150-300 RON/vizită" }
    ],
    trends: [
      "Camere IP 4K wireless cu AI detection",
      "Alarme smart cu notificări pe telefon",
      "Videointerfoane HD cu deblocare remotă",
      "Integrare completă smart home",
      "Stocare cloud pentru înregistrări"
    ],
    faq: [
      { q: "Cât costă sistem supraveghere casă 4 camere?", a: "1.500-3.500 RON complet: 4 camere 2-4MP, DVR/NVR, HDD 1TB, cabluri, montaj. Camere IP wireless: +30%. Stocare cloud: 50-150 RON/lună. Vizualizare pe telefon inclusă." },
      { q: "Cât costă sistem alarmă apartament?", a: "800-2.000 RON pentru kit complet: centrală, 2-3 senzori mișcare, 1-2 contacte magnetice, sirenă, tastatură. Monitorizare dispecerat: 50-100 RON/lună opțional." },
      { q: "Ce camere recomandați pentru exterior?", a: "Camere IP 4MP cu IR 30-50m, IP66 rezistente intemperii. Dome pentru interior, bullet pentru exterior. Unghi 90-120°. Marcă: Hikvision, Dahua, Reolink. Buget: 300-600 RON/cameră." },
      { q: "Merită monitorizare la dispecerat?", a: "DA pentru case/vile. Intervenție rapidă 5-15 min, verificare alarme false, contact autorități. Cost: 50-150 RON/lună. Pentru apartamente bloc: opțional, alarma locală e suficientă." }
    ],
    ghidRapid: "Securitate casă completă: 4 camere CCTV 2.500 RON + alarmă 1.500 RON + videointerfon 700 RON. Total: 4.500-6.000 RON."
  },

  // ============================================
  // REPARAȚII DIVERSE (6 servicii)
  // ============================================
  {
    slug: "reparatii-diverse",
    name: "Reparații Diverse",
    h1: "Reparații România – Electrocasnice, Centrale Termice, Acoperișuri",
    description: "Servicii de reparații: electrocasnice mari, centrale termice, acoperișuri, ferestre termopan, jaluzele. Meseriași cu experiență, intervenție rapidă.",
    keywords: ["reparații electrocasnice", "service centrală termică", "reparații acoperiș", "reparații termopan", "reparații jaluzele"],
    stats: { cereriLuna: 580, meseriasi: 95 },
    topServices: [
      { slug: "reparatii-electrocasnice", name: "Reparații Electrocasnice", pret: "100-350 RON" },
      { slug: "reparatii-centrale-termice", name: "Service Centrale", pret: "150-450 RON" },
      { slug: "reparatii-acoperisuri", name: "Reparații Acoperișuri", pret: "50-150 RON/mp" },
      { slug: "reparatii-ferestre-usi", name: "Reparații Termopan", pret: "80-250 RON" },
      { slug: "reparatii-jaluzele-rulouri", name: "Reparații Jaluzele", pret: "50-180 RON" },
      { slug: "reparatii-electronice", name: "Reparații TV/Audio", pret: "100-300 RON" }
    ],
    trends: [
      "Reparații eco vs înlocuire – economie circulară",
      "Service la domiciliu în aceeași zi",
      "Piese originale cu garanție",
      "Diagnoză gratuită la unele servicii",
      "Reparații urgente în 2-4 ore"
    ],
    faq: [
      { q: "Cât costă reparație mașină de spălat?", a: "100-350 RON manoperă + piese. Pompă evacuare: 150-250 RON. Rezistență: 200-350 RON. Rulmenți: 250-400 RON. Diagnoză: 50-100 RON (se scade din reparație)." },
      { q: "Merită reparat sau cumpăr nou?", a: "Regulă: dacă reparația > 50% din prețul nou, înlocuiește. Excepție: electrocasnice premium (Miele, Bosch) – merită reparat până la 70%. Verifică și vârsta: >10 ani = înlocuire." },
      { q: "Cât costă revizie centrală termică?", a: "150-300 RON revizie anuală obligatorie. Include: curățare arzător, verificare tiraj, control etanșeitate, reglaje. Reparații: 200-600 RON în funcție de defect. Schimb plăci: 400-800 RON." },
      { q: "Cât durează reparație acoperiș infiltrații?", a: "Intervenție urgentă: 2-4 ore pentru oprire infiltrație. Reparație definitivă: 1-3 zile. Preț: 50-150 RON/mp în funcție de tip învelitoare și accesibilitate." }
    ],
    ghidRapid: "Buget anual întreținere casă: revizie centrală 250 RON + curățare AC 150 RON + verificări electrice 200 RON. Total: 600-800 RON/an."
  },

  // ============================================
  // SERVICII DE URGENȚĂ (4 servicii)
  // ============================================
  {
    slug: "servicii-de-urgenta",
    name: "Servicii de Urgență",
    h1: "Urgențe România – Instalator Non-Stop, Electrician 24/7, Lăcătuș",
    description: "Servicii de urgență disponibile 24/7: instalator pentru inundații, electrician pentru pană curent, lăcătuș deblocări uși. Intervenție rapidă în 1-2 ore.",
    keywords: ["instalator urgență", "electrician non-stop", "lăcătuș deblocări", "urgențe 24/7", "intervenție rapidă"],
    stats: { cereriLuna: 480, meseriasi: 85 },
    topServices: [
      { slug: "instalator-urgente", name: "Instalator Urgențe", pret: "200-500 RON" },
      { slug: "electrician-urgente", name: "Electrician Urgențe", pret: "150-400 RON" },
      { slug: "lacatus-deblocari-usi", name: "Lăcătuș Deblocări", pret: "100-350 RON" },
      { slug: "reparatii-urgente-acoperis", name: "Urgențe Acoperiș", pret: "250-600 RON" }
    ],
    trends: [
      "Servicii garantate 24/7/365",
      "Intervenție sub 2 ore în orașe mari",
      "Plată doar după rezolvare",
      "Echipamente profesionale mobile",
      "Comunicare în timp real cu clientul"
    ],
    faq: [
      { q: "Cât costă instalator de urgență noaptea?", a: "200-500 RON, tarif majorat 50-100% față de program normal. Include deplasare și intervenție de bază. Materiale/piese separat. Disponibil 24/7 inclusiv weekend și sărbători." },
      { q: "Cât durează deblocarea unei uși?", a: "15-45 minute în funcție de tip încuietoare. Yală simplă: 15-20 min. Broască multipunct: 30-45 min. Preț: 100-350 RON. Dacă trebuie spartă/înlocuită: +200-500 RON." },
      { q: "Ce fac în caz de inundație apartament?", a: "1) Închide robinetul general. 2) Oprește curentul în zona afectată. 3) Sună instalator urgență. 4) Anunță vecinii de jos. 5) Documentează cu poze pentru asigurare." },
      { q: "Electrician urgență pentru pană curent?", a: "150-400 RON intervenție. Verificare tablou, siguranțe, identificare scurtcircuit. Timp răspuns: 1-2 ore în orașe mari. Disponibil 24/7. Reparații complexe se programează ulterior." }
    ],
    ghidRapid: "Numere utile urgențe: 112 (general), Distrigaz (gaz), Enel/Electrica (curent). Pentru instalator/electrician privat: Meserias Local – răspuns în 1-2 ore."
  },

  // ============================================
  // SERVICII SPECIALIZATE & CONSULTANȚĂ (6 servicii)
  // ============================================
  {
    slug: "servicii-specializate-consultanta",
    name: "Servicii Specializate & Consultanță",
    h1: "Consultanță Construcții România – Arhitectură, Design Interior, Topografie",
    description: "Servicii profesionale de proiectare, arhitectură, design interior, consultanță construcții și dirigentie de șantier. Experți autorizați pentru proiecte rezidențiale și comerciale.",
    keywords: ["arhitect", "design interior", "proiectare casă", "diriginte șantier", "topografie cadastru", "audit energetic"],
    stats: { cereriLuna: 320, meseriasi: 65 },
    topServices: [
      { slug: "proiectare-arhitectura", name: "Proiectare și Arhitectură", pret: "15-40 EUR/mp" },
      { slug: "design-interior-decor", name: "Design Interior", pret: "20-60 EUR/mp" },
      { slug: "consultanta-dirigentie", name: "Dirigentie Șantier", pret: "3-5% din valoare" },
      { slug: "servicii-topografie-cadastru", name: "Topografie și Cadastru", pret: "500-1500 RON" },
      { slug: "expertize-audit", name: "Expertize și Audit Energetic", pret: "800-2500 RON" },
      { slug: "randari-3d", name: "Randări 3D", pret: "150-500 EUR/proiect" }
    ],
    trends: [
      "Proiectare BIM (Building Information Modeling)",
      "Case pasive și nZEB – certificare obligatorie",
      "Design biophilic – natură în interior",
      "Consultanță pentru fonduri Casa Verde/AFM",
      "Scanare 3D pentru renovări și cadastru"
    ],
    faq: [
      { q: "Cât costă proiect casă completă?", a: "15-40 EUR/mp pentru proiect complet: arhitectură, structură, instalații. Casă 150mp: 2.500-6.000 EUR. Include: DTAC pentru autorizație, proiect tehnic execuție, detalii. Avize separat: 500-1500 EUR." },
      { q: "Ce face un diriginte de șantier?", a: "Supraveghează execuția conform proiectului, verifică calitatea lucrărilor, semnează procese verbale, reprezintă beneficiarul. Obligatoriu pentru autorizație de construire. Cost: 3-5% din valoarea lucrării." },
      { q: "Cât costă certificat energetic apartament?", a: "300-600 RON pentru apartament. Obligatoriu la vânzare/închiriere. Valabil 10 ani. Include: audit energetic, calcul consum, recomandări eficientizare. Casă: 500-1000 RON." },
      { q: "Cât durează un proiect de arhitectură?", a: "Concept: 2-4 săptămâni. Proiect complet: 2-4 luni. DTAC pentru autorizație: 1-2 luni. Recomandăm să începi proiectarea cu 6 luni înainte de construcție pentru avize și autorizații." }
    ],
    ghidRapid: "Buget proiectare casă 150mp: arhitectură 3.000 EUR + structură 1.500 EUR + instalații 1.000 EUR + avize 1.000 EUR. Total: 6.500-8.000 EUR."
  },

  // ============================================
  // AUTO & UTILAJE (3 servicii)
  // ============================================
  {
    slug: "auto-utilaje",
    name: "Auto & Utilaje",
    h1: "Servicii Auto România – Mecanică, Detailing, Vulcanizare, Tractări",
    description: "Servicii auto profesionale: reparații mecanice, detailing și cosmetică auto, vulcanizare și tractări. Mecanici cu experiență, prețuri corecte.",
    keywords: ["mecanic auto", "detailing auto", "vulcanizare", "tractări auto", "service auto", "spălătorie auto"],
    stats: { cereriLuna: 280, meseriasi: 55 },
    topServices: [
      { slug: "reparatii-mecanica-auto", name: "Reparații Mecanică Auto", pret: "100-300 RON/oră" },
      { slug: "detailing-auto", name: "Detailing Auto", pret: "300-1500 RON" },
      { slug: "vulcanizare-tractari", name: "Vulcanizare și Tractări", pret: "50-500 RON" }
    ],
    trends: [
      "Detailing ceramic coating – protecție 2-5 ani",
      "Diagnoză computerizată avansată",
      "Service mașini electrice și hibride",
      "Vulcanizare mobilă la domiciliu",
      "Tractări cu platformă pentru mașini joase"
    ],
    faq: [
      { q: "Cât costă detailing auto complet?", a: "300-800 RON detailing interior+exterior standard. Premium cu polish și ceramic: 800-1500 RON. Include: spălare, decontaminare, polish, protecție. Durata: 4-8 ore." },
      { q: "Cât costă schimb distribuție?", a: "800-2500 RON manoperă în funcție de model. Kit distribuție: 400-1500 RON. Total: 1200-4000 RON. Interval recomandat: 90.000-150.000 km sau 5-7 ani." },
      { q: "Cât costă tractare auto?", a: "150-300 RON în oraș (până la 10km). 3-5 RON/km extra. Tractare platformă: +50-100 RON. Disponibil 24/7. Asigurarea CASCO poate acoperi costul." },
      { q: "Merită ceramic coating?", a: "DA pentru mașini noi sau recent vopsite. Protecție 2-5 ani, hidrofob, rezistent la zgârieturi minore. Cost: 800-2000 RON. Economisești la spălătorii și polish-uri ulterioare." }
    ],
    ghidRapid: "Revizie anuală completă: ulei+filtre 400-800 RON + frâne verificare 100 RON + geometrie 150 RON + ITP 150 RON. Total: 800-1200 RON."
  },

  // ============================================
  // ALTE SERVICII (3 servicii)
  // ============================================
  {
    slug: "alte-servicii",
    name: "Alte Servicii",
    h1: "Servicii Diverse România – Mutări, Transport, Sudură, Evacuare Moloz",
    description: "Servicii diverse pentru casă și construcții: mutări și transport mobilă, evacuare moloz și deșeuri, servicii de sudură. Echipe profesioniste, prețuri corecte.",
    keywords: ["mutări mobilă", "transport marfă", "evacuare moloz", "sudură", "deșeuri construcții", "relocare"],
    stats: { cereriLuna: 350, meseriasi: 70 },
    topServices: [
      { slug: "mutari-transport", name: "Mutări și Transport", pret: "200-800 RON" },
      { slug: "evacuare-moloz", name: "Evacuare Moloz", pret: "150-400 RON/cursă" },
      { slug: "servicii-sudura", name: "Servicii Sudură", pret: "80-200 RON/oră" }
    ],
    trends: [
      "Mutări cu ambalare profesională inclusă",
      "Evacuare selectivă pentru reciclare",
      "Sudură TIG/MIG pentru inox și aluminiu",
      "Transport cu lift hidraulic pentru obiecte grele",
      "Servicii de depozitare temporară"
    ],
    faq: [
      { q: "Cât costă mutare apartament 2 camere?", a: "300-600 RON în același oraș. Include: 2-3 muncitori, dubă/camion, 2-4 ore. Ambalare: +150-300 RON. Etaj fără lift: +50 RON/etaj. Între orașe: 0.8-1.5 RON/km + încărcare." },
      { q: "Cât costă evacuare moloz renovare?", a: "150-400 RON/cursă cu dubă (2-3mc). Container 5mc: 500-800 RON. Moloz apartament 50mp: 2-4 curse = 400-1200 RON. Prețul include transport și taxă depozit autorizat." },
      { q: "Ce tipuri de sudură oferiți?", a: "MMA (electrod): oțel, fier – 80-120 RON/oră. MIG/MAG: oțel, inox – 100-150 RON/oră. TIG: inox, aluminiu, cupru – 150-200 RON/oră. Sudură la domiciliu sau în atelier." },
      { q: "Cum aleg firmă de mutări?", a: "Verifică: asigurare pentru bunuri, recenzii reale, contract scris cu inventar. Pe Meserias Local toate firmele sunt verificate. Evită prețuri prea mici – risc de daune sau costuri ascunse." }
    ],
    ghidRapid: "Mutare completă apartament 3 camere: transport 500 RON + ambalare 300 RON + montaj mobilă 200 RON. Total: 1000-1500 RON în același oraș."
  },

  // ============================================
  // INSTALAȚII & AMENAJĂRI (1 serviciu special)
  // ============================================
  {
    slug: "instalatii-amenajari",
    name: "Instalații & Amenajări",
    h1: "Recondiționare Căzi și Amenajări Băi România",
    description: "Servicii specializate de recondiționare căzi de baie prin emailare sau acrilare. Alternativă economică la înlocuirea căzii, rezultat ca nou.",
    keywords: ["recondiționare cadă", "emailare cadă", "acrilare cadă", "renovare baie", "reparații cadă"],
    stats: { cereriLuna: 120, meseriasi: 25 },
    topServices: [
      { slug: "reconditionare-cada-baie", name: "Recondiționare Cadă Baie", pret: "400-900 RON" }
    ],
    trends: [
      "Acrilare cadă – durabilitate 10-15 ani",
      "Emailare ecologică fără miros",
      "Recondiționare căzi vintage/retro",
      "Reparații ciobiri și fisuri",
      "Schimbare culoare cadă"
    ],
    faq: [
      { q: "Cât costă recondiționare cadă?", a: "400-900 RON în funcție de metodă și stare. Emailare: 400-600 RON, durabilitate 5-8 ani. Acrilare: 600-900 RON, durabilitate 10-15 ani. Timp execuție: 4-6 ore, utilizare după 24-48h." },
      { q: "Emailare sau acrilare cadă?", a: "Emailare: mai ieftină, ideală pentru căzi în stare bună. Acrilare: mai durabilă, acoperă defecte mai mari, suprafață mai caldă la atingere. Pentru căzi vechi cu rugină: acrilare obligatoriu." },
      { q: "Cât durează recondiționarea?", a: "4-6 ore execuție. Uscare: emailare 24h, acrilare 48h. Nu folosi cada în perioada de uscare. Ventilează baia în primele 24h pentru eliminarea mirosului." },
      { q: "Merită recondiționat sau schimb cada?", a: "Recondiționare: 400-900 RON, 1 zi, fără spargeri. Cadă nouă + montaj: 1500-4000 RON, 2-3 zile, moloz. Dacă cada e structurală OK, recondiționarea e alegerea smart." }
    ],
    ghidRapid: "Renovare baie economică: recondiționare cadă 600 RON + resigilare 150 RON + zugrăvit 300 RON. Total: 1000-1500 RON vs 5000+ RON renovare completă."
  }
];

// Helper function to get category by slug
export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return categories.find(cat => cat.slug === slug);
}
