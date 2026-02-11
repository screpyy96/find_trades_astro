import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Guttering Specialists in London",
    heroText: "Professional gutter installation, repair, and cleaning across London. uPVC, cast iron, and aluminium guttering by verified local pros.",
    stats: { totalWorkers: 110, avgRating: 4.6, recentProjects: 520 },
    metaTitle: "Guttering Specialists London | Install, Repair & Clean | FindTrades",
    metaDescription: "Find guttering specialists in London. 110+ verified pros for gutter installation, repair, cleaning & downpipe work. Free quotes across all boroughs.",
    sections: {
      intro: "London's frequent rain makes functioning gutters essential. Blocked or damaged gutters cause water damage to walls, foundations, and interiors. Our verified guttering specialists handle everything from annual cleaning to full replacement — in uPVC, cast iron, or aluminium to match your property's style.",
      popularServices: [
        { name: "Gutter Cleaning", description: "Remove leaves, moss, and debris. Check for damage and ensure proper flow.", priceRange: "£80–£150" },
        { name: "Gutter Replacement", description: "Full gutter and downpipe replacement in uPVC, aluminium, or cast iron.", priceRange: "£40–£80 per metre" },
        { name: "Gutter Repair", description: "Fix leaking joints, sagging sections, and damaged brackets.", priceRange: "£50–£200" },
        { name: "Downpipe Installation", description: "New or replacement downpipes. Includes connections and ground-level drainage.", priceRange: "£80–£200 per pipe" },
        { name: "Gutter Guards", description: "Mesh or brush guards to prevent leaf and debris buildup.", priceRange: "£10–£20 per metre" },
      ],
      areas: londonAreas,
      localInsight: "London's trees shed huge amounts of leaves in autumn — annual gutter cleaning is essential, ideally in November after leaf fall. Cast iron guttering is common on Victorian and Edwardian London properties and should be maintained rather than replaced with uPVC if you want to preserve character. Aluminium is a good modern alternative that mimics cast iron's profile.",
    },
    faqs: [
      { question: "How much does gutter cleaning cost in London?", answer: "Gutter cleaning for a typical London terraced house costs £80–£120. Semi-detached houses cost £100–£150. Detached houses cost £120–£200. Prices include clearing all gutters and downpipes and checking for damage." },
      { question: "How often should gutters be cleaned?", answer: "At least once a year, ideally in late autumn after leaf fall. If you have overhanging trees, twice a year (spring and autumn) is recommended. Regular cleaning prevents blockages and water damage." },
      { question: "Should I replace cast iron gutters with uPVC?", answer: "Not necessarily. Cast iron gutters last 50+ years if maintained. uPVC is cheaper but lasts 15–20 years and doesn't suit period properties. Aluminium is a good compromise — lightweight, durable, and available in heritage profiles." },
      { question: "How do I know if my gutters need replacing?", answer: "Signs include persistent leaks at joints, visible cracks or holes, sagging sections, peeling paint on walls below gutters, and water staining. If repairs are frequent, replacement is more cost-effective long-term." },
    ],
    priceGuide: [
      { service: "Gutter cleaning (terraced)", price: "£80–£120" },
      { service: "Gutter replacement (per metre)", price: "£40–£80" },
      { service: "Downpipe replacement", price: "£80–£200" },
      { service: "Gutter repair", price: "£50–£200" },
      { service: "Gutter guards (per metre)", price: "£10–£20" },
    ],
  },
};

export default content;
