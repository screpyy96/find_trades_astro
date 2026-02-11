import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Painters & Decorators in London",
    heroText: "From Victorian terrace refreshes in Islington to modern flat makeovers in Canary Wharf — connect with London's top-rated painters and decorators. Verified, insured, and reviewed by local homeowners.",
    stats: { totalWorkers: 340, avgRating: 4.8, recentProjects: 1250, avgResponseTime: "Under 2 hours" },
    metaTitle: "Painters & Decorators in London | Verified Local Pros | FindTrades",
    metaDescription: "Find trusted painters & decorators across London. 340+ verified pros, avg 4.8★ rating. Free quotes for interior & exterior painting. All London boroughs covered.",
    sections: {
      intro: "London's diverse architecture — from Georgian townhouses in Chelsea to converted warehouses in Shoreditch — demands painters who understand period properties and modern finishes alike. Whether you need a full exterior repaint on a Victorian semi or a feature wall in a new-build apartment, our verified London painters deliver quality results on time and on budget.",
      popularServices: [
        { name: "Interior Painting & Decorating", description: "Full room repaints, feature walls, ceiling work, and colour consultations. Includes prep work, priming, and 2-coat finish.", priceRange: "£180–£450 per room" },
        { name: "Exterior Painting", description: "Front facades, window frames, doors, and garden walls. Weather-resistant paints suited to London's climate.", priceRange: "£1,500–£4,000 per property" },
        { name: "Wallpaper Hanging", description: "Feature walls, full room papering, and wallpaper removal. Experienced with designer and heritage patterns.", priceRange: "£200–£500 per room" },
        { name: "Period Property Restoration", description: "Specialist work on cornicing, dado rails, sash windows, and heritage colour schemes for listed buildings.", priceRange: "£350–£800 per room" },
        { name: "Commercial & Landlord Repaints", description: "Fast turnaround repaints for rental properties, offices, and retail spaces. Weekend and evening availability.", priceRange: "£12–£18 per sqm" },
      ],
      areas: londonAreas,
      localInsight: "London painters typically charge 20–30% more than the national average due to higher operating costs, congestion charges, and parking. However, competition is fierce — meaning you can find excellent value by comparing quotes. Many London decorators specialise in period properties, which is a real advantage if you own a Victorian or Edwardian home. Always check that your painter has public liability insurance, especially for exterior work involving ladders or scaffolding.",
    },
    faqs: [
      { question: "How much does it cost to paint a room in London?", answer: "A standard room repaint in London costs £180–£450 depending on size, condition, and finish. This includes preparation, priming, and two coats of emulsion. Larger rooms, high ceilings, or extensive prep work will be at the higher end. Expect to pay more in central boroughs like Kensington or Westminster." },
      { question: "How long does it take to paint a 2-bed flat in London?", answer: "A full repaint of a 2-bedroom flat typically takes 3–5 days. This includes all prep work, two coats on walls and ceilings, and woodwork. If wallpaper removal is needed, add 1–2 extra days." },
      { question: "Do London painters work on weekends?", answer: "Yes, many painters on FindTrades offer weekend and evening work — especially useful for rental properties or commercial spaces. Weekend rates may be 10–15% higher." },
      { question: "Should I provide the paint or does the painter supply it?", answer: "Either works. Most professional painters can source trade-price paint (Dulux Trade, Farrow & Ball, Little Greene) at a discount. Labour-only quotes are typically 15–20% cheaper." },
    ],
    priceGuide: [
      { service: "Single room repaint", price: "£180–£350", note: "Walls & ceiling" },
      { service: "Full flat repaint (2-bed)", price: "£1,200–£2,500", note: "Including hallway" },
      { service: "Exterior front facade", price: "£1,500–£3,000", note: "Terraced/semi" },
      { service: "Wallpaper hanging (per room)", price: "£200–£500" },
      { service: "Skirting & door frames", price: "£80–£150 per room" },
      { service: "Staircase & hallway", price: "£400–£800" },
    ],
  },
};

export default content;
