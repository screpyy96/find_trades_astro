import { useState, useEffect } from 'react';
import { Crown, MapPin, Gem } from 'lucide-react';
import { TradesmanCard } from './TradesmanCard';

// Helper to check if user has premium subscription (pro or enterprise)
const isPremiumUser = (plan: string | null | undefined): boolean => {
  if (!plan) return false;
  const normalizedPlan = plan.replace(/[\r\n]/g, '').trim().toLowerCase();
  return normalizedPlan === 'pro' || normalizedPlan.startsWith('enterprise');
};

// Helper to check if user is Enterprise
const isEnterpriseUser = (plan: string | null | undefined): boolean => {
  if (!plan) return false;
  const normalizedPlan = plan.replace(/[\r\n]/g, '').trim().toLowerCase();
  return normalizedPlan.startsWith('enterprise');
};

// Helper to get plan label
const getPlanLabel = (plan: string | null | undefined): string => {
  if (isEnterpriseUser(plan)) return 'ENTERPRISE';
  if (isPremiumUser(plan)) return 'PRO';
  return '';
};

// Helper function to batch fetch subscriptions to avoid URL too long errors
async function fetchSubscriptionsInBatches(
  supabase: any,
  userIds: string[],
  batchSize: number = 50
): Promise<{ user_id: string; plan_id: string; status: string }[]> {
  if (!userIds.length) return [];
  
  const results: { user_id: string; plan_id: string; status: string }[] = [];
  
  // Split userIds into batches
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

interface Worker {
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

// Horizontal row card - used for compact mode on all devices
function MobileCompactCard({ worker }: { worker: Worker }) {
  const isEnterprise = isEnterpriseUser(worker.subscription_plan);
  const planLabel = getPlanLabel(worker.subscription_plan);
  
  return (
    <a 
      href={`/meseriasi/${worker.id}`}
      className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-3 hover:shadow-md transition-all duration-200 hover:border-slate-300 group"
    >
      {/* Avatar */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
        {worker.avatar_url ? (
          <img
            src={worker.avatar_url}
            alt={worker.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
            {worker.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate group-hover:text-blue-600">
            {worker.name}
          </h3>
          {worker.is_verified && (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        
        {/* Plan Badge */}
        {planLabel && (
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold mb-1.5 ${
            isEnterprise 
              ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' 
              : 'bg-amber-100 text-amber-700 border border-amber-200'
          }`}>
            {isEnterprise ? <Gem className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
            {planLabel}
          </div>
        )}
        
        <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-500">
          {worker.address && (
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-[200px]">{worker.address}</span>
            </span>
          )}
          {worker.rating > 0 && (
            <span className="flex items-center gap-0.5 flex-shrink-0">
              <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold text-slate-700">{worker.rating.toFixed(1)}</span>
            </span>
          )}
        </div>
      </div>

      {/* Arrow */}
      <svg className="w-5 h-5 text-slate-400 flex-shrink-0 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}


interface RecommendedTradesmenProps {
  tradeId?: number;
  tradeIds?: number[];  // Support for multiple trade IDs (e.g., all trades in a category)
  tradeName?: string;
  cityName: string;
  categoryName?: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  maxResults?: number;
  compact?: boolean;
}

export function RecommendedTradesmen({
  tradeId,
  tradeIds,
  tradeName,
  cityName,
  supabaseUrl: supabaseUrlProp,
  supabaseAnonKey: supabaseAnonKeyProp,
  maxResults = 6,
  compact = false
}: RecommendedTradesmenProps) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
          setError('Configurare incompletă. Variabilele de mediu Supabase lipsesc.');
          setIsLoading(false);
        }
      } catch (err) {
        console.error('❌ Failed to initialize Supabase:', err);
        setError('Nu s-a putut inițializa conexiunea la baza de date.');
        setIsLoading(false);
      }
    };
    
    initSupabase();
  }, [supabaseUrlProp, supabaseAnonKeyProp]);

  // Fetch recommended tradesmen (PRO users for this trade and city)
  useEffect(() => {
    if (!supabase) return;

    const fetchRecommendedTradesmen = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let workerIds: string[] = [];

        // Determine which trade IDs to search for
        const searchTradeIds = tradeIds || (tradeId ? [tradeId] : null);

        if (searchTradeIds && searchTradeIds.length > 0) {
          // Specific trade(s) filtering - find workers who have ANY of the specified trades
          const { data: workerTradesData, error: workerTradesError } = await supabase
            .from('worker_trades')
            .select('profile_id, trade_ids');

          if (workerTradesError) {
            throw new Error(workerTradesError.message);
          }

          if (!workerTradesData || workerTradesData.length === 0) {
            setWorkers([]);
            setIsLoading(false);
            return;
          }

          // Filter workers who have at least one of the specified trade IDs
          const matchingWorkers = workerTradesData.filter((wt: any) => {
            if (!wt.trade_ids || !Array.isArray(wt.trade_ids)) return false;
            return wt.trade_ids.some((tid: number) => searchTradeIds.includes(tid));
          });

          workerIds = matchingWorkers.map((wt: any) => wt.profile_id);
        } else {
          // Category-based filtering - get all workers with any trade
          const { data: allWorkerTrades, error: allWorkerTradesError } = await supabase
            .from('worker_trades')
            .select('profile_id');

          if (allWorkerTradesError) {
            throw new Error(allWorkerTradesError.message);
          }

          if (!allWorkerTrades || allWorkerTrades.length === 0) {
            setWorkers([]);
            setIsLoading(false);
            return;
          }

          workerIds = allWorkerTrades.map((wt: any) => wt.profile_id);
        }

        // Get worker profiles filtered by city and verified status
        let workersQuery = supabase
          .from('profiles')
          .select('id, name, avatar_url, address, bio, rating, is_verified, is_online, phone')
          .in('id', workerIds)
          .eq('role', 'worker')
          .eq('is_verified', true);
          // Remove rating filter and sorting

        // Only filter by city if it's not "România" (national page)
        // We need to search for both city name AND county name to catch addresses like "Vâlcea" for "Râmnicu Vâlcea"
        if (cityName !== 'România') {
          // Import cities data to get county info
          const { cities } = await import('../../data/cities');
          const cityData = cities.find(c => c.name === cityName);
          
          // Helper to create search variants (with and without diacritics)
          const createSearchVariants = (name: string) => {
            const withoutDiacritics = name
              .replace(/ă/g, 'a').replace(/Ă/g, 'A')
              .replace(/â/g, 'a').replace(/Â/g, 'A')
              .replace(/î/g, 'i').replace(/Î/g, 'I')
              .replace(/ș/g, 's').replace(/Ș/g, 'S')
              .replace(/ț/g, 't').replace(/Ț/g, 'T');
            
            // Also handle București specifically
            if (name.toLowerCase() === 'bucuresti' || name.toLowerCase() === 'bucurești') {
              return ['bucuresti', 'bucurești', 'Bucuresti', 'București'];
            }
            
            return [name, withoutDiacritics].filter((v, i, a) => a.indexOf(v) === i);
          };
          
          const cityVariants = createSearchVariants(cityName);
          
          if (cityData && cityData.county && cityData.county !== cityData.name) {
            const countyVariants = createSearchVariants(cityData.county);
            const allVariants = [...cityVariants, ...countyVariants];
            const orConditions = allVariants.map(v => `address.ilike.%${v}%`).join(',');
            workersQuery = workersQuery.or(orConditions);
          } else {
            const orConditions = cityVariants.map(v => `address.ilike.%${v}%`).join(',');
            workersQuery = workersQuery.or(orConditions);
          }
        }

        const { data: workersData, error: workersError } = await workersQuery;

        if (workersError) {
          throw new Error(workersError.message);
        }

        if (!workersData || workersData.length === 0) {
          setWorkers([]);
          setIsLoading(false);
          return;
        }

        // Get worker trades for these workers
        const { data: workerTradesFullData } = await supabase
          .from('worker_trades')
          .select('profile_id, trade_ids')
          .in('profile_id', workersData.map((w: any) => w.id));

        // Get trade details
        const allTradeIds = new Set<number>();
        workerTradesFullData?.forEach((wt: any) => {
          if (wt.trade_ids && Array.isArray(wt.trade_ids)) {
            wt.trade_ids.forEach((id: number) => allTradeIds.add(id));
          }
        });

        let trades: any[] = [];
        if (allTradeIds.size > 0) {
          // Fetch trades in batches to avoid URL too long
          const tradeIdsArray = Array.from(allTradeIds);
          const tradeBatchSize = 100;
          
          for (let i = 0; i < tradeIdsArray.length; i += tradeBatchSize) {
            const batch = tradeIdsArray.slice(i, i + tradeBatchSize);
            const { data: tradeData } = await supabase
              .from('trades')
              .select('id, name, slug')
              .in('id', batch);
            if (tradeData) {
              trades.push(...tradeData);
            }
          }
        }

        // Fetch subscriptions (batched to avoid URL too long)
        const subscriptionsData = await fetchSubscriptionsInBatches(
          supabase, 
          workersData.map((w: any) => w.id)
        );

        // Create maps for efficient lookup
        const tradeMap = new Map(trades.map((t: any) => [t.id, t]));
        const workerTradesMap = new Map(
          workerTradesFullData?.map((wt: any) => [wt.profile_id, wt.trade_ids]) || []
        );
        const subscriptionMap = new Map(
          subscriptionsData.map((sub: any) => [sub.user_id, sub.plan_id])
        );

        // Map trades and subscriptions to workers
        let workersWithData = workersData.map((worker: any) => {
          const tradeIds = workerTradesMap.get(worker.id) || [];
          const workerTrades = (Array.isArray(tradeIds) ? tradeIds : [])
            .map((id: number) => tradeMap.get(id))
            .filter(Boolean);
          
          const plan = subscriptionMap.get(worker.id) || null;
          
          return {
            ...worker,
            trades: workerTrades,
            subscription_plan: plan
          };
        });

        // Debug logging
        console.log('🔍 RecommendedTradesmen Debug:', {
          totalWorkers: workersWithData.length,
          subscriptionsFound: subscriptionsData.length,
          subscriptionPlans: subscriptionsData.map((s: any) => ({ user_id: s.user_id, plan: s.plan_id })),
          workersWithPlans: workersWithData.filter((w: any) => w.subscription_plan).map((w: any) => ({ 
            name: w.name, 
            plan: w.subscription_plan,
            isPremium: isPremiumUser(w.subscription_plan)
          }))
        });

        // Prioritize Premium users (PRO and Enterprise)
        workersWithData.sort((a: any, b: any) => {
          const aIsPremium = isPremiumUser(a.subscription_plan);
          const bIsPremium = isPremiumUser(b.subscription_plan);
          
          // Premium users first
          if (aIsPremium && !bIsPremium) return -1;
          if (!aIsPremium && bIsPremium) return 1;
          
          // No additional sorting needed
          return 0;
        });

        // Limit results and filter for Premium users only
        const premiumWorkers = workersWithData.filter((w: any) => isPremiumUser(w.subscription_plan));
        const finalWorkers = premiumWorkers.slice(0, maxResults);
        
        setWorkers(finalWorkers as Worker[]);
      } catch (err) {
        console.error('❌ Error fetching recommended tradesmen:', err);
        const errorMessage = err instanceof Error ? err.message : 'Eroare necunoscută';
        setError(`Nu am putut încărca meseriașii recomandați: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedTradesmen();
  }, [supabase, tradeId, tradeIds, tradeName, cityName, maxResults]);

  // Don't render if no workers, error, or still loading
  if (error || workers.length === 0) {
    // Show skeleton while loading
    if (isLoading) {
      return (
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm animate-pulse">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-200 rounded-lg" />
              <div>
                <div className="h-5 w-40 bg-slate-200 rounded mb-1" />
                <div className="h-3 w-32 bg-slate-100 rounded" />
              </div>
            </div>
          </div>
          <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square bg-slate-100 rounded-xl" />
            ))}
          </div>
        </section>
      );
    }
    return null;
  }

  const hasEnterprise = workers.some(w => isEnterpriseUser(w.subscription_plan));
  const hasPro = workers.some(w => isPremiumUser(w.subscription_plan) && !isEnterpriseUser(w.subscription_plan));

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${
              hasEnterprise ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : 'bg-amber-500'
            }`}>
              {hasEnterprise ? <Gem className="w-4 h-4" /> : <Crown className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {compact ? 'Meseriași Premium' : `Meseriași Premium${cityName !== 'România' ? ` în ${cityName}` : ''}`}
              </h2>
              <p className="text-slate-500 text-sm">
                Profesioniști verificați cu abonament activ
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {hasEnterprise && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 rounded-lg">
                <Gem className="w-3 h-3 text-purple-600" />
                <span className="text-xs font-bold text-purple-700">ENTERPRISE</span>
              </div>
            )}
            {hasPro && (
              <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 border border-amber-200 rounded-lg">
                <Crown className="w-3 h-3 text-amber-600" />
                <span className="text-xs font-bold text-amber-700">PRO</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Always use horizontal row cards for compact mode */}
        {compact ? (
          <div className="flex flex-col gap-2">
            {workers.map((worker: Worker) => (
              <MobileCompactCard key={worker.id} worker={worker} />
            ))}
          </div>
        ) : (
          <div className={`grid gap-2 ${workers.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'}`}>
            {workers.map((worker: Worker) => (
              <div key={worker.id} className="transform hover:scale-[1.02] transition-all duration-200">
                <TradesmanCard worker={worker} />
              </div>
            ))}
          </div>
        )}

        {workers.length > 0 && !compact && (
          <div className="mt-4 pt-4 border-t border-slate-100 text-center">
            <a
              href="/meseriasi"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-md transition-colors"
            >
              Vezi toți meseriașii
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}