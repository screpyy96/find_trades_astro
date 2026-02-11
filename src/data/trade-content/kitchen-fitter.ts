import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Kitchen Fitters in London",
    heroText: "Professional kitchen installation and renovation across London. From galley kitchens in Battersea flats to open-plan family kitchens in Dulwich houses.",
    stats: { totalWorkers: 200, avgRating: 4.7, recentProjects: 750 },
    metaTitle: "Kitchen Fitters in London | Installation & Renovation | FindTrades",
    metaDescription: "Find kitchen fitters in London. 200+ verified pros for kitchen installation, worktops, units & full renovations. Free quotes across all boroughs.",
    sections: {
      intro: "The kitchen is the heart of any London home — and often the room that adds the most value when renovated. Our verified kitchen fitters handle everything from assembling and installing flat-pack units to bespoke kitchen builds with stone worktops and integrated appliances. They coordinate plumbing, electrics, tiling, and flooring so you get a seamless result.",
      popularServices: [
        { name: "Full Kitchen Installation", description: "Complete kitchen fitting including units, worktops, splashback, plumbing, and electrics.", priceRange: "£3,000–£8,000" },
        { name: "Worktop Supply & Fit", description: "Laminate, solid wood, quartz, and granite worktops. Templated, cut, and fitted.", priceRange: "£500–£3,000" },
        { name: "Kitchen Knock-Through", description: "Remove wall between kitchen and dining/living room to create open-plan space. Structural support included.", priceRange: "£2,500–£5,000" },
        { name: "Unit Replacement", description: "Replace doors, drawers, or complete units without a full renovation. Cost-effective refresh.", priceRange: "£1,000–£3,000" },
        { name: "Appliance Installation", description: "Fitting built-in ovens, hobs, dishwashers, and extractors. Gas and electric connections.", priceRange: "£80–£200 per appliance" },
      ],
      areas: londonAreas,
      localInsight: "Kitchen fitting in London costs £3,000–£8,000 for labour alone (excluding the kitchen itself). IKEA kitchens are hugely popular in London for their value — many fitters specialise in IKEA installation. Quartz worktops have overtaken granite as the most popular choice. If you're doing a knock-through, budget £2,500–£5,000 for the structural work including a steel beam.",
    },
    faqs: [
      { question: "How much does a new kitchen cost in London?", answer: "A new kitchen in London costs £8,000–£15,000 for mid-range (including units, worktops, and fitting) or £15,000–£30,000+ for high-end. Labour alone is typically £3,000–£8,000. IKEA kitchens with professional fitting offer excellent value at £5,000–£10,000 total." },
      { question: "How long does a kitchen installation take?", answer: "A standard kitchen installation takes 1–2 weeks. If structural work (knock-through, moving plumbing) is involved, allow 3–4 weeks. Your fitter will provide a detailed schedule. You'll need to plan for eating out or using a temporary kitchen setup." },
      { question: "Can I keep my existing layout and just replace units?", answer: "Yes — this is a cost-effective way to refresh your kitchen. Replacing doors and worktops while keeping the existing layout and plumbing can save 40–60% compared to a full renovation. Many London homeowners choose this option." },
      { question: "Do I need planning permission for a kitchen knock-through?", answer: "You don't need planning permission for internal alterations, but if the wall is load-bearing you'll need a structural engineer's calculations and Building Control approval. Your builder will arrange this. Non-load-bearing walls can be removed without any approvals." },
    ],
    priceGuide: [
      { service: "Kitchen fitting (labour only)", price: "£3,000–£8,000" },
      { service: "Worktop (quartz, fitted)", price: "£1,500–£3,000" },
      { service: "Kitchen knock-through", price: "£2,500–£5,000", note: "Including steel" },
      { service: "Appliance installation (each)", price: "£80–£200" },
      { service: "Tiling splashback", price: "£200–£500" },
    ],
  },
};

export default content;
