import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Driveway Specialists in London",
    heroText: "Professional driveway installation across London. Block paving, resin-bound, tarmac, and gravel driveways — designed and built to last.",
    stats: { totalWorkers: 110, avgRating: 4.6, recentProjects: 380 },
    metaTitle: "Driveway Specialists in London | Paving & Surfacing | FindTrades",
    metaDescription: "Find driveway specialists in London. 110+ verified pros for block paving, resin-bound, tarmac & gravel driveways. Free quotes across all boroughs.",
    sections: {
      intro: "A new driveway transforms the front of your London home and can add significant kerb appeal and value. Our verified driveway specialists handle everything from design and excavation to drainage and surfacing. Whether you want classic block paving, modern resin-bound, or practical tarmac, they'll deliver a driveway that looks great and lasts for years.",
      popularServices: [
        { name: "Block Paving", description: "Clay or concrete block paving in a range of patterns and colours. The most popular London driveway choice.", priceRange: "£80–£150 per sqm" },
        { name: "Resin-Bound Surfacing", description: "Smooth, permeable, and low-maintenance. Modern look with excellent drainage properties.", priceRange: "£60–£100 per sqm" },
        { name: "Tarmac/Asphalt", description: "Cost-effective and durable. Ideal for larger driveways. Red or black options.", priceRange: "£40–£70 per sqm" },
        { name: "Gravel Driveways", description: "Budget-friendly with good drainage. Gravel grids prevent spreading and rutting.", priceRange: "£30–£50 per sqm" },
        { name: "Driveway Crossover", description: "Dropped kerb application and construction to create vehicle access from the road.", priceRange: "£1,500–£3,000" },
      ],
      areas: londonAreas,
      localInsight: "In London, you need a dropped kerb (crossover) to legally drive across the pavement onto your driveway. Apply through your local council — costs £1,500–£3,000. If your new driveway is impermeable (block paving without drainage), you'll need planning permission if it's over 5sqm. Permeable surfaces (resin-bound, gravel, permeable block paving) avoid this requirement.",
    },
    faqs: [
      { question: "How much does a new driveway cost in London?", answer: "A typical London driveway (30–50sqm) costs £2,500–£5,000 for tarmac, £3,000–£7,000 for block paving, or £2,500–£5,000 for resin-bound. This includes excavation, sub-base, edging, and surfacing." },
      { question: "Do I need planning permission for a driveway?", answer: "If your driveway is over 5sqm and uses impermeable materials, yes. Permeable surfaces (resin-bound, gravel, permeable block paving) don't need permission regardless of size. You'll also need a dropped kerb — apply through your London borough council." },
      { question: "How long does a driveway installation take?", answer: "A typical London driveway takes 3–5 days. This includes excavation (1 day), sub-base (1 day), and surfacing (1–3 days depending on material). Block paving takes longest; tarmac is quickest." },
      { question: "What's the best driveway material for London?", answer: "Block paving is the most popular for its durability and appearance. Resin-bound is gaining popularity for its modern look and permeability. Tarmac is the most cost-effective. Your choice depends on budget, aesthetics, and drainage requirements." },
    ],
    priceGuide: [
      { service: "Block paving (per sqm)", price: "£80–£150" },
      { service: "Resin-bound (per sqm)", price: "£60–£100" },
      { service: "Tarmac (per sqm)", price: "£40–£70" },
      { service: "Gravel (per sqm)", price: "£30–£50" },
      { service: "Dropped kerb", price: "£1,500–£3,000" },
    ],
  },
};

export default content;
