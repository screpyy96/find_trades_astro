import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Window Fitters in London",
    heroText: "Professional window installation and replacement across London. uPVC, aluminium, and timber windows — including sash window specialists for period properties.",
    stats: { totalWorkers: 160, avgRating: 4.6, recentProjects: 580 },
    metaTitle: "Window Fitters in London | uPVC, Aluminium & Sash | FindTrades",
    metaDescription: "Find window fitters in London. 160+ verified pros for uPVC, aluminium, timber & sash windows. Double glazing, repairs & replacements. Free quotes.",
    sections: {
      intro: "Windows are crucial for energy efficiency, security, and kerb appeal in London homes. Whether you need modern double-glazed uPVC windows for a 1970s house in Barnet or slim-profile aluminium frames for a contemporary extension in Bermondsey, our verified window fitters deliver quality installations with proper guarantees.",
      popularServices: [
        { name: "Double Glazing Installation", description: "uPVC, aluminium, or timber double-glazed windows. A-rated energy efficiency as standard.", priceRange: "£300–£800 per window" },
        { name: "Sash Window Replacement", description: "Like-for-like sash window replacement with slim double glazing. Conservation area compliant.", priceRange: "£800–£1,500 per window" },
        { name: "Bay Window Installation", description: "New bay windows or replacement of existing. Includes structural support if needed.", priceRange: "£1,500–£4,000" },
        { name: "Window Repairs", description: "Broken hinges, locks, handles, sealed units, and draught-proofing for existing windows.", priceRange: "£50–£200 per window" },
        { name: "Roof Windows & Skylights", description: "Velux and similar roof windows for loft conversions and flat-roof extensions.", priceRange: "£500–£1,200 per window" },
      ],
      areas: londonAreas,
      localInsight: "In London conservation areas, you may not be able to replace original windows with uPVC — timber or slim-profile aluminium that matches the original design is usually required. Check with your local planning authority before ordering. FENSA registration is essential — it means the installer self-certifies compliance with building regulations, saving you the cost of a separate Building Control inspection.",
    },
    faqs: [
      { question: "How much do new windows cost in London?", answer: "uPVC double-glazed windows cost £300–£600 each fitted. Aluminium frames cost £500–£800. Timber sash replacements cost £800–£1,500. A full house of windows (10 windows) typically costs £4,000–£8,000 for uPVC or £8,000–£15,000 for timber sash." },
      { question: "Do I need planning permission to change windows in London?", answer: "In most cases, no — window replacement is permitted development. However, in conservation areas or on listed buildings, you'll need planning permission and may be restricted to certain materials and styles. Always check with your local council." },
      { question: "How long does window installation take?", answer: "A single window takes 2–4 hours to install. A full house (8–12 windows) takes 2–3 days. Your fitter will remove old windows and install new ones room by room, so your home is never fully exposed to the elements." },
      { question: "What is FENSA registration?", answer: "FENSA is a government-authorised scheme that allows registered installers to self-certify that window installations comply with building regulations. Always use a FENSA-registered fitter — otherwise you'll need to pay for a separate Building Control inspection (£200–£400)." },
    ],
    priceGuide: [
      { service: "uPVC window (each)", price: "£300–£600" },
      { service: "Aluminium window (each)", price: "£500–£800" },
      { service: "Sash window replacement", price: "£800–£1,500" },
      { service: "Bay window", price: "£1,500–£4,000" },
      { service: "Velux roof window", price: "£500–£1,200" },
      { service: "Window repair", price: "£50–£200" },
    ],
  },
};

export default content;
