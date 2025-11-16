import { MapPin, Star, CheckCircle, Phone, GraduationCap } from 'lucide-react';
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
}

// Memoized sub-components
const TradesDisplay = memo(({ trades, workerName }: { trades: any[], workerName: string }) => {
  if (trades.length === 0) {
    return null;
  }
  
  const validTrades = trades.filter((trade: any) => {
    if (typeof trade === 'string') return true;
    if (trade && typeof trade === 'object' && trade.name) return true;
    return false;
  });
  
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {validTrades.slice(0, 3).map((trade: any, index: number) => {
          const tradeName = typeof trade === 'string' ? trade : (trade?.name || 'Unknown Trade');
          return (
            <span
              key={`${workerName}-${index}-${tradeName}`}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-xs font-semibold text-blue-700 shadow-sm hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-default"
            >
              {tradeName}
            </span>
          );
        })}
        {validTrades.length > 3 && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-300 text-xs font-semibold text-slate-600 shadow-sm hover:from-slate-100 hover:to-gray-100 hover:border-slate-400 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-default">
            +{validTrades.length - 3} mai multe
          </span>
        )}
      </div>
    </div>
  );
});
TradesDisplay.displayName = 'TradesDisplay';

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
    <div className="group relative bg-white rounded-3xl border border-slate-200/60 shadow-lg overflow-hidden animate-fade-in backdrop-blur-sm hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-1">
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

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
                <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover/name:text-blue-600 transition-colors duration-300">
                  {worker.name}
                </h3>
              </a>
            </div>
            
            {/* Badges Row */}
            <div className="space-y-2">
              {worker.is_verified && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-300 shadow-sm hover:from-emerald-100 hover:to-green-100 transition-colors duration-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-700 tracking-wide">VERIFICAT</span>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {worker.rating > 0 && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 shadow-sm hover:from-amber-100 hover:to-yellow-100 transition-colors duration-300">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                    <span className="text-xs font-bold text-amber-700">{worker.rating.toFixed(1)} ★</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Location */}
        {worker.address && (
          <div className="flex items-center gap-2 mb-5">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 shadow-sm hover:bg-slate-100 transition-colors duration-300">
              <MapPin className="w-4 h-4 text-slate-500 group-hover:text-blue-500 transition-colors duration-300" />
              <span className="text-sm font-medium text-slate-700 truncate group-hover:text-slate-900 transition-colors duration-300">
                {worker.address}
              </span>
            </div>
          </div>
        )}
        
        {/* Bio */}
        {worker.bio && (
          <div className="mb-6 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl border border-slate-200 shadow-sm hover:from-slate-100 hover:to-gray-100 transition-colors duration-300">
            <p className="text-sm text-slate-700 leading-relaxed line-clamp-3 font-medium">
              {worker.bio}
            </p>
          </div>
        )}
        
        {/* Trades */}
        <TradesDisplay trades={trades} workerName={worker.name} />
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <a
            href={profileUrl}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-slate-800 to-slate-900 hover:from-blue-600 hover:to-blue-700 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 group/btn"
          >
            <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="group-hover/btn:scale-105 transition-transform duration-300">Vezi Profilul</span>
          </a>
          {worker.phone && (
            <button
              onClick={handlePhoneReveal}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5 group/btn"
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
    JSON.stringify(prevProps.worker.trades) === JSON.stringify(nextProps.worker.trades)
  );
});

TradesmanCard.displayName = 'TradesmanCard';
