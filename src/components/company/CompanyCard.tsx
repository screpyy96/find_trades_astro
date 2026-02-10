import { MapPin, Star, Phone, Building2, ArrowRight } from 'lucide-react';
import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { getWorkerProfileeUrl } from '../../utils/seo-urls';

interface CompanyProfilee {
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

export const CompanyCard = memo(({ company }: { company: CompanyProfilee }) => {
  const trades = useMemo(() => company.trades || [], [company.trades]);
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
  
  const profileUrl = useMemo(() => {
    const baseUrl = getWorkerProfileeUrl(company, trades);
    return baseUrl.replace('/tradesmen/', '/companii/');
  }, [company, trades]);
  
  const initials = useMemo(() => {
    if (!company.name) return 'C';
    const words = company.name.split(' ').filter(w => w.length > 0);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return words[0].substring(0, 2).toUpperCase();
  }, [company.name]);
  
  const handlePhoneReveal = useCallback(async () => {
    try {
      await fetch('/api/track-phone-reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: company.id })
      });
    } catch {}
    setIsPhoneRevealed(true);
    sessionStorage.setItem(`phone_revealed_company_${company.id}`, 'true');
    if (company.phone) {
      window.location.href = `tel:${company.phone}`;
    }
  }, [company.id, company.phone]);
  
  useEffect(() => {
    const wasRevealed = sessionStorage.getItem(`phone_revealed_company_${company.id}`) === 'true';
    if (wasRevealed) setIsPhoneRevealed(true);
  }, [company.id]);
  
  return (
    <div className="group relative h-full flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
      
      {/* Content */}
      <div className="flex-1 p-5">
        {/* Header - Avatar + Name + Rating */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <a href={profileUrl} className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 group-hover:scale-105 transition-all duration-300">
              {company.avatar_url ? (
                <img
                  src={company.avatar_url}
                  alt={company.name}
                  className="w-full h-full rounded-xl object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="text-white font-bold text-lg">{initials}</span>
              )}
            </div>
            {company.is_online && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white">
                <div className="w-full h-full rounded-full animate-ping bg-emerald-400 opacity-75" />
              </div>
            )}
          </a>
          
          {/* Name + Rating */}
          <div className="flex-1 min-w-0">
            <a href={profileUrl}>
              <h3 className="font-bold text-slate-900 text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                {company.name}
              </h3>
            </a>
            {company.rating > 0 && (
              <div className="flex items-center gap-1 mt-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
                <span className="text-sm font-semibold text-slate-700">{company.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Bio - truncated */}
        {company.bio && (
          <p className="text-sm text-slate-500 line-clamp-2 mb-3 leading-relaxed">
            {company.bio}
          </p>
        )}
        
        {/* Location */}
        {company.address && (
          <div className="flex items-center gap-1.5 text-slate-500 mb-3">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-xs truncate">{company.address}</span>
          </div>
        )}
        
        {/* Categories/Trades - compact pills */}
        {trades.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {trades.slice(0, 3).map((trade: any, index: number) => (
              <span 
                key={trade.id || index} 
                className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-600 border border-slate-200"
              >
                {trade.name}
              </span>
            ))}
            {trades.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                +{trades.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* Footer - Action Buttons - Always at bottom */}
      <div className="p-4 pt-0 mt-auto space-y-2">
        <a
          href={profileUrl}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Building2 className="w-4 h-4" />
          <span>Vezi Profile</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
        
        {company.phone && (
          <button
            onClick={handlePhoneReveal}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-xl border border-emerald-200 hover:border-emerald-300 transition-all duration-200"
          >
            <Phone className="w-4 h-4" />
            <span>{isPhoneRevealed ? company.phone : 'Contact'}</span>
          </button>
        )}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.company.id === nextProps.company.id &&
    prevProps.company.name === nextProps.company.name &&
    prevProps.company.rating === nextProps.company.rating &&
    prevProps.company.avatar_url === nextProps.company.avatar_url &&
    prevProps.company.phone === nextProps.company.phone &&
    JSON.stringify(prevProps.company.trades) === JSON.stringify(nextProps.company.trades)
  );
});

CompanyCard.displayName = 'CompanyCard';
