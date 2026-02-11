import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Boiler Repair in London",
    heroText: "Fast boiler repairs by Gas Safe registered engineers across London. No heating or hot water? Get a same-day diagnosis and fix.",
    stats: { totalWorkers: 250, avgRating: 4.7, recentProjects: 1400, avgResponseTime: "Under 2 hours" },
    metaTitle: "Boiler Repair London | Same-Day Fix | Gas Safe | FindTrades",
    metaDescription: "Fast boiler repair in London. 250+ Gas Safe engineers for same-day diagnosis & fix. No heating? No hot water? Emergency callouts 24/7. Free quotes.",
    sections: {
      intro: "A broken boiler in London — especially in winter — is an emergency. Our Gas Safe registered engineers provide rapid diagnosis and repair across all boroughs. Whether your boiler is showing an error code, leaking, making strange noises, or simply not firing up, we'll connect you with a qualified engineer who can fix it fast.",
      popularServices: [
        { name: "Emergency Boiler Repair", description: "Same-day callout for boiler breakdowns. Diagnosis, parts replacement, and testing.", priceRange: "£100–£350" },
        { name: "Boiler Servicing", description: "Annual service to maintain efficiency and warranty. Includes safety checks and cleaning.", priceRange: "£80–£120" },
        { name: "Boiler Replacement", description: "When repair isn't cost-effective. New boiler supply and installation with warranty.", priceRange: "£1,800–£3,500" },
        { name: "Thermostat & Controls", description: "Faulty thermostat replacement, programmer repairs, and smart control upgrades.", priceRange: "£80–£250" },
        { name: "Pressure & Leak Fixes", description: "Low pressure, leaking valves, expansion vessel replacement, and system re-pressurising.", priceRange: "£80–£200" },
      ],
      areas: londonAreas,
      localInsight: "The most common boiler issues in London are low pressure (often caused by micro-leaks in old pipework), faulty diverter valves (no hot water but heating works), and ignition failures. A repair typically costs less than £350 — if your engineer quotes significantly more, it may be worth considering a replacement, especially if your boiler is over 10 years old.",
    },
    faqs: [
      { question: "How much does a boiler repair cost in London?", answer: "Most boiler repairs in London cost £100–£350 including parts. A callout/diagnosis fee of £60–£100 is standard. Common repairs like replacing a diverter valve (£150–£250) or fan (£200–£350) are straightforward for experienced engineers." },
      { question: "Should I repair or replace my boiler?", answer: "As a rule of thumb: if your boiler is under 8 years old, repair it. Over 12 years old, consider replacing. Between 8–12, it depends on the repair cost — if it's more than £500, replacement often makes more financial sense." },
      { question: "Why does my boiler keep losing pressure?", answer: "The most common cause is a small leak somewhere in the system — often at a radiator valve or pipe joint. Other causes include a faulty pressure relief valve or expansion vessel. Your engineer will check the system and identify the source." },
      { question: "Can I get my boiler repaired on the same day?", answer: "Yes, most engineers on FindTrades offer same-day callouts in London. Common parts are carried in the van. If a specialist part is needed, it may take 1–2 days to source, but your engineer will provide a temporary fix if possible." },
    ],
    priceGuide: [
      { service: "Callout & diagnosis", price: "£60–£100" },
      { service: "Diverter valve replacement", price: "£150–£250" },
      { service: "Fan replacement", price: "£200–£350" },
      { service: "PCB replacement", price: "£300–£500" },
      { service: "Annual boiler service", price: "£80–£120" },
      { service: "New boiler (if unrepairable)", price: "£1,800–£3,500" },
    ],
  },
};

export default content;
