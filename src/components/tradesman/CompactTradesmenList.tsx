import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

// Helper to check if user has premium subscription (pro or enterprise)
const isPremiumUser = (plan: string | null | undefined): boolean => {
  if (!plan) return false;
  // Normalize: trim whitespace, remove newlines, lowercase
  const normalizedPlan = plan.replace(/[\r\n]/g, '').trim().toLowerCase();
  return normalizedPlan === 'pro' || normalizedPlan.startsWith('enterprise');
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
  is_verified?: boolean;
  subscription_plan?: string;
}

interface CompactTradesmenListProps {
  categoryName: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  maxResults?: number;
}

export function CompactTradesmenList({
  categoryName,
  supabaseUrl: supabaseUrlProp,
  supabaseAnonKey: supabaseAnonKeyProp,
  maxResults = 12
}: CompactTradesmenListProps) {
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

  // Fetch tradesmen from this category
  useEffect(() => {
    if (!supabase) return;

    const fetchTradesmen = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // First, get all trades from this category
        const { data: tradesData, error: tradesError } = await supabase
          .from('trades')
          .select('id')
          .ilike('category', `%${categoryName}%`);

        if (tradesError) {
          throw new Error(tradesError.message);
        }

        if (!tradesData || tradesData.length === 0) {
          setWorkers([]);
          setIsLoading(false);
          return;
        }

        const tradeIds = tradesData.map((trade: any) => trade.id);

        // Get workers who have trades in this category
        const { data: workerTradesData, error: workerTradesError } = await supabase
          .from('worker_trades')
          .select('profile_id')
          .overlaps('trade_ids', tradeIds);

        if (workerTradesError) {
          throw new Error(workerTradesError.message);
        }

        if (!workerTradesData || workerTradesData.length === 0) {
          setWorkers([]);
          setIsLoading(false);
          return;
        }

        const workerIds = [...new Set(workerTradesData.map((wt: any) => wt.profile_id))];

        // Get worker profiles
        const { data: workersData, error: workersError } = await supabase
          .from('profiles')
          .select('id, name, avatar_url, address, is_verified')
          .in('id', workerIds)
          .eq('role', 'worker')
          .eq('is_verified', true)
          .limit(maxResults * 2); // Get more to filter PRO users

        if (workersError) {
          throw new Error(workersError.message);
        }

        if (!workersData || workersData.length === 0) {
          setWorkers([]);
          setIsLoading(false);
          return;
        }

        // Fetch subscriptions (batched to avoid URL too long)
        const subscriptionsData = await fetchSubscriptionsInBatches(
          supabase, 
          workersData.map((w: any) => w.id)
        );

        // Create subscription map
        const subscriptionMap = new Map(
          subscriptionsData.map((sub: any) => [sub.user_id, sub.plan_id])
        );

        // Map subscriptions to workers
        let workersWithData = workersData.map((worker: any) => ({
          ...worker,
          subscription_plan: subscriptionMap.get(worker.id) || null
        }));

        // IMPORTANT: Filter to show ONLY PRO/Enterprise users (hide basic users)
        workersWithData = workersWithData.filter((w: any) => isPremiumUser(w.subscription_plan));

        // Sort by rating (all are PRO now)
        workersWithData.sort((a: any, b: any) => {
          return (b.rating || 0) - (a.rating || 0);
        });

        // Limit results
        const finalWorkers = workersWithData.slice(0, maxResults);
        
        setWorkers(finalWorkers as Worker[]);
      } catch (err) {
        console.error('❌ Error fetching tradesmen:', err);
        const errorMessage = err instanceof Error ? err.message : 'Eroare necunoscută';
        setError(`Nu am putut încărca meseriașii: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTradesmen();
  }, [supabase, categoryName, maxResults]);

  // Don't render if no workers or error
  if (error || (!isLoading && workers.length === 0)) {
    return null;
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Meseriași din categoria {categoryName}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Profesioniști verificați gata să lucreze la proiectul tău
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm animate-pulse">
                <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-3"></div>
                <div className="h-4 bg-slate-200 rounded mb-2"></div>
                <div className="h-3 bg-slate-200 rounded mb-4"></div>
                <div className="h-8 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {workers.map((worker: Worker) => (
              <div key={worker.id} className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 relative">
                {/* PRO/Enterprise Badge */}
                {isPremiumUser(worker.subscription_plan) && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    PRO
                  </div>
                )}
                
                {/* Avatar */}
                <div className="text-center mb-3">
                  {worker.avatar_url ? (
                    <img 
                      src={worker.avatar_url} 
                      alt={worker.name}
                      className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-slate-200"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-slate-600 font-semibold text-lg">
                        {worker.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-semibold text-slate-900 text-center mb-2 line-clamp-1">
                  {worker.name}
                </h3>

                {/* Address */}
                {worker.address && (
                  <div className="flex items-center justify-center gap-1 text-slate-600 text-sm mb-4">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="line-clamp-1">{worker.address}</span>
                  </div>
                )}

                {/* Action Button */}
                <a
                  href={`/tradesmen/${worker.id}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Vezi acum
                </a>
              </div>
            ))}
          </div>
        )}

        {workers.length > 0 && (
          <div className="text-center mt-10">
            <a
              href="/tradesmen/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors"
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