import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Blacksmiths in London",
    heroText: "Traditional and contemporary blacksmithing across London. Hand-forged gates, railings, furniture, and architectural ironwork by skilled craftspeople.",
    stats: { totalWorkers: 30, avgRating: 4.9, recentProjects: 150 },
    metaTitle: "Blacksmiths in London | Hand-Forged Ironwork | FindTrades",
    metaDescription: "Find blacksmiths in London. 30+ skilled craftspeople for hand-forged gates, railings, furniture & architectural ironwork. Bespoke designs. Free quotes.",
    sections: {
      intro: "London's architectural heritage includes some of the finest ironwork in the world — from the gates of Buckingham Palace to the railings of Belgravia. Our blacksmiths continue this tradition, creating hand-forged gates, railings, furniture, and decorative ironwork that adds character and value to London properties. Each piece is unique and built to last generations.",
      popularServices: [
        { name: "Hand-Forged Gates", description: "Bespoke entrance and garden gates in traditional or contemporary styles.", priceRange: "£1,000–£5,000" },
        { name: "Decorative Railings", description: "Hand-forged railings for stairs, balconies, and boundaries. Period-accurate or modern designs.", priceRange: "£150–£400 per metre" },
        { name: "Architectural Ironwork", description: "Window grilles, door furniture, brackets, and structural elements.", priceRange: "£200–£1,000" },
        { name: "Furniture & Sculptures", description: "Fire pits, garden furniture, sculptures, and interior pieces.", priceRange: "£300–£5,000" },
        { name: "Restoration", description: "Restore and repair antique ironwork, gates, and railings to their original glory.", priceRange: "£200–£2,000" },
      ],
      areas: londonAreas,
      localInsight: "Blacksmithing is a premium craft — expect to pay significantly more than for standard welded metalwork, but the quality and uniqueness are incomparable. Lead times are typically 4–8 weeks for bespoke pieces. For listed buildings and conservation areas, hand-forged ironwork may be required to match original features. London has a small but thriving blacksmithing community with workshops in industrial areas across the city.",
    },
    faqs: [
      { question: "How much does a hand-forged gate cost?", answer: "A bespoke hand-forged gate costs £1,000–£3,000 for a pedestrian gate or £2,000–£5,000+ for a driveway gate. Prices depend on size, complexity, and finish. Each gate is unique and made to your specifications." },
      { question: "What's the difference between blacksmithing and welding?", answer: "Blacksmithing involves heating metal in a forge and shaping it by hand with hammers and anvils — creating unique, organic forms. Welding joins pre-made metal pieces together. Blacksmithed work has a distinctive hand-crafted quality that welded work can't replicate." },
      { question: "How long does bespoke ironwork take?", answer: "Allow 4–8 weeks from design approval to delivery. Complex pieces or large orders may take longer. Your blacksmith will provide a timeline after discussing your design. Rush orders may be possible at additional cost." },
      { question: "Can you match existing period ironwork?", answer: "Yes, skilled blacksmiths can replicate Victorian, Edwardian, and Georgian ironwork patterns. They'll study the existing pieces and forge matching components. This is often required for listed buildings and conservation areas." },
    ],
    priceGuide: [
      { service: "Pedestrian gate", price: "£1,000–£3,000" },
      { service: "Driveway gate", price: "£2,000–£5,000+" },
      { service: "Railings (per metre)", price: "£150–£400" },
      { service: "Fire pit", price: "£300–£1,000" },
      { service: "Restoration work", price: "£200–£2,000" },
    ],
  },
};

export default content;
