import { useState, useEffect } from 'react';
import { Search, Loader2, Filter, X, ChevronDown } from 'lucide-react';
import { TradesmanCard } from './TradesmanCard';
import { TradesmanCardSkeleton } from './TradesmanCardSkeleton';
import { useInView } from 'react-intersection-observer';
import { ServicePageCache, CacheKeys } from '../../lib/cache';
import { trades } from '../../data';

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
  
  console.log(`💳 Fetched ${results.length} active subscriptions from ${userIds.length} users in ${Math.ceil(userIds.length / batchSize)} batches`);
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
  subscription_plan?: string; // 'pro', 'premium', etc.
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
  
  // Active filters (applied to search)
  const [activeCity, setActiveCity] = useState('');
  const [activeTrade, setActiveTrade] = useState('');
  const [activeMinRating, setActiveMinRating] = useState<number | undefined>(undefined);
  const [activeOnlyVerified, setActiveOnlyVerified] = useState(true);
  const [activeOnlyOnline, setActiveOnlyOnline] = useState(false);
  
  // Trade autocomplete states
  const [tradeSearchQuery, setTradeSearchQuery] = useState('');
  const [showTradeDropdown, setShowTradeDropdown] = useState(false);
  const [filteredTrades, setFilteredTrades] = useState<any[]>([]);
  const [allTrades, setAllTrades] = useState<any[]>([]);
  const [isLoadingTrades, setIsLoadingTrades] = useState(false);
  const [tradesPage, setTradesPage] = useState(0);
  const [hasMoreTrades, setHasMoreTrades] = useState(true);
  
  // Create Supabase client once
  const [supabase, setSupabase] = useState<any>(null);
  
  const { ref, inView } = useInView({ threshold: 0.5 });
  
  const ITEMS_PER_PAGE = 20;
  const TRADES_PER_PAGE = 50;

  // Function to load trades with pagination
  const loadTrades = async (reset: boolean = false) => {
    if (!supabase) return;
    if (!hasMoreTrades && !reset) return;
    
    setIsLoadingTrades(true);
    
    try {
      const currentPage = reset ? 0 : tradesPage;
      const from = currentPage * TRADES_PER_PAGE;
      const to = from + TRADES_PER_PAGE - 1;
      
      let query = supabase
        .from('trades')
        .select('id, name, slug')
        .order('name', { ascending: true })
        .range(from, to);
      
      // Apply search filter if exists
      if (tradeSearchQuery) {
        query = query.ilike('name', `%${tradeSearchQuery}%`);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      if (reset) {
        setAllTrades(data || []);
        setTradesPage(1);
      } else {
        setAllTrades(prev => [...prev, ...(data || [])]);
        setTradesPage(prev => prev + 1);
      }
      
      setHasMoreTrades(data && data.length === TRADES_PER_PAGE);
    } catch (err) {
      console.error('Error loading trades:', err);
    } finally {
      setIsLoadingTrades(false);
    }
  };

  // Filter trades based on search query
  useEffect(() => {
    if (tradeSearchQuery) {
      const filtered = allTrades.filter(trade => 
        trade.name.toLowerCase().includes(tradeSearchQuery.toLowerCase())
      );
      setFilteredTrades(filtered);
    } else {
      setFilteredTrades(allTrades);
    }
  }, [tradeSearchQuery, allTrades]);

  // Load initial trades when Supabase is ready
  useEffect(() => {
    if (supabase && allTrades.length === 0) {
      loadTrades(true);
    }
  }, [supabase]);

  // Load more trades when search query changes
  useEffect(() => {
    if (supabase) {
      const timeoutId = setTimeout(() => {
        loadTrades(true);
      }, 300);
      
      return () => clearTimeout(timeoutId);
    }
  }, [tradeSearchQuery, supabase]);

  // Initialize filters from URL on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      
      // Set filters from URL
      const urlCity = params.get('city') || '';
      const urlTrade = params.get('trade') || '';
      const urlRating = params.get('rating');
      const urlVerified = params.get('verified') !== 'false'; // default true
      const urlOnline = params.get('online') === 'true';
      const urlSort = params.get('sort') || 'rating';
      
      setSelectedCity(urlCity);
      setSelectedTrade(urlTrade);
      setMinRating(urlRating ? parseFloat(urlRating) : undefined);
      setOnlyVerified(urlVerified);
      setOnlyOnline(urlOnline);
      setSortMethod(urlSort);
      
      // Set active filters immediately
      setActiveCity(urlCity);
      setActiveTrade(urlTrade);
      setActiveMinRating(urlRating ? parseFloat(urlRating) : undefined);
      setActiveOnlyVerified(urlVerified);
      setActiveOnlyOnline(urlOnline);
    }
  }, []);

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
    
    console.log('📡 Fetching workers...', { page: pageNum, reset, filters: { searchTerm, activeCity, activeTrade, activeMinRating, activeOnlyVerified, activeOnlyOnline } });
    
    try {
      // Check if any filters are applied
      const hasFilters = searchTerm || activeCity || activeTrade || activeMinRating || !activeOnlyVerified || activeOnlyOnline;
      
      console.log('🔍 Filter check:', { hasFilters, searchTerm, activeCity, activeTrade, activeMinRating, activeOnlyVerified, activeOnlyOnline });
      
      let query = supabase
        .from('profiles')
        .select('id, name, avatar_url, address, bio, rating, is_verified, is_online, phone')
        .eq('role', 'worker')
        .not('name', 'is', null);

      if (hasFilters) {
        console.log('🎯 Filters applied - using optimized filtered search');
        
        // SMART DETECTION: Check if search term contains a trade name
        let detectedTrade: string | null = null;
        let remainingSearchTerms: string[] = [];
        
        if (searchTerm && !activeTrade) {
          // Try to detect trade in search term
          const searchLower = searchTerm.toLowerCase();
          const searchWords = searchLower.split(' ').filter(w => w.length > 2);
          
          // Common trades to detect
          const commonTrades = [
            'electrician', 'zugrav', 'instalator', 'constructor', 'finisor',
            'tamplar', 'zidar', 'dulgher', 'pavator', 'gresist', 'faiantar',
            'rigipsar', 'tencuitor', 'izolator', 'acoperitor', 'tinichigiu'
          ];
          
          // Check if any search word matches a trade
          for (const word of searchWords) {
            if (commonTrades.some(trade => trade.includes(word) || word.includes(trade))) {
              detectedTrade = word;
              // Remove trade from search terms
              remainingSearchTerms = searchWords.filter(w => w !== word);
              console.log('🔍 Auto-detected trade in search:', { detectedTrade, remainingSearchTerms });
              break;
            }
          }
        }
        
        // Use detected trade or explicit trade filter
        const effectiveTrade = activeTrade || detectedTrade;
        const effectiveSearch = detectedTrade ? remainingSearchTerms.join(' ') : searchTerm;
        
        // OPTIMIZATION: Handle trade filter at database level
        let workerIdsFromTrade: string[] | null = null;
        
        if (effectiveTrade) {
          console.log('🔧 Pre-filtering by trade at database level:', effectiveTrade);
          
          // Step 1: Find trade IDs matching the trade name
          const { data: tradesData } = await supabase
            .from('trades')
            .select('id')
            .ilike('name', `%${effectiveTrade}%`)
            .limit(10); // Limit to avoid too many matches
          
          if (tradesData && tradesData.length > 0) {
            const tradeIds = tradesData.map((t: any) => t.id);
            console.log('🔧 Found trade IDs:', tradeIds);
            
            // Step 2: Find workers with these trades
            const { data: workerTradesData } = await supabase
              .from('worker_trades')
              .select('profile_id')
              .overlaps('trade_ids', tradeIds);
            
            if (workerTradesData && workerTradesData.length > 0) {
              workerIdsFromTrade = workerTradesData.map((wt: any) => wt.profile_id);
              console.log('🔧 Found workers with trade:', workerIdsFromTrade?.length || 0);
              
              // Apply worker IDs filter (check for null to satisfy TypeScript)
              if (workerIdsFromTrade && workerIdsFromTrade.length > 0) {
                query = query.in('id', workerIdsFromTrade);
              }
            } else {
              // No workers found with this trade
              console.log('🔧 No workers found with trade');
              setWorkers([]);
              setIsLoading(false);
              setHasMore(false);
              return;
            }
          } else {
            // Trade not found
            console.log('🔧 Trade not found in database');
            setWorkers([]);
            setIsLoading(false);
            setHasMore(false);
            return;
          }
        }
        
        // Apply standard filters
        query = query.eq('is_verified', true);
        
        if (activeOnlyOnline) {
          query = query.eq('is_online', true);
        }
        if (activeMinRating) {
          query = query.gte('rating', activeMinRating);
        }
        if (activeCity) {
          console.log('🏙️ Applying city filter:', activeCity);
          query = query.ilike('address', `%${activeCity}%`);
        }
        
        // OPTIMIZATION: Apply search at database level when possible
        // Search in name, bio, address using OR condition
        if (effectiveSearch && effectiveSearch.trim().length > 0) {
          const searchTerm = effectiveSearch.trim();
          console.log('🔍 Applying database-level search:', searchTerm);
          
          // Use Supabase's or() for searching across multiple fields
          query = query.or(`name.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`);
        }
        
        // Handle remaining search terms (after trade detection)
        // Now search is done at DB level, so we can use pagination
        const needsClientSideSearch = false; // Search is now at DB level
        
        // IMPORTANT: When trade filter is applied, we already filtered at DB level
        // So we should load all matching workers (they're already filtered)
        // Only apply pagination when NO trade filter (to avoid loading too many)
        const shouldUsePagination = !effectiveTrade;
        
        if (shouldUsePagination) {
          // Use database-level pagination
          console.log('� Using database-level pagination for filtered results');
          const from = pageNum * ITEMS_PER_PAGE;
          const to = from + ITEMS_PER_PAGE - 1;
          query = query.range(from, to).order('rating', { ascending: false, nullsFirst: false });
        } else {
          // Trade filter applied - load all matching workers (already filtered at DB)
          console.log('� Loading all workers matching trade filter');
          query = query.order('rating', { ascending: false, nullsFirst: false }).limit(500);
        }

        console.log('📊 Loading workers with filters...');
        const { data, error: fetchError } = await query;

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        if (data && data.length > 0) {
          // Get worker IDs from current page
          const workerIds = data.map((w: any) => w.id);

          // Fetch worker_trades for these workers in batches to avoid URL too long
          let workerTradesData: any[] = [];
          const batchSize = 50;
          for (let i = 0; i < workerIds.length; i += batchSize) {
            const batch = workerIds.slice(i, i + batchSize);
            const { data: batchData } = await supabase
              .from('worker_trades')
              .select('profile_id, trade_ids')
              .in('profile_id', batch);
            if (batchData) {
              workerTradesData.push(...batchData);
            }
          }

          // Collect all unique trade IDs
          const allTradeIds = new Set<number>();
          workerTradesData?.forEach((wt: any) => {
            if (wt.trade_ids && Array.isArray(wt.trade_ids)) {
              wt.trade_ids.forEach((id: number) => allTradeIds.add(id));
            }
          });

          // Fetch trade details with caching and batching
          let trades: any[] = [];
          if (allTradeIds.size > 0) {
            const tradesCacheKey = CacheKeys.trades();
            let cachedTrades = (window as any).__WORKERS_CACHE?.get(tradesCacheKey);
            
            if (!cachedTrades) {
              // Fetch trades in batches to avoid URL too long
              const tradeIdsArray = Array.from(allTradeIds);
              const tradeBatchSize = 100;
              trades = [];
              
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
              
              // Cache trades data
              if (!(window as any).__WORKERS_CACHE) {
                (window as any).__WORKERS_CACHE = new Map();
              }
              (window as any).__WORKERS_CACHE.set(tradesCacheKey, trades);
            } else {
              trades = cachedTrades;
            }
          }

          // Fetch user subscriptions for pro users (batched to avoid URL too long)
          const subscriptionsData = await fetchSubscriptionsInBatches(supabase, workerIds);

          // Create maps for efficient lookup
          const tradeMap = new Map((trades || []).map((t: any) => [t.id, t]));
          const workerTradesMap = new Map(
            workerTradesData?.map((wt: any) => [wt.profile_id, wt.trade_ids]) || []
          );
          const subscriptionMap = new Map(
            subscriptionsData?.map((sub: any) => [sub.user_id, sub.plan_id]) || []
          );

          // Map trades to workers
          let workersWithTrades = data.map((worker: any) => {
            const tradeIds = workerTradesMap.get(worker.id) || [];
            const workerTrades = (Array.isArray(tradeIds) ? tradeIds : []).map((id: number) => tradeMap.get(id)).filter(Boolean);
            const subscriptionPlan = subscriptionMap.get(worker.id) || null;
            
            return {
              ...worker,
              trades: workerTrades,
              subscription_plan: subscriptionPlan
            };
          });

          console.log('💼 Workers mapped with subscriptions:', {
            total: workersWithTrades.length,
            proCount: workersWithTrades.filter((w: any) => w.subscription_plan === 'pro').length,
            firstFew: workersWithTrades.slice(0, 3).map((w: any) => ({
              name: w.name,
              subscription: w.subscription_plan
            }))
          });

          // Search is now done at database level, no client-side filtering needed

          // Trade filter is now handled at database level, no client-side filtering needed

          // Check if we need client-side pagination
          // - For trade filter: yes (loaded all matching workers)
          // - For other filters: no (DB pagination already applied)
          const needsClientSidePagination = effectiveTrade;

          if (needsClientSidePagination) {
            // Sort: PRO users first, then by rating
            workersWithTrades.sort((a: any, b: any) => {
              const aIsPro = a.subscription_plan === 'pro';
              const bIsPro = b.subscription_plan === 'pro';
              
              // PRO users first
              if (aIsPro && !bIsPro) return -1;
              if (!aIsPro && bIsPro) return 1;
              
              // Then by rating
              return (b.rating || 0) - (a.rating || 0);
            });

            console.log('🔄 After sorting:', {
              total: workersWithTrades.length,
              proCount: workersWithTrades.filter((w: any) => w.subscription_plan === 'pro').length,
              firstFive: workersWithTrades.slice(0, 5).map((w: any) => ({
                name: w.name,
                subscription: w.subscription_plan,
                rating: w.rating
              }))
            });

            // Apply client-side pagination after all filtering
            const from = pageNum * ITEMS_PER_PAGE;
            const to = from + ITEMS_PER_PAGE;
            const paginatedWorkers = workersWithTrades.slice(from, to);

            console.log('📄 Client-side pagination:', { 
              totalFiltered: workersWithTrades.length,
              page: pageNum,
              from, 
              to,
              itemsOnPage: paginatedWorkers.length,
              proInPage: paginatedWorkers.filter((w: any) => w.subscription_plan === 'pro').length
            });

            if (reset) {
              setWorkers(paginatedWorkers as Worker[]);
            } else {
              setWorkers((prev: Worker[]) => [...prev, ...(paginatedWorkers as Worker[])]);
            }
            setHasMore(workersWithTrades.length > to);
          } else {
            // Database-level pagination was already applied
            // Just sort PRO users first within current page
            workersWithTrades.sort((a: any, b: any) => {
              const aIsPro = a.subscription_plan === 'pro';
              const bIsPro = b.subscription_plan === 'pro';
              
              // PRO users first
              if (aIsPro && !bIsPro) return -1;
              if (!aIsPro && bIsPro) return 1;
              
              // Keep database rating order
              return 0;
            });

            if (reset) {
              setWorkers(workersWithTrades as Worker[]);
            } else {
              setWorkers((prev: Worker[]) => [...prev, ...(workersWithTrades as Worker[])]);
            }
            setHasMore(data.length === ITEMS_PER_PAGE);
          }
        } else {
          console.log('📊 No workers found after filtering');
          if (reset) {
            setWorkers([]);
          }
          setHasMore(false);
        }
      } else {
        console.log('📊 No filters - using optimized pagination with PRO users first');
        
        // Apply default verified filter for main listing
        query = query.eq('is_verified', true);

        // STRATEGY: On first page, load PRO users first, then fill with regular users
        // On subsequent pages, load only regular users (PRO already shown)
        
        if (pageNum === 0) {
          // FIRST PAGE: Load PRO users first
          console.log('📊 First page - loading PRO users first');
          
          // Step 1: Get all PRO user IDs
          const { data: proSubscriptions } = await supabase
            .from('user_subscriptions')
            .select('user_id')
            .eq('status', 'active')
            .eq('plan_id', 'pro');
          
          const proUserIds = proSubscriptions?.map((s: any) => s.user_id) || [];
          console.log('💎 Found PRO users:', proUserIds.length);
          
          let proWorkers: any[] = [];
          let regularWorkers: any[] = [];
          
          // Step 2: Fetch PRO workers
          if (proUserIds.length > 0) {
            const { data: proData } = await supabase
              .from('profiles')
              .select('id, name, avatar_url, address, bio, rating, is_verified, is_online, phone')
              .eq('role', 'worker')
              .eq('is_verified', true)
              .in('id', proUserIds)
              .not('name', 'is', null)
              .order('rating', { ascending: false, nullsFirst: false });
            
            proWorkers = proData || [];
            console.log('💎 PRO workers loaded:', proWorkers.length);
          }
          
          // Step 3: Calculate how many regular workers we need
          const regularNeeded = ITEMS_PER_PAGE - proWorkers.length;
          
          if (regularNeeded > 0) {
            // Fetch regular workers (excluding PRO)
            let regularQuery = supabase
              .from('profiles')
              .select('id, name, avatar_url, address, bio, rating, is_verified, is_online, phone')
              .eq('role', 'worker')
              .eq('is_verified', true)
              .not('name', 'is', null)
              .order('rating', { ascending: false, nullsFirst: false })
              .limit(regularNeeded);
            
            // Exclude PRO users if any
            if (proUserIds.length > 0) {
              // Use not.in to exclude PRO users
              regularQuery = regularQuery.not('id', 'in', `(${proUserIds.join(',')})`);
            }
            
            const { data: regularData } = await regularQuery;
            regularWorkers = regularData || [];
            console.log('📊 Regular workers loaded:', regularWorkers.length);
          }
          
          // Combine: PRO first, then regular
          const combinedData = [...proWorkers, ...regularWorkers];
          
          if (combinedData.length > 0) {
            // Get worker IDs
            const workerIds = combinedData.map((w: any) => w.id);

            // Fetch worker_trades for these workers in batches
            let workerTradesData: any[] = [];
            const batchSize = 50;
            for (let i = 0; i < workerIds.length; i += batchSize) {
              const batch = workerIds.slice(i, i + batchSize);
              const { data: batchData } = await supabase
                .from('worker_trades')
                .select('profile_id, trade_ids')
                .in('profile_id', batch);
              if (batchData) {
                workerTradesData.push(...batchData);
              }
            }

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
                const tradeIdsArray = Array.from(allTradeIds);
                const tradeBatchSize = 100;
                trades = [];
                
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
                
                if (!(window as any).__WORKERS_CACHE) {
                  (window as any).__WORKERS_CACHE = new Map();
                }
                (window as any).__WORKERS_CACHE.set(tradesCacheKey, trades);
              } else {
                trades = cachedTrades;
              }
            }

            // Create maps
            const tradeMap = new Map((trades || []).map((t: any) => [t.id, t]));
            const workerTradesMap = new Map(
              workerTradesData?.map((wt: any) => [wt.profile_id, wt.trade_ids]) || []
            );
            const proUserIdsSet = new Set(proUserIds);

            // Map trades and subscriptions to workers
            const workersWithTrades = combinedData.map((worker: any) => {
              const tradeIds = workerTradesMap.get(worker.id) || [];
              const workerTrades = (Array.isArray(tradeIds) ? tradeIds : []).map((id: number) => tradeMap.get(id)).filter(Boolean);
              
              return {
                ...worker,
                trades: workerTrades,
                subscription_plan: proUserIdsSet.has(worker.id) ? 'pro' : null
              };
            });

            setWorkers(workersWithTrades as Worker[]);
            setHasMore(combinedData.length === ITEMS_PER_PAGE);
            
            // Store PRO user IDs for subsequent pages
            (window as any).__PRO_USER_IDS = proUserIds;
          } else {
            setWorkers([]);
            setHasMore(false);
          }
        } else {
          // SUBSEQUENT PAGES: Load only regular workers (PRO already shown on first page)
          console.log('📊 Subsequent page - loading regular workers only');
          
          // Get PRO user IDs from first page load
          const proUserIds = (window as any).__PRO_USER_IDS || [];
          const proCount = proUserIds.length;
          
          // Calculate offset: skip PRO users and previous pages of regular users
          const regularFrom = (pageNum - 1) * ITEMS_PER_PAGE + (ITEMS_PER_PAGE - proCount);
          const regularTo = regularFrom + ITEMS_PER_PAGE - 1;
          
          let regularQuery = supabase
            .from('profiles')
            .select('id, name, avatar_url, address, bio, rating, is_verified, is_online, phone')
            .eq('role', 'worker')
            .eq('is_verified', true)
            .not('name', 'is', null)
            .order('rating', { ascending: false, nullsFirst: false })
            .range(regularFrom, regularTo);
          
          // Exclude PRO users
          if (proUserIds.length > 0) {
            regularQuery = regularQuery.not('id', 'in', `(${proUserIds.join(',')})`);
          }
          
          const { data, error: fetchError } = await regularQuery;

          if (fetchError) {
            throw new Error(fetchError.message);
          }

          if (data && data.length > 0) {
            const workerIds = data.map((w: any) => w.id);

            // Fetch worker_trades
            let workerTradesData: any[] = [];
            const batchSize = 50;
            for (let i = 0; i < workerIds.length; i += batchSize) {
              const batch = workerIds.slice(i, i + batchSize);
              const { data: batchData } = await supabase
                .from('worker_trades')
                .select('profile_id, trade_ids')
                .in('profile_id', batch);
              if (batchData) {
                workerTradesData.push(...batchData);
              }
            }

            // Collect trade IDs
            const allTradeIds = new Set<number>();
            workerTradesData?.forEach((wt: any) => {
              if (wt.trade_ids && Array.isArray(wt.trade_ids)) {
                wt.trade_ids.forEach((id: number) => allTradeIds.add(id));
              }
            });

            // Fetch trades with caching
            let trades: any[] = [];
            if (allTradeIds.size > 0) {
              const tradesCacheKey = CacheKeys.trades();
              let cachedTrades = (window as any).__WORKERS_CACHE?.get(tradesCacheKey);
              
              if (!cachedTrades) {
                const tradeIdsArray = Array.from(allTradeIds);
                const tradeBatchSize = 100;
                trades = [];
                
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
                
                if (!(window as any).__WORKERS_CACHE) {
                  (window as any).__WORKERS_CACHE = new Map();
                }
                (window as any).__WORKERS_CACHE.set(tradesCacheKey, trades);
              } else {
                trades = cachedTrades;
              }
            }

            // Create maps
            const tradeMap = new Map((trades || []).map((t: any) => [t.id, t]));
            const workerTradesMap = new Map(
              workerTradesData?.map((wt: any) => [wt.profile_id, wt.trade_ids]) || []
            );

            // Map trades to workers (no PRO on subsequent pages)
            const workersWithTrades = data.map((worker: any) => {
              const tradeIds = workerTradesMap.get(worker.id) || [];
              const workerTrades = (Array.isArray(tradeIds) ? tradeIds : []).map((id: number) => tradeMap.get(id)).filter(Boolean);
              
              return {
                ...worker,
                trades: workerTrades,
                subscription_plan: null
              };
            });

            setWorkers((prev: Worker[]) => [...prev, ...(workersWithTrades as Worker[])]);
            setHasMore(data.length === ITEMS_PER_PAGE);
          } else {
            setHasMore(false);
          }
        }
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

  // Function to apply filters
  const applyFilters = () => {
    setActiveCity(selectedCity);
    setActiveTrade(selectedTrade);
    setActiveMinRating(minRating);
    setActiveOnlyVerified(onlyVerified);
    setActiveOnlyOnline(onlyOnline);
    
    // Update URL with all filters
    const params = new URLSearchParams();
    
    // Add search term if exists
    if (searchTerm) {
      params.set('q', searchTerm);
    }
    
    // Add city filter
    if (selectedCity) {
      params.set('city', selectedCity);
    }
    
    // Add trade filter
    if (selectedTrade) {
      params.set('trade', selectedTrade);
    }
    
    // Add rating filter
    if (minRating !== undefined) {
      params.set('rating', minRating.toString());
    }
    
    // Add verified filter (only if false, since true is default)
    if (!onlyVerified) {
      params.set('verified', 'false');
    }
    
    // Add online filter
    if (onlyOnline) {
      params.set('online', 'true');
    }
    
    // Add sort method
    if (sortMethod !== 'rating') {
      params.set('sort', sortMethod);
    }
    
    // Update URL without page reload
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
    
    setShowFilters(false); // Close filters on mobile after applying
  };

  // Function to reset filters
  const resetFilters = () => {
    setSelectedCity('');
    setSelectedTrade('');
    setMinRating(undefined);
    setOnlyVerified(true);
    setOnlyOnline(false);
    setActiveCity('');
    setActiveTrade('');
    setActiveMinRating(undefined);
    setActiveOnlyVerified(true);
    setActiveOnlyOnline(false);
    
    // Reset URL to only have search term and sort
    const params = new URLSearchParams();
    
    if (searchTerm) {
      params.set('q', searchTerm);
    }
    
    if (sortMethod !== 'rating') {
      params.set('sort', sortMethod);
    }
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  };

  // Initial load - reset when active filters change
  useEffect(() => {
    if (!supabase) return; // Wait for Supabase to initialize
    
    setPage(0);
    setHasMore(true);
    fetchWorkers(0, true);
  }, [supabase, searchTerm, sortMethod, activeCity, activeTrade, activeMinRating, activeOnlyVerified, activeOnlyOnline]);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.trade-autocomplete')) {
        setShowTradeDropdown(false);
      }
    };

    if (showTradeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTradeDropdown]);

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
    <div className="relative max-w-screen-2xl mx-auto px-4 py-8 pb-16 sm:px-6 lg:px-8 xl:px-12">
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
        <aside className={`lg:w-64 xl:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Filtrează rezultatele</h3>
              {(selectedCity !== activeCity || selectedTrade !== activeTrade || minRating !== activeMinRating || onlyVerified !== activeOnlyVerified || onlyOnline !== activeOnlyOnline) && (
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                  Modificat
                </span>
              )}
            </div>
            
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

            {/* Trade filter with autocomplete */}
            <div className="trade-autocomplete">
              <label htmlFor="trade" className="block text-sm font-semibold text-slate-700 mb-2">
                Meserie
              </label>
              <div className="relative">
                {/* Input field */}
                <div className="relative">
                  <input
                    id="trade"
                    type="text"
                    value={selectedTrade || tradeSearchQuery}
                    onChange={(e) => {
                      setTradeSearchQuery(e.target.value);
                      setSelectedTrade('');
                      setShowTradeDropdown(true);
                    }}
                    onFocus={() => setShowTradeDropdown(true)}
                    placeholder="Caută meserie..."
                    className="w-full px-4 py-2 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  {selectedTrade && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTrade('');
                        setTradeSearchQuery('');
                      }}
                      className="absolute right-8 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowTradeDropdown(!showTradeDropdown)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${showTradeDropdown ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Dropdown */}
                {showTradeDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
                    {/* Loading indicator */}
                    {isLoadingTrades && filteredTrades.length === 0 && (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-500 mr-2" />
                        <span className="text-sm text-slate-500">Se încarcă...</span>
                      </div>
                    )}

                    {/* Trade list */}
                    <div className="max-h-60 overflow-y-auto">
                      {filteredTrades.slice(0, 50).map((trade: any) => (
                        <button
                          key={trade.id}
                          type="button"
                          onClick={() => {
                            setSelectedTrade(trade.name);
                            setTradeSearchQuery('');
                            setShowTradeDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors"
                        >
                          {trade.name}
                        </button>
                      ))}
                      
                      {/* Load more indicator */}
                      {hasMoreTrades && filteredTrades.length > 0 && (
                        <div className="flex items-center justify-center py-2 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => loadTrades(false)}
                            className="text-xs text-blue-600 hover:text-blue-700 flex items-center"
                          >
                            {isLoadingTrades ? (
                              <Loader2 className="w-3 h-3 animate-spin mr-1" />
                            ) : (
                              'Încarcă mai multe...'
                            )}
                          </button>
                        </div>
                      )}

                      {/* No results */}
                      {!isLoadingTrades && filteredTrades.length === 0 && tradeSearchQuery && (
                        <div className="px-4 py-3 text-sm text-slate-500 text-center">
                          Nu am găsit nicio meserie pentru "{tradeSearchQuery}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
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

            {/* Action buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <button
                onClick={applyFilters}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
              >
                <Search className="w-4 h-4" />
                Aplică filtrele
              </button>
              
              {(selectedCity || selectedTrade || minRating || !onlyVerified || onlyOnline) && (
                <button
                  onClick={resetFilters}
                  className="w-full px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                >
                  Resetează filtrele
                </button>
              )}
            </div>

            {/* Active filters display */}
            {(activeCity || activeTrade || activeMinRating || !activeOnlyVerified || activeOnlyOnline) && (
              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm font-semibold text-slate-700 mb-2">Filtre active:</p>
                <div className="space-y-1 text-xs text-slate-600">
                  {activeCity && <div>📍 Oraș: {activeCity}</div>}
                  {activeTrade && <div>🔧 Meserie: {activeTrade}</div>}
                  {activeMinRating && <div>⭐ Rating minim: {activeMinRating}+</div>}
                  {activeOnlyVerified && <div>✅ Doar verificați</div>}
                  {activeOnlyOnline && <div>🟢 Doar online</div>}
                </div>
              </div>
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
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 animate-fade-in">
              {Array.from({ length: 6 }).map((_, index) => (
                <TradesmanCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Results */}
          {!error && workers.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 animate-fade-in">
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
