import { Sparkles, MessageSquare, Zap, CheckCircle } from '../../utils/icons';

interface HeroAssistantProps {
  compact?: boolean;
}

export function HeroAssistant({ compact = false }: HeroAssistantProps) {
  if (compact) {
    return (
      <div className="text-center">
        {/* Compact Header */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shrink-0 shadow-lg shadow-amber-500/25">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Asistentul AI</h3>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-400/30">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">Online</span>
            </div>
          </div>
        </div>

        {/* Compact Description */}
        <p className="text-slate-300 text-sm mb-3">
          Nu știi ce să ceri? Lasă AI-ul să te ghideze pentru cererea perfectă.
        </p>

        {/* Compact CTA Button */}
        <button
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new Event('ml:chat-open'));
            }
          }}
          aria-label="Deschide asistentul AI"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 px-4 transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-400/40 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Încearcă AI-ul</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-sm border border-white/10 p-6 hover:border-amber-400/30 transition-all duration-300 group">
      {/* Online indicator */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
      
      {/* Header with icon and title */}
      <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shrink-0 shadow-lg shadow-amber-500/25 group-hover:shadow-amber-400/40 transition-all duration-300 group-hover:scale-105">
          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        </div>
        <div>
          <h3 className="font-bold text-xl text-white group-hover:text-amber-200 transition-colors duration-300">
            Asistentul AI Premium
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-400/30">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">Online acum</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-200 text-base leading-relaxed mb-4 text-center md:text-left">
        Creează cereri perfecte în doar 2 minute! Economisește timp și primește oferte mai bune de la meseriași calificați.
      </p>

      {/* Benefits grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="flex flex-col items-center text-center p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <div className="text-amber-400 font-bold text-lg mb-1">85%</div>
          <div className="text-slate-400 text-xs">mai multe oferte</div>
        </div>
        <div className="flex flex-col items-center text-center p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <div className="text-green-400 font-bold text-lg mb-1">2.3x</div>
          <div className="text-slate-400 text-xs">mai rapid</div>
        </div>
      </div>

      {/* Features list */}
      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span>Ghidare pas cu pas</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Răspunsuri instant</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Optimizare automată</span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={() => {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('ml:chat-open'));
          }
        }}
        aria-label="Deschide asistentul AI"
        className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-6 transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-400/40 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 group"
      >
        <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
        <span>Începe acum - Gratuit</span>
      </button>
    </div>
  );
}
export default HeroAssistant;
