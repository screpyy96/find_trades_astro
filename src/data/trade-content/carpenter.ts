import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Carpenters in London",
    heroText: "Skilled carpenters for bespoke joinery, fitted furniture, and structural timber work across London. From alcove shelving in Victorian terraces to loft conversions in suburban semis.",
    stats: { totalWorkers: 260, avgRating: 4.7, recentProjects: 950 },
    metaTitle: "Carpenters in London | Bespoke Joinery & Fitting | FindTrades",
    metaDescription: "Find skilled carpenters in London. 260+ verified pros for bespoke shelving, fitted wardrobes, doors, decking & structural work. Free quotes across all boroughs.",
    sections: {
      intro: "London homes are full of character — and awkward spaces that need a carpenter's touch. Alcoves either side of a chimney breast, sloping ceilings in loft conversions, and under-stair storage all benefit from bespoke carpentry. Our verified London carpenters handle everything from custom shelving and fitted wardrobes to structural timber work, stud walls, and garden decking.",
      popularServices: [
        { name: "Bespoke Shelving & Storage", description: "Alcove shelving, floating shelves, and custom storage solutions designed to maximise space in London homes.", priceRange: "£300–£800 per alcove" },
        { name: "Fitted Wardrobes", description: "Floor-to-ceiling wardrobes built to measure. Includes design, build, and finishing.", priceRange: "£800–£2,500" },
        { name: "Door Hanging & Replacement", description: "Internal and external door fitting, including frame adjustments for older properties.", priceRange: "£80–£180 per door" },
        { name: "Stud Wall & Partitions", description: "Room dividers, stud walls for loft conversions, and partition walls with soundproofing.", priceRange: "£400–£900 per wall" },
        { name: "Decking & Garden Structures", description: "Timber decking, pergolas, garden offices, and fencing for London gardens.", priceRange: "£1,500–£5,000" },
      ],
      areas: londonAreas,
      localInsight: "London carpenters charge £200–£350 per day or £30–£50 per hour. Bespoke work commands a premium but adds real value to London properties where space is at a premium. Many Victorian and Edwardian homes have non-standard dimensions — an experienced London carpenter will know how to work with uneven walls and floors. Always ask to see examples of previous work, especially for visible joinery.",
    },
    faqs: [
      { question: "How much do fitted wardrobes cost in London?", answer: "Fitted wardrobes in London cost £800–£2,500 depending on size, materials, and finish. MDF with spray paint is the most popular choice. Solid wood costs more but adds a premium feel. Most carpenters offer a free measuring and design consultation." },
      { question: "How long does alcove shelving take to build?", answer: "A pair of alcove shelving units typically takes 1–2 days to build and install. Add an extra day if you want them painted or spray-finished. Your carpenter will usually do a measuring visit first, then build in their workshop or on-site." },
      { question: "Can a carpenter help with my loft conversion?", answer: "Yes — carpenters handle the timber structural work in loft conversions including floor joists, stud walls, dormer framing, and staircase installation. For a full loft conversion you'll also need a builder, electrician, and plumber, but the carpenter is central to the project." },
      { question: "What's the difference between a carpenter and a joiner?", answer: "In practice, the terms overlap significantly. Traditionally, a joiner works in a workshop making items like doors, windows, and staircases, while a carpenter fits them on-site. Most London professionals do both and advertise as carpenter-joiners." },
    ],
    priceGuide: [
      { service: "Alcove shelving (pair)", price: "£500–£1,200", note: "Including painting" },
      { service: "Fitted wardrobe", price: "£800–£2,500", note: "Per unit" },
      { service: "Hang an internal door", price: "£80–£150", note: "Per door, labour only" },
      { service: "Stud wall partition", price: "£400–£900", note: "Including plasterboard" },
      { service: "Timber decking (15sqm)", price: "£1,500–£3,000", note: "Softwood" },
      { service: "Skirting board replacement", price: "£8–£15 per metre", note: "Fitted and painted" },
    ],
  },
};

export default content;
