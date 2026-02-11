import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Paving Specialists in London",
    heroText: "Expert patio and path paving across London. Natural stone, porcelain, and block paving — designed and laid to perfection by verified local pros.",
    stats: { totalWorkers: 120, avgRating: 4.7, recentProjects: 450 },
    metaTitle: "Paving Specialists in London | Patios & Paths | FindTrades",
    metaDescription: "Find paving specialists in London. 120+ verified pros for natural stone, porcelain & block paving patios and paths. Free quotes across all boroughs.",
    sections: {
      intro: "A well-laid patio is the foundation of any London garden — it's where you'll spend summer evenings, host barbecues, and enjoy your outdoor space. Our verified paving specialists work with natural stone, porcelain, and block paving to create patios, paths, and steps that look stunning and drain properly.",
      popularServices: [
        { name: "Patio Installation", description: "Natural stone, porcelain, or block paving patios. Includes excavation, sub-base, and pointing.", priceRange: "£80–£150 per sqm" },
        { name: "Garden Paths", description: "Stepping stone, slab, or block paving paths through your garden.", priceRange: "£50–£100 per sqm" },
        { name: "Steps & Retaining Walls", description: "Garden steps and low retaining walls in stone, brick, or sleepers.", priceRange: "£200–£500 per step" },
        { name: "Porcelain Paving", description: "Premium outdoor porcelain tiles. Low-maintenance, frost-resistant, and available in wood and stone effects.", priceRange: "£100–£180 per sqm" },
        { name: "Patio Repair & Re-laying", description: "Fix sunken slabs, re-point joints, and level uneven paving.", priceRange: "£30–£60 per sqm" },
      ],
      areas: londonAreas,
      localInsight: "Porcelain paving has become the top choice for London patios — it's virtually maintenance-free, doesn't stain, and comes in realistic stone and wood effects. Indian sandstone remains popular for a natural look but requires sealing. Proper drainage is essential in London — your paving specialist should ensure a slight fall away from the house and adequate drainage to prevent waterlogging.",
    },
    faqs: [
      { question: "How much does a patio cost in London?", answer: "A new patio in London costs £80–£150 per sqm for natural stone or porcelain, or £60–£100 per sqm for block paving. A typical 20sqm patio costs £1,600–£3,000. This includes excavation, sub-base, laying, and pointing." },
      { question: "What's the best paving material for a London garden?", answer: "Porcelain is the premium choice — low-maintenance, frost-resistant, and stain-proof. Indian sandstone offers a natural look at a lower price. Block paving is versatile and durable. Your choice depends on style preference and budget." },
      { question: "How long does a patio take to install?", answer: "A typical 20sqm London patio takes 3–5 days. This includes excavation, sub-base preparation, laying, and pointing. Larger or more complex designs take longer. Weather can affect timelines." },
      { question: "Do I need planning permission for a patio?", answer: "Generally no, unless the patio is at the front of the property and over 5sqm of impermeable material. Rear garden patios don't usually need permission. In conservation areas, check with your council." },
    ],
    priceGuide: [
      { service: "Natural stone patio (per sqm)", price: "£80–£130" },
      { service: "Porcelain paving (per sqm)", price: "£100–£180" },
      { service: "Block paving (per sqm)", price: "£60–£100" },
      { service: "Garden path (per sqm)", price: "£50–£100" },
      { service: "Steps (each)", price: "£200–£500" },
    ],
  },
};

export default content;
