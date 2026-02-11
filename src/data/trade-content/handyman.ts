import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Handymen in London",
    heroText: "Reliable handymen for odd jobs, repairs, and small projects across London. From flat-pack assembly to picture hanging — no job too small.",
    stats: { totalWorkers: 280, avgRating: 4.6, recentProjects: 1500 },
    metaTitle: "Handymen in London | Odd Jobs & Repairs | FindTrades",
    metaDescription: "Find reliable handymen in London. 280+ verified pros for odd jobs, repairs, assembly, mounting & small projects. Hourly or fixed price. Free quotes.",
    sections: {
      intro: "Not every job needs a specialist — sometimes you just need a reliable pair of hands. London handymen tackle the jobs that are too small for specialist tradesmen but too tricky (or time-consuming) to DIY. From assembling IKEA furniture to fixing a dripping tap, mounting a TV, or patching a hole in the wall, our verified handymen get it done efficiently.",
      popularServices: [
        { name: "Flat-Pack Assembly", description: "IKEA and other flat-pack furniture assembly. Wardrobes, beds, desks, and kitchen units.", priceRange: "£40–£100 per item" },
        { name: "TV & Shelf Mounting", description: "Wall-mount TVs, floating shelves, mirrors, and artwork. Includes drilling and concealing cables.", priceRange: "£40–£80 per item" },
        { name: "General Repairs", description: "Door adjustments, tap repairs, toilet fixes, sealant renewal, and minor plumbing/electrical.", priceRange: "£40–£60 per hour" },
        { name: "Painting Touch-Ups", description: "Small painting jobs, touch-ups, and single room repaints.", priceRange: "£150–£300 per room" },
        { name: "Property Maintenance", description: "Regular maintenance for landlords and property managers. Scheduled visits and reactive repairs.", priceRange: "£40–£60 per hour" },
      ],
      areas: londonAreas,
      localInsight: "London handymen charge £40–£60 per hour with a typical minimum of 1–2 hours. Many offer half-day (4 hours, £150–£200) or full-day rates (£250–£350) which are better value if you have a list of jobs. Handymen are perfect for end-of-tenancy repairs and touch-ups — a common need in London's rental market.",
    },
    faqs: [
      { question: "How much does a handyman cost in London?", answer: "London handymen charge £40–£60 per hour with a 1–2 hour minimum. Half-day rates (4 hours) are £150–£200 and full-day rates are £250–£350. For multiple small jobs, a half or full day booking is the best value." },
      { question: "What jobs can a handyman do?", answer: "Handymen handle a wide range of tasks: furniture assembly, shelf/TV mounting, minor plumbing (tap repairs, toilet fixes), minor electrical (light fitting changes), painting touch-ups, door adjustments, sealant renewal, curtain rail fitting, and general repairs." },
      { question: "Is a handyman insured?", answer: "All handymen on FindTrades carry public liability insurance. For any work involving electrics or gas, you'll need a qualified electrician or Gas Safe engineer instead. A good handyman will tell you when a job needs a specialist." },
      { question: "Can I book a handyman for a few hours?", answer: "Yes, most London handymen offer hourly bookings with a 1–2 hour minimum. If you have several small jobs, make a list and book a half-day — it's more cost-effective and the handyman can work through your list efficiently." },
    ],
    priceGuide: [
      { service: "Hourly rate", price: "£40–£60" },
      { service: "Half day (4 hours)", price: "£150–£200" },
      { service: "Full day (8 hours)", price: "£250–£350" },
      { service: "Flat-pack assembly", price: "£40–£100", note: "Per item" },
      { service: "TV wall mount", price: "£50–£80" },
    ],
  },
};

export default content;
