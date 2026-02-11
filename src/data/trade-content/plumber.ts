import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Plumbers in London",
    heroText: "From burst pipes in Hackney to bathroom installations in Kensington — find trusted, Gas Safe registered plumbers across all London boroughs. Emergency callouts available 24/7.",
    stats: { totalWorkers: 420, avgRating: 4.7, recentProjects: 1800, avgResponseTime: "Under 1 hour" },
    metaTitle: "Plumbers in London | Emergency & General Plumbing | FindTrades",
    metaDescription: "Find trusted plumbers across London. 420+ verified pros, 24/7 emergency callouts, free quotes. Bathroom fitting, boiler repair, leak detection — all boroughs covered.",
    sections: {
      intro: "London's ageing Victorian and Edwardian housing stock means plumbing emergencies are a fact of life. Whether it's a leaking pipe behind a lath-and-plaster wall in Islington or a full bathroom refit in a Docklands apartment, our verified London plumbers handle everything from quick fixes to major installations. All are fully insured and many hold Gas Safe registration for boiler and gas work.",
      popularServices: [
        { name: "Emergency Plumbing", description: "Burst pipes, leaks, blocked drains, and overflows. 24/7 availability across London with rapid response times.", priceRange: "£80–£150 callout + hourly" },
        { name: "Bathroom Installation", description: "Full bathroom fitting including plumbing, tiling, and fixtures. Design to completion service available.", priceRange: "£3,000–£8,000" },
        { name: "Boiler Repair & Servicing", description: "Annual servicing, breakdown repairs, and gas safety checks by Gas Safe registered engineers.", priceRange: "£80–£300" },
        { name: "Leak Detection & Repair", description: "Non-invasive leak detection using thermal imaging and acoustic equipment. Minimal disruption to your property.", priceRange: "£150–£400" },
        { name: "Radiator & Heating Repairs", description: "Radiator replacement, power flushing, and central heating repairs to keep your home warm.", priceRange: "£100–£350 per radiator" },
      ],
      areas: londonAreas,
      localInsight: "London plumbers typically charge £60–£90 per hour, with emergency callouts attracting a premium of £80–£150 on top. Hard water in London causes limescale buildup that shortens the life of boilers and appliances — annual servicing is strongly recommended. Always verify Gas Safe registration for any gas or boiler work, and check that your plumber carries public liability insurance.",
    },
    faqs: [
      { question: "How much does an emergency plumber cost in London?", answer: "Emergency plumber callouts in London typically cost £80–£150 for the first hour, then £60–£90 per hour after. Evenings and weekends may attract a 25–50% surcharge. The callout fee usually covers the first 30–60 minutes of work." },
      { question: "How quickly can a plumber get to me in London?", answer: "Most emergency plumbers on FindTrades can reach you within 1–2 hours across central London. Outer boroughs may take slightly longer. For non-emergency work, you can usually book within 2–3 days." },
      { question: "Do I need a Gas Safe plumber for my boiler?", answer: "Yes, by law any work on gas appliances (boilers, gas hobs, gas fires) must be carried out by a Gas Safe registered engineer. Always ask to see their Gas Safe ID card and verify it online at GasSafeRegister.co.uk." },
      { question: "How much does a new bathroom cost in London?", answer: "A full bathroom installation in London ranges from £3,000 for a basic suite to £8,000+ for a high-spec renovation. This includes plumbing, tiling, fixtures, and labour. Supply-only costs for a mid-range suite are around £800–£1,500." },
    ],
    priceGuide: [
      { service: "Emergency callout (first hour)", price: "£80–£150", note: "24/7 availability" },
      { service: "Fix a dripping tap", price: "£60–£120", note: "Parts included" },
      { service: "Unblock a drain", price: "£80–£200", note: "Depends on severity" },
      { service: "Install a toilet", price: "£150–£300", note: "Labour only" },
      { service: "Full bathroom installation", price: "£3,000–£8,000", note: "Including tiling" },
      { service: "Boiler service", price: "£80–£120", note: "Annual check" },
      { service: "Radiator replacement", price: "£150–£350", note: "Per radiator, fitted" },
    ],
  },
};

export default content;
