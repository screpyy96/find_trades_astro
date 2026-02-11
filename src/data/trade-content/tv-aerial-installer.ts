import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "TV Aerial & Satellite Installers in London",
    heroText: "Professional TV aerial, satellite dish, and AV installation across London. Freeview, Sky, and multi-room setups by verified local engineers.",
    stats: { totalWorkers: 70, avgRating: 4.6, recentProjects: 380 },
    metaTitle: "TV Aerial Installers London | Freeview, Sky & AV | FindTrades",
    metaDescription: "Find TV aerial & satellite installers in London. 70+ verified pros for aerials, dishes, wall mounting & multi-room AV. Same-day service. Free quotes.",
    sections: {
      intro: "Whether you've lost your Freeview signal, need a satellite dish aligned, or want a full multi-room AV setup in your London home, our verified installers handle it all. From rooftop aerial installations in Victorian terraces to discreet satellite dishes on modern apartments, they'll get you connected with a clean, professional installation.",
      popularServices: [
        { name: "TV Aerial Installation", description: "New Freeview aerials, loft aerials, and rooftop installations. Signal testing included.", priceRange: "£100–£250" },
        { name: "Satellite Dish Installation", description: "Sky, Freesat, and foreign satellite dish fitting. Alignment and signal optimisation.", priceRange: "£80–£200" },
        { name: "TV Wall Mounting", description: "Mount your TV on the wall with concealed cables. All sizes and wall types.", priceRange: "£80–£150" },
        { name: "Multi-Room Distribution", description: "Send TV signal to multiple rooms. Wired and wireless solutions.", priceRange: "£150–£400" },
        { name: "Aerial Repair", description: "Fix poor signal, replace damaged aerials, and realign dishes after storms.", priceRange: "£60–£150" },
      ],
      areas: londonAreas,
      localInsight: "London's tall buildings and dense housing can cause signal issues — a loft aerial may not work in all areas. Your installer will test signal strength and recommend the best solution. In conservation areas, satellite dishes may need planning permission if visible from the street. Many London flats have communal aerial systems — check with your freeholder before installing individual equipment.",
    },
    faqs: [
      { question: "How much does a TV aerial cost in London?", answer: "A new Freeview aerial installed costs £100–£250 in London. Loft aerials are cheaper (£80–£150) but may have weaker signal. Rooftop aerials provide the best reception. Price includes aerial, cabling, and signal testing." },
      { question: "Can I have a satellite dish on my London flat?", answer: "You have the right to install a dish under 60cm without planning permission, but check your lease — many London freeholders require consent. In conservation areas, dishes visible from the street may need planning permission." },
      { question: "Why is my Freeview signal poor?", answer: "Common causes in London: aerial damage from weather, cable deterioration, interference from nearby buildings or 5G masts, and weak signal areas. An engineer can diagnose the issue and recommend the best fix — often a new aerial or amplifier solves it." },
      { question: "How long does aerial installation take?", answer: "A standard aerial installation takes 1–2 hours. TV wall mounting takes 30–60 minutes. Multi-room setups take 2–4 hours depending on the number of rooms and cable routing." },
    ],
    priceGuide: [
      { service: "TV aerial (installed)", price: "£100–£250" },
      { service: "Satellite dish", price: "£80–£200" },
      { service: "TV wall mount", price: "£80–£150" },
      { service: "Aerial repair", price: "£60–£150" },
      { service: "Multi-room setup", price: "£150–£400" },
    ],
  },
};

export default content;
