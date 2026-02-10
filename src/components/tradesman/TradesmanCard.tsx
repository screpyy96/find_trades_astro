import { MapPin, Star, CheckCircle, Phone, Crown } from 'lucide-react';
import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { getWorkerProfileUrl } from '../../utils/seo-urls';

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
  subscription_plan?: string;
}

export const TradesmanCard = memo(({ worker }: { worker: WorkerProfile }) => {
  const trades = useMemo(() => worker.trades || [], [worker.trades]);
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);

  const isPro = worker.subscription_plan && (
    worker.subscription_plan.toLowerCase().includes('pro') ||
    worker.subscription_plan.toLowerCase().includes('enterprise')
  );

  const profileUrl = useMemo(() => getWorkerProfileUrl(worker, trades), [worker, trades]);

  const avatarFallbackUrl = useMemo(() => {
    const name = worker.name || 'U';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f1f5f9&color=64748b&size=96`;
  }, [worker.name]);

  const handlePhoneReveal = useCallback(async () => {
    try {
      const appUrl = import.meta.env.PUBLIC_APP_URL || 'https://app.findtrades.app';
      await fetch(`${appUrl}/api/track-phone-reveal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: worker.id })
      });
    } catch { /* silent */ }
    setIsPhoneRevealed(true);
    sessionStorage.setItem(`phone_revealed_card_${worker.id}`, 'true');
    if (worker.phone) window.location.href = `tel:${worker.phone}`;
  }, [worker.id, worker.phone]);

  useEffect(() => {
    if (sessionStorage.getItem(`phone_revealed_card_${worker.id}`) === 'true') setIsPhoneRevealed(true);
  }, [worker.id]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 hover:border-slate-300 transition-colors">
      {/* Top row: avatar + info */}
      <div className="flex gap-4 mb-4">
        {/* Avatar */}
        <a href={profileUrl} className="flex-shrink-0">
          <div className="relative">
            <img
              src={worker.avatar_url || avatarFallbackUrl}
              alt={worker.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-slate-200"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => { e.currentTarget.src = avatarFallbackUrl; }}
            />
            {worker.is_online && (
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-white" />
            )}
          </div>
        </a>

        {/* Name, location, rating */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <a href={profileUrl}>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 truncate hover:text-slate-700 transition-colors">{worker.name}</h3>
            </a>
            {isPro && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 flex-shrink-0">
                <Crown className="w-3 h-3" />
                <span className="text-[10px] font-semibold">PRO</span>
              </span>
            )}
            {worker.is_verified && (
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            )}
          </div>

          {worker.address && (
            <div className="flex items-center gap-1.5 text-slate-500 mb-1.5">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-sm truncate">{worker.address}</span>
            </div>
          )}

          {worker.rating > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(worker.rating) ? 'text-amber-400 fill-current' : 'text-slate-200'}`} />
                ))}
              </div>
              <span className="text-xs text-slate-500 ml-1">{worker.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Trades */}
      {trades.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {trades.slice(0, 3).map((trade: any, i: number) => (
            <span key={trade.id || i} className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
              {trade.name}
            </span>
          ))}
          {trades.length > 3 && (
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-400 text-xs font-medium">
              +{trades.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <a
          href={profileUrl}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
        >
          View Profile
        </a>
        {worker.phone && (
          <button
            onClick={handlePhoneReveal}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
            title={isPhoneRevealed ? `Call ${worker.phone}` : 'Show number'}
          >
            <Phone className="w-4 h-4" />
            {isPhoneRevealed ? <span className="text-xs">{worker.phone}</span> : <span>Call</span>}
          </button>
        )}
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
