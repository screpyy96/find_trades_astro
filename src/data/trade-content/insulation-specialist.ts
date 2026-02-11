import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Insulation Specialists in London",
    heroText: "Professional insulation for London homes — loft, cavity wall, solid wall, and floor insulation. Cut energy bills and improve comfort year-round.",
    stats: { totalWorkers: 75, avgRating: 4.7, recentProjects: 340 },
    metaTitle: "Insulation Specialists London | Loft, Wall & Floor | FindTrades",
    metaDescription: "Find insulation specialists in London. 75+ verified pros for loft, cavity wall, solid wall & floor insulation. Cut energy bills. Free quotes.",
    sections: {
      intro: "London's older housing stock is notoriously draughty and expensive to heat. Proper insulation is the single most cost-effective way to reduce energy bills and improve comfort. Our verified insulation specialists assess your property and recommend the best solution — whether that's topping up loft insulation, injecting cavity walls, or applying internal/external wall insulation to solid-walled Victorian terraces.",
      popularServices: [
        { name: "Loft Insulation", description: "Mineral wool, sheep's wool, or spray foam loft insulation. Top-up or full installation to 270mm.", priceRange: "£300–£600" },
        { name: "Cavity Wall Insulation", description: "Injected insulation for properties with cavity walls (typically post-1930s).", priceRange: "£500–£1,500" },
        { name: "Internal Wall Insulation", description: "Insulated plasterboard or stud wall with insulation for solid-walled properties.", priceRange: "£50–£100 per sqm" },
        { name: "External Wall Insulation", description: "Insulation boards with render finish. Transforms appearance and thermal performance.", priceRange: "£80–£150 per sqm" },
        { name: "Floor Insulation", description: "Underfloor insulation for suspended timber floors. Reduces draughts and heat loss.", priceRange: "£20–£40 per sqm" },
      ],
      areas: londonAreas,
      localInsight: "Most Victorian and Edwardian London homes have solid walls (no cavity) — these lose up to 45% of heat through the walls. Internal wall insulation is the most practical solution for terraced houses where external insulation would change the street appearance. Loft insulation is the cheapest and most effective upgrade — it pays for itself within 1–2 years through energy savings.",
    },
    faqs: [
      { question: "How much does loft insulation cost in London?", answer: "Loft insulation for a typical London house costs £300–£600. If you already have some insulation, topping up to the recommended 270mm costs £200–£400. Spray foam insulation costs more (£1,000–£2,500) but provides superior performance." },
      { question: "Can Victorian houses have cavity wall insulation?", answer: "No — most Victorian houses have solid walls without a cavity. Internal wall insulation (insulated plasterboard) or external wall insulation are the options. Internal costs £50–£100 per sqm; external costs £80–£150 per sqm." },
      { question: "How much can insulation save on energy bills?", answer: "Loft insulation saves £150–£250 per year. Cavity wall insulation saves £150–£300 per year. Solid wall insulation saves £200–£400 per year. These figures are based on a typical London semi-detached house." },
      { question: "Is there any funding for insulation in London?", answer: "The ECO4 scheme provides free or subsidised insulation for eligible households (low income, certain benefits). Some London boroughs offer additional grants. Check with your local council or energy supplier for current schemes." },
    ],
    priceGuide: [
      { service: "Loft insulation (full)", price: "£300–£600" },
      { service: "Cavity wall insulation", price: "£500–£1,500" },
      { service: "Internal wall insulation (per sqm)", price: "£50–£100" },
      { service: "External wall insulation (per sqm)", price: "£80–£150" },
      { service: "Floor insulation (per sqm)", price: "£20–£40" },
    ],
  },
};

export default content;
