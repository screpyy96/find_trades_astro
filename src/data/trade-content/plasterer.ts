import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Plasterers in London",
    heroText: "Expert plasterers for skimming, rendering, and ornamental plasterwork across London. Specialists in period property restoration and modern skim finishes.",
    stats: { totalWorkers: 210, avgRating: 4.7, recentProjects: 820 },
    metaTitle: "Plasterers in London | Skimming, Rendering & Repair | FindTrades",
    metaDescription: "Find expert plasterers in London. 210+ verified pros for skimming, rendering, coving, and period restoration. Free quotes across all 32 boroughs.",
    sections: {
      intro: "From skim-coating newly boarded walls in a Canary Wharf apartment to restoring ornate Victorian cornicing in a Hampstead townhouse, London plasterers need a broad skill set. Our verified professionals handle everything from basic overskim work to specialist Venetian plaster finishes and lime plastering for heritage properties.",
      popularServices: [
        { name: "Plaster Skimming", description: "Smooth skim coat over plasterboard or existing plaster. The most common plastering job in London homes.", priceRange: "£150–£350 per room" },
        { name: "Full Re-plastering", description: "Hack off old plaster and apply fresh base coat and skim. Essential for damp-damaged or crumbling walls.", priceRange: "£350–£700 per room" },
        { name: "External Rendering", description: "Sand & cement, monocouche, or silicone render for exterior walls. Weather protection and kerb appeal.", priceRange: "£40–£80 per sqm" },
        { name: "Coving & Cornicing", description: "Installation of decorative coving, cornicing, and ceiling roses. Period-accurate profiles available.", priceRange: "£8–£20 per metre" },
        { name: "Venetian & Polished Plaster", description: "High-end decorative plaster finishes for feature walls and luxury interiors.", priceRange: "£60–£120 per sqm" },
      ],
      areas: londonAreas,
      localInsight: "London plasterers charge £200–£350 per day. A standard room skim takes about half a day for an experienced plasterer. Many London properties have lath-and-plaster walls that need careful handling — not all plasterers are experienced with this, so ask specifically if you have a period property. Drying time is typically 2–4 days before painting.",
    },
    faqs: [
      { question: "How much does plastering a room cost in London?", answer: "Skimming a standard room in London costs £150–£350. Full re-plastering (hack off and re-do) costs £350–£700 per room. Ceilings are usually charged separately at £100–£250 per ceiling." },
      { question: "How long does plaster take to dry before painting?", answer: "Fresh plaster needs 2–4 days to dry in normal conditions. In winter or poorly ventilated London flats, it can take up to a week. Don't paint until the plaster has turned uniformly light pink/white. Use a mist coat (watered-down emulsion) as the first coat." },
      { question: "Can you plaster over Artex ceilings?", answer: "Yes, most London plasterers can skim over Artex to create a smooth finish. If the Artex was applied before 2000, it may contain asbestos — get it tested first. Skimming over Artex costs £150–£300 per ceiling." },
      { question: "What's the difference between plastering and rendering?", answer: "Plastering is for interior walls (smooth finish for painting). Rendering is for exterior walls (weather protection). Different materials and techniques are used. Many plasterers do both, but some specialise in one or the other." },
    ],
    priceGuide: [
      { service: "Room skim (walls only)", price: "£150–£350" },
      { service: "Ceiling skim", price: "£100–£250" },
      { service: "Full re-plaster (per room)", price: "£350–£700" },
      { service: "Patch repair", price: "£80–£200", note: "Per patch" },
      { service: "External render (per sqm)", price: "£40–£80" },
      { service: "Coving installation", price: "£8–£20 per metre" },
    ],
  },
};

export default content;
