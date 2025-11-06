export function HeroDecor() {
  return (
    <>
      {/* Radial gradient base */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_-10%,rgba(16,185,129,0.35),rgba(4,21,14,0.9)_55%,rgba(2,10,8,0.98)_95%)]" />
      </div>

      {/* Colorful glows (static) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-28 h-[260px] w-[260px] md:h-[460px] md:w-[460px] rounded-full bg-gradient-to-br from-emerald-400/60 via-emerald-300/15 to-transparent blur-[90px] md:blur-3xl opacity-90" />
        <div className="absolute top-8 right-6 h-[200px] w-[200px] md:h-[340px] md:w-[340px] rounded-full bg-gradient-to-bl from-lime-300/45 via-lime-200/15 to-transparent blur-2xl opacity-75" />
        <div className="absolute -bottom-48 -right-20 h-[260px] w-[260px] md:h-[380px] md:w-[380px] rounded-full bg-gradient-to-br from-emerald-500/55 via-teal-400/20 to-transparent blur-[110px] opacity-80" />
      </div>

      {/* Geometric accents */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute top-24 left-16 h-24 w-24 rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-400/20 to-transparent" />
        <div className="absolute bottom-24 right-24 h-20 w-20 rounded-full border border-blue-400/30 bg-gradient-to-br from-blue-400/15 to-transparent" />
        <div className="absolute top-1/3 right-1/3 h-[120px] w-[320px] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-6 rounded-3xl opacity-40" />
      </div>

      {/* Soft diagonal beams */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute top-16 -left-20 w-[500px] h-[140px] bg-gradient-to-r from-amber-500/25 via-transparent to-transparent rotate-8 blur-3xl opacity-70" />
        <div className="absolute bottom-20 -right-32 w-[520px] h-[140px] bg-gradient-to-l from-emerald-400/25 via-transparent to-transparent -rotate-6 blur-[110px] opacity-65" />
      </div>

      {/* Subtle outlines */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] border border-white/10 rounded-full" />
        <div className="absolute bottom-1/4 right-1/3 w-[220px] h-[220px] border border-white/10 rounded-full" />
      </div>
    </>
  );
}
