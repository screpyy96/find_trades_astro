import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Removal Services in London",
    heroText: "Professional house and office removals across London. Packing, loading, transport, and storage — stress-free moving by verified local teams.",
    stats: { totalWorkers: 130, avgRating: 4.6, recentProjects: 850 },
    metaTitle: "Removal Services London | House & Office Moves | FindTrades",
    metaDescription: "Find removal services in London. 130+ verified teams for house moves, office relocations, packing & storage. Competitive rates. Free quotes.",
    sections: {
      intro: "Moving home in London comes with unique challenges — narrow streets, parking restrictions, stairs in Victorian conversions, and congestion charges. Our verified London removal teams know the city inside out and handle everything from studio flat moves to large family house relocations with care and efficiency.",
      popularServices: [
        { name: "House Removals", description: "Full house moves including loading, transport, and unloading. Furniture protection and careful handling.", priceRange: "£400–£1,500" },
        { name: "Flat/Apartment Moves", description: "Specialist in London flat moves — navigating stairs, lifts, and tight spaces.", priceRange: "£250–£600" },
        { name: "Packing Service", description: "Professional packing of all belongings. Boxes, bubble wrap, and labelling included.", priceRange: "£200–£500" },
        { name: "Office Removals", description: "Weekend and out-of-hours office moves to minimise business disruption.", priceRange: "£500–£3,000" },
        { name: "Man & Van", description: "Smaller moves, single items, and eBay/Gumtree collections. Flexible and affordable.", priceRange: "£40–£80 per hour" },
      ],
      areas: londonAreas,
      localInsight: "London removals cost more than elsewhere due to parking permits (£25–£50 per day from your council), congestion charges, and access difficulties. Book your parking suspension at least 2 weeks in advance. Most London removal companies charge by the half-day or full day rather than hourly. Weekday moves are typically 20–30% cheaper than weekends.",
    },
    faqs: [
      { question: "How much does a house move cost in London?", answer: "A 1-bed flat move within London costs £250–£500. A 2-bed costs £400–£800. A 3-bed house costs £600–£1,500. Prices depend on distance, access, floor level, and volume of belongings. Packing services add £200–£500." },
      { question: "How far in advance should I book?", answer: "Book at least 2–4 weeks ahead, especially for end-of-month moves (the busiest time). Friday and Monday moves are most popular. Mid-week and mid-month moves are easier to book and often cheaper." },
      { question: "Do I need a parking suspension?", answer: "Yes, for most London streets you'll need to suspend parking bays outside both properties. Apply through your local council at least 5–10 working days in advance. Cost is £25–£50 per day per location." },
      { question: "Are my belongings insured during the move?", answer: "All verified removal companies on FindTrades carry goods-in-transit insurance. Check the coverage amount — standard cover is usually £25,000–£50,000. For high-value items, ask about additional cover." },
    ],
    priceGuide: [
      { service: "1-bed flat move", price: "£250–£500" },
      { service: "2-bed flat/house", price: "£400–£800" },
      { service: "3-bed house", price: "£600–£1,500" },
      { service: "Man & van (per hour)", price: "£40–£80" },
      { service: "Packing service", price: "£200–£500" },
    ],
  },
};

export default content;
