import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Carpet Fitters in London",
    heroText: "Professional carpet fitting across London. Bedrooms, stairs, living rooms, and commercial spaces — expert installation with minimal waste.",
    stats: { totalWorkers: 100, avgRating: 4.6, recentProjects: 480 },
    metaTitle: "Carpet Fitters in London | Supply & Fit | FindTrades",
    metaDescription: "Find carpet fitters in London. 100+ verified pros for bedroom, stair & living room carpets. Supply & fit or fitting only. Free measuring & quotes.",
    sections: {
      intro: "Carpet remains the most popular flooring choice for London bedrooms and stairs — it's warm, quiet, and comfortable underfoot. Our verified carpet fitters provide expert installation with proper stretching, seaming, and finishing. Whether you need a single bedroom carpeted or a whole house fitted, they'll deliver a smooth, professional result.",
      popularServices: [
        { name: "Bedroom Carpet Fitting", description: "Supply and fit or fitting only. Includes underlay, gripper, and door bar.", priceRange: "£150–£400 per room" },
        { name: "Stair Carpet", description: "Fitted carpet or stair runner installation. Includes underlay and stair rods if required.", priceRange: "£200–£500" },
        { name: "Living Room Carpet", description: "Large area fitting with invisible seams. Heavy-duty underlay for high-traffic areas.", priceRange: "£200–£600" },
        { name: "Commercial Carpet Tiles", description: "Office and commercial carpet tile installation. Quick, clean, and replaceable.", priceRange: "£20–£40 per sqm" },
        { name: "Old Carpet Removal", description: "Uplift and dispose of old carpet, underlay, and gripper rods.", priceRange: "£3–£5 per sqm" },
      ],
      areas: londonAreas,
      localInsight: "Many London leases require carpet in flats to reduce noise transmission to neighbours below. Even if not required, acoustic underlay is strongly recommended. London carpet fitters charge £3–£6 per sqm for fitting only, or offer supply-and-fit packages. For stairs, always use a professional — poor stair carpet fitting is a trip hazard and looks terrible.",
    },
    faqs: [
      { question: "How much does carpet fitting cost in London?", answer: "Fitting only costs £3–£6 per sqm. Supply and fit for a standard bedroom (12sqm) costs £150–£400 depending on carpet quality. A full 3-bed house costs £1,500–£4,000 for supply and fit including underlay." },
      { question: "Should I buy carpet from the fitter or separately?", answer: "Either works. Fitters often get trade prices and can offer competitive supply-and-fit packages. If you buy separately, ensure you order 10% extra for waste. Your fitter will measure and advise on quantity." },
      { question: "How long does carpet fitting take?", answer: "A single room takes 1–2 hours. A full house (3 bedrooms, stairs, landing) takes a full day. Old carpet removal adds 30–60 minutes per room. Your fitter will confirm timing when they measure." },
      { question: "Do I need new underlay?", answer: "Yes — always replace underlay when fitting new carpet. Old underlay is compressed and won't provide proper cushioning or insulation. Good underlay extends carpet life by 40–50% and makes a noticeable difference to comfort." },
    ],
    priceGuide: [
      { service: "Fitting only (per sqm)", price: "£3–£6" },
      { service: "Bedroom (supply & fit)", price: "£150–£400" },
      { service: "Stair carpet", price: "£200–£500" },
      { service: "Underlay (per sqm)", price: "£3–£8" },
      { service: "Old carpet removal (per sqm)", price: "£3–£5" },
    ],
  },
};

export default content;
