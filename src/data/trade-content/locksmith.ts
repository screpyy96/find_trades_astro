import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Locksmiths in London",
    heroText: "24/7 emergency locksmiths across London. Locked out? Need locks changed? Our verified locksmiths respond fast with no hidden fees.",
    stats: { totalWorkers: 140, avgRating: 4.6, recentProjects: 1200, avgResponseTime: "Under 30 mins" },
    metaTitle: "Locksmiths in London | 24/7 Emergency | No Hidden Fees | FindTrades",
    metaDescription: "Find 24/7 locksmiths in London. 140+ verified pros for lockouts, lock changes, security upgrades & emergency access. Fast response, no hidden fees.",
    sections: {
      intro: "Getting locked out of your London home or needing an emergency lock change after a break-in is stressful. Our verified London locksmiths provide rapid response across all boroughs — day or night. All are DBS-checked, fully insured, and transparent about pricing before they start work.",
      popularServices: [
        { name: "Emergency Lockout", description: "Non-destructive entry to your home or business. Available 24/7 across London.", priceRange: "£80–£150" },
        { name: "Lock Change", description: "Replace existing locks with new British Standard (BS3621) locks. Essential after moving into a new property.", priceRange: "£60–£120 per lock" },
        { name: "Security Upgrade", description: "Multi-point locking systems, deadlocks, and high-security cylinders. Insurance-compliant options.", priceRange: "£100–£300" },
        { name: "UPVC & Composite Door Locks", description: "Specialist lock mechanisms for modern London front doors. Euro cylinder and multi-point repairs.", priceRange: "£80–£200" },
        { name: "Safe Opening & Installation", description: "Open, repair, or install safes for homes and businesses.", priceRange: "£100–£400" },
      ],
      areas: londonAreas,
      localInsight: "London has higher burglary rates than the national average, making quality locks essential. Insurance companies typically require BS3621 locks on all external doors. Beware of locksmith scam companies that advertise low prices then charge extortionate fees on arrival — always use a verified FindTrades locksmith with transparent pricing. Most legitimate London locksmiths charge £80–£150 for a standard lockout.",
    },
    faqs: [
      { question: "How much does an emergency locksmith cost in London?", answer: "A standard lockout in London costs £80–£150 during daytime hours. Night-time and weekend callouts may cost £120–£200. This should include non-destructive entry. Be wary of any locksmith quoting significantly less — they often add hidden charges on arrival." },
      { question: "How quickly can a locksmith get to me?", answer: "Most London locksmiths on FindTrades can reach you within 15–30 minutes in central London, or 30–60 minutes in outer boroughs. Response times may be longer during peak hours due to London traffic." },
      { question: "Should I change locks when moving into a new home?", answer: "Absolutely. You don't know how many copies of the old keys exist. Changing all external locks when you move in costs £150–£400 depending on the number of doors and lock type. It's a small price for peace of mind." },
      { question: "What locks does my insurance require?", answer: "Most London home insurance policies require BS3621 deadlocks on all external doors. Check your policy documents. Your locksmith can assess your current locks and upgrade them to meet insurance requirements." },
    ],
    priceGuide: [
      { service: "Emergency lockout (daytime)", price: "£80–£150" },
      { service: "Lock change (per lock)", price: "£60–£120" },
      { service: "Full house lock change", price: "£150–£400" },
      { service: "Security upgrade", price: "£100–£300" },
      { service: "Night/weekend callout", price: "£120–£200" },
    ],
  },
};

export default content;
