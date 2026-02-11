import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Appliance Repair in London",
    heroText: "Fast appliance repairs across London. Washing machines, dishwashers, ovens, fridges, and dryers — fixed by manufacturer-trained engineers.",
    stats: { totalWorkers: 110, avgRating: 4.6, recentProjects: 820, avgResponseTime: "Same day" },
    metaTitle: "Appliance Repair London | Same-Day Fix | FindTrades",
    metaDescription: "Fast appliance repair in London. 110+ verified engineers for washing machines, ovens, fridges & dishwashers. Same-day callouts. Free quotes.",
    sections: {
      intro: "A broken washing machine or fridge is more than an inconvenience — it disrupts your daily routine. Our verified London appliance engineers diagnose and repair all major brands quickly, often on the same day. Most carry common parts in their van, meaning many repairs are completed in a single visit.",
      popularServices: [
        { name: "Washing Machine Repair", description: "Drum bearings, door seals, pumps, and control board faults. All brands covered.", priceRange: "£80–£180" },
        { name: "Oven & Cooker Repair", description: "Elements, thermostats, fans, and door hinges. Gas and electric ovens.", priceRange: "£70–£200" },
        { name: "Fridge & Freezer Repair", description: "Compressor issues, thermostat faults, and ice buildup. Domestic and American-style.", priceRange: "£80–£250" },
        { name: "Dishwasher Repair", description: "Drainage problems, spray arm faults, and door latch repairs.", priceRange: "£70–£160" },
        { name: "Tumble Dryer Repair", description: "Heating elements, belts, and sensor faults. Condenser and vented models.", priceRange: "£70–£180" },
      ],
      areas: londonAreas,
      localInsight: "Appliance repair in London typically costs £80–£180 — much cheaper than replacing. A callout fee of £50–£80 usually applies and is deducted from the repair cost if you go ahead. For appliances under 5 years old, repair is almost always worthwhile. Over 8–10 years, weigh repair cost against replacement.",
    },
    faqs: [
      { question: "How much does appliance repair cost in London?", answer: "Most repairs cost £80–£180 including parts. A callout/diagnosis fee of £50–£80 is standard and usually deducted from the repair bill. Complex repairs (compressor, control board) can cost £150–£250." },
      { question: "Is it worth repairing an old washing machine?", answer: "If the machine is under 6 years old, almost always yes. Between 6–10 years, it depends on the repair cost — if it's more than 50% of a new machine, consider replacing. Over 10 years, replacement is usually more cost-effective." },
      { question: "Can you repair my appliance the same day?", answer: "Most London engineers on FindTrades offer same-day or next-day callouts. Common parts are carried in the van. If a specialist part is needed, it's usually sourced within 1–3 days." },
      { question: "Do you repair all brands?", answer: "Yes — our engineers work on all major brands including Bosch, Samsung, LG, Miele, Hotpoint, Beko, Siemens, and more. Some specialise in specific brands and carry manufacturer-specific parts." },
    ],
    priceGuide: [
      { service: "Callout & diagnosis", price: "£50–£80" },
      { service: "Washing machine repair", price: "£80–£180" },
      { service: "Oven repair", price: "£70–£200" },
      { service: "Fridge repair", price: "£80–£250" },
      { service: "Dishwasher repair", price: "£70–£160" },
    ],
  },
};

export default content;
