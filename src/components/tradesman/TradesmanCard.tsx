import { MapPin, Star, CheckCircle, Phone, GraduationCap, Crown } from 'lucide-react';
import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { getWorkerProfileUrl } from '../../utils/seo-urls';

// Type for trade objects
interface TradeObject {
  id: number;
  name: string;
  category?: string | null;
  slug?: string;
}

interface WorkerProfile {
  id: string;
  name: string;
  avatar_url?: string | null;
  address?: string | null;
  bio?: string | null;
  rating: number;
  is_verified?: boolean;
  is_online?: boolean;
  phone?: string | null;
  trades?: any[];
  subscription_plan?: string; // 'pro', 'premium', etc.
}

// Memoized sub-components
const WorkerAvatar = memo(({ worker, profileUrl, avatarFallbackUrl }: { 
  worker: WorkerProfile, 
  profileUrl: string, 
  avatarFallbackUrl: string 
}) => (
  <div className="relative flex-shrink-0">
    <a href={profileUrl} className="block group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
        <img
          src={worker.avatar_url || avatarFallbackUrl}
          alt={worker.name}
          className="relative w-16 h-16 rounded-2xl object-cover ring-3 ring-white shadow-lg group-hover:ring-4 group-hover:ring-blue-200 group-hover:scale-105 transition-all duration-300"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            target.src = avatarFallbackUrl;
          }}
        />
        {worker.is_online && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full ring-3 ring-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </a>
  </div>
));
WorkerAvatar.displayName = 'WorkerAvatar';

