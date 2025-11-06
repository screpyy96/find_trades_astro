import { HeroDecor } from "./HeroDecor";

interface HeroBackgroundProps {
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
}

export function HeroBackground({ children, className = '', compact = false }: HeroBackgroundProps) {
  return (
    <div
      data-navbar-transparent="true"
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(180deg, #1b1f1d 0%, #21251f 50%, #2a302b 100%)`
      }}
    >
      <HeroDecor />
      {/* Animated geometric pattern */}
      <div className="absolute inset-0 opacity-15">
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(45, 51, 45, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(45, 51, 45, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: compact ? '40px 40px' : '60px 60px'
          }}
        />

        {/* Floating geometric shapes - doar cercuri */}
        <div className={`absolute top-24 left-40 w-14 h-14 border-2 border-blue-400/30 rounded-full animate-pulse`} style={{ animationDelay: '0.5s' }} />
        <div className={`absolute top-48 left-20 w-10 h-10 bg-emerald-400/15 rounded-full animate-bounce`} style={{ animationDelay: '1s' }} />
        
        <div className={`absolute top-20 right-28 w-16 h-16 border-2 border-purple-400/30 rounded-full animate-pulse`} style={{ animationDelay: '1.5s' }} />
        <div className={`absolute top-52 right-16 w-12 h-12 bg-blue-400/15 rounded-full animate-bounce`} style={{ animationDelay: '2s' }} />
        
        <div className={`absolute bottom-36 left-24 w-14 h-14 border-2 border-emerald-400/30 rounded-full animate-pulse`} style={{ animationDelay: '2.5s' }} />
        <div className={`absolute bottom-20 left-52 w-8 h-8 bg-amber-400/20 rounded-full animate-bounce`} style={{ animationDelay: '3s' }} />

        {/* Diagonal construction lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className={`absolute top-1/4 -left-10 w-96 h-0.5 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent rotate-12 animate-pulse`} />
          <div className={`absolute bottom-1/3 -right-10 w-80 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent -rotate-12 animate-pulse`} style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Hexagon pattern */}
        <div className="absolute top-1/3 left-1/3 opacity-30">
          <svg width="100" height="100" viewBox="0 0 100 100" className="animate-spin" style={{ animationDuration: '20s' }}>
            <polygon points="50,5 85,25 85,75 50,95 15,75 15,25" fill="none" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1" />
            <polygon points="50,15 75,30 75,70 50,85 25,70 25,30" fill="none" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Subtle radial overlays */}
      <div className="absolute inset-0">
        <div className={`absolute -top-40 -left-40 w-96 h-96 bg-amber-500/3 rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/2 rounded-full blur-3xl" />
      </div>

      {children}
    </div>
  );
}
