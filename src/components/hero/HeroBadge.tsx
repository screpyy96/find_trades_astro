// Lightweight inline icon to avoid pulling large icon packs above the fold

export function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-amber-500/10 px-4 py-2 text-white backdrop-blur-sm">
      <div className="flex items-center justify-center w-5 h-5 bg-blue-400/20 rounded-full">
        <svg viewBox="0 0 24 24" className="w-3 h-3 text-blue-400" fill="currentColor" aria-hidden="true">
          <path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z" />
        </svg>
      </div>
      <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
        #1 Tradesmen Platform in the UK
      </span>
      <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
    </div>
  );
}
