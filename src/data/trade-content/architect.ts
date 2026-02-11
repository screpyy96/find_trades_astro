import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Architects in London",
    heroText: "RIBA-chartered architects for extensions, loft conversions, new builds, and planning applications across London. From concept to completion.",
    stats: { totalWorkers: 130, avgRating: 4.8, recentProjects: 480 },
    metaTitle: "Architects in London | RIBA Chartered | Extensions & Planning | FindTrades",
    metaDescription: "Find architects in London. 130+ RIBA-chartered pros for extensions, loft conversions, new builds & planning applications. Free initial consultations.",
    sections: {
      intro: "London's complex planning regulations, conservation areas, and diverse building stock make professional architectural advice essential for most building projects. Our RIBA-chartered architects handle everything from initial design concepts and planning applications to construction drawings and project management. Whether you're extending a Victorian terrace or designing a contemporary new build, they'll navigate London's planning landscape for you.",
      popularServices: [
        { name: "Extension Design", description: "Rear, side, and wrap-around extension designs. Planning drawings and building regulations.", priceRange: "£2,000–£5,000" },
        { name: "Loft Conversion Design", description: "Dormer, mansard, and hip-to-gable designs. Structural calculations and party wall advice.", priceRange: "£1,500–£4,000" },
        { name: "Planning Applications", description: "Full planning applications, permitted development certificates, and pre-application advice.", priceRange: "£1,000–£3,000" },
        { name: "Interior Redesign", description: "Open-plan layouts, kitchen redesigns, and space optimisation for London homes.", priceRange: "£1,000–£3,000" },
        { name: "New Build Design", description: "Complete architectural design for new houses and developments.", priceRange: "£5,000–£20,000+" },
      ],
      areas: londonAreas,
      localInsight: "Architect fees in London are typically 7–12% of the build cost, or fixed fees for smaller projects. For a standard rear extension, expect to pay £2,000–£5,000 for full architectural services. London planning applications take 8–13 weeks for a decision. Many London boroughs have specific design guidelines — your architect will know what's likely to get approved in your area.",
    },
    faqs: [
      { question: "How much does an architect cost in London?", answer: "For residential projects, London architects charge £1,500–£5,000 for extension designs, or 7–12% of build cost for full service (design through to completion). An initial consultation is often free or £100–£200. Fixed-fee packages are common for standard projects." },
      { question: "Do I need an architect for a house extension?", answer: "It's not legally required, but strongly recommended in London. An architect ensures your design maximises space, complies with planning rules, and adds value. They can also help navigate London's complex planning landscape and conservation area restrictions." },
      { question: "How long does a planning application take in London?", answer: "Standard planning applications take 8 weeks for a decision (13 weeks for major applications). However, London boroughs are often slower — allow 10–16 weeks. Pre-application advice (£200–£500) can speed up the process by identifying issues early." },
      { question: "What's the difference between an architect and an architectural designer?", answer: "An architect is RIBA-chartered with a minimum 7 years of training and professional insurance. Architectural designers/technologists may have less formal training. For complex London projects, especially in conservation areas, a chartered architect is recommended." },
    ],
    priceGuide: [
      { service: "Extension design (full service)", price: "£2,000–£5,000" },
      { service: "Loft conversion design", price: "£1,500–£4,000" },
      { service: "Planning application", price: "£1,000–£3,000" },
      { service: "Initial consultation", price: "Free–£200" },
      { service: "Full project (% of build)", price: "7–12%" },
    ],
  },
};

export default content;
