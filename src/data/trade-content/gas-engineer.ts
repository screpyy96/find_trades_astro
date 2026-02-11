import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Gas Engineers in London",
    heroText: "Gas Safe registered engineers for boiler installations, gas repairs, and safety checks across London. Emergency gas leak callouts available 24/7.",
    stats: { totalWorkers: 220, avgRating: 4.8, recentProjects: 950, avgResponseTime: "Under 2 hours" },
    metaTitle: "Gas Engineers in London | Gas Safe Registered | FindTrades",
    metaDescription: "Find Gas Safe registered engineers in London. 220+ verified pros for boiler installs, gas repairs, safety certificates & emergencies. Free quotes, all boroughs.",
    sections: {
      intro: "Gas work in London is strictly regulated — and for good reason. Every gas engineer on FindTrades is Gas Safe registered, meaning they're legally qualified to work on boilers, gas cookers, fires, and pipework. Whether you need a new boiler installed in your Islington flat or an emergency gas leak repair in Croydon, our verified engineers respond quickly and work safely.",
      popularServices: [
        { name: "Boiler Installation", description: "New combi, system, or regular boiler installation. Includes removal of old boiler, pipework modifications, and commissioning.", priceRange: "£1,800–£3,500" },
        { name: "Gas Safety Certificate (CP12)", description: "Annual gas safety inspection required for all London rental properties. Covers all gas appliances.", priceRange: "£60–£90" },
        { name: "Boiler Repair", description: "Diagnosis and repair of boiler faults including no heating, no hot water, leaks, and error codes.", priceRange: "£100–£350" },
        { name: "Gas Cooker Installation", description: "Connect or disconnect gas cookers and hobs. Includes safety testing and certificate.", priceRange: "£80–£150" },
        { name: "Gas Pipe Installation", description: "New gas pipe runs for boilers, cookers, and gas fires. Includes pressure testing.", priceRange: "£40–£80 per metre" },
      ],
      areas: londonAreas,
      localInsight: "London landlords must have a valid Gas Safety Certificate (CP12) for every rental property — fines for non-compliance can reach £6,000. When replacing a boiler, combi boilers are the most popular choice in London flats as they don't need a hot water cylinder. Always verify your engineer's Gas Safe registration at GasSafeRegister.co.uk before any work begins.",
    },
    faqs: [
      { question: "How much does a new boiler cost in London?", answer: "A new combi boiler installed in London costs £1,800–£3,500 depending on the brand and complexity. Premium brands like Vaillant and Worcester Bosch are at the higher end. This includes removal of the old boiler, new flue, and all connections." },
      { question: "How often do I need a gas safety check?", answer: "Landlords must have an annual Gas Safety Certificate (CP12) for rental properties. Homeowners aren't legally required to but it's strongly recommended. A gas safety check costs £60–£90 in London and covers all gas appliances." },
      { question: "What should I do if I smell gas?", answer: "Open windows, don't use switches or flames, leave the property, and call the National Gas Emergency line on 0800 111 999. This is a free 24/7 service. Don't re-enter until given the all-clear by a Gas Safe engineer." },
      { question: "How long does a boiler installation take?", answer: "A straightforward like-for-like boiler swap takes 1 day. If the boiler is being moved to a new location or the system type is changing (e.g., regular to combi), allow 2–3 days." },
    ],
    priceGuide: [
      { service: "New combi boiler (installed)", price: "£1,800–£3,500" },
      { service: "Gas Safety Certificate", price: "£60–£90" },
      { service: "Boiler service", price: "£80–£120" },
      { service: "Boiler repair", price: "£100–£350" },
      { service: "Gas cooker connection", price: "£80–£150" },
      { service: "Gas pipe run (per metre)", price: "£40–£80" },
    ],
  },
};

export default content;
