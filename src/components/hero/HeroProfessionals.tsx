import { useState, useEffect } from 'react';
import { Crown, Eye, Star } from 'lucide-react';

// Helper to check if user has premium subscription (pro or enterprise)
const isPremiumUser = (plan: string | null | undefined): boolean => {
  if (!plan) return false;
  const normalizedPlan = plan.trim().toLowerCase();
  return normalizedPlan === 'pro' || normalizedPlan === 'enterprise';
};

// Helper function to batch fetch subscriptions
async function fetchSubscriptionsInBatches(
  supabase: any,
  userIds: string[],
  batchSize: number = 50
): Promise<{ user_id: string; plan_id: string; status: string }[]> {
  if (!userIds.length) return [];
  
  const results: { user_id: string; plan_id: string; status: string }[] = [];
  
  for (let i = 0; i < userIds.length; i += batchSize) {
    const batch = userIds.slice(i, i + batchSize);
    
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('user_id, plan_id, status')
        .in('user_id', batch)
        .eq('status', 'active');
      
      if (error) {
        console.error(`❌ Error fetching subscriptions batch ${i / batchSize + 1}:`, error);
        continue;
      }
      
      if (data) {
        results.push(...data);
      }
    } catch (err) {
      console.error(`❌ Exception fetching subscriptions batch ${i / batchSize + 1}:`, err);
    }
  }
  
  return results;
}

interface Professional {
  id: string;
  name: string;
  avatar_url?: string | null;
  address?: string | null;
  rating?: number;
  subscription_plan?: string;
}

interface HeroProfessionalsProps {
  tradeId?: number;
  cityName: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  maxResults?: number;
  isMobile?: boolean;
}

