import { useCallback, useMemo } from "react";
import { HeroBadge } from "./HeroBadge";
import { HeroHeading } from "./HeroHeading";
import { HeroSearch } from "./HeroSearch";
import { AppDownloadBadges } from "../mobile-app/AppDownloadBadges";
import { HeroBackground } from "./HeroBackground";
import type { Trade } from "../../types/database";

// Flexible trade type for hero component
type HeroTrade = Pick<Trade, "id" | "name" | "slug"> & Partial<Pick<Trade, "category" | "created_at" | "updated_at" | "description">>;

interface ModernHeroProps {
  trades: HeroTrade[];
  stats: {
    totalWorkers: number;
    totalReviews: number;
    totalCities: number;
    totalTrades: number;
  };
}

const DEFAULT_TRADES: HeroTrade[] = [
  { id: undefined as any, name: "Electrician", slug: "electricians" },
  { id: undefined as any, name: "Plumber", slug: "plumbers" },
  { id: undefined as any, name: "Painter", slug: "painters" },
  { id: undefined as any, name: "Carpenter", slug: "carpenters" },
  { id: undefined as any, name: "Bricklayer", slug: "bricklayers" },
  { id: undefined as any, name: "Roofing", slug: "roofing" },
  { id: undefined as any, name: "Tiling", slug: "tiling" },
  { id: undefined as any, name: "Flooring", slug: "flooring" },
  { id: undefined as any, name: "Gardening", slug: "gardening" },
  { id: undefined as any, name: "Cleaning", slug: "cleaning" }
];

const APP_URL = import.meta.env.PUBLIC_APP_URL || 'https://app.findtrades.app';

