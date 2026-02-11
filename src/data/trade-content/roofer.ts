import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Roofers in London",
    heroText: "Trusted roofers for slate repairs, flat roof replacements, and complete re-roofing across London. Emergency leak repairs available 24/7.",
    stats: { totalWorkers: 195, avgRating: 4.6, recentProjects: 780, avgResponseTime: "Same day" },
    metaTitle: "Roofers in London | Slate, Flat Roof & Repairs | FindTrades",
    metaDescription: "Find trusted roofers in London. 195+ verified pros for slate repairs, flat roofs, guttering & emergency leaks. Free quotes, all boroughs covered.",
    sections: {
      intro: "London roofs take a beating — from driving rain and high winds to the freeze-thaw cycles that crack tiles and degrade flashings. Whether you have a Victorian slate roof in Clapham, a flat roof on a 1960s extension in Barnet, or a modern tiled roof in a new development, our verified London roofers provide reliable repairs and replacements with proper guarantees.",
      popularServices: [
        { name: "Roof Repairs", description: "Slipped tiles, cracked slates, damaged flashings, and ridge tile repointing. Quick fixes to prevent water damage.", priceRange: "£150–£500" },
        { name: "Flat Roof Replacement", description: "EPDM rubber, GRP fibreglass, or felt flat roofing. 20-year guarantees available on EPDM and GRP.", priceRange: "£60–£120 per sqm" },
        { name: "Complete Re-roofing", description: "Strip and re-tile or re-slate entire roof. Includes battens, felt, and new tiles/slates.", priceRange: "£5,000–£12,000" },
        { name: "Guttering & Downpipes", description: "Replacement, repair, and cleaning of gutters and downpipes. uPVC, cast iron, and aluminium options.", priceRange: "£40–£80 per metre" },
        { name: "Chimney & Lead Work", description: "Lead flashing replacement, chimney repointing, and chimney pot installation.", priceRange: "£300–£1,500" },
      ],
      areas: londonAreas,
      localInsight: "London has a high proportion of slate roofs on Victorian and Edwardian properties. Welsh slate is the traditional choice but reclaimed and Spanish slate are more affordable alternatives. For flat roofs, GRP fibreglass and EPDM rubber have largely replaced felt — they last 25+ years vs 10–15 for felt. Always get at least 3 quotes for major roofing work and check that your roofer has public liability insurance and offers a written guarantee.",
    },
    faqs: [
      { question: "How much does a new roof cost in London?", answer: "A complete re-roof for a typical London terraced house costs £5,000–£8,000 for tiles or £7,000–£12,000 for natural slate. This includes stripping the old roof, new felt and battens, tiles/slates, and ridge tiles. Scaffolding adds £500–£1,500." },
      { question: "How long does a flat roof last?", answer: "Traditional felt flat roofs last 10–15 years. GRP fibreglass lasts 25–30 years. EPDM rubber lasts 30–50 years. For London properties, we recommend GRP or EPDM for their longevity and weather resistance." },
      { question: "Can you repair a roof in the rain?", answer: "Emergency temporary repairs (tarping, sealant) can be done in light rain. Permanent repairs need dry conditions. Most London roofers offer emergency callouts to prevent further water damage until a proper repair can be scheduled." },
      { question: "Do I need scaffolding for roof work?", answer: "Most roof work in London requires scaffolding for safety and access. Scaffolding typically costs £500–£1,500 depending on the property. Some minor repairs can be done from a ladder, but this depends on height and access." },
    ],
    priceGuide: [
      { service: "Roof repair (minor)", price: "£150–£500" },
      { service: "Flat roof replacement (per sqm)", price: "£60–£120" },
      { service: "Full re-roof (terraced)", price: "£5,000–£8,000" },
      { service: "Gutter replacement (per metre)", price: "£40–£80" },
      { service: "Lead flashing repair", price: "£200–£600" },
      { service: "Chimney repoint", price: "£300–£800", note: "Plus scaffolding" },
    ],
  },
};

export default content;
