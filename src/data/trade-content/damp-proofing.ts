import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Damp Proofing in London",
    heroText: "Expert damp diagnosis and treatment across London. Rising damp, penetrating damp, and condensation — properly diagnosed and permanently fixed.",
    stats: { totalWorkers: 80, avgRating: 4.6, recentProjects: 380 },
    metaTitle: "Damp Proofing London | Rising Damp & Treatment | FindTrades",
    metaDescription: "Find damp proofing specialists in London. 80+ verified pros for rising damp, penetrating damp, condensation & basement waterproofing. Free surveys & quotes.",
    sections: {
      intro: "Damp is one of London's most common property problems — from rising damp in Victorian terraces to condensation in poorly ventilated flats. Correct diagnosis is crucial because the treatment depends entirely on the type of damp. Our verified specialists use moisture meters and thermal imaging to identify the exact cause before recommending the right solution.",
      popularServices: [
        { name: "Rising Damp Treatment", description: "Chemical DPC injection to create a new damp-proof course. Includes replastering affected areas.", priceRange: "£60–£100 per metre" },
        { name: "Penetrating Damp Repair", description: "Identify and fix the source of water ingress — failed pointing, cracked render, or defective guttering.", priceRange: "£200–£1,000" },
        { name: "Condensation Solutions", description: "Ventilation improvements, PIV units, and insulation to eliminate condensation and mould.", priceRange: "£200–£800" },
        { name: "Basement Waterproofing", description: "Tanking, cavity drain membranes, and sump pumps for dry basements.", priceRange: "£2,000–£8,000" },
        { name: "Damp Survey", description: "Professional damp survey with moisture readings, diagnosis, and treatment recommendations.", priceRange: "£150–£350" },
      ],
      areas: londonAreas,
      localInsight: "True rising damp is less common than many damp-proofing companies claim — condensation and penetrating damp are far more prevalent in London. Be wary of free surveys from companies that always diagnose rising damp (and sell expensive DPC injection). An independent damp survey (£150–£350) gives you an unbiased diagnosis. Many London damp problems are caused by blocked gutters, failed pointing, or poor ventilation — all cheaper to fix than a new DPC.",
    },
    faqs: [
      { question: "How much does damp proofing cost in London?", answer: "Rising damp treatment (DPC injection) costs £60–£100 per linear metre. A typical London terraced house costs £1,500–£3,000 for the ground floor. This includes injection, replastering, and a 20–30 year guarantee." },
      { question: "How do I know if I have rising damp?", answer: "Signs include a tide mark on walls up to 1 metre high, peeling wallpaper, salt deposits, and a musty smell. However, these symptoms can also indicate condensation or penetrating damp. A professional survey with moisture readings is the only way to be sure." },
      { question: "Is damp covered by insurance?", answer: "Standard home insurance doesn't cover damp treatment. However, if damp is caused by a sudden event (burst pipe, storm damage), the resulting damage may be covered. Check your policy or speak to your insurer." },
      { question: "Can damp affect my health?", answer: "Yes — damp and mould can cause respiratory problems, allergies, and worsen asthma. Black mould (Stachybotrys) is particularly harmful. If you have persistent damp and mould, address it promptly, especially if children or elderly people live in the property." },
    ],
    priceGuide: [
      { service: "DPC injection (per metre)", price: "£60–£100" },
      { service: "Damp survey", price: "£150–£350" },
      { service: "Condensation treatment", price: "£200–£800" },
      { service: "Basement tanking (per sqm)", price: "£100–£200" },
      { service: "Replastering (per sqm)", price: "£30–£50", note: "After damp treatment" },
    ],
  },
};

export default content;
