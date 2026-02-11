import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "IT & Network Installers in London",
    heroText: "Professional network cabling, Wi-Fi, and IT infrastructure installation across London. Homes, offices, and commercial premises — wired for performance.",
    stats: { totalWorkers: 65, avgRating: 4.7, recentProjects: 340 },
    metaTitle: "IT & Network Installers London | Cabling & Wi-Fi | FindTrades",
    metaDescription: "Find IT & network installers in London. 65+ verified pros for ethernet cabling, Wi-Fi, server rooms & smart home wiring. Free surveys & quotes.",
    sections: {
      intro: "Reliable connectivity is essential for London homes and businesses — whether you're working from home, running an office, or building a smart home. Our verified network installers design and install structured cabling, enterprise Wi-Fi, and IT infrastructure that delivers fast, reliable performance throughout your property.",
      popularServices: [
        { name: "Ethernet Cabling", description: "Cat6/Cat6a structured cabling for homes and offices. Wall plates, patch panels, and testing.", priceRange: "£80–£150 per point" },
        { name: "Wi-Fi Network Design", description: "Enterprise-grade Wi-Fi with mesh access points. Eliminate dead spots in London properties.", priceRange: "£300–£1,000" },
        { name: "Home Network Setup", description: "Router configuration, network switches, and whole-home connectivity.", priceRange: "£150–£400" },
        { name: "Office IT Infrastructure", description: "Server racks, patch panels, cable management, and UPS systems.", priceRange: "£500–£5,000" },
        { name: "Smart Home Wiring", description: "Pre-wire for smart lighting, speakers, CCTV, and home automation systems.", priceRange: "£200–£1,000" },
      ],
      areas: londonAreas,
      localInsight: "London's thick Victorian walls and multi-storey layouts make Wi-Fi coverage challenging. A single router rarely covers a whole London house — mesh Wi-Fi systems or ethernet backhaul are usually needed. For home offices, a wired ethernet connection is always more reliable than Wi-Fi. Cat6a cabling is recommended for future-proofing as it supports 10Gbps speeds.",
    },
    faqs: [
      { question: "How much does ethernet cabling cost in London?", answer: "Ethernet cabling costs £80–£150 per point in London, including cable, wall plate, and testing. A typical home office setup (2–4 points) costs £200–£500. Whole-house wiring (8–12 points) costs £600–£1,500." },
      { question: "Do I need ethernet if I have good Wi-Fi?", answer: "For general browsing, Wi-Fi is fine. For home offices, gaming, 4K streaming, and smart home hubs, ethernet is significantly more reliable and faster. It also reduces Wi-Fi congestion for your other devices." },
      { question: "Can you run cables in an existing London house?", answer: "Yes — experienced installers can route cables through existing walls, under floors, and in loft spaces with minimal disruption. Victorian houses with suspended floors and loft access are usually straightforward. Concrete floors in flats may require surface-mounted trunking." },
      { question: "What's the best Wi-Fi solution for a London house?", answer: "A mesh Wi-Fi system (Ubiquiti, TP-Link Omada, or similar) with ethernet backhaul between access points. One access point per floor is typical for a London terraced house. Your installer will survey your property and recommend the optimal placement." },
    ],
    priceGuide: [
      { service: "Ethernet point (each)", price: "£80–£150" },
      { service: "Wi-Fi mesh system", price: "£300–£1,000" },
      { service: "Home network setup", price: "£150–£400" },
      { service: "Office cabling (per point)", price: "£100–£200" },
      { service: "Smart home pre-wire", price: "£200–£1,000" },
    ],
  },
};

export default content;
