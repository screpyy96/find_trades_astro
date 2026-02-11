import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Interior Designers in London",
    heroText: "Professional interior design services across London. From single room makeovers to full property styling — create spaces that reflect your lifestyle.",
    stats: { totalWorkers: 110, avgRating: 4.8, recentProjects: 390 },
    metaTitle: "Interior Designers in London | Room Design & Styling | FindTrades",
    metaDescription: "Find interior designers in London. 110+ verified pros for room design, colour schemes, furniture selection & full property styling. Free consultations.",
    sections: {
      intro: "London's diverse interiors — from minimalist Scandi-style flats in Bermondsey to maximalist Victorian homes in Hackney — reflect the city's eclectic taste. Our verified interior designers help you create cohesive, functional spaces that suit your lifestyle and budget. Whether you need help choosing paint colours or a complete redesign, they bring expertise and trade discounts that often pay for their fee.",
      popularServices: [
        { name: "Full Room Design", description: "Complete design scheme including layout, colours, furniture, lighting, and accessories.", priceRange: "£500–£2,000 per room" },
        { name: "Colour Consultation", description: "Expert colour scheme advice for your home. Paint selection, samples, and mood boards.", priceRange: "£150–£400" },
        { name: "Property Staging", description: "Style your property for sale or rental. Furniture hire and styling to maximise appeal.", priceRange: "£1,000–£5,000" },
        { name: "Kitchen & Bathroom Design", description: "Layout planning, material selection, and supplier coordination for kitchen and bathroom projects.", priceRange: "£500–£2,000" },
        { name: "Full Property Design", description: "End-to-end interior design for entire homes. Concept to installation with project management.", priceRange: "£5,000–£30,000+" },
      ],
      areas: londonAreas,
      localInsight: "London interior designers typically charge £50–£150 per hour or offer fixed-fee packages. Many provide trade discounts on furniture and materials (20–40% off retail) which can offset their fee. For property staging before sale, professional styling can add 5–10% to the sale price — a worthwhile investment in London's competitive property market.",
    },
    faqs: [
      { question: "How much does an interior designer cost in London?", answer: "London interior designers charge £50–£150 per hour, or £500–£2,000 per room for a full design scheme. A colour consultation costs £150–£400. Full property design starts from £5,000. Many designers offer free initial consultations." },
      { question: "Is an interior designer worth it?", answer: "Yes — especially in London where property values are high. A designer avoids costly mistakes, provides trade discounts (20–40% off furniture), and creates a cohesive look. For property sales, professional staging can add thousands to your sale price." },
      { question: "What does an interior designer actually do?", answer: "They create a design concept, select colours, materials, furniture, and lighting, produce mood boards and floor plans, source products (often at trade prices), and coordinate with tradesmen. Some also project-manage the installation." },
      { question: "Can I hire a designer for just one room?", answer: "Absolutely. Single room designs are the most common request. A living room or bedroom makeover costs £500–£2,000 for the design, plus the cost of furniture and materials. Many London designers offer 'design in a day' packages." },
    ],
    priceGuide: [
      { service: "Colour consultation", price: "£150–£400" },
      { service: "Single room design", price: "£500–£2,000" },
      { service: "Property staging", price: "£1,000–£5,000" },
      { service: "Full property design", price: "£5,000–£30,000+" },
      { service: "Hourly rate", price: "£50–£150" },
    ],
  },
};

export default content;
