import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Scaffolders in London",
    heroText: "Licensed scaffolding erection and hire across London. Domestic, commercial, and industrial scaffolding — fully insured with council licence handling.",
    stats: { totalWorkers: 85, avgRating: 4.6, recentProjects: 420 },
    metaTitle: "Scaffolders in London | Erection & Hire | FindTrades",
    metaDescription: "Find scaffolders in London. 85+ verified pros for domestic & commercial scaffolding. Council licence handling included. Free quotes across all boroughs.",
    sections: {
      intro: "Most exterior work on London properties requires scaffolding — from painting and rendering to roof repairs and chimney work. Our verified London scaffolders provide safe, compliant scaffolding that meets HSE regulations. Many handle the council pavement licence for you, which is essential when scaffolding extends over public footpaths.",
      popularServices: [
        { name: "Domestic Scaffolding", description: "Scaffolding for house painting, rendering, roof repairs, and window replacement.", priceRange: "£500–£1,500" },
        { name: "Chimney Scaffolding", description: "Access scaffolding for chimney repairs, repointing, and removal.", priceRange: "£400–£800" },
        { name: "Commercial Scaffolding", description: "Large-scale scaffolding for commercial buildings, offices, and retail premises.", priceRange: "£2,000–£10,000+" },
        { name: "Tower Scaffolding", description: "Mobile tower scaffolds for internal work and short-duration external jobs.", priceRange: "£150–£300 per week" },
        { name: "Scaffolding Hire", description: "Weekly hire rates for longer projects. Includes erection, hire period, and dismantling.", priceRange: "£150–£300 per week" },
      ],
      areas: londonAreas,
      localInsight: "In London, scaffolding on public footpaths requires a pavement licence from the council (£100–£500 depending on borough). Your scaffolder should arrange this. Scaffolding typically stays up for 2–8 weeks depending on the project. Always ensure your scaffolder has CISRS-trained operatives and public liability insurance of at least £5 million.",
    },
    faqs: [
      { question: "How much does scaffolding cost in London?", answer: "Domestic scaffolding in London costs £500–£1,500 for a typical terraced house. This includes erection, 4–6 weeks hire, and dismantling. Larger properties and longer hire periods cost more. Chimney access scaffolding costs £400–£800." },
      { question: "Do I need a licence for scaffolding in London?", answer: "If the scaffolding extends over a public footpath or road, yes — you need a pavement licence from your local council. Most London scaffolders handle this for you. The licence costs £100–£500 depending on the borough." },
      { question: "How long does it take to erect scaffolding?", answer: "A standard domestic scaffold takes half a day to erect. Larger or more complex structures take 1–2 days. Dismantling is usually quicker — half a day for most domestic jobs." },
      { question: "Is scaffolding safe?", answer: "When erected by CISRS-trained professionals, scaffolding is very safe. All scaffolding must comply with HSE regulations. Your scaffolder will inspect it regularly and provide a handover certificate confirming it's safe to use." },
    ],
    priceGuide: [
      { service: "Terraced house (full)", price: "£500–£1,000" },
      { service: "Semi-detached (full)", price: "£800–£1,500" },
      { service: "Chimney access", price: "£400–£800" },
      { service: "Weekly hire", price: "£150–£300" },
      { service: "Tower scaffold hire", price: "£150–£300 per week" },
    ],
  },
};

export default content;
