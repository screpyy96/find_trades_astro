import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Chimney Sweeps in London",
    heroText: "Professional chimney sweeping across London. HETAS-registered sweeps for open fires, wood burners, and gas flues. Certificates issued for insurance.",
    stats: { totalWorkers: 65, avgRating: 4.8, recentProjects: 420 },
    metaTitle: "Chimney Sweeps in London | HETAS Registered | FindTrades",
    metaDescription: "Find chimney sweeps in London. 65+ HETAS-registered pros for open fires, wood burners & gas flues. Sweep certificates for insurance. Free quotes.",
    sections: {
      intro: "London has thousands of working fireplaces — from original Victorian hearths in Islington to modern wood burners in Dulwich extensions. Regular chimney sweeping prevents dangerous chimney fires and carbon monoxide buildup. Our HETAS-registered London sweeps provide thorough cleaning and issue certificates that satisfy home insurance requirements.",
      popularServices: [
        { name: "Standard Chimney Sweep", description: "Full sweep of open fire or wood burner flue. Includes inspection and certificate.", priceRange: "£60–£90" },
        { name: "CCTV Chimney Inspection", description: "Camera survey of flue condition. Identifies cracks, blockages, and liner damage.", priceRange: "£100–£200" },
        { name: "Bird Nest Removal", description: "Remove bird nests and debris from chimney. Fit bird guard to prevent recurrence.", priceRange: "£80–£200" },
        { name: "Chimney Cowl & Cap Fitting", description: "Rain caps, bird guards, and anti-downdraught cowls to protect your chimney.", priceRange: "£80–£180" },
        { name: "Smoke Test", description: "Test flue draw and check for leaks. Essential before using a fireplace for the first time.", priceRange: "£40–£80" },
      ],
      areas: londonAreas,
      localInsight: "London's smokeless zone regulations mean you can only burn authorised fuels or use DEFRA-exempt appliances. Wood burners must be Ecodesign-compliant if installed after 2022. Sweep your chimney at least once a year — twice if you burn wood regularly. A sweep certificate is often required by home insurance policies.",
    },
    faqs: [
      { question: "How much does a chimney sweep cost in London?", answer: "A standard chimney sweep in London costs £60–£90 including a certificate. If you have multiple flues, most sweeps offer a discount — typically £50–£70 for additional flues. CCTV inspections cost £100–£200 extra." },
      { question: "How often should I sweep my chimney?", answer: "At least once a year for all fuel types. If you burn wood regularly, sweep twice a year (before and during the burning season). Gas flues should be checked annually. A sweep takes about 30–45 minutes." },
      { question: "Can I use a wood burner in London?", answer: "Yes, but it must be DEFRA-exempt (approved for use in smoke control areas) and Ecodesign-compliant if installed after 2022. You can only burn dry wood (under 20% moisture) or authorised smokeless fuels." },
      { question: "Do I need a chimney sweep certificate for insurance?", answer: "Many home insurance policies require an annual sweep certificate, especially if you have a working fireplace. Always keep your certificates — they're proof of maintenance if you need to make a claim." },
    ],
    priceGuide: [
      { service: "Standard sweep", price: "£60–£90", note: "Including certificate" },
      { service: "Additional flue", price: "£50–£70" },
      { service: "CCTV inspection", price: "£100–£200" },
      { service: "Bird nest removal", price: "£80–£200" },
      { service: "Cowl/cap fitting", price: "£80–£180" },
    ],
  },
};

export default content;
