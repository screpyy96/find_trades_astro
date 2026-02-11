import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Welders in London",
    heroText: "Professional welding services across London. Steel fabrication, railings, gates, structural steelwork, and repairs by certified welders.",
    stats: { totalWorkers: 70, avgRating: 4.7, recentProjects: 320 },
    metaTitle: "Welders in London | Fabrication, Railings & Repairs | FindTrades",
    metaDescription: "Find welders in London. 70+ certified pros for steel fabrication, railings, gates, structural steel & repairs. Mobile welding available. Free quotes.",
    sections: {
      intro: "From ornate wrought iron railings on a Georgian townhouse to structural steel beams for a kitchen knock-through, welding is essential to many London building projects. Our certified welders provide on-site and workshop fabrication for residential and commercial clients across all boroughs.",
      popularServices: [
        { name: "Railings & Balustrades", description: "Steel, wrought iron, and stainless steel railings for stairs, balconies, and boundaries.", priceRange: "£80–£200 per metre" },
        { name: "Gates & Security", description: "Driveway gates, garden gates, and security grilles. Manual or automated.", priceRange: "£500–£3,000" },
        { name: "Structural Steelwork", description: "RSJ beams, steel frames, and structural supports for extensions and knock-throughs.", priceRange: "£300–£1,500" },
        { name: "Welding Repairs", description: "Repair broken railings, gates, furniture, and metal structures. Mobile welding service.", priceRange: "£80–£250" },
        { name: "Bespoke Metalwork", description: "Custom furniture, shelving, fire pits, and decorative metalwork to your design.", priceRange: "£200–£2,000" },
      ],
      areas: londonAreas,
      localInsight: "Many London properties have original Victorian or Edwardian railings that need repair or replication. A skilled welder can match existing patterns and finishes. For structural steelwork (RSJ beams), you'll need a structural engineer's calculations — your welder can recommend one. Mobile welding is available for on-site repairs where items can't be transported to a workshop.",
    },
    faqs: [
      { question: "How much do metal railings cost in London?", answer: "Simple steel railings cost £80–£120 per metre. Decorative or wrought iron railings cost £120–£200 per metre. A typical London front garden railing (5–8 metres) costs £400–£1,600 including installation. Stainless steel and glass balustrades cost more." },
      { question: "Can you repair old Victorian railings?", answer: "Yes, experienced London welders can repair, restore, and replicate Victorian railings. Damaged sections can be cut out and new pieces welded in to match the original pattern. Full restoration including rust treatment and painting is also available." },
      { question: "Do I need a structural engineer for a steel beam?", answer: "Yes — structural calculations are required for any load-bearing steelwork. Your welder or builder will arrange this. The engineer specifies the beam size and the welder/builder installs it. Building Control inspection is also required." },
      { question: "Can you weld on-site?", answer: "Yes, most London welders offer mobile welding for on-site repairs and installations. For larger fabrication work, items are made in the workshop and installed on-site. Mobile welding is ideal for railing repairs, gate fixes, and structural work." },
    ],
    priceGuide: [
      { service: "Steel railings (per metre)", price: "£80–£200" },
      { service: "Garden/driveway gate", price: "£500–£2,000" },
      { service: "RSJ beam (supply & fit)", price: "£500–£1,500" },
      { service: "Welding repair", price: "£80–£250" },
      { service: "Bespoke metalwork", price: "£200–£2,000" },
    ],
  },
};

export default content;
