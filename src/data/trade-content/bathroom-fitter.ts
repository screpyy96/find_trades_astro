import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Bathroom Fitters in London",
    heroText: "Complete bathroom design and installation across London. From compact en-suites in Clapham flats to luxury wet rooms in Hampstead homes.",
    stats: { totalWorkers: 240, avgRating: 4.7, recentProjects: 880 },
    metaTitle: "Bathroom Fitters in London | Design to Installation | FindTrades",
    metaDescription: "Find bathroom fitters in London. 240+ verified pros for full bathroom renovations, en-suites, wet rooms & cloakrooms. Free design consultations & quotes.",
    sections: {
      intro: "A bathroom renovation is one of the best investments you can make in a London property — adding both value and daily comfort. Our verified bathroom fitters manage the entire process: design, plumbing, electrics, tiling, and installation. Whether you're working with a tiny London cloakroom or a spacious family bathroom, they'll maximise every inch.",
      popularServices: [
        { name: "Full Bathroom Renovation", description: "Strip-out, plumbing, electrics, tiling, and installation of new suite. Complete project management.", priceRange: "£4,000–£10,000" },
        { name: "En-Suite Installation", description: "Creating an en-suite from scratch or renovating an existing one. Space-saving solutions for London bedrooms.", priceRange: "£3,000–£7,000" },
        { name: "Wet Room Conversion", description: "Fully tanked wet room with level-access shower, drainage, and wall-to-floor tiling.", priceRange: "£4,000–£8,000" },
        { name: "Cloakroom/WC Fitting", description: "Compact downstairs toilet installation or renovation. Ideal for London terraced houses.", priceRange: "£1,500–£3,500" },
        { name: "Shower Installation", description: "Walk-in showers, electric showers, mixer showers, and shower enclosures.", priceRange: "£500–£2,000" },
      ],
      areas: londonAreas,
      localInsight: "Bathroom renovations in London take 1–3 weeks depending on scope. The biggest cost factors are tiling (labour-intensive) and the quality of sanitaryware. Wall-hung toilets and vanity units are popular in London bathrooms as they make small spaces feel larger. Always ensure your fitter provides proper waterproofing/tanking — water damage to the flat below is a common and expensive problem in London apartments.",
    },
    faqs: [
      { question: "How much does a new bathroom cost in London?", answer: "A full bathroom renovation in London costs £4,000–£7,000 for a budget finish, £7,000–£12,000 for mid-range, and £12,000–£20,000+ for high-end. This includes labour, tiling, plumbing, electrics, and sanitaryware. Tiles and fixtures are usually the biggest variable." },
      { question: "How long does a bathroom renovation take?", answer: "A standard bathroom renovation takes 1–2 weeks. A wet room or structural changes take 2–3 weeks. Your fitter will provide a timeline before starting. During the work, you'll need access to another bathroom or make temporary arrangements." },
      { question: "Can you fit a bathroom in a small London space?", answer: "Absolutely. London bathroom fitters are experts at maximising small spaces. Wall-hung sanitaryware, corner basins, sliding shower doors, and clever storage solutions can transform even the smallest room. A skilled fitter can create a functional bathroom in as little as 2sqm." },
      { question: "Do I need building regulations for a bathroom?", answer: "You don't need planning permission for a bathroom renovation, but electrical work must comply with Part P building regulations (your electrician will certify this). If you're creating a new bathroom where one didn't exist, you may need Building Control approval for drainage." },
    ],
    priceGuide: [
      { service: "Full bathroom renovation", price: "£4,000–£10,000" },
      { service: "En-suite installation", price: "£3,000–£7,000" },
      { service: "Wet room conversion", price: "£4,000–£8,000" },
      { service: "Cloakroom fitting", price: "£1,500–£3,500" },
      { service: "Shower enclosure install", price: "£500–£1,500" },
      { service: "Bath replacement", price: "£400–£1,000", note: "Labour only" },
    ],
  },
};

export default content;
