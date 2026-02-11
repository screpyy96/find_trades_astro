import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Cleaners in London",
    heroText: "Professional cleaning services across London. Regular domestic cleaning, deep cleans, end-of-tenancy, and commercial cleaning by verified local pros.",
    stats: { totalWorkers: 350, avgRating: 4.6, recentProjects: 2200 },
    metaTitle: "Cleaners in London | Domestic & Commercial | FindTrades",
    metaDescription: "Find cleaners in London. 350+ verified pros for regular cleaning, deep cleans, end-of-tenancy & office cleaning. From £15/hr. Free quotes.",
    sections: {
      intro: "London life is busy — and keeping your home or office clean shouldn't add to the stress. Our verified London cleaners provide everything from regular weekly cleans to one-off deep cleans and end-of-tenancy cleaning that meets letting agent standards. All are vetted, insured, and bring their own supplies.",
      popularServices: [
        { name: "Regular Domestic Cleaning", description: "Weekly or fortnightly cleaning. Dusting, vacuuming, mopping, kitchen, and bathrooms.", priceRange: "£15–£25 per hour" },
        { name: "Deep Cleaning", description: "Intensive one-off clean. Inside ovens, behind appliances, limescale removal, and detailed work.", priceRange: "£200–£400" },
        { name: "End-of-Tenancy Cleaning", description: "Professional clean to letting agent standards. Includes oven, carpets, and all rooms.", priceRange: "£250–£500" },
        { name: "Office & Commercial Cleaning", description: "Regular or one-off cleaning for offices, shops, and commercial premises.", priceRange: "£15–£20 per hour" },
        { name: "After-Builders Cleaning", description: "Remove construction dust, debris, and residue after renovation work.", priceRange: "£200–£500" },
      ],
      areas: londonAreas,
      localInsight: "London cleaning rates are £15–£25 per hour depending on the area — central London commands higher rates. End-of-tenancy cleaning is a huge market in London given the rental turnover. Always book an end-of-tenancy clean at least a week before your move-out date. For regular cleaning, most London cleaners prefer a minimum of 2–3 hours per visit.",
    },
    faqs: [
      { question: "How much does a cleaner cost in London?", answer: "Regular domestic cleaning in London costs £15–£25 per hour. A typical 2-bed flat takes 2–3 hours (£30–£75 per visit). Deep cleans cost £200–£400 and end-of-tenancy cleans cost £250–£500 depending on property size." },
      { question: "How often should I have my home cleaned?", answer: "Weekly cleaning is ideal for busy London households. Fortnightly is a good compromise for smaller homes or couples. Monthly deep cleans work well if you maintain the home between visits." },
      { question: "What does end-of-tenancy cleaning include?", answer: "A full end-of-tenancy clean covers every room including inside the oven, fridge, cupboards, windows (interior), carpets, bathrooms, and all surfaces. It's designed to meet letting agent checkout standards and help you get your deposit back." },
      { question: "Do cleaners bring their own supplies?", answer: "Most professional cleaners bring their own cleaning products and equipment. Some prefer to use products you provide, especially if you have preferences for eco-friendly or specific brands. Confirm this when booking." },
    ],
    priceGuide: [
      { service: "Regular cleaning (per hour)", price: "£15–£25" },
      { service: "Deep clean (2-bed flat)", price: "£200–£350" },
      { service: "End-of-tenancy (2-bed)", price: "£250–£400" },
      { service: "After-builders clean", price: "£200–£500" },
      { service: "Office cleaning (per hour)", price: "£15–£20" },
    ],
  },
};

export default content;
