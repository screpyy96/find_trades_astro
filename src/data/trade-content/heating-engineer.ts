import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Heating Engineers in London",
    heroText: "Central heating specialists for radiator installations, underfloor heating, and system upgrades across London. Keep your home warm and energy-efficient.",
    stats: { totalWorkers: 190, avgRating: 4.7, recentProjects: 720 },
    metaTitle: "Heating Engineers in London | Central Heating & Radiators | FindTrades",
    metaDescription: "Find heating engineers in London. 190+ verified pros for central heating, radiators, underfloor heating & system upgrades. Free quotes across all boroughs.",
    sections: {
      intro: "London's older housing stock often has inefficient heating systems that drive up energy bills. Our verified heating engineers help you upgrade, repair, and optimise your central heating — from replacing old radiators and balancing systems to installing underfloor heating in extensions and smart thermostats for better control.",
      popularServices: [
        { name: "Central Heating Installation", description: "Full central heating systems for new builds and properties without existing heating. Radiators, pipework, and controls.", priceRange: "£3,000–£6,000" },
        { name: "Radiator Replacement", description: "Upgrade old radiators with modern, efficient models. Includes TRV valves and balancing.", priceRange: "£150–£350 per radiator" },
        { name: "Underfloor Heating", description: "Wet or electric underfloor heating for extensions, bathrooms, and whole-house systems.", priceRange: "£50–£100 per sqm" },
        { name: "Power Flushing", description: "Clean sludge and debris from your central heating system. Improves efficiency and extends boiler life.", priceRange: "£350–£600" },
        { name: "Smart Thermostat Installation", description: "Nest, Hive, Tado, and other smart heating controls. Zoned heating for multi-storey London homes.", priceRange: "£150–£300" },
      ],
      areas: londonAreas,
      localInsight: "Many London homes have heating systems that are 15–20 years old and running at 60–70% efficiency. A power flush and modern controls can improve efficiency by 15–20% without replacing the boiler. Underfloor heating is increasingly popular in London extensions and loft conversions — it frees up wall space and provides even heat distribution.",
    },
    faqs: [
      { question: "How much does a new central heating system cost in London?", answer: "A full central heating system for a 3-bed London house costs £3,000–£6,000 including radiators, pipework, and controls (excluding boiler). Adding a new boiler brings the total to £5,000–£9,000." },
      { question: "Is underfloor heating worth it in London?", answer: "Yes, especially in extensions and bathrooms. It costs £50–£100 per sqm to install and runs more efficiently than radiators. Electric UFH is cheaper to install but costs more to run; wet UFH is the opposite. For a typical London bathroom, electric UFH costs £300–£500 installed." },
      { question: "What is a power flush and do I need one?", answer: "A power flush cleans sludge, rust, and debris from your central heating pipes and radiators. Signs you need one: cold spots on radiators, noisy boiler, slow heating. It costs £350–£600 in London and can significantly improve heating performance." },
      { question: "How often should radiators be replaced?", answer: "Radiators typically last 15–25 years. Replace them if they have persistent cold spots (even after bleeding), visible corrosion, or leaks. Modern radiators are more efficient and come in stylish designs that suit London interiors." },
    ],
    priceGuide: [
      { service: "Radiator replacement (each)", price: "£150–£350", note: "Including TRV" },
      { service: "Power flush (whole system)", price: "£350–£600" },
      { service: "Underfloor heating (per sqm)", price: "£50–£100" },
      { service: "Smart thermostat install", price: "£150–£300" },
      { service: "Full system install (3-bed)", price: "£3,000–£6,000", note: "Excluding boiler" },
    ],
  },
};

export default content;
