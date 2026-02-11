import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Joiners in London",
    heroText: "Expert joiners for staircases, windows, doors, and bespoke timber work across London. Workshop-crafted quality fitted on-site by skilled professionals.",
    stats: { totalWorkers: 170, avgRating: 4.8, recentProjects: 580 },
    metaTitle: "Joiners in London | Staircases, Windows & Bespoke | FindTrades",
    metaDescription: "Find expert joiners in London. 170+ verified pros for staircases, sash windows, doors & bespoke timber work. Free quotes across all boroughs.",
    sections: {
      intro: "London joiners specialise in the precision timber work that gives homes their character — from handcrafted staircases and sash window restoration to bespoke kitchen cabinets and period-accurate mouldings. Our verified joiners combine traditional craftsmanship with modern techniques, working from their own workshops to deliver pieces that fit perfectly in your London home.",
      popularServices: [
        { name: "Staircase Design & Build", description: "New staircases, staircase renovations, and loft conversion stairs. Hardwood, softwood, and glass balustrade options.", priceRange: "£2,000–£8,000" },
        { name: "Sash Window Restoration", description: "Draught-proofing, cord replacement, and full restoration of traditional London sash windows.", priceRange: "£300–£800 per window" },
        { name: "Bespoke Doors & Frames", description: "Custom-made internal and external doors to match period properties or create modern designs.", priceRange: "£400–£1,200 per door" },
        { name: "Kitchen & Cabinet Making", description: "Handmade kitchen cabinets, vanity units, and built-in furniture. Solid wood and veneered options.", priceRange: "£5,000–£15,000" },
        { name: "Period Mouldings & Architrave", description: "Matching and reproducing Victorian/Edwardian moulding profiles, architraves, and skirting boards.", priceRange: "£15–£40 per metre" },
      ],
      areas: londonAreas,
      localInsight: "London joiners charge £250–£400 per day. Sash window restoration is a huge market in London — double-glazed replacements often aren't allowed in conservation areas, making restoration the only option. A good joiner can draught-proof and refurbish sash windows to perform almost as well as modern units. For bespoke work, expect a 2–6 week lead time for workshop fabrication.",
    },
    faqs: [
      { question: "How much does a new staircase cost in London?", answer: "A new staircase in London costs £2,000–£5,000 for softwood or £4,000–£8,000 for hardwood. Glass balustrades add £1,000–£3,000. Loft conversion staircases start from £1,500 for a basic design." },
      { question: "Can sash windows be repaired instead of replaced?", answer: "Yes, and in conservation areas it's often required. A skilled joiner can replace rotten sections, fit new cords, add draught-proofing, and even install slim-profile double glazing within the existing frames. Cost is £300–£800 per window vs £1,000+ for full replacement." },
      { question: "How long does bespoke joinery take?", answer: "Allow 2–6 weeks for workshop fabrication depending on complexity, plus 1–3 days for on-site installation. Simple items like shelving take less time; a full kitchen or staircase takes longer. Your joiner will give a timeline after the design consultation." },
      { question: "What wood should I choose for interior joinery?", answer: "Oak is the premium choice for visible joinery — durable and beautiful. Tulipwood and MDF are excellent for painted finishes. Softwood (pine) is budget-friendly but less durable. Your joiner will recommend the best option for your project and budget." },
    ],
    priceGuide: [
      { service: "New staircase (softwood)", price: "£2,000–£5,000" },
      { service: "Sash window restoration", price: "£300–£800", note: "Per window" },
      { service: "Bespoke door (made & fitted)", price: "£400–£1,200" },
      { service: "Architrave replacement", price: "£15–£30 per metre" },
      { service: "Skirting board (supply & fit)", price: "£10–£25 per metre" },
    ],
  },
};

export default content;
