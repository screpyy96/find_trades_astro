/**
 * Content structure for a trade in a specific city.
 * Each trade file exports a Record<citySlug, TradeCityContent>.
 */
export interface TradeCityContent {
  h1: string;
  heroText: string;
  stats: {
    totalWorkers: number;
    avgRating: number;
    recentProjects: number;
    avgResponseTime?: string;
  };
  metaTitle: string;
  metaDescription: string;
  sections: {
    intro: string;
    popularServices: { name: string; description: string; priceRange: string }[];
    areas: string[];
    localInsight: string;
  };
  faqs: { question: string; answer: string }[];
  priceGuide?: { service: string; price: string; note?: string }[];
}
