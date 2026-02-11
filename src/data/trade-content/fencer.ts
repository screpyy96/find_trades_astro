import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Fencing Contractors in London",
    heroText: "Professional fence installation and repair across London. Close-board, panel, picket, and contemporary fencing — built to last in London's weather.",
    stats: { totalWorkers: 130, avgRating: 4.6, recentProjects: 480 },
    metaTitle: "Fencing in London | Installation & Repair | FindTrades",
    metaDescription: "Find fencing contractors in London. 130+ verified pros for close-board, panel, picket & contemporary fencing. Repairs & new installations. Free quotes.",
    sections: {
      intro: "Good fencing provides privacy, security, and a clean backdrop for your London garden. Whether you need storm-damaged panels replaced, a new close-board fence along your boundary, or a contemporary slatted screen for a modern garden, our verified London fencers deliver solid, long-lasting results.",
      popularServices: [
        { name: "Close-Board Fencing", description: "The strongest and most popular London fence type. Vertical feather-edge boards on horizontal rails.", priceRange: "£80–£130 per metre" },
        { name: "Panel Fencing", description: "Lap panel or hit-and-miss panels between concrete or timber posts. Quick and cost-effective.", priceRange: "£50–£90 per metre" },
        { name: "Contemporary Slatted Fencing", description: "Horizontal slat screens for modern gardens. Cedar, composite, or aluminium options.", priceRange: "£120–£250 per metre" },
        { name: "Fence Repairs", description: "Replace damaged panels, posts, and gravel boards. Storm damage repairs.", priceRange: "£50–£150 per panel" },
        { name: "Gates", description: "Pedestrian and driveway gates in timber, metal, or composite. Manual or automated.", priceRange: "£200–£1,500" },
      ],
      areas: londonAreas,
      localInsight: "London fencing costs are higher than average due to access difficulties — many London gardens are only accessible through the house. Close-board fencing is the most durable option and lasts 15–20 years with treatment. Panel fencing is cheaper but typically lasts 8–12 years. Always check boundary ownership before replacing a fence — the T-mark on your title plan shows which boundaries you're responsible for.",
    },
    faqs: [
      { question: "How much does new fencing cost in London?", answer: "Close-board fencing costs £80–£130 per metre in London. Panel fencing costs £50–£90 per metre. A typical London garden (10–15 metres of fencing) costs £500–£1,500 for panels or £800–£2,000 for close-board. Includes posts, concrete, and installation." },
      { question: "Who is responsible for the fence between properties?", answer: "Check your title deeds — the T-mark indicates ownership. If there's no T-mark, it's often the left-hand boundary when facing the garden from the house, but this isn't a legal rule. If in doubt, discuss with your neighbour before replacing." },
      { question: "How long does fence installation take?", answer: "A typical London garden fence (10–15 metres) takes 1–2 days to install. Concrete posts need 24 hours to set before panels are fitted. If old fencing needs removing, add half a day." },
      { question: "Do I need planning permission for a fence in London?", answer: "Fences up to 2 metres high don't need planning permission (1 metre if adjacent to a highway). In conservation areas, check with your council. Some London leases also have restrictions on fence types and heights." },
    ],
    priceGuide: [
      { service: "Close-board (per metre)", price: "£80–£130" },
      { service: "Panel fencing (per metre)", price: "£50–£90" },
      { service: "Slatted screen (per metre)", price: "£120–£250" },
      { service: "Panel replacement", price: "£50–£150", note: "Per panel" },
      { service: "Garden gate", price: "£200–£600" },
    ],
  },
};

export default content;