export const TradesmanCard = memo(({ worker }: { worker: WorkerProfile }) => {
  const trades = useMemo(() => worker.trades || [], [worker.trades]);
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
  
  // Check if worker has pro subscription
  const isPro = worker.subscription_plan && (
    worker.subscription_plan.toLowerCase().includes('pro') || 
    worker.subscription_plan.toLowerCase().includes('premium')
  );
  
  // Debug: log subscription info
  console.log('👑 Worker subscription:', worker.name, { 
    subscription_plan: worker.subscription_plan,
    subscription_plan_type: typeof worker.subscription_plan,
    isPro 
  });
  
  // Generate profile URL with SEO-friendly slug
  const profileUrl = useMemo(() => {
    // Debug: log trades to see what we have
    if (trades.length > 0) {
      console.log('Worker trades:', worker.name, trades);
    }
    // Trades should already be objects with id, name, slug from TradesmenClientList
    // Just pass them directly
    return getWorkerProfileUrl(worker, trades);
  }, [worker, trades]);
  
  // Avatar fallback
  const avatarFallbackUrl = useMemo(() => {
    if (worker.name) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.name)}&background=4F46E5&color=fff&size=96`;
    }
    return `https://ui-avatars.com/api/?name=U&background=4F46E5&color=fff&size=96`;
  }, [worker.name]);
  
  // Handle phone reveal
  const handlePhoneReveal = useCallback(async () => {
    try {
      // Track phone reveal event
      const appUrl = import.meta.env.PUBLIC_APP_URL || 'https://app.meseriaslocal.ro';
      await fetch(`${appUrl}/api/track-phone-reveal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: worker.id })
      });
      
      setIsPhoneRevealed(true);
      sessionStorage.setItem(`phone_revealed_card_${worker.id}`, 'true');
      
      if (worker.phone) {
        window.location.href = `tel:${worker.phone}`;
      }
    } catch (error) {
      // Error logged to monitoring in production
      setIsPhoneRevealed(true);
      sessionStorage.setItem(`phone_revealed_card_${worker.id}`, 'true');
      if (worker.phone) {
        window.location.href = `tel:${worker.phone}`;
      }
    }
  }, [worker.id, worker.phone]);
  
  // Check if phone was already revealed
  useEffect(() => {
    const wasRevealed = sessionStorage.getItem(`phone_revealed_card_${worker.id}`) === 'true';
    if (wasRevealed) {
      setIsPhoneRevealed(true);
    }
  }, [worker.id]);
  
  return (
    <div className={`group relative rounded-3xl border shadow-lg overflow-hidden animate-fade-in backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${
      isPro 
        ? 'bg-gradient-to-br from-slate-50 via-white to-blue-50/30 border-blue-200/40 hover:shadow-2xl hover:shadow-blue-500/10 ring-2 ring-blue-400/20' 
        : 'bg-white border-slate-200/60 hover:shadow-2xl hover:shadow-slate-900/10'
    }`}>
      {/* Premium gradient overlay for pro users */}
      {isPro && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 pointer-events-none" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-400/10 via-indigo-300/5 to-transparent rounded-bl-full opacity-50"></div>
        </>
      )}
      
      {/* Regular gradient overlay for non-pro */}
      {!isPro && (
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      {/* PRO Badge */}
      {isPro && (
        <div className="absolute top-3 right-3 z-20">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg border border-blue-400/30">
            <Crown className="w-3.5 h-3.5 text-yellow-300 fill-current drop-shadow-sm" />
            <span className="text-xs font-bold text-white tracking-wide">PRO</span>
          </div>
        </div>
      )}

      <div className="relative z-10 p-7">
        {/* Header Section */}
        <div className="flex items-start gap-5 mb-6">
          {/* Avatar */}
          <WorkerAvatar 
            worker={worker} 
            profileUrl={profileUrl} 
            avatarFallbackUrl={avatarFallbackUrl} 
          />
          
          {/* Name and Badges */}
          <div className="flex-1 min-w-0">
            {/* Name Row */}
            <div className="mb-3">
              <a href={profileUrl} className="group/name">
                <h3 className={`text-xl font-bold leading-tight transition-colors duration-300 ${
                  isPro 
                    ? 'text-slate-900 group-hover/name:text-blue-600' 
                    : 'text-slate-900 group-hover/name:text-blue-600'
                }`}>
                  {worker.name}
                </h3>
              </a>
            </div>
            
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              {worker.is_verified && (
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full shadow-sm transition-colors duration-300 ${
                  isPro
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 hover:from-blue-100 hover:to-indigo-100'
                    : 'bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-300 hover:from-emerald-100 hover:to-green-100'
                }`}>
                  <CheckCircle className={`w-3.5 h-3.5 ${
                    isPro ? 'text-blue-600' : 'text-emerald-600'
                  }`} />
                  <span className={`text-xs font-bold tracking-wide ${
                    isPro ? 'text-blue-700' : 'text-emerald-700'
                  }`}>VERIFICAT</span>
                </div>
              )}
              
              {worker.rating > 0 && (
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full shadow-sm transition-colors duration-300 ${
                  isPro
                    ? 'bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 hover:from-amber-200 hover:to-yellow-200'
                    : 'bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 hover:from-amber-100 hover:to-yellow-100'
                }`}>
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  <span className="text-xs font-bold text-amber-700">{worker.rating.toFixed(1)} ★</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Location */}
        {worker.address && (
          <div className="flex items-center gap-2 mb-5">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl shadow-sm transition-colors duration-300 ${
              isPro
                ? 'bg-blue-50/80 border border-blue-200 hover:bg-blue-100/80'
                : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'
            }`}>
              <MapPin className={`w-4 h-4 transition-colors duration-300 ${
                isPro ? 'text-blue-600 group-hover:text-blue-700' : 'text-slate-500 group-hover:text-blue-500'
              }`} />
              <span className={`text-sm font-medium truncate transition-colors duration-300 ${
                isPro ? 'text-blue-900 group-hover:text-blue-950' : 'text-slate-700 group-hover:text-slate-900'
              }`}>
                {worker.address}
              </span>
            </div>
          </div>
        )}
        
        {/* Trades/Specializations */}
        {trades.length > 0 && (
          <div className="mb-5">
            <div className="flex flex-wrap gap-2">
              {trades.slice(0, 3).map((trade: any, index: number) => {
                const gradients = isPro ? [
                  'from-blue-600 to-indigo-600',
                  'from-purple-600 to-pink-600',
                  'from-emerald-600 to-teal-600'
                ] : [
                  'from-blue-500 to-cyan-500',
                  'from-purple-500 to-pink-500',
                  'from-emerald-500 to-teal-500'
                ];
                return (
                  <span 
                    key={trade.id || index} 
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r ${gradients[index % gradients.length]} text-white text-xs font-bold shadow-md transition-all hover:shadow-lg ${isPro ? 'ring-1 ring-white/40' : ''}`}
                  >
                    {trade.name}
                  </span>
                );
              })}
              {trades.length > 3 && (
                <span className={`inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-slate-600 to-slate-700 text-white text-xs font-bold shadow-md ${isPro ? 'ring-1 ring-white/40' : ''}`}>
                  +{trades.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <a
            href={profileUrl}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 group/btn transition-all duration-300 ${
              isPro
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/25'
                : 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/25'
            }`}
          >
            <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="group-hover/btn:scale-105 transition-transform duration-300">Vezi Profilul</span>
          </a>
          {worker.phone && (
            <button
              onClick={handlePhoneReveal}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 group/btn transition-all duration-300 ${
                isPro
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 hover:shadow-emerald-500/25'
              }`}
              title={isPhoneRevealed ? `Sună ${worker.phone}` : 'Afișează numărul și sună'}
            >
              <Phone className="w-5 h-5 group-hover/btn:animate-pulse" />
              <span className="font-bold group-hover/btn:scale-105 transition-transform duration-300">
                {isPhoneRevealed ? worker.phone : 'Sună Acum'}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.worker.id === nextProps.worker.id &&
    prevProps.worker.name === nextProps.worker.name &&
    prevProps.worker.rating === nextProps.worker.rating &&
    prevProps.worker.is_verified === nextProps.worker.is_verified &&
    prevProps.worker.is_online === nextProps.worker.is_online &&
    prevProps.worker.avatar_url === nextProps.worker.avatar_url &&
    prevProps.worker.phone === nextProps.worker.phone &&
    prevProps.worker.subscription_plan === nextProps.worker.subscription_plan &&
    JSON.stringify(prevProps.worker.trades) === JSON.stringify(nextProps.worker.trades)
  );
});

TradesmanCard.displayName = 'TradesmanCard';
