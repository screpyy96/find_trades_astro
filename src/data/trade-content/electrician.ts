import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Electricians in London",
    heroText: "NICEIC-approved electricians across all 32 London boroughs. From consumer unit upgrades in period homes to full rewires in new builds — certified, insured, and ready to help.",
    stats: { totalWorkers: 380, avgRating: 4.8, recentProjects: 1600, avgResponseTime: "Under 2 hours" },
    metaTitle: "Electricians in London | NICEIC Approved | 24/7 | FindTrades",
    metaDescription: "Find NICEIC-approved electricians in London. 380+ verified pros for rewiring, consumer units, lighting, EV chargers & emergency repairs. Free quotes, all boroughs.",
    sections: {
      intro: "London's mix of Victorian terraces, post-war estates, and modern developments means electrical work ranges from delicate rewires around original features to cutting-edge smart home installations. Our verified London electricians are NICEIC or NAPIT registered, fully insured, and experienced with Part P building regulations. Whether you need a fuse board upgrade in Brixton or EV charger installation in Richmond, you'll find the right pro here.",
      popularServices: [
        { name: "Consumer Unit Upgrade", description: "Replace old fuse boxes with modern RCD-protected consumer units. Essential for safety in older London properties.", priceRange: "£350–£600" },
        { name: "Full & Partial Rewire", description: "Complete rewiring for period properties or targeted upgrades. Includes testing and certification.", priceRange: "£3,000–£8,000" },
        { name: "Lighting Installation", description: "Downlights, pendant lights, outdoor lighting, and smart lighting systems. Design advice included.", priceRange: "£50–£150 per point" },
        { name: "EV Charger Installation", description: "Home electric vehicle charger fitting with dedicated circuit. OZEV grant-eligible installations.", priceRange: "£800–£1,200" },
        { name: "Electrical Safety Testing (EICR)", description: "Electrical Installation Condition Reports for landlords, homeowners, and property sales.", priceRange: "£150–£300" },
      ],
      areas: londonAreas,
      localInsight: "Many London properties still have outdated wiring — if your home has a fuse box with rewirable fuses rather than MCBs, a consumer unit upgrade should be a priority. Landlords in London are legally required to have a valid EICR. Electricians in central London tend to charge £50–£80/hour; outer boroughs are slightly cheaper at £40–£65/hour. Always check NICEIC or NAPIT registration.",
    },
    faqs: [
      { question: "How much does a rewire cost in London?", answer: "A full rewire for a 3-bed London house costs £3,000–£6,000 depending on size and complexity. A 2-bed flat is typically £2,500–£4,000. This includes new wiring, consumer unit, sockets, switches, and an electrical certificate." },
      { question: "Do I need an EICR for my London rental property?", answer: "Yes. Since 2020, all landlords in England must have a valid EICR before new tenancies and within 5 years for existing ones. An EICR in London costs £150–£300 depending on property size. Failure to comply can result in fines up to £30,000." },
      { question: "How long does a consumer unit upgrade take?", answer: "A consumer unit upgrade typically takes 4–8 hours for a standard London property. The power will be off for most of this time. Your electrician will test all circuits and provide an electrical certificate on completion." },
      { question: "Can I get an EV charger installed at my London flat?", answer: "It depends on your parking situation and freeholder permission. If you have a dedicated parking space, most London flats can have a charger installed. You may be eligible for the OZEV grant (up to £350 off). Your electrician will assess feasibility during a free survey." },
    ],
    priceGuide: [
      { service: "Consumer unit upgrade", price: "£350–£600", note: "Including certificate" },
      { service: "Full house rewire (3-bed)", price: "£3,000–£6,000" },
      { service: "Additional socket", price: "£80–£150", note: "Per double socket" },
      { service: "Light fitting installation", price: "£50–£100", note: "Per fitting" },
      { service: "EICR report", price: "£150–£300", note: "Required for landlords" },
      { service: "EV charger installation", price: "£800–£1,200", note: "Before OZEV grant" },
      { service: "Emergency callout", price: "£100–£200", note: "First hour" },
    ],
  },
};

export default content;
