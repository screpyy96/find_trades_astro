/**
 * Static trades data from Supabase
 * Used for sitemap generation and category pages
 * Last sync: February 2026
 */

export interface Trade {
  id: number;
  name: string;
  category: string;
  slug: string;
  description?: string | null;
}

export const trades: Trade[] = [
  { id: 1, name: "Plumber", category: "Building & Construction", slug: "plumber", description: null },
  { id: 2, name: "Electrician", category: "Building & Construction", slug: "electrician", description: null },
  { id: 3, name: "Carpenter", category: "Building & Construction", slug: "carpenter", description: null },
  { id: 4, name: "Painter & Decorator", category: "Building & Construction", slug: "painter-decorator", description: null },
  { id: 5, name: "Plasterer", category: "Building & Construction", slug: "plasterer", description: null },
  { id: 6, name: "Bricklayer", category: "Building & Construction", slug: "bricklayer", description: null },
  { id: 7, name: "Roofer", category: "Building & Construction", slug: "roofer", description: null },
  { id: 8, name: "Tiler", category: "Building & Construction", slug: "tiler", description: null },
  { id: 9, name: "Joiner", category: "Building & Construction", slug: "joiner", description: null },
  { id: 10, name: "Builder", category: "Building & Construction", slug: "builder", description: null },
  { id: 11, name: "Gas Engineer", category: "Heating & Plumbing", slug: "gas-engineer", description: null },
  { id: 12, name: "Heating Engineer", category: "Heating & Plumbing", slug: "heating-engineer", description: null },
  { id: 13, name: "Boiler Repair", category: "Heating & Plumbing", slug: "boiler-repair", description: null },
  { id: 14, name: "Bathroom Fitter", category: "Heating & Plumbing", slug: "bathroom-fitter", description: null },
  { id: 15, name: "Kitchen Fitter", category: "Interior", slug: "kitchen-fitter", description: null },
  { id: 16, name: "Flooring Specialist", category: "Interior", slug: "flooring-specialist", description: null },
  { id: 17, name: "Window Fitter", category: "Exterior", slug: "window-fitter", description: null },
  { id: 18, name: "Door Fitter", category: "Interior", slug: "door-fitter", description: null },
  { id: 19, name: "Locksmith", category: "Security", slug: "locksmith", description: null },
  { id: 20, name: "Landscaper", category: "Garden & Outdoor", slug: "landscaper", description: null },
  { id: 21, name: "Gardener", category: "Garden & Outdoor", slug: "gardener", description: null },
  { id: 22, name: "Fencer", category: "Garden & Outdoor", slug: "fencer", description: null },
  { id: 23, name: "Driveway Specialist", category: "Garden & Outdoor", slug: "driveway-specialist", description: null },
  { id: 24, name: "Paving Specialist", category: "Garden & Outdoor", slug: "paving-specialist", description: null },
  { id: 25, name: "Handyman", category: "General", slug: "handyman", description: null },
  { id: 26, name: "Cleaner", category: "General", slug: "cleaner", description: null },
  { id: 27, name: "Pest Control", category: "General", slug: "pest-control", description: null },
  { id: 28, name: "Removal Service", category: "General", slug: "removal-service", description: null },
  { id: 29, name: "Scaffolder", category: "Building & Construction", slug: "scaffolder", description: null },
  { id: 30, name: "Demolition", category: "Building & Construction", slug: "demolition", description: null },
  { id: 31, name: "Insulation Specialist", category: "Building & Construction", slug: "insulation-specialist", description: null },
  { id: 32, name: "Damp Proofing", category: "Building & Construction", slug: "damp-proofing", description: null },
  { id: 33, name: "Guttering Specialist", category: "Exterior", slug: "guttering-specialist", description: null },
  { id: 34, name: "Chimney Sweep", category: "Exterior", slug: "chimney-sweep", description: null },
  { id: 35, name: "CCTV & Security", category: "Security", slug: "cctv-security", description: null },
  { id: 36, name: "Alarm Installer", category: "Security", slug: "alarm-installer", description: null },
  { id: 37, name: "Solar Panel Installer", category: "Energy", slug: "solar-panel-installer", description: null },
  { id: 38, name: "EV Charger Installer", category: "Energy", slug: "ev-charger-installer", description: null },
  { id: 39, name: "Architect", category: "Design & Planning", slug: "architect", description: null },
  { id: 40, name: "Interior Designer", category: "Design & Planning", slug: "interior-designer", description: null },
  { id: 41, name: "Surveyor", category: "Design & Planning", slug: "surveyor", description: null },
  { id: 42, name: "Drainage Specialist", category: "Heating & Plumbing", slug: "drainage-specialist", description: null },
  { id: 43, name: "Welder", category: "Metalwork", slug: "welder", description: null },
  { id: 44, name: "Blacksmith", category: "Metalwork", slug: "blacksmith", description: null },
  { id: 45, name: "Glazier", category: "Building & Construction", slug: "glazier", description: null },
  { id: 46, name: "Curtain & Blind Fitter", category: "Interior", slug: "curtain-blind-fitter", description: null },
  { id: 47, name: "Carpet Fitter", category: "Interior", slug: "carpet-fitter", description: null },
  { id: 48, name: "Appliance Repair", category: "General", slug: "appliance-repair", description: null },
  { id: 49, name: "TV & Aerial Installer", category: "General", slug: "tv-aerial-installer", description: null },
  { id: 50, name: "IT & Network Installer", category: "General", slug: "it-network-installer", description: null }
];
