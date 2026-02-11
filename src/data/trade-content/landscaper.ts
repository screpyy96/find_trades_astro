import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Landscapers in London",
    heroText: "Transform your London garden with professional landscaping. From courtyard makeovers in Islington to full garden redesigns in Richmond — verified local pros ready to help.",
    stats: { totalWorkers: 175, avgRating: 4.7, recentProjects: 620 },
    metaTitle: "Landscapers in London | Garden Design & Build | FindTrades",
    metaDescription: "Find landscapers in London. 175+ verified pros for garden design, patios, decking, planting & complete garden makeovers. Free quotes across all boroughs.",
    sections: {
      intro: "London gardens may be small, but they're incredibly valuable — both for your quality of life and your property value. A well-designed London garden can add 5–10% to your home's value. Our verified landscapers specialise in making the most of compact urban spaces, from low-maintenance courtyard gardens to family-friendly layouts with lawns, planting, and entertaining areas.",
      popularServices: [
        { name: "Full Garden Redesign", description: "Design and build from scratch. Includes hard landscaping, planting, and features.", priceRange: "£5,000–£20,000" },
        { name: "Patio & Paving", description: "Natural stone, porcelain, and block paving patios. Includes excavation, sub-base, and laying.", priceRange: "£80–£150 per sqm" },
        { name: "Decking", description: "Timber or composite decking for entertaining areas. Includes frame, boards, and finishing.", priceRange: "£100–£180 per sqm" },
        { name: "Garden Walls & Raised Beds", description: "Brick, stone, or sleeper raised beds and retaining walls. Structural and decorative.", priceRange: "£150–£400 per metre" },
        { name: "Planting & Turfing", description: "Planting schemes, hedge planting, and new lawn installation (turf or seed).", priceRange: "£15–£30 per sqm" },
      ],
      areas: londonAreas,
      localInsight: "London gardens are typically 5–15 metres long and 4–8 metres wide. The most popular London garden style is a mix of patio near the house, planting beds along the boundaries, and a lawn or second seating area at the rear. Porcelain paving has overtaken natural stone as the top choice — it's low-maintenance and frost-resistant. Budget £5,000–£15,000 for a typical London rear garden makeover.",
    },
    faqs: [
      { question: "How much does landscaping cost in London?", answer: "A full London garden makeover costs £5,000–£15,000 for a typical terraced house garden (40–60sqm). This includes design, hard landscaping (patio, paths), soft landscaping (planting, turf), and features. Larger or more complex gardens can cost £15,000–£30,000+." },
      { question: "Do I need planning permission for garden landscaping?", answer: "Most garden landscaping doesn't need planning permission. However, if more than 50% of your garden will be covered with impermeable surfaces (concrete, non-porous paving), you may need permission for drainage reasons. Permeable paving avoids this requirement." },
      { question: "How long does a garden makeover take?", answer: "A typical London garden makeover takes 2–4 weeks. This includes clearing, groundwork, hard landscaping, planting, and finishing. Weather can affect timelines, especially for turfing and planting. Spring and autumn are the best times for planting." },
      { question: "What's the best low-maintenance garden for London?", answer: "Porcelain paving, composite decking, evergreen shrubs, and artificial or low-maintenance grass. Add some architectural plants (bamboo, olive trees) and outdoor lighting for a stylish, low-effort London garden." },
    ],
    priceGuide: [
      { service: "Full garden makeover", price: "£5,000–£15,000", note: "Typical London garden" },
      { service: "Patio (per sqm)", price: "£80–£150" },
      { service: "Decking (per sqm)", price: "£100–£180" },
      { service: "Turfing (per sqm)", price: "£15–£30" },
      { service: "Fencing (per metre)", price: "£80–£150" },
    ],
  },
};

export default content;
