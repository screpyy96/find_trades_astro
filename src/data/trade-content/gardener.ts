import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Gardeners in London",
    heroText: "Regular garden maintenance and one-off tidy-ups across London. Lawn care, hedge trimming, pruning, and seasonal planting by verified local gardeners.",
    stats: { totalWorkers: 220, avgRating: 4.6, recentProjects: 950 },
    metaTitle: "Gardeners in London | Maintenance & Garden Care | FindTrades",
    metaDescription: "Find gardeners in London. 220+ verified pros for lawn care, hedge trimming, pruning, planting & garden clearance. Regular or one-off. Free quotes.",
    sections: {
      intro: "Keeping a London garden looking its best takes regular attention — and with busy city lives, most Londoners benefit from a professional gardener. Whether you need weekly maintenance, a seasonal tidy-up, or help with planting and pruning, our verified London gardeners keep your outdoor space in top shape year-round.",
      popularServices: [
        { name: "Regular Garden Maintenance", description: "Weekly, fortnightly, or monthly visits. Lawn mowing, weeding, edging, and general upkeep.", priceRange: "£30–£60 per visit" },
        { name: "Hedge Trimming", description: "Formal and informal hedge cutting, shaping, and reduction. All hedge types and heights.", priceRange: "£50–£200" },
        { name: "Garden Clearance", description: "Overgrown garden clearance, rubbish removal, and site preparation. Ideal for new homeowners.", priceRange: "£200–£600" },
        { name: "Lawn Care", description: "Mowing, feeding, aerating, scarifying, and overseeding. Weed and moss treatment.", priceRange: "£20–£50 per visit" },
        { name: "Planting & Borders", description: "Seasonal planting, border redesign, and container planting for patios and balconies.", priceRange: "£30–£50 per hour" },
      ],
      areas: londonAreas,
      localInsight: "London gardeners typically charge £30–£50 per hour or offer fixed-price packages for regular maintenance. A fortnightly visit for a typical London garden costs £80–£120 per month. Many London gardens are shaded by buildings and trees — your gardener can recommend shade-tolerant plants that thrive in these conditions.",
    },
    faqs: [
      { question: "How much does a gardener cost in London?", answer: "London gardeners charge £30–£50 per hour. A typical fortnightly maintenance visit (1–2 hours) costs £40–£80. Monthly packages for regular maintenance range from £80–£150 depending on garden size and services included." },
      { question: "How often should I have my garden maintained?", answer: "During the growing season (March–October), fortnightly visits are ideal. In winter, monthly visits are usually sufficient. Most London gardeners offer flexible scheduling to match your needs and budget." },
      { question: "Can a gardener help with a balcony or roof terrace?", answer: "Yes, many London gardeners specialise in container gardening for balconies, roof terraces, and courtyards. They can design planting schemes, install containers, and provide regular maintenance." },
      { question: "What should I do with garden waste in London?", answer: "Most London boroughs offer garden waste collection for £50–£70 per year. Your gardener can bag waste for collection or take it away for an additional fee (typically £20–£40 per load). Composting is the most eco-friendly option." },
    ],
    priceGuide: [
      { service: "Hourly rate", price: "£30–£50" },
      { service: "Regular visit (fortnightly)", price: "£40–£80" },
      { service: "Garden clearance", price: "£200–£600" },
      { service: "Hedge trimming", price: "£50–£200" },
      { service: "Lawn treatment", price: "£50–£150", note: "Per treatment" },
    ],
  },
};

export default content;
