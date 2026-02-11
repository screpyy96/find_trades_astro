import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Drainage Specialists in London",
    heroText: "Professional drain unblocking, repair, and installation across London. CCTV surveys, root removal, and drain relining — fast response for emergencies.",
    stats: { totalWorkers: 110, avgRating: 4.6, recentProjects: 780, avgResponseTime: "Under 2 hours" },
    metaTitle: "Drainage Specialists London | Unblocking & Repair | FindTrades",
    metaDescription: "Find drainage specialists in London. 110+ verified pros for drain unblocking, CCTV surveys, repairs & relining. Emergency callouts 24/7. Free quotes.",
    sections: {
      intro: "London's Victorian sewer system serves millions of properties — and it shows its age regularly. Blocked drains, tree root intrusion, collapsed pipes, and fatbergs are common problems. Our verified drainage specialists use CCTV cameras, high-pressure jetting, and no-dig repair techniques to diagnose and fix drainage issues quickly with minimal disruption.",
      popularServices: [
        { name: "Drain Unblocking", description: "High-pressure water jetting to clear blockages. Effective on fat, grease, roots, and debris.", priceRange: "£80–£200" },
        { name: "CCTV Drain Survey", description: "Camera inspection to identify blockages, damage, and structural issues. DVD/USB report included.", priceRange: "£150–£350" },
        { name: "Drain Repair & Relining", description: "No-dig pipe relining to fix cracks and damage without excavation. 50-year guarantee.", priceRange: "£500–£2,000" },
        { name: "Root Removal", description: "Mechanical root cutting and chemical treatment to clear tree root intrusion.", priceRange: "£200–£500" },
        { name: "New Drainage Installation", description: "New drain runs, soakaways, and connections for extensions and new builds.", priceRange: "£1,000–£5,000" },
      ],
      areas: londonAreas,
      localInsight: "London's clay soil causes ground movement that cracks drain pipes, allowing tree roots to enter. If you have large trees near your property, regular CCTV surveys (every 2–3 years) can catch problems early. For property purchases, a pre-purchase drain survey (£150–£350) is highly recommended — drain repairs can cost thousands if discovered after completion.",
    },
    faqs: [
      { question: "How much does drain unblocking cost in London?", answer: "A standard drain unblocking in London costs £80–£200 using high-pressure jetting. Severe blockages or those requiring root cutting may cost £200–£500. Emergency callouts (evenings/weekends) attract a premium of £50–£100." },
      { question: "Should I get a drain survey before buying a house?", answer: "Strongly recommended for London properties, especially older ones. A CCTV drain survey costs £150–£350 and can reveal cracked pipes, root intrusion, or collapsed drains that could cost thousands to repair. It's a small price for peace of mind." },
      { question: "What causes blocked drains in London?", answer: "The most common causes are fat/grease buildup, wet wipes (even 'flushable' ones), tree root intrusion, and structural damage to old clay pipes. London's Victorian drainage system is particularly susceptible to root damage." },
      { question: "What is drain relining?", answer: "A no-dig repair method where a resin-coated liner is inserted into the damaged pipe and cured in place, creating a new pipe within the old one. It's faster, cheaper, and less disruptive than excavation. Most relinings come with a 50-year guarantee." },
    ],
    priceGuide: [
      { service: "Drain unblocking", price: "£80–£200" },
      { service: "CCTV survey", price: "£150–£350" },
      { service: "Drain relining (per metre)", price: "£100–£300" },
      { service: "Root removal", price: "£200–£500" },
      { service: "Emergency callout", price: "£120–£250" },
    ],
  },
};

export default content;
