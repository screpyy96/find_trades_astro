import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Flooring Specialists in London",
    heroText: "Expert flooring installation across London — hardwood, engineered wood, LVT, carpet, and tiles. From Herringbone parquet in Notting Hill to modern LVT in Stratford.",
    stats: { totalWorkers: 185, avgRating: 4.7, recentProjects: 720 },
    metaTitle: "Flooring Specialists in London | Wood, LVT & Carpet | FindTrades",
    metaDescription: "Find flooring specialists in London. 185+ verified pros for hardwood, engineered wood, LVT, laminate & carpet fitting. Free quotes across all boroughs.",
    sections: {
      intro: "The right flooring transforms a London home — and with so many options available, from reclaimed parquet to modern luxury vinyl, choosing can be overwhelming. Our verified London flooring specialists advise on the best option for your space, subfloor, and budget, then install it to a flawless finish.",
      popularServices: [
        { name: "Engineered Wood Flooring", description: "Supply and fit engineered oak, walnut, and ash. Herringbone, chevron, and plank patterns.", priceRange: "£40–£80 per sqm" },
        { name: "LVT (Luxury Vinyl Tile)", description: "Karndean, Amtico, and similar luxury vinyl. Waterproof, durable, and realistic wood/stone effects.", priceRange: "£30–£60 per sqm" },
        { name: "Solid Hardwood", description: "Solid oak, walnut, and maple flooring. Sanding, staining, and lacquering included.", priceRange: "£50–£100 per sqm" },
        { name: "Floor Sanding & Restoration", description: "Sand, stain, and seal existing wooden floors. Bring tired floorboards back to life.", priceRange: "£20–£35 per sqm" },
        { name: "Carpet Fitting", description: "Supply and fit carpets for bedrooms, stairs, and living areas. Underlay and gripper included.", priceRange: "£8–£25 per sqm" },
      ],
      areas: londonAreas,
      localInsight: "Engineered wood flooring is the most popular choice in London homes — it's more stable than solid wood (important in centrally heated properties) and works with underfloor heating. Herringbone patterns are hugely trendy but cost 20–30% more to lay due to the extra cutting and fitting time. LVT is the go-to for kitchens and bathrooms. Always check your lease if you're in a flat — many London leases require carpet or acoustic underlay.",
    },
    faqs: [
      { question: "How much does wood flooring cost in London?", answer: "Engineered wood flooring in London costs £40–£80 per sqm fitted (material + labour). Solid hardwood costs £50–£100 per sqm. A typical 20sqm living room costs £800–£1,600 for engineered or £1,000–£2,000 for solid. Herringbone patterns add 20–30%." },
      { question: "Can I have wood flooring in a London flat?", answer: "Yes, but check your lease first. Many London leases require acoustic underlay beneath hard flooring to reduce noise transmission. Some leases restrict hard flooring entirely. Engineered wood with acoustic underlay is usually acceptable." },
      { question: "How long does floor sanding take?", answer: "A typical London room (15–20sqm) takes 1 day to sand and 1 day for finishing (oil or lacquer). A whole house takes 3–5 days. You'll need to vacate the room during sanding due to dust, though dustless sanding systems reduce this significantly." },
      { question: "LVT vs engineered wood — which is better?", answer: "LVT is waterproof, cheaper, and easier to maintain — ideal for kitchens, bathrooms, and rental properties. Engineered wood looks and feels more premium, adds more property value, and can be sanded and refinished. For living rooms and bedrooms, engineered wood is the popular London choice." },
    ],
    priceGuide: [
      { service: "Engineered wood (per sqm)", price: "£40–£80", note: "Supply & fit" },
      { service: "LVT (per sqm)", price: "£30–£60", note: "Supply & fit" },
      { service: "Floor sanding (per sqm)", price: "£20–£35" },
      { service: "Carpet fitting (per sqm)", price: "£8–£25", note: "Including underlay" },
      { service: "Laminate (per sqm)", price: "£15–£30", note: "Supply & fit" },
    ],
  },
};

export default content;
