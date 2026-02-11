import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Surveyors in London",
    heroText: "RICS-qualified surveyors for homebuyer reports, building surveys, and valuations across London. Protect your investment with expert property advice.",
    stats: { totalWorkers: 100, avgRating: 4.7, recentProjects: 620 },
    metaTitle: "Surveyors in London | RICS Qualified | Building Surveys | FindTrades",
    metaDescription: "Find RICS surveyors in London. 100+ qualified pros for homebuyer reports, building surveys, valuations & party wall matters. Free quotes.",
    sections: {
      intro: "Buying property in London is one of the biggest financial decisions you'll make — a professional survey can save you thousands by identifying problems before you commit. Our RICS-qualified surveyors provide homebuyer reports, full building surveys, and specialist assessments for London's diverse property types, from Victorian terraces to modern apartments.",
      popularServices: [
        { name: "Homebuyer Report (Level 2)", description: "Standard survey for conventional properties in reasonable condition. Traffic-light condition ratings.", priceRange: "£400–£700" },
        { name: "Building Survey (Level 3)", description: "Comprehensive survey for older, larger, or unusual properties. Detailed analysis of all defects.", priceRange: "£600–£1,200" },
        { name: "Valuation Survey", description: "Market valuation for mortgage, probate, or tax purposes. RICS Red Book compliant.", priceRange: "£250–£500" },
        { name: "Party Wall Survey", description: "Party wall awards and surveying for London extensions and loft conversions.", priceRange: "£800–£1,500" },
        { name: "Specific Defect Report", description: "Targeted investigation of subsidence, damp, structural cracks, or Japanese knotweed.", priceRange: "£300–£600" },
      ],
      areas: londonAreas,
      localInsight: "London properties have specific risks: Victorian houses may have subsidence (especially on London clay), Japanese knotweed is present in many London boroughs, and flat roofs on 1960s–70s extensions often need replacement. A Level 3 building survey is strongly recommended for any London property over 80 years old. Party wall agreements are required for most London extensions — budget £800–£1,500 per neighbour.",
    },
    faqs: [
      { question: "How much does a survey cost in London?", answer: "A Homebuyer Report (Level 2) costs £400–£700 in London. A full Building Survey (Level 3) costs £600–£1,200. Prices depend on property value and size. For London properties over £500,000, expect to pay at the higher end." },
      { question: "Do I need a Level 2 or Level 3 survey?", answer: "Level 2 (Homebuyer Report) is suitable for modern, conventional properties in good condition. Level 3 (Building Survey) is recommended for properties over 80 years old, listed buildings, unusual construction, or if you're planning major work. Most Victorian/Edwardian London homes warrant a Level 3." },
      { question: "What is a party wall agreement?", answer: "If your building work affects a shared wall, boundary, or is within 3–6 metres of a neighbour's foundations, you need a party wall agreement. This is very common for London extensions and loft conversions. Each neighbour can appoint their own surveyor at your expense." },
      { question: "How long does a survey take?", answer: "The on-site inspection takes 1–4 hours depending on property size and survey type. The written report is usually delivered within 3–5 working days. For urgent purchases, some London surveyors offer express turnaround." },
    ],
    priceGuide: [
      { service: "Homebuyer Report (Level 2)", price: "£400–£700" },
      { service: "Building Survey (Level 3)", price: "£600–£1,200" },
      { service: "Valuation", price: "£250–£500" },
      { service: "Party wall award", price: "£800–£1,500", note: "Per neighbour" },
      { service: "Specific defect report", price: "£300–£600" },
    ],
  },
};

export default content;
