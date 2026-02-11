import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Demolition Services in London",
    heroText: "Professional demolition and strip-out services across London. From internal walls to complete building demolition — licensed, insured, and waste-compliant.",
    stats: { totalWorkers: 65, avgRating: 4.5, recentProjects: 280 },
    metaTitle: "Demolition Services London | Strip-Out & Removal | FindTrades",
    metaDescription: "Find demolition services in London. 65+ verified pros for internal strip-outs, wall removal, building demolition & waste disposal. Free quotes.",
    sections: {
      intro: "Whether you're knocking through a wall to create an open-plan kitchen or demolishing a garage to make way for an extension, our verified London demolition contractors handle the job safely and dispose of waste responsibly. All hold the necessary licences and carry comprehensive insurance.",
      popularServices: [
        { name: "Internal Strip-Out", description: "Remove kitchens, bathrooms, walls, and floors back to shell. Ready for renovation.", priceRange: "£1,000–£5,000" },
        { name: "Wall Removal", description: "Load-bearing and non-load-bearing wall removal. Structural support (steel beams) arranged.", priceRange: "£500–£3,000" },
        { name: "Garage Demolition", description: "Complete garage removal including foundations and waste disposal.", priceRange: "£1,500–£4,000" },
        { name: "Garden Structure Removal", description: "Sheds, outbuildings, conservatories, and old decking removal.", priceRange: "£300–£1,500" },
        { name: "Asbestos Removal", description: "Licensed asbestos survey and removal. Essential for pre-2000 London properties.", priceRange: "£500–£3,000" },
      ],
      areas: londonAreas,
      localInsight: "Many London properties built before 2000 contain asbestos — in artex ceilings, floor tiles, pipe insulation, and roof sheets. An asbestos survey is essential before any demolition work. Licensed asbestos removal is a legal requirement and costs £500–£3,000 depending on the amount. All demolition waste must be disposed of at licensed facilities — your contractor should provide waste transfer notes.",
    },
    faqs: [
      { question: "How much does demolition cost in London?", answer: "Internal strip-out costs £1,000–£5,000 depending on scope. Wall removal costs £500–£3,000 (more if load-bearing). Garage demolition costs £1,500–£4,000. All prices include waste disposal." },
      { question: "Do I need planning permission for demolition?", answer: "Internal demolition doesn't need planning permission (but Building Control approval is needed for structural changes). External demolition may need permission depending on the structure and location. In conservation areas, even demolishing a garden wall may require consent." },
      { question: "How do you handle asbestos?", answer: "If asbestos is suspected, a survey is done first (£200–£500). If found, licensed asbestos removal contractors handle it safely. This is a legal requirement — never attempt to remove asbestos yourself. Your demolition contractor will arrange this." },
      { question: "What happens to the waste?", answer: "All demolition waste is taken to licensed recycling and disposal facilities. Your contractor provides waste transfer notes as proof of legal disposal. Most materials (brick, concrete, timber, metal) are recycled." },
    ],
    priceGuide: [
      { service: "Internal strip-out", price: "£1,000–£5,000" },
      { service: "Wall removal (non-load-bearing)", price: "£500–£1,000" },
      { service: "Wall removal (load-bearing)", price: "£1,500–£3,000", note: "Including steel" },
      { service: "Garage demolition", price: "£1,500–£4,000" },
      { service: "Asbestos survey", price: "£200–£500" },
    ],
  },
};

export default content;
