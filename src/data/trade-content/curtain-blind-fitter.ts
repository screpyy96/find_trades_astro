import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Curtain & Blind Fitters in London",
    heroText: "Professional curtain and blind fitting across London. Poles, tracks, Roman blinds, roller blinds, and shutters — measured and fitted by experts.",
    stats: { totalWorkers: 75, avgRating: 4.7, recentProjects: 380 },
    metaTitle: "Curtain & Blind Fitters London | Poles, Tracks & Shutters | FindTrades",
    metaDescription: "Find curtain & blind fitters in London. 75+ verified pros for curtain poles, tracks, Roman blinds, rollers & plantation shutters. Free measuring.",
    sections: {
      intro: "Window dressings make a huge difference to any London room — they control light, provide privacy, and add style. Our verified fitters handle everything from simple curtain pole installation to complex bay window tracks and motorised blinds. Many offer a full measure-and-fit service with access to trade-price fabrics and hardware.",
      popularServices: [
        { name: "Curtain Pole & Track Fitting", description: "Metal, wooden, and ceiling-mounted poles and tracks. Bay window specialists.", priceRange: "£30–£80 per window" },
        { name: "Roman Blinds", description: "Made-to-measure Roman blinds in a wide range of fabrics. Lined and interlined options.", priceRange: "£150–£400 per blind" },
        { name: "Roller & Venetian Blinds", description: "Blackout, sunscreen, and decorative roller blinds. Venetian in wood, faux wood, or aluminium.", priceRange: "£80–£250 per blind" },
        { name: "Plantation Shutters", description: "Full-height, café-style, and tier-on-tier shutters. The premium London window treatment.", priceRange: "£200–£500 per panel" },
        { name: "Motorised Blinds", description: "Electric blinds with remote or smart home control. Ideal for hard-to-reach windows.", priceRange: "£300–£800 per blind" },
      ],
      areas: londonAreas,
      localInsight: "Plantation shutters are the most popular premium window treatment in London — they suit period and modern properties alike, provide excellent light control, and add property value. For bay windows, a flexible curtain track is usually better than a pole. Many London fitters offer free home measuring — take advantage of this to ensure a perfect fit.",
    },
    faqs: [
      { question: "How much do plantation shutters cost in London?", answer: "Plantation shutters cost £200–£500 per panel in London, or £400–£1,000 per window. A typical 3-bed London house costs £3,000–£6,000 for shutters throughout. They're an investment but add property value and last 20+ years." },
      { question: "How long does blind fitting take?", answer: "A single blind takes 15–30 minutes to fit. A full house (8–12 windows) takes half a day to a full day. Made-to-measure blinds need 2–4 weeks for manufacturing after the measuring visit." },
      { question: "Can you fit curtains in a bay window?", answer: "Yes — bay windows need a flexible track or custom-bent pole. A professional fitter will measure the angles precisely and install a track that follows the bay shape. This is one job where professional fitting really makes a difference." },
      { question: "What's the best window treatment for a London flat?", answer: "Roller blinds are the most practical and affordable. Roman blinds add softness and style. Plantation shutters are the premium choice. For bedrooms, blackout roller blinds behind curtains give the best light control and insulation." },
    ],
    priceGuide: [
      { service: "Curtain pole fitting", price: "£30–£80", note: "Per window" },
      { service: "Roman blind (made to measure)", price: "£150–£400" },
      { service: "Roller blind", price: "£80–£200" },
      { service: "Plantation shutter (per panel)", price: "£200–£500" },
      { service: "Motorised blind", price: "£300–£800" },
    ],
  },
};

export default content;
