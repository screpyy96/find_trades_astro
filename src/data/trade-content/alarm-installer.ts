import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Alarm Installers in London",
    heroText: "Professional burglar alarm installation across London. Wired, wireless, and smart alarm systems — fitted by SSAIB/NSI-approved installers.",
    stats: { totalWorkers: 80, avgRating: 4.7, recentProjects: 440 },
    metaTitle: "Alarm Installers in London | Burglar & Smart Alarms | FindTrades",
    metaDescription: "Find alarm installers in London. 80+ SSAIB/NSI-approved pros for burglar alarms, smart systems & monitored alarms. Free quotes across all boroughs.",
    sections: {
      intro: "A properly installed alarm system is one of the most effective deterrents against burglary in London. Our verified alarm installers fit wired, wireless, and hybrid systems from leading brands. Whether you want a basic bell-only alarm or a fully monitored smart system with police response, they'll design a solution that fits your property and budget.",
      popularServices: [
        { name: "Wireless Alarm System", description: "Quick installation with no wiring. Ideal for London flats and rental properties. Smartphone control.", priceRange: "£300–£800" },
        { name: "Wired Alarm System", description: "Hardwired sensors and control panel. More reliable for larger London properties.", priceRange: "£500–£1,500" },
        { name: "Smart Alarm System", description: "App-controlled with smart home integration. Cameras, sensors, and automation.", priceRange: "£400–£1,200" },
        { name: "Monitored Alarm", description: "24/7 monitoring centre with keyholder or police response. NSI Gold standard.", priceRange: "£500–£1,500 + £20–£40/month" },
        { name: "Alarm Repair & Upgrade", description: "Fix faulty sensors, replace panels, and upgrade old systems to modern standards.", priceRange: "£80–£300" },
      ],
      areas: londonAreas,
      localInsight: "For insurance discounts on London properties, you typically need an NSI or SSAIB-approved alarm system. Bell-only alarms are the cheapest but least effective — monitored systems with police response provide the best protection. Many London insurers require a monitored alarm for high-value properties.",
    },
    faqs: [
      { question: "How much does a burglar alarm cost in London?", answer: "A wireless alarm system costs £300–£800 installed. Wired systems cost £500–£1,500. Monitored systems add £20–£40 per month. For insurance-approved systems, budget £500+ and ensure your installer is SSAIB or NSI registered." },
      { question: "Do I need a monitored alarm?", answer: "It depends on your insurance requirements and security needs. Bell-only alarms deter opportunistic burglars. Monitored alarms provide 24/7 protection with keyholder or police response. Check your insurance policy — some require monitored systems for full cover." },
      { question: "Can I install an alarm in a rented London flat?", answer: "Wireless alarms are ideal for renters — they don't require drilling or permanent wiring and can be taken with you when you move. Always check with your landlord first, but most are happy for tenants to improve security." },
      { question: "How long does alarm installation take?", answer: "A wireless alarm takes 2–4 hours to install. A wired system takes 1–2 days depending on property size. Your installer will survey your property first and recommend sensor placement for optimal coverage." },
    ],
    priceGuide: [
      { service: "Wireless alarm system", price: "£300–£800" },
      { service: "Wired alarm system", price: "£500–£1,500" },
      { service: "Monitored alarm", price: "£500–£1,500", note: "+ £20–£40/month" },
      { service: "Alarm repair", price: "£80–£300" },
      { service: "Sensor addition", price: "£40–£80", note: "Per sensor" },
    ],
  },
};

export default content;
