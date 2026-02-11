import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Door Fitters in London",
    heroText: "Professional door fitting and replacement across London. Internal doors, front doors, bi-folds, and French doors — supplied and fitted by verified local pros.",
    stats: { totalWorkers: 150, avgRating: 4.7, recentProjects: 540 },
    metaTitle: "Door Fitters in London | Internal & External Doors | FindTrades",
    metaDescription: "Find door fitters in London. 150+ verified pros for internal doors, front doors, bi-folds & French doors. Supply & fit or labour only. Free quotes.",
    sections: {
      intro: "Doors make a bigger difference to your London home than you might think — from the kerb appeal of a new front door to the flow of light through internal glazed doors. Our verified door fitters handle everything from hanging a single internal door to installing bi-fold doors opening onto your garden.",
      popularServices: [
        { name: "Internal Door Fitting", description: "Hang new internal doors including latch, hinges, and handles. Trimming to fit older London door frames.", priceRange: "£80–£180 per door" },
        { name: "Front Door Replacement", description: "Composite, timber, or uPVC front doors. Includes frame, locks, and letterbox.", priceRange: "£800–£2,500" },
        { name: "Bi-Fold Doors", description: "Aluminium or timber bi-fold doors for rear openings. Transforms the connection between kitchen and garden.", priceRange: "£3,000–£8,000" },
        { name: "French Doors", description: "Double-opening doors for garden access. uPVC, timber, or aluminium options.", priceRange: "£1,000–£3,000" },
        { name: "Fire Door Installation", description: "FD30 and FD60 fire doors for flats and HMOs. Required by London building regulations.", priceRange: "£200–£500 per door" },
      ],
      areas: londonAreas,
      localInsight: "London flats and HMOs are required to have fire doors (FD30 rated) on all habitable rooms. This is a legal requirement that many landlords overlook. Bi-fold doors are the most popular upgrade for London rear extensions — they flood the kitchen with light and create an indoor-outdoor feel. For period properties, look for door fitters experienced with Victorian 4-panel doors.",
    },
    faqs: [
      { question: "How much does it cost to hang a door in London?", answer: "Hanging an internal door in London costs £80–£180 per door (labour only). This includes fitting hinges, latch, and handle, plus trimming the door to fit. If the frame needs adjusting, add £30–£50. Supply and fit starts from £150 per door." },
      { question: "How much do bi-fold doors cost in London?", answer: "Bi-fold doors in London cost £3,000–£5,000 for a 3-panel set or £5,000–£8,000 for a 4–5 panel set, fully installed. Aluminium is the most popular material. Installation takes 1–2 days including structural lintel if needed." },
      { question: "Do I need fire doors in my London flat?", answer: "Yes — London building regulations require FD30 fire doors on all habitable rooms in flats and HMOs. This includes bedrooms, living rooms, and kitchens. Fire doors must be self-closing and properly fitted with intumescent strips and smoke seals." },
      { question: "Can you fit doors in old London houses with uneven frames?", answer: "Yes, experienced London door fitters deal with this daily. Victorian and Edwardian houses often have frames that are out of square. Your fitter will scribe and trim doors to fit, or adjust frames where needed. It takes a bit longer but the result should be perfect." },
    ],
    priceGuide: [
      { service: "Hang internal door", price: "£80–£180", note: "Labour only" },
      { service: "Front door (supply & fit)", price: "£800–£2,500" },
      { service: "Bi-fold doors (3-panel)", price: "£3,000–£5,000" },
      { service: "French doors", price: "£1,000–£3,000" },
      { service: "Fire door (supply & fit)", price: "£200–£500" },
    ],
  },
};

export default content;