export function HeroProfessionals({
  tradeId,
  cityName,
  supabaseUrl: supabaseUrlProp,
  supabaseAnonKey: supabaseAnonKeyProp,
  maxResults = 6,
  isMobile = false
}: HeroProfessionalsProps) {
  // Detect if we're on mobile based on screen size
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isCompact = isMobile || isMobileView;
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [supabase, setSupabase] = useState<any>(null);

  // Initialize Supabase client
  useEffect(() => {
    const initSupabase = async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const url = supabaseUrlProp || import.meta.env.PUBLIC_SUPABASE_URL;
        const key = supabaseAnonKeyProp || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
        
        if (url && key) {
          const client = createClient(url, key);
          setSupabase(client);
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        console.error('❌ Failed to initialize Supabase:', err);
        setIsLoading(false);
      }
    };
    
    initSupabase();
  }, [supabaseUrlProp, supabaseAnonKeyProp]);

  // Fetch PRO professionals
  useEffect(() => {
    if (!supabase) return;

    const fetchProfessionals = async () => {
      setIsLoading(true);

      try {
        let workerIds: string[] = [];

        if (tradeId) {
          // Specific trade filtering
          const { data: workerTradesData, error: workerTradesError } = await supabase
            .from('worker_trades')
            .select('profile_id, trade_ids')
            .contains('trade_ids', [tradeId]);

          if (workerTradesError) {
            throw new Error(workerTradesError.message);
          }

          if (!workerTradesData || workerTradesData.length === 0) {
            setProfessionals([]);
            setIsLoading(false);
            return;
          }

          workerIds = workerTradesData.map((wt: any) => wt.profile_id);
        } else {
          // Get all workers
          const { data: allWorkerTrades, error: allWorkerTradesError } = await supabase
            .from('worker_trades')
            .select('profile_id');

          if (allWorkerTradesError) {
            throw new Error(allWorkerTradesError.message);
          }

          if (!allWorkerTrades || allWorkerTrades.length === 0) {
            setProfessionals([]);
            setIsLoading(false);
            return;
          }

          workerIds = allWorkerTrades.map((wt: any) => wt.profile_id);
        }

        // Get worker profiles
        let workersQuery = supabase
          .from('profiles')
          .select('id, name, avatar_url, address, rating')
          .in('id', workerIds)
          .eq('role', 'worker')
          .eq('is_verified', true);

        // Filter by city if not national
        if (cityName !== 'România') {
          workersQuery = workersQuery.ilike('address', `%${cityName}%`);
        }

        const { data: workersData, error: workersError } = await workersQuery;

        if (workersError) {
          throw new Error(workersError.message);
        }

        if (!workersData || workersData.length === 0) {
          setProfessionals([]);
          setIsLoading(false);
          return;
        }

        // Fetch subscriptions
        const subscriptionsData = await fetchSubscriptionsInBatches(
          supabase, 
          workersData.map((w: any) => w.id)
        );

        const subscriptionMap = new Map(
          subscriptionsData.map((sub: any) => [sub.user_id, sub.plan_id])
        );

        // Map subscriptions to workers and filter Premium only
        const workersWithData = workersData.map((worker: any) => ({
          ...worker,
          subscription_plan: subscriptionMap.get(worker.id) || null
        }));

        const proWorkers = workersWithData
          .filter((w: any) => isPremiumUser(w.subscription_plan))
          .slice(0, maxResults);
        
        setProfessionals(proWorkers as Professional[]);
      } catch (err) {
        console.error('❌ Error fetching professionals:', err);
        setProfessionals([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessionals();
  }, [supabase, tradeId, cityName, maxResults]);

  // Don't render if no professionals or loading
  if (isLoading || professionals.length === 0) {
    return null;
  }

  return (
    <div className={`relative flex flex-col items-center ${isCompact ? 'gap-4' : 'gap-6'}`}>
      {/* Glow effect */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isCompact ? 'w-[250px] h-[250px]' : 'w-[350px] h-[350px]'} bg-gradient-to-br from-amber-500/20 via-emerald-500/20 to-blue-500/15 rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '4s' }} />
      
      {/* Header with PRO Badge and CTA */}
      <div className="relative z-10 text-center space-y-2">
        <div className={`flex items-center justify-center gap-2 ${isCompact ? 'px-3 py-1.5' : 'px-4 py-2'} bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-full border border-amber-400/30`}>
          <Crown className={`${isCompact ? 'w-3 h-3' : 'w-4 h-4'} text-amber-400 fill-current`} />
          <span className={`text-amber-300 ${isCompact ? 'text-xs' : 'text-sm'} font-bold`}>Meseriași PRO</span>
        </div>
        {!isCompact && (
          <p className="text-slate-300 text-sm max-w-[200px]">
            Dă click pentru a vedea profilurile complete
          </p>
        )}
      </div>

      {/* Professionals Grid */}
      <div className={`relative z-10 ${isCompact ? 'flex gap-3 overflow-x-auto pb-2 max-w-[300px]' : 'grid grid-cols-2 gap-6 max-w-[300px]'}`}>
        {professionals.slice(0, isCompact ? 3 : 4).map((professional, index) => {
          const avatarFallbackUrl = professional.name 
            ? `https://ui-avatars.com/api/?name=${encodeURIComponent(professional.name)}&background=4F46E5&color=fff&size=120`
            : `https://ui-avatars.com/api/?name=U&background=4F46E5&color=fff&size=120`;

          const avatarSize = isCompact ? 'w-20 h-20' : 'w-28 h-28';

          return (
            <a
              key={professional.id}
              href={`/meseriasi/${professional.id}`}
              className={`group relative block cursor-pointer transform hover:scale-110 transition-all duration-300 ${isCompact ? 'flex-shrink-0' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Hover glow effect */}
              <div className={`absolute ${isCompact ? '-inset-1' : '-inset-2'} bg-gradient-to-r from-amber-500/30 via-emerald-500/30 to-blue-500/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`} />
              
              {/* Click indicator */}
              <div className="absolute -inset-1 border-2 border-amber-400/0 group-hover:border-amber-400/60 rounded-full transition-all duration-300" />
              
              {/* Avatar Container */}
              <div className="relative">
                {/* Avatar */}
                <div className={`relative ${avatarSize} rounded-full overflow-hidden ring-2 ring-white/30 group-hover:ring-3 group-hover:ring-amber-400/60 transition-all duration-300 shadow-2xl`}>
                  <img
                    src={professional.avatar_url || avatarFallbackUrl}
                    alt={professional.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = avatarFallbackUrl;
                    }}
                  />
                  
                  {/* Hover overlay with eye icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye className={`${isCompact ? 'w-4 h-4' : 'w-6 h-6'} text-white animate-pulse`} />
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* PRO indicator */}
                <div className={`absolute ${isCompact ? '-top-1 -right-1 w-6 h-6' : '-top-2 -right-2 w-8 h-8'} bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center ring-2 ring-white/40 group-hover:ring-amber-400/60 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <Crown className={`${isCompact ? 'w-3 h-3' : 'w-4 h-4'} text-white fill-current`} />
                </div>

                {/* Rating badge if available */}
                {professional.rating && professional.rating > 0 && !isCompact && (
                  <div className="absolute -bottom-2 -left-2 flex items-center gap-1 px-2 py-1 bg-slate-900/90 backdrop-blur-sm rounded-full ring-2 ring-white/30 group-hover:ring-emerald-400/60 transition-all duration-300">
                    <Star className="w-3 h-3 text-amber-400 fill-current" />
                    <span className="text-white text-xs font-bold">{professional.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {/* Name and location - only on desktop */}
              {!isCompact && (
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="px-3 py-2 bg-slate-900/95 backdrop-blur-sm text-white rounded-lg shadow-xl border border-white/20 min-w-max">
                    <div className="text-sm font-semibold text-amber-300">{professional.name}</div>
                    {professional.address && (
                      <div className="text-xs text-slate-300 truncate max-w-[120px]">
                        {professional.address.split(',')[0]}
                      </div>
                    )}
                  </div>
                  {/* Arrow pointing to avatar */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95"></div>
                </div>
              )}
            </a>
          );
        })}
      </div>

      {/* Additional count and CTA */}
      {professionals.length > (isCompact ? 3 : 4) && (
        <div className="relative z-10 text-center space-y-2">
          <div className={`flex items-center gap-2 ${isCompact ? 'px-3 py-1.5' : 'px-4 py-2'} bg-white/10 backdrop-blur-sm rounded-full border border-white/20`}>
            <span className={`text-white ${isCompact ? 'text-xs' : 'text-sm'} font-medium`}>+{professionals.length - (isCompact ? 3 : 4)} meseriași PRO</span>
          </div>
          <a 
            href="/meseriasi" 
            className={`inline-flex items-center gap-2 ${isCompact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'} bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105`}
          >
            <Eye className={`${isCompact ? 'w-3 h-3' : 'w-4 h-4'}`} />
            Vezi toți meseriașii
          </a>
        </div>
      )}

      {/* Floating action hint - only on desktop */}
      {!isCompact && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-400/30 animate-bounce">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          <span className="text-amber-300 text-xs font-medium">Click pentru detalii</span>
        </div>
      )}
    </div>
  );
}