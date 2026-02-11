import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Solar Panel Installers in London",
    heroText: "MCS-certified solar panel installation across London. Reduce your energy bills and carbon footprint with rooftop solar — battery storage options available.",
    stats: { totalWorkers: 75, avgRating: 4.8, recentProjects: 380 },
    metaTitle: "Solar Panels London | MCS Certified Installation | FindTrades",
    metaDescription: "Find solar panel installers in London. 75+ MCS-certified pros for rooftop solar, battery storage & EV integration. Free surveys & quotes.",
    sections: {
      intro: "London gets more sunshine than you might think — enough to make solar panels a smart investment. A typical London rooftop system generates 3,000–4,500 kWh per year, cutting electricity bills by £500–£900 annually. Our MCS-certified installers handle everything from initial survey to grid connection, and can advise on battery storage to maximise your savings.",
      popularServices: [
        { name: "Rooftop Solar Panels", description: "3–4kW systems for typical London homes. MCS-certified installation with 25-year panel warranty.", priceRange: "£5,000–£8,000" },
        { name: "Battery Storage", description: "Store excess solar energy for evening use. Tesla Powerwall, GivEnergy, and other brands.", priceRange: "£3,000–£6,000" },
        { name: "Solar + Battery Bundle", description: "Combined solar panel and battery system for maximum self-consumption and savings.", priceRange: "£8,000–£14,000" },
        { name: "Solar Panel Maintenance", description: "Cleaning, inspection, and inverter checks to maintain optimal performance.", priceRange: "£100–£200" },
        { name: "EV Charger + Solar", description: "Integrate an EV charger with your solar system to charge your car from the sun.", priceRange: "£1,000–£2,000", },
      ],
      areas: londonAreas,
      localInsight: "South-facing London roofs are ideal for solar, but east-west facing roofs also work well with modern panels. Most London terraced houses can fit a 3–4kW system (8–10 panels). Planning permission isn't usually needed unless you're in a conservation area or have a listed building. The Smart Export Guarantee (SEG) pays you for excess electricity exported to the grid.",
    },
    faqs: [
      { question: "How much do solar panels cost in London?", answer: "A typical 3.5kW system (8–10 panels) costs £5,000–£7,000 installed. A 4kW system with battery storage costs £8,000–£14,000. Payback period is typically 6–9 years, after which you enjoy free electricity for 15–20 more years." },
      { question: "Do solar panels work in London's weather?", answer: "Yes — solar panels work with daylight, not direct sunshine. London receives enough solar radiation for panels to generate 3,000–4,500 kWh per year. Even on cloudy days, panels produce 10–25% of their peak output." },
      { question: "Do I need planning permission for solar panels in London?", answer: "Usually no — solar panels are permitted development for most London homes. Exceptions include listed buildings, conservation areas, and panels that protrude more than 200mm from the roof. Flat roof installations may have different rules." },
      { question: "Is battery storage worth it?", answer: "With London electricity prices at 24–30p/kWh, battery storage makes increasing financial sense. A battery lets you use solar energy in the evening when you need it most. Payback on a battery alone is 7–10 years, but combined with solar the economics are compelling." },
    ],
    priceGuide: [
      { service: "3.5kW solar system", price: "£5,000–£7,000" },
      { service: "4kW solar system", price: "£6,000–£8,000" },
      { service: "Battery storage", price: "£3,000–£6,000" },
      { service: "Solar + battery bundle", price: "£8,000–£14,000" },
      { service: "Annual maintenance", price: "£100–£200" },
    ],
  },
};

export default content;
