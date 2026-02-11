import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Glaziers in London",
    heroText: "Professional glass repair and installation across London. Broken windows, double glazing repairs, mirrors, splashbacks, and bespoke glass work.",
    stats: { totalWorkers: 85, avgRating: 4.6, recentProjects: 520, avgResponseTime: "Same day" },
    metaTitle: "Glaziers in London | Glass Repair & Installation | FindTrades",
    metaDescription: "Find glaziers in London. 85+ verified pros for broken windows, double glazing, mirrors, splashbacks & bespoke glass. Emergency boarding. Free quotes.",
    sections: {
      intro: "From emergency boarding after a break-in to bespoke glass splashbacks in a Notting Hill kitchen, London glaziers handle every type of glass work. Our verified professionals provide rapid response for emergencies and precision installation for decorative and structural glass projects.",
      popularServices: [
        { name: "Emergency Glass Repair", description: "Same-day boarding and glass replacement for broken windows and doors.", priceRange: "£80–£250" },
        { name: "Double Glazing Repair", description: "Misted units, broken seals, and cracked panes replaced without changing the frame.", priceRange: "£80–£200 per unit" },
        { name: "Glass Splashbacks", description: "Toughened glass splashbacks for kitchens and bathrooms. Any colour, cut to size.", priceRange: "£200–£600" },
        { name: "Mirror Installation", description: "Wall mirrors, gym mirrors, and bespoke mirror panels. Cut to size and fitted.", priceRange: "£100–£500" },
        { name: "Glass Balustrades", description: "Frameless and semi-frameless glass balustrades for stairs and balconies.", priceRange: "£200–£400 per metre" },
      ],
      areas: londonAreas,
      localInsight: "For emergency glass repairs in London, most glaziers can board up within 2–4 hours and replace the glass within 24–48 hours. Misted double glazing units are a common London problem — replacing just the glass unit (not the frame) costs £80–£200 and is much cheaper than full window replacement. For glass splashbacks, toughened glass is required near heat sources.",
    },
    faqs: [
      { question: "How much does emergency glass repair cost in London?", answer: "Emergency boarding costs £80–£150. Glass replacement costs £100–£250 for a standard window. Double-glazed unit replacement costs £80–£200. Most London glaziers offer same-day emergency service." },
      { question: "Can you replace just the glass in double glazing?", answer: "Yes — if the frame is in good condition, you can replace just the sealed glass unit. This costs £80–£200 per unit, much less than replacing the entire window. It's the most cost-effective fix for misted or cracked double glazing." },
      { question: "How long does a glass splashback take to install?", answer: "A kitchen splashback takes 1–2 hours to install. The glass is made to measure (allow 5–7 days for manufacturing) and fitted with adhesive or fixings. Your glazier will template the area first to ensure a perfect fit." },
      { question: "What type of glass is used for balustrades?", answer: "Toughened or laminated safety glass, typically 10–12mm thick. Frameless balustrades use thicker glass (15–21mm). All glass must comply with building regulations for safety. Your glazier will specify the correct type for your installation." },
    ],
    priceGuide: [
      { service: "Emergency boarding", price: "£80–£150" },
      { service: "Window glass replacement", price: "£100–£250" },
      { service: "Double glazing unit", price: "£80–£200" },
      { service: "Glass splashback", price: "£200–£600" },
      { service: "Mirror (supply & fit)", price: "£100–£500" },
    ],
  },
};

export default content;
