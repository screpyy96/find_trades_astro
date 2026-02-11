import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Bricklayers in London",
    heroText: "Professional bricklayers for extensions, garden walls, repointing, and structural work across London. Experienced with London stock brick and period properties.",
    stats: { totalWorkers: 180, avgRating: 4.6, recentProjects: 620 },
    metaTitle: "Bricklayers in London | Extensions, Walls & Repointing | FindTrades",
    metaDescription: "Find professional bricklayers in London. 180+ verified pros for extensions, garden walls, repointing & repairs. Experienced with London stock brick. Free quotes.",
    sections: {
      intro: "London's iconic yellow stock brick is everywhere — from Victorian terraces to warehouse conversions. Whether you need a rear extension built, a garden wall constructed, or careful repointing on a period facade, our verified London bricklayers understand the materials and techniques that keep the capital's buildings looking their best.",
      popularServices: [
        { name: "House Extensions", description: "Single and double-storey rear and side extensions. Structural brickwork to match existing property.", priceRange: "£1,500–£3,000 per sqm" },
        { name: "Garden & Boundary Walls", description: "New garden walls, boundary walls, and retaining walls. Various brick and block options.", priceRange: "£100–£200 per sqm" },
        { name: "Repointing", description: "Remove old mortar and repoint with matching mix. Essential for maintaining London's period properties.", priceRange: "£30–£60 per sqm" },
        { name: "Chimney Repairs", description: "Chimney rebuilds, repointing, and flaunching. Scaffolding arranged as needed.", priceRange: "£500–£2,000" },
        { name: "Brick Repairs & Matching", description: "Replace damaged bricks with matching London stock or reclaimed bricks. Colour and texture matching.", priceRange: "£50–£100 per brick" },
      ],
      areas: londonAreas,
      localInsight: "London bricklayers charge £250–£400 per day. London stock brick (the distinctive yellow/brown brick) is widely available from reclamation yards, but matching old brickwork requires skill. For period properties, lime mortar is often more appropriate than cement mortar — it allows the building to breathe. Always check if you need planning permission for walls over 1 metre adjacent to a highway or 2 metres elsewhere.",
    },
    faqs: [
      { question: "How much does a brick extension cost in London?", answer: "A single-storey rear extension in London costs £1,500–£3,000 per sqm for the build, or £30,000–£60,000 total for a typical 20sqm extension. This includes foundations, brickwork, roof, and basic finishes. Planning permission and building regulations add £2,000–£5,000." },
      { question: "How much does repointing cost in London?", answer: "Repointing in London costs £30–£60 per sqm. A typical Victorian terrace front facade costs £1,500–£3,000 including scaffolding. Lime mortar repointing costs more but is essential for pre-1920s properties." },
      { question: "Can you match London stock brick?", answer: "Yes, experienced London bricklayers can source matching London stock brick from reclamation yards or specialist suppliers. The colour varies from yellow to brown, so your bricklayer will select bricks that blend with your existing wall." },
      { question: "Do I need planning permission for a garden wall?", answer: "Garden walls under 2 metres high generally don't need planning permission unless they're next to a highway (1 metre limit) or in a conservation area. Check with your local council if unsure." },
    ],
    priceGuide: [
      { service: "Garden wall (per sqm)", price: "£100–£200", note: "Including foundations" },
      { service: "Repointing (per sqm)", price: "£30–£60" },
      { service: "Chimney repoint", price: "£500–£1,000", note: "Plus scaffolding" },
      { service: "Brick pier/pillar", price: "£300–£600", note: "Each" },
      { service: "Extension brickwork", price: "£1,500–£3,000 per sqm", note: "Full build" },
    ],
  },
};

export default content;