export function ModernHero({ trades = [], stats }: ModernHeroProps) {
  const effectiveTrades: HeroTrade[] = useMemo(() => (
    trades && trades.length > 0 ? trades : DEFAULT_TRADES
  ), [trades]);

  const handleSelectTrade = useCallback((trade: HeroTrade) => {
    // In Astro we use window.location for navigation
    if (trade && trade.id) {
      window.location.href = `${APP_URL}/request-quote?tradeId=${trade.id}`;
    } else if (trade?.name) {
      window.location.href = `/tradesmen/?q=${encodeURIComponent(trade.name)}`;
    } else {
      window.location.href = '/tradesmen/';
    }
  }, []);

  return (
    <HeroBackground className="min-h-[85vh] lg:min-h-[75vh] flex items-center justify-center lg:pt-20">
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Content */}
          <div className="relative z-40 lg:col-span-8 text-center lg:text-left">
            <div className="space-y-8">
              {/* Badge and Heading */}
              <div className="space-y-4">
                <HeroBadge />
                <HeroHeading />

              </div>

              {/* Main Action Card */}
              <div className="bg-white/5 md:bg-white/10 rounded-3xl border border-white/20 p-5 md:p-8 mx-auto lg:mx-0 lg:max-w-3xl xl:max-w-4xl">
                <div className="text-center lg:text-left mb-6">
                  <p className="text-slate-300 text-sm lg:text-base leading-relaxed">Find tradesmen and receive up to 5 free quotes</p>
                </div>

                <div className="space-y-4">
                  <div className="w-full mx-auto lg:mx-0 lg:max-w-xl xl:max-w-2xl">
                    <HeroSearch trades={effectiveTrades} isLoading={false} onSelectTrade={handleSelectTrade} />
                  </div>

                  {/* Benefits */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-green-500/20 border border-green-400/30">
                      <span className="text-green-300 text-xs font-medium">Quick response</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30">
                      <span className="text-blue-300 text-xs font-medium">100% free</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30">
                      <span className="text-amber-300 text-xs font-medium">No obligation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile App Promo - Visible only on mobile, UNDER search box */}
              <div className="lg:hidden bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <img src="/logo.svg" alt="FindTrades App" className="h-14 w-auto" width="48" height="56" loading="lazy" decoding="async" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-white font-bold text-lg flex items-center gap-2">
                        <span role="img" aria-hidden>📱</span>
                        <span>Descarcă aplicația</span>
                      </div>
                      <p className="text-slate-300 text-sm">Găsește meseriași direct de pe telefon</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:w-48">
                    <div
                      className="group relative opacity-75 cursor-not-allowed"
                      aria-label="Coming soon on Google Play"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 rounded-xl blur-md group-active:blur-lg transition-all"></div>
                      <div className="relative bg-slate-900 active:bg-slate-800 rounded-xl px-4 py-3 flex items-center gap-3 transition-all transform active:scale-95 border border-white/10">
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                          <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5Z" fill="#00D9FF"/>
                          <path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" fill="#FFCE00"/>
                          <path d="M3.84 2.15C4.25 1.95 4.73 1.96 5.13 2.18L16.81 8.88L14.54 11.15L3.84 2.15Z" fill="#FF3A44"/>
                          <path d="M16.81 8.88L19.78 10.58C20.54 11.03 20.54 12.12 19.78 12.58L16.81 14.27L14.54 12L16.81 8.88Z" fill="#00F076"/>
                        </svg>
                        <div className="text-left flex-1">
                          <div className="text-white/70 text-[10px] uppercase tracking-wide font-medium">Coming soon on</div>
                          <div className="text-white text-base font-bold -mt-0.5">Google Play</div>
                        </div>
                      </div>
                    </div>

                    {/* App Store Badge */}
                    <div
                      className="group relative opacity-75 cursor-not-allowed"
                      aria-label="Coming soon on App Store"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-500/20 to-blue-500/20 rounded-xl blur-md group-active:blur-lg transition-all"></div>
                      <div className="relative bg-slate-900 active:bg-slate-800 rounded-xl px-4 py-3 flex items-center gap-3 transition-all transform active:scale-95 border border-white/10">
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white">
                          <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                        </svg>
                        <div className="text-left flex-1">
                          <div className="text-white/70 text-[10px] uppercase tracking-wide font-medium">Coming soon on</div>
                          <div className="text-white text-base font-bold -mt-0.5">App Store</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Phone Mockup Compact */}
          <div className="hidden lg:flex lg:col-span-4 items-center justify-center relative z-10 lg:pl-10 xl:pl-16">
            <div className="relative flex flex-col items-center gap-6 lg:pointer-events-none lg:translate-x-6 xl:translate-x-10">
              {/* Glow effects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-amber-500/15 via-emerald-500/15 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
              
              {/* Phone mockup - compact and clean */}
              {/* Android-like phone frame */}
              <div className="relative z-10 w-[240px] h-[490px] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-[2.2rem] p-2 shadow-2xl ring-1 ring-amber-400/15">
                {/* Phone outer frame */}
                <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative shadow-inner">
                  {/* Android sensors/status (no notch) */}
                  <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-slate-50/60 to-transparent pointer-events-none"></div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-slate-300/80 rounded-full"></div>
                  <div className="absolute top-2 right-6 w-2.5 h-2.5 bg-slate-300/80 rounded-full"></div>

                  {/* Screen content - simplu și clean */}
                  <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col items-center justify-center px-6 py-10">
                    {/* Logo mare în centru */}
                    <div className="text-center space-y-3">
                      <div className="bg-white rounded-2xl p-4 shadow-lg inline-block">
                        <img src="/logo.svg" alt="" className="h-16 w-auto" width="55" height="64" loading="lazy" decoding="async" />
                      </div>
                      <div className="text-slate-900 font-bold text-base tracking-tight">FindTrades</div>
                      <div className="text-slate-600 text-sm">Find tradesmen<br />quickly and safely</div>
                    </div>
                  </div>

                  {/* Screen shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Phone buttons - Android style (dark) */}
                <div className="absolute right-0 top-[110px] w-0.5 h-8 bg-slate-700 rounded-l-sm"></div>
                <div className="absolute left-0 top-[130px] w-0.5 h-12 bg-slate-700 rounded-r-sm"></div>
              </div>

              {/* Download badges - design modern */}
              <div className="relative z-10 flex items-center gap-3">
                {/* Google Play Badge */}
                <div
                  className="group relative lg:pointer-events-auto opacity-75 cursor-not-allowed"
                  aria-label="Coming soon on Google Play"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 rounded-xl blur-md group-hover:blur-lg transition-all"></div>
                  <div className="relative bg-slate-900 hover:bg-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-3 transition-all transform group-hover:scale-105 border border-white/10">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5Z" fill="#00D9FF"/>
                      <path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" fill="#FFCE00"/>
                      <path d="M3.84 2.15C4.25 1.95 4.73 1.96 5.13 2.18L16.81 8.88L14.54 11.15L3.84 2.15Z" fill="#FF3A44"/>
                      <path d="M16.81 8.88L19.78 10.58C20.54 11.03 20.54 12.12 19.78 12.58L16.81 14.27L14.54 12L16.81 8.88Z" fill="#00F076"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-white/70 text-[9px] uppercase tracking-wide font-medium">Coming soon on</div>
                      <div className="text-white text-sm font-bold -mt-0.5">Google Play</div>
                    </div>
                  </div>
                </div>

                {/* App Store Badge */}
                <div
                  className="group relative lg:pointer-events-auto opacity-75 cursor-not-allowed"
                  aria-label="Coming soon on App Store"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-500/20 to-blue-500/20 rounded-xl blur-md group-hover:blur-lg transition-all"></div>
                  <div className="relative bg-slate-900 hover:bg-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-3 transition-all transform group-hover:scale-105 border border-white/10">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-white/70 text-[9px] uppercase tracking-wide font-medium">Coming soon on</div>
                      <div className="text-white text-sm font-bold -mt-0.5">App Store</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBackground>
  );
}
