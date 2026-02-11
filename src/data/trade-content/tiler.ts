import type { TradeCityContent } from './_types';
import { londonAreas } from './_city-areas';

const content: Record<string, TradeCityContent> = {
  london: {
    h1: "Tilers in London",
    heroText: "Professional tilers for bathrooms, kitchens, and floors across London. From metro tiles in Shoreditch cafés to large-format porcelain in Mayfair apartments.",
    stats: { totalWorkers: 230, avgRating: 4.7, recentProjects: 900 },
    metaTitle: "Tilers in London | Bathroom, Kitchen & Floor Tiling | FindTrades",
    metaDescription: "Find professional tilers in London. 230+ verified pros for bathroom tiling, kitchen splashbacks, floor tiles & mosaics. Free quotes, all boroughs.",
    sections: {
      intro: "Tiling is one of the most visible finishes in any London home — a poorly tiled bathroom or kitchen stands out immediately. Our verified London tilers deliver precision work with clean grout lines, proper waterproofing, and attention to detail. Whether it's a simple kitchen splashback or a full wet room installation, you'll find experienced professionals who take pride in their craft.",
      popularServices: [
        { name: "Bathroom Wall & Floor Tiling", description: "Full bathroom tiling including waterproof tanking, wall tiles, and floor tiles. Underfloor heating compatible.", priceRange: "£40–£80 per sqm" },
        { name: "Kitchen Splashback", description: "Metro tiles, glass mosaics, or large-format tiles behind worktops and hobs.", priceRange: "£200–£500" },
        { name: "Floor Tiling", description: "Porcelain, ceramic, natural stone, and encaustic floor tiles. Includes levelling and preparation.", priceRange: "£35–£70 per sqm" },
        { name: "Wet Room Installation", description: "Fully tanked wet room with gradient floor, drainage, and wall tiling. Building regs compliant.", priceRange: "£2,500–£5,000" },
        { name: "External Tiling & Patio", description: "Frost-resistant porcelain paving and balcony tiling for London outdoor spaces.", priceRange: "£50–£100 per sqm" },
      ],
      areas: londonAreas,
      localInsight: "London tilers charge £250–£400 per day or £35–£80 per sqm depending on tile size and complexity. Large-format tiles (60x120cm+) require a skilled tiler and cost more to lay due to the precision needed. Natural stone tiles need sealing. For bathrooms, always insist on proper tanking/waterproofing — it's the difference between a bathroom that lasts 20 years and one that causes damp problems within 5.",
    },
    faqs: [
      { question: "How much does bathroom tiling cost in London?", answer: "Bathroom tiling in London costs £40–£80 per sqm for labour, or £800–£2,000 for a typical bathroom. This doesn't include tiles — budget £20–£60 per sqm for mid-range tiles. Large-format and natural stone tiles cost more to lay." },
      { question: "How long does it take to tile a bathroom?", answer: "A standard London bathroom takes 2–4 days to tile (walls and floor). This includes preparation, waterproofing, tiling, and grouting. Drying time before use is typically 24 hours after grouting." },
      { question: "Should I buy the tiles or does the tiler supply them?", answer: "Most tilers prefer you to buy the tiles — they can advise on quantity (add 10% for cuts and waste). Some tilers offer a supply-and-fit service with trade discounts. Either way, make sure tiles are on-site before the tiler starts." },
      { question: "Can you tile over existing tiles?", answer: "Yes, if the existing tiles are firmly bonded and the surface is flat. Your tiler will use a special primer and adhesive. This saves time and money on removal. However, it raises the floor/wall level slightly, which can affect door clearances and trim." },
    ],
    priceGuide: [
      { service: "Bathroom tiling (per sqm)", price: "£40–£80", note: "Labour only" },
      { service: "Kitchen splashback", price: "£200–£500" },
      { service: "Floor tiling (per sqm)", price: "£35–£70" },
      { service: "Wet room installation", price: "£2,500–£5,000", note: "Complete" },
      { service: "Tile removal (per sqm)", price: "£15–£30" },
      { service: "Re-grouting (per sqm)", price: "£20–£40" },
    ],
  },
};

export default content;
