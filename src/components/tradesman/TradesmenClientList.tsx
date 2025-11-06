import { useState, useEffect } from 'react';
import { Search, Loader2, Filter } from 'lucide-react';
import { TradesmanCard } from './TradesmanCard';
import { TradesmanCardSkeleton } from './TradesmanCardSkeleton';
import { useInView } from 'react-intersection-observer';

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
}

export function TradesmenClientList({ initialSearch = '', initialSort = 'rating' }: TradesmenClientListProps) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortMethod, setSortMethod] = useState(initialSort);
  const [showFilters, setShowFilters] = useState(false);
  
  const { ref, inView } = useInView({ threshold: 0.5 });
  
  const ITEMS_PER_PAGE = 20;

  // Fetch workers
  const fetchWorkers = async (pageNum: number, reset: boolean = false) => {
    if (!hasMore && !reset) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const url = import.meta.env.PUBLIC_SUPABASE_URL;
      const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
      
      if (!url || !key) {
        console.warn('Supabase not configured');
        setWorkers([]);
        setLoading(false);
        return;
      }
      
      const supabase = createClient(url, key);

      let query = supabase
        .from('profiles')
        .select('id, name, avatar_url, address, bio, rating, is_verified, is_online, phone')
        .eq('role', 'worker')
        .eq('is_verified', true)
        .not('name', 'is', null);

      // Apply search filter
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`);
      }

      // Apply sorting
      if (sortMethod === 'rating') {
        query = query.order('rating', { ascending: false });
      } else if (sortMethod === 'name') {
        query = query.order('name', { ascending: true });
      }

      // Pagination
      const from = pageNum * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      query = query.range(from, to);

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

        // Fetch trade details
        let trades: any[] = [];
        if (allTradeIds.size > 0) {
          const { data: tradeData } = await supabase
            .from('trades')
            .select('id, name, slug')
            .in('id', Array.from(allTradeIds));
          trades = tradeData || [];
        }

        // Create maps for efficient lookup
        const tradeMap = new Map(trades.map((t: any) => [t.id, t]));
        const workerTradesMap = new Map(
          workerTradesData?.map((wt: any) => [wt.profile_id, wt.trade_ids]) || []
        );

        // Map trades to workers
        const workersWithTrades = data.map((worker: any) => {
          const tradeIds = workerTradesMap.get(worker.id) || [];
          const workerTrades = tradeIds
            .map((id: number) => tradeMap.get(id))
            .filter(Boolean);

          return {
            ...worker,
            trades: workerTrades
          };
        });

        if (reset) {
          setWorkers(workersWithTrades as Worker[]);
        } else {
          setWorkers((prev: Worker[]) => [...prev, ...(workersWithTrades as Worker[])]);
        }
        setHasMore(data.length === ITEMS_PER_PAGE);
      } else {
        if (reset) {
          setWorkers([]);
        }
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching workers:', err);
      setError('Nu am putut încărca meseriașii. Te rugăm să încerci din nou.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    fetchWorkers(0, true);
  }, [searchTerm, sortMethod]);

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
          <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Filtrează rezultatele</h3>
            
            {/* Sort */}
            <div className="mb-6">
              <label htmlFor="sort" className="block text-sm font-semibold text-slate-700 mb-2">
                Sortează după
              </label>
              <select
                id="sort"
                value={sortMethod}
                onChange={(e) => setSortMethod(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="rating">Rating (cel mai mare)</option>
                <option value="name">Nume (A-Z)</option>
              </select>
            </div>

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
