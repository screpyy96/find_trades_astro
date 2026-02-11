import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "EV Charger Installers in London",
    heroText: "OZEV-approved electric vehicle charger installation across London. Home and workplace charging points — fitted by certified electricians.",
    stats: { totalWorkers: 85, avgRating: 4.8, recentProjects: 460 },
    metaTitle: "EV Charger Installation London | OZEV Approved | FindTrades",
    metaDescription: "Find EV charger installers in London. 85+ OZEV-approved pros for home & workplace charging. 7kW–22kW chargers. Grant-eligible. Free surveys.",
    sections: {
      intro: "With London's ULEZ expansion and the shift to electric vehicles, home charging is becoming essential. Our OZEV-approved installers fit 7kW and 22kW chargers from leading brands like Ohme, Zappi, Easee, and Pod Point. They handle everything from electrical survey to installation and grant applications.",
      popularServices: [
        { name: "Home EV Charger (7kW)", description: "Standard home charger with dedicated circuit. Smart features for off-peak charging.", priceRange: "£800–£1,200" },
        { name: "Workplace Charger", description: "Single or multiple charging points for offices and car parks. Load management included.", priceRange: "£1,000–£2,500" },
        { name: "Fast Charger (22kW)", description: "Three-phase charger for faster charging. Requires 3-phase supply.", priceRange: "£1,500–£3,000" },
        { name: "Charger + Solar Integration", description: "Connect your EV charger to solar panels for free driving miles.", priceRange: "£1,200–£2,500" },
        { name: "Electrical Upgrade", description: "Consumer unit upgrade or supply increase to support EV charging.", priceRange: "£300–£800" },
      ],
      areas: londonAreas,
      localInsight: "Most London homes have single-phase electricity, which supports a 7kW charger — enough to fully charge a typical EV overnight. If you live in a flat, you'll need freeholder permission and a dedicated parking space. The OZEV grant provides up to £350 off for eligible installations. Smart chargers are now mandatory for new installations.",
    },
    faqs: [
      { question: "How much does a home EV charger cost in London?", answer: "A 7kW home charger costs £800–£1,200 fully installed, before any grants. The OZEV grant provides up to £350 off for eligible properties. Popular brands include Ohme (from £800), Zappi (from £900), and Pod Point (from £850)." },
      { question: "Can I get an EV charger in my London flat?", answer: "Yes, if you have a dedicated parking space and freeholder permission. The OZEV grant covers flats and rental properties. Your installer will assess the electrical route from your flat's consumer unit to the parking space." },
      { question: "How long does installation take?", answer: "A standard home installation takes 2–4 hours. If electrical upgrades are needed (new circuit, consumer unit upgrade), it may take a full day. Your installer will survey your property first and provide a fixed quote." },
      { question: "Do I need to upgrade my electrics?", answer: "Most London homes can support a 7kW charger without upgrades. Your installer will check your consumer unit and supply capacity during the survey. If an upgrade is needed, they'll include it in the quote." },
    ],
    priceGuide: [
      { service: "7kW home charger", price: "£800–£1,200", note: "Before OZEV grant" },
      { service: "22kW charger (3-phase)", price: "£1,500–£3,000" },
      { service: "Workplace charger", price: "£1,000–£2,500" },
      { service: "Consumer unit upgrade", price: "£300–£600", note: "If needed" },
    ],
  },
};

export default content;
