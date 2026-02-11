import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "CCTV & Security Installation in London",
    heroText: "Professional CCTV and security system installation across London. Protect your home or business with HD cameras, smart doorbells, and monitored systems.",
    stats: { totalWorkers: 95, avgRating: 4.7, recentProjects: 520 },
    metaTitle: "CCTV & Security in London | Installation & Monitoring | FindTrades",
    metaDescription: "Find CCTV & security installers in London. 95+ verified pros for HD cameras, smart doorbells, access control & monitored systems. Free quotes.",
    sections: {
      intro: "London's property crime rates make home and business security a priority. Our verified security installers design and fit CCTV systems, smart doorbells, access control, and intruder alarms tailored to your property. From a simple Ring doorbell to a full commercial CCTV system with remote monitoring, you'll find the right installer here.",
      popularServices: [
        { name: "Home CCTV System", description: "2–4 HD cameras with DVR/NVR, remote viewing via smartphone app. Wired or wireless options.", priceRange: "£400–£1,200" },
        { name: "Smart Doorbell Installation", description: "Ring, Nest, or similar video doorbells. Includes wiring and Wi-Fi setup.", priceRange: "£100–£200" },
        { name: "Commercial CCTV", description: "Multi-camera systems for offices, retail, and warehouses. PTZ cameras and analytics available.", priceRange: "£1,000–£5,000" },
        { name: "Access Control", description: "Keypad, fob, and biometric entry systems for flats, offices, and gated properties.", priceRange: "£500–£2,000" },
        { name: "Intercom Systems", description: "Audio and video intercom for flats and houses. Integration with smart home systems.", priceRange: "£300–£1,000" },
      ],
      areas: londonAreas,
      localInsight: "When installing CCTV in London, be aware of GDPR and data protection rules — cameras must not overlook neighbours' properties or public spaces without justification. Your installer should advise on camera positioning and signage requirements. For rental properties, check with your landlord before installing. Wired systems are more reliable than wireless for permanent installations.",
    },
    faqs: [
      { question: "How much does a home CCTV system cost in London?", answer: "A basic 2-camera home CCTV system costs £400–£700 installed. A 4-camera HD system costs £700–£1,200. This includes cameras, recorder, cabling, and setup with smartphone viewing. Monthly monitoring adds £15–£30." },
      { question: "Wired or wireless CCTV — which is better?", answer: "Wired is more reliable and provides better image quality — recommended for permanent installations. Wireless is easier to install and good for renters or temporary setups. Battery-powered cameras need recharging every 2–6 months." },
      { question: "Do I need permission to install CCTV in London?", answer: "For your own property, no planning permission is needed. However, you must comply with GDPR — cameras should primarily cover your own property. If they capture public areas or neighbours' property, you must display signage and handle footage responsibly." },
      { question: "Can I view my cameras remotely?", answer: "Yes, all modern CCTV systems offer smartphone apps for remote viewing. You can watch live feeds, receive motion alerts, and review recordings from anywhere. Your installer will set this up during installation." },
    ],
    priceGuide: [
      { service: "2-camera home system", price: "£400–£700" },
      { service: "4-camera HD system", price: "£700–£1,200" },
      { service: "Smart doorbell install", price: "£100–£200" },
      { service: "Commercial CCTV", price: "£1,000–£5,000" },
      { service: "Intercom system", price: "£300–£1,000" },
    ],
  },
};

export default content;
