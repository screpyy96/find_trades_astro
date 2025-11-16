import { useState, useEffect } from 'react';
import { Search, Loader2, Filter } from 'lucide-react';
import { TradesmanCard } from './TradesmanCard';
import { TradesmanCardSkeleton } from './TradesmanCardSkeleton';
import { useInView } from 'react-intersection-observer';
import { ServicePageCache, CacheKeys } from '../../lib/cache';
import { trades } from '../../data';

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
}

interface TradesmenClientListProps {
  initialSearch?: string;
  initialSort?: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

export function TradesmenClientList({
  initialSearch = '',
  initialSort = 'rating',
  supabaseUrl: supabaseUrlProp,
  supabaseAnonKey: supabaseAnonKeyProp
}: TradesmenClientListProps) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortMethod, setSortMethod] = useState(initialSort);
  const [showFilters, setShowFilters] = useState(false);
  
  // New filters
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTrade, setSelectedTrade] = useState('');
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [onlyVerified, setOnlyVerified] = useState(true);
  const [onlyOnline, setOnlyOnline] = useState(false);
  
  // Create Supabase client once
  const [supabase, setSupabase] = useState<any>(null);
  
  const { ref, inView } = useInView({ threshold: 0.5 });
  
  const ITEMS_PER_PAGE = 20;

  // Initialize Supabase client once
  useEffect(() => {
    const initSupabase = async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const url = supabaseUrlProp || import.meta.env.PUBLIC_SUPABASE_URL;
        const key = supabaseAnonKeyProp || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
        
        console.log('🔧 Initializing Supabase...', { 
          hasUrl: !!url,
          hasKey: !!key,
          source: supabaseUrlProp ? 'props' : 'env',
          urlPrefix: url?.substring(0, 20)
        });
        
        if (url && key) {
          setSupabase(createClient(url, key));
          console.log('✅ Supabase initialized successfully');
        } else {
          console.error('❌ Missing Supabase credentials', { url: !!url, key: !!key });
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

  // Fetch workers
  const fetchWorkers = async (pageNum: number, reset: boolean = false) => {
    if (!hasMore && !reset) return;
    if (!supabase) {
      console.log('⏳ Waiting for Supabase to initialize...');
      return; // Wait for Supabase to initialize
    }
    
    setIsLoading(true);
    setError(null);
    
    console.log('📡 Fetching workers...', { page: pageNum, reset, filters: { searchTerm, selectedCity, selectedTrade, minRating, onlyVerified, onlyOnline } });
    
    try {
      // Check if any filters are applied
      const hasFilters = searchTerm || selectedCity || selectedTrade || minRating || !onlyVerified || onlyOnline;
      
      console.log('🔍 Filter check:', { hasFilters, searchTerm, selectedCity, selectedTrade, minRating, onlyVerified, onlyOnline });
      
      let query = supabase
        .from('profiles')
        .select('id, name, avatar_url, address, bio, rating, is_verified, is_online, phone')
        .eq('role', 'worker')
        .not('name', 'is', null);

      if (hasFilters) {
        console.log('🎯 Filters applied - using filtered search');
        
        // Apply search filter (general search from hero)
        if (searchTerm) {
          console.log('🔍 Applying search filter:', searchTerm);
          query = query.or(`name.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`);
        }

        // Apply verified filter
        if (onlyVerified) {
          query = query.eq('is_verified', true);
        }

        // Apply online filter
        if (onlyOnline) {
          query = query.eq('is_online', true);
        }

        // Apply rating filter
        if (minRating) {
          query = query.gte('rating', minRating);
        }

        // Apply city filter
        if (selectedCity) {
          console.log('🏙️ Applying city filter:', selectedCity);
          query = query.ilike('address', `%${selectedCity}%`);
        }

        // When filters are active, load all workers (no pagination) for proper client-side filtering
        console.log('📊 Loading all workers for client-side filtering...');
        const { data, error: fetchError } = await query;

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        if (data && data.length > 0) {
          // Get worker IDs from current page
          const workerIds = data.map((w: any) => w.id);

          // Fetch worker_trades for these workers
          const { data: workerTradesData } = await supabase
            .from('worker_trades')
            .select('profile_id, trade_ids')
            .in('profile_id', workerIds);

          // Collect all unique trade IDs
          const allTradeIds = new Set<number>();
          workerTradesData?.forEach((wt: any) => {
            if (wt.trade_ids && Array.isArray(wt.trade_ids)) {
              wt.trade_ids.forEach((id: number) => allTradeIds.add(id));
            }
          });

          // Fetch trade details with caching
          let trades: any[] = [];
          if (allTradeIds.size > 0) {
            const tradesCacheKey = CacheKeys.trades();
            let cachedTrades = (window as any).__WORKERS_CACHE?.get(tradesCacheKey);
            
            if (!cachedTrades) {
              const { data: tradeData } = await supabase
                .from('trades')
                .select('id, name, slug')
                .in('id', Array.from(allTradeIds));
              trades = tradeData || [];
              
              // Cache trades data
              if (!(window as any).__WORKERS_CACHE) {
                (window as any).__WORKERS_CACHE = new Map();
              }
              (window as any).__WORKERS_CACHE.set(tradesCacheKey, trades);
            } else {
              trades = cachedTrades;
            }
          }

          // Create maps for efficient lookup
          const tradeMap = new Map((trades || []).map((t: any) => [t.id, t]));
          const workerTradesMap = new Map(
            workerTradesData?.map((wt: any) => [wt.profile_id, wt.trade_ids]) || []
          );

          // Map trades to workers
          let workersWithTrades = data.map((worker: any) => {
            const tradeIds = workerTradesMap.get(worker.id) || [];
            const workerTrades = (Array.isArray(tradeIds) ? tradeIds : []).map((id: number) => tradeMap.get(id)).filter(Boolean);
            
            return {
              ...worker,
              trades: workerTrades
            };
          });

          // Client-side filter by trade name if specified
          if (selectedTrade) {
            const tradeLower = selectedTrade.toLowerCase();
            console.log('🔧 Trade Filter Debug:', { 
              selectedTrade, 
              beforeFilter: workersWithTrades.length,
              cityFilter: selectedCity 
            });
            
            workersWithTrades = workersWithTrades.filter((worker: any) => {
              const hasTrade = worker.trades?.some((trade: any) => 
                trade.name?.toLowerCase().includes(tradeLower)
              );
              
              if (hasTrade) {
                console.log(`✅ Trade Match: ${worker.name}`, { 
                  address: worker.address,
                  trades: worker.trades?.map((t: any) => t.name) 
                });
              }
              
              return hasTrade;
            });
            
            console.log('🔧 Trade Filter Results:', { 
              afterFilter: workersWithTrades.length 
            });
          }

          // Apply client-side pagination after all filtering
          const from = pageNum * ITEMS_PER_PAGE;
          const to = from + ITEMS_PER_PAGE;
          const paginatedWorkers = workersWithTrades.slice(from, to);

          console.log('📄 Client-side pagination:', { 
            totalFiltered: workersWithTrades.length,
            page: pageNum,
            from, 
            to,
            itemsOnPage: paginatedWorkers.length 
          });

          if (reset) {
            setWorkers(paginatedWorkers as Worker[]);
          } else {
            setWorkers((prev: Worker[]) => [...prev, ...(paginatedWorkers as Worker[])]);
          }
          setHasMore(workersWithTrades.length > to);
        } else {
          console.log('📊 No workers found after filtering');
          if (reset) {
            setWorkers([]);
          }
          setHasMore(false);
        }
      } else {
        console.log('📊 No filters - using default pagination');
        
        // Apply default verified filter for main listing
        query = query.eq('is_verified', true);

        // Apply sorting
        if (sortMethod === 'rating') {
          query = query.order('rating', { ascending: false });
        } else if (sortMethod === 'name') {
          query = query.order('name', { ascending: true });
        } else if (sortMethod === 'newest') {
          query = query.order('created_at', { ascending: false });
        }

        // Apply pagination
        const from = pageNum * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;
        query = query.range(from, to);

        const { data, error: fetchError } = await query;

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        console.log('📊 Default pagination results:', { 
          totalWorkers: data?.length || 0, 
          page: pageNum,
          from, 
          to 
        });

        if (reset) {
          setWorkers(data as Worker[]);
        } else {
          setWorkers((prev: Worker[]) => [...prev, ...(data as Worker[])]);
        }
        setHasMore(data && data.length === ITEMS_PER_PAGE);
      }
    } catch (err) {
      console.error('❌ Error fetching workers:', err);
      const errorMessage = err instanceof Error ? err.message : 'Eroare necunoscută';
      console.error('Error details:', errorMessage);
      setError(`Nu am putut încărca meseriașii: ${errorMessage}`);
    } finally {
      setIsLoading(false);
      console.log('✅ Fetch complete');
    }
  };

  // Initial load - reset when filters change
  useEffect(() => {
    if (!supabase) return; // Wait for Supabase to initialize
    
    setPage(0);
    setHasMore(true);
    fetchWorkers(0, true);
  }, [supabase, searchTerm, sortMethod, selectedCity, selectedTrade, minRating, onlyVerified, onlyOnline]);

  // Load more when in view
  useEffect(() => {
    if (inView && !isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchWorkers(nextPage);
    }
  }, [inView]);

  // Scroll restoration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedScroll = sessionStorage.getItem('meseriasi_scroll');
      if (savedScroll) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: parseInt(savedScroll, 10), behavior: 'auto' });
        });
        sessionStorage.removeItem('meseriasi_scroll');
      }
    }
  }, []);

  useEffect(() => {
    const handlePageHide = () => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('meseriasi_scroll', String(window.scrollY));
      }
    };
    window.addEventListener('pagehide', handlePageHide);
    return () => window.removeEventListener('pagehide', handlePageHide);
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8 pb-16 sm:px-6 lg:px-8">
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <Filter className="w-5 h-5" />
          {showFilters ? 'Ascunde filtrele' : 'Afișează filtrele'}
        </button>
      </div>

      {/* Layout with sidebar */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Filters sidebar */}
        <aside className={`lg:w-72 xl:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Filtrează rezultatele</h3>
            
            {/* City filter */}
            <div>
              <label htmlFor="city" className="block text-sm font-semibold text-slate-700 mb-2">
                Oraș
              </label>
              <input
                id="city"
                type="text"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                placeholder="Ex: București, Cluj..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Trade filter */}
            <div>
              <label htmlFor="trade" className="block text-sm font-semibold text-slate-700 mb-2">
                Meserie
              </label>
              <select
                id="trade"
                value={selectedTrade}
                onChange={(e) => setSelectedTrade(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Orice meserie</option>
                {(trades || []).map((trade: any) => (
                  <option key={trade.id} value={trade.name}>
                    {trade.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick filters */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  Doar verificați
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={onlyOnline}
                  onChange={(e) => setOnlyOnline(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  Doar online acum
                </span>
              </label>
            </div>

            {/* Rating filter */}
            <div className="pt-4 border-t border-slate-200">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Rating minim
              </label>
              <div className="space-y-2">
                {[
                  { value: undefined, label: 'Orice rating' },
                  { value: 3, label: '3.0+' },
                  { value: 4, label: '4.0+' },
                  { value: 4.5, label: '4.5+' },
                ].map((option) => (
                  <label key={option.value || 'any'} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === option.value}
                      onChange={() => setMinRating(option.value)}
                      className="w-4 h-4 border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="pt-4 border-t border-slate-200">
              <label htmlFor="sort" className="block text-sm font-semibold text-slate-700 mb-2">
                Sortează după
              </label>
              <select
                id="sort"
                value={sortMethod}
                onChange={(e) => setSortMethod(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="rating">Rating (cel mai mare)</option>
                <option value="newest">Cei mai noi</option>
                <option value="name">Nume (A-Z)</option>
              </select>
            </div>

            {/* Reset filters */}
            {(selectedCity || selectedTrade || minRating || !onlyVerified || onlyOnline) && (
              <button
                onClick={() => {
                  setSelectedCity('');
                  setSelectedTrade('');
                  setMinRating(undefined);
                  setOnlyVerified(true);
                  setOnlyOnline(false);
                  setSortMethod('rating');
                }}
                className="w-full px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
              >
                Resetează filtrele
              </button>
            )}

            {/* Results count */}
            {workers.length > 0 && (
              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-slate-900">{workers.length}</span> meseriași găsiți
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Error Display */}
          {error && (
            <div className="text-center py-16">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 sm:p-12 max-w-md mx-auto shadow-sm">
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="text-lg sm:text-xl font-semibold text-red-800 mb-2">Eroare la încărcare</h3>
                <p className="text-red-700 text-sm sm:text-base mb-4">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
                >
                  🔄 Încearcă din nou
                </button>
              </div>
            </div>
          )}

          {/* Loading Skeleton */}
          {isLoading && workers.length === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
              {Array.from({ length: 6 }).map((_, index) => (
                <TradesmanCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Results */}
          {!error && workers.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
              {workers.map((worker: Worker) => (
                <TradesmanCard
                  key={`${worker.id}-${worker.name}`}
                  worker={worker}
                />
              ))}
            </div>
          ) : !error && !isLoading && (
            <div className="text-center py-16">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 max-w-md mx-auto shadow-sm">
                <Search className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">Niciun meseriaș găsit</h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  {searchTerm ? `Nu am găsit rezultate pentru "${searchTerm}". Încearcă alți termeni.` : 'Nu există meseriași care să corespundă filtrelor.'}
                </p>
              </div>
            </div>
          )}

          {/* Loading Indicator and Trigger */}
          <div ref={ref} className="h-20 flex items-center justify-center mt-8">
            {isLoading && workers.length > 0 && <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />}
            {!hasMore && workers.length > 0 && (
              <p className="text-slate-500">Ai ajuns la finalul listei.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
