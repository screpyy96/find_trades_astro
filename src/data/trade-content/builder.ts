import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Builders in London",
    heroText: "Experienced builders for extensions, loft conversions, renovations, and new builds across London. Project-managed from start to finish with transparent pricing.",
    stats: { totalWorkers: 310, avgRating: 4.6, recentProjects: 1100, avgResponseTime: "Within 24 hours" },
    metaTitle: "Builders in London | Extensions, Lofts & Renovations | FindTrades",
    metaDescription: "Find experienced builders in London. 310+ verified pros for extensions, loft conversions, renovations & new builds. Free quotes, all boroughs covered.",
    sections: {
      intro: "Finding a reliable builder in London can feel daunting — but it doesn't have to be. Our verified London builders handle projects from small kitchen knock-throughs to full house renovations and new-build extensions. Each is vetted, insured, and reviewed by previous clients. Whether you're extending a Victorian terrace in Hackney or converting a basement in Chelsea, you'll find the right builder here.",
      popularServices: [
        { name: "House Extensions", description: "Single and double-storey rear, side, and wrap-around extensions. Full project management from foundations to finishing.", priceRange: "£1,500–£3,000 per sqm" },
        { name: "Loft Conversions", description: "Dormer, hip-to-gable, mansard, and Velux loft conversions. Includes structural work, insulation, and finishing.", priceRange: "£30,000–£65,000" },
        { name: "Basement Conversions", description: "Full basement dig-outs and conversions. Waterproofing, underpinning, and fit-out.", priceRange: "£2,000–£4,000 per sqm" },
        { name: "Full House Renovations", description: "Gut renovations, structural alterations, and complete refurbishments. Coordinating all trades.", priceRange: "£1,000–£2,500 per sqm" },
        { name: "Kitchen & Bathroom Fitting", description: "Knock-throughs, new layouts, plumbing, electrics, tiling, and installation of units.", priceRange: "£8,000–£25,000" },
      ],
      areas: londonAreas,
      localInsight: "London building costs are the highest in the UK — expect to pay 30–50% more than national averages. A typical rear extension costs £40,000–£70,000 all-in. Loft conversions are London's most popular home improvement because they add significant value without losing garden space. Always get a detailed written quote (not estimate), check references, and agree a payment schedule tied to milestones — never pay more than 10–15% upfront.",
    },
    faqs: [
      { question: "How much does a loft conversion cost in London?", answer: "A loft conversion in London costs £30,000–£45,000 for a Velux/rooflight conversion, £40,000–£55,000 for a dormer, and £50,000–£65,000 for a mansard. These prices include structural work, insulation, electrics, plumbing, plastering, and decoration." },
      { question: "Do I need planning permission for an extension in London?", answer: "Many single-storey rear extensions fall under Permitted Development and don't need planning permission (up to 3m for semi/terraced, 4m for detached). However, conservation areas, listed buildings, and flats usually require full planning. Always check with your local council." },
      { question: "How long does a house extension take in London?", answer: "A single-storey rear extension typically takes 10–14 weeks from start to finish. A double-storey extension takes 14–20 weeks. Add 8–12 weeks for planning permission if needed, and 2–4 weeks for Building Control sign-off." },
      { question: "How do I find a trustworthy builder in London?", answer: "Get at least 3 quotes, check reviews on FindTrades, ask for references from recent London projects, verify insurance, and look for membership of trade bodies (FMB, NHBC). Never pay large sums upfront — agree milestone payments." },
    ],
    priceGuide: [
      { service: "Single-storey extension (per sqm)", price: "£1,500–£2,500" },
      { service: "Loft conversion (dormer)", price: "£40,000–£55,000" },
      { service: "Basement conversion (per sqm)", price: "£2,000–£4,000" },
      { service: "Kitchen knock-through", price: "£3,000–£6,000", note: "Structural only" },
      { service: "Full renovation (per sqm)", price: "£1,000–£2,500" },
    ],
  },
};

export default content;
