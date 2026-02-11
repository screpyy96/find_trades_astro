import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Pest Control in London",
    heroText: "Fast, discreet pest control across London. Mice, rats, bedbugs, cockroaches, wasps, and foxes — dealt with by BPCA-certified professionals.",
    stats: { totalWorkers: 95, avgRating: 4.7, recentProjects: 680, avgResponseTime: "Same day" },
    metaTitle: "Pest Control London | Mice, Rats, Bedbugs & More | FindTrades",
    metaDescription: "Fast pest control in London. 95+ BPCA-certified pros for mice, rats, bedbugs, cockroaches, wasps & foxes. Same-day callouts. Discreet service. Free quotes.",
    sections: {
      intro: "London's dense urban environment makes it a hotspot for pests — mice and rats are particularly common in older properties, while bedbugs are a growing problem in the rental market. Our BPCA-certified pest controllers provide fast, effective treatment with follow-up visits to ensure the problem is fully resolved.",
      popularServices: [
        { name: "Mouse & Rat Control", description: "Baiting, trapping, and proofing to eliminate rodents and prevent re-entry. Follow-up visits included.", priceRange: "£120–£250" },
        { name: "Bedbug Treatment", description: "Heat treatment or chemical spray for bedbug infestations. Multiple visits for complete eradication.", priceRange: "£200–£500" },
        { name: "Cockroach Treatment", description: "Gel bait and spray treatment for German and Oriental cockroaches. Common in London flats.", priceRange: "£150–£300" },
        { name: "Wasp Nest Removal", description: "Safe removal or treatment of wasp nests. Usually resolved in a single visit.", priceRange: "£60–£120" },
        { name: "Pest Proofing", description: "Seal entry points to prevent mice, rats, and insects from entering your property.", priceRange: "£150–£400" },
      ],
      areas: londonAreas,
      localInsight: "Mice are London's most common pest — an estimated 500,000 London properties have mouse activity. Victorian and Edwardian houses with suspended floors and cavity walls are particularly vulnerable. Proofing (sealing entry points) is as important as treatment. For bedbugs, heat treatment is more effective than chemical sprays but costs more. Always use a BPCA-certified controller for guaranteed results.",
    },
    faqs: [
      { question: "How much does pest control cost in London?", answer: "Mouse/rat treatment costs £120–£250 (usually 2–3 visits). Bedbug treatment costs £200–£500. Cockroach treatment costs £150–£300. Wasp nest removal costs £60–£120. Most treatments include follow-up visits." },
      { question: "How quickly can you deal with a pest problem?", answer: "Most London pest controllers on FindTrades offer same-day or next-day callouts. For urgent issues (wasp nests, rat infestations), emergency same-day service is usually available." },
      { question: "Is my landlord responsible for pest control?", answer: "In London, landlords are generally responsible for pest control if the infestation is caused by structural issues (holes, gaps). If it's caused by tenant behaviour (food hygiene), the tenant may be responsible. Check your tenancy agreement." },
      { question: "How do I know if I have mice?", answer: "Signs include droppings (small, dark, rice-shaped), gnaw marks on food packaging, scratching noises at night (especially in walls and ceilings), and a musky smell. If you see one mouse, there are likely more." },
    ],
    priceGuide: [
      { service: "Mouse treatment (2–3 visits)", price: "£120–£250" },
      { service: "Rat treatment", price: "£150–£300" },
      { service: "Bedbug treatment", price: "£200–£500" },
      { service: "Cockroach treatment", price: "£150–£300" },
      { service: "Wasp nest removal", price: "£60–£120" },
      { service: "Pest proofing", price: "£150–£400" },
    ],
  },
};

export default content;
