import { useState, useEffect } from 'react';
import { Search, Loader2, Building2, MapPin, Filter, X, Briefcase } from 'lucide-react';
import { CompanyCard } from './CompanyCard';
import { useInView } from 'react-intersection-observer';

interface Company {
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

interface CompaniesClientListProps {
  initialSearch?: string;
  initialSort?: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

export function CompaniesClientList({
  initialSearch = '',
  initialSort = 'rating',
  supabaseUrl: supabaseUrlProp,
  supabaseAnonKey: supabaseAnonKeyProp
}: CompaniesClientListProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  
  // Initialize searchTerm from URL or prop
  const getInitialSearch = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('q') || initialSearch;
    }
    return initialSearch;
  };
  
  const getInitialCategory = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('category') || '';
    }
    return '';
  };
  
  const getInitialCity = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('city') || '';
    }
    return '';
  };
  
  const [searchTerm, setSearchTerm] = useState(getInitialSearch);
  const [selectedCity, setSelectedCity] = useState(getInitialCity);
  const [selectedCategory, setSelectedCategory] = useState(getInitialCategory);
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const [supabase, setSupabase] = useState<any>(null);
  const { ref, inView } = useInView({ threshold: 0.5 });
  
  const ITEMS_PER_PAGE = 12;

  // Sync with URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlSearch = params.get('q') || '';
      const urlCategory = params.get('category') || '';
      const urlCity = params.get('city') || '';
      setSearchTerm(urlSearch);
      setSelectedCategory(urlCategory);
      setSelectedCity(urlCity);
    }
  }, []);

  // Initialize Supabase client
  useEffect(() => {
    const initSupabase = async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const url = supabaseUrlProp || import.meta.env.PUBLIC_SUPABASE_URL;
        const key = supabaseAnonKeyProp || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
        
        if (url && key) {
          setSupabase(createClient(url, key));
        } else {
          setError('Configurare incompletă.');
          setIsLoading(false);
        }
      } catch (err) {
        setError('Nu s-a putut inițializa conexiunea.');
        setIsLoading(false);
      }
    };
    
    initSupabase();
  }, [supabaseUrlProp, supabaseAnonKeyProp]);

  // Fetch categories from trades table
  useEffect(() => {
    if (!supabase) return;
    
    const fetchCategories = async () => {
      try {
        const { data } = await supabase
          .from('trades')
          .select('category')
          .not('category', 'is', null);
        
        if (data) {
          const uniqueCategories = [...new Set(data.map((t: any) => t.category).filter(Boolean))].sort();
          setCategories(uniqueCategories as string[]);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    
    fetchCategories();
  }, [supabase]);

  // Fetch companies with enterprise subscription
  const fetchCompanies = async (pageNum: number, reset: boolean = false) => {
    if (!hasMore && !reset) return;
    if (!supabase) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Step 1: Get all enterprise user IDs
      // Using ilike to handle potential whitespace/newline issues in plan_id
      const { data: enterpriseSubscriptions, error: subError } = await supabase
        .from('user_subscriptions')
        .select('user_id')
        .eq('status', 'active')
        .ilike('plan_id', 'enterprise%');
      
      if (subError) throw subError;
      
      const enterpriseUserIds = enterpriseSubscriptions?.map((s: any) => s.user_id) || [];
      
      if (enterpriseUserIds.length === 0) {
        setCompanies([]);
        setIsLoading(false);
        setHasMore(false);
        return;
      }
      
      // Step 2: Fetch profiles for enterprise users
      let query = supabase
        .from('profiles')
        .select('id, name, avatar_url, address, bio, rating, is_verified, is_online, phone')
        .eq('role', 'worker')
        .in('id', enterpriseUserIds)
        .not('name', 'is', null)
        .order('rating', { ascending: false, nullsFirst: false });
      
      // Apply search filter
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`);
      }
      
      // Apply city filter - handle București region specially
      if (selectedCity) {
        const cityLower = selectedCity.toLowerCase();
        if (cityLower === 'bucuresti' || cityLower === 'bucurești') {
          // Search for București OR Ilfov region
          query = query.or('address.ilike.%bucuresti%,address.ilike.%bucurești%,address.ilike.%ilfov%,address.ilike.%sector%');
        } else {
          query = query.ilike('address', `%${selectedCity}%`);
        }
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      if (data && data.length > 0) {
        // Fetch trades for these companies
        const companyIds = data.map((c: any) => c.id);
        
        const { data: companyTradesData } = await supabase
          .from('worker_trades')
          .select('profile_id, trade_ids')
          .in('profile_id', companyIds);
        
        // Collect all trade IDs (convert strings to numbers if needed)
        const allTradeIds = new Set<number>();
        companyTradesData?.forEach((ct: any) => {
          if (ct.trade_ids && Array.isArray(ct.trade_ids)) {
            ct.trade_ids.forEach((id: any) => {
              const numId = typeof id === 'string' ? parseInt(id, 10) : id;
              if (!isNaN(numId)) allTradeIds.add(numId);
            });
          }
        });
        
        // Fetch trade details including category
        let trades: any[] = [];
        if (allTradeIds.size > 0) {
          const { data: tradeData } = await supabase
            .from('trades')
            .select('id, name, slug, category')
            .in('id', Array.from(allTradeIds));
          trades = tradeData || [];
        }
        
        // Create maps
        const tradeMap = new Map(trades.map((t: any) => [t.id, t]));
        const companyTradesMap = new Map(
          companyTradesData?.map((ct: any) => [ct.profile_id, ct.trade_ids]) || []
        );
        
        // Map categories (not individual trades) to companies
        const companiesWithCategories = data.map((company: any) => {
          const tradeIds = companyTradesMap.get(company.id) || [];
          const companyTrades = (Array.isArray(tradeIds) ? tradeIds : [])
            .map((id: any) => {
              const numId = typeof id === 'string' ? parseInt(id, 10) : id;
              return tradeMap.get(numId);
            })
            .filter(Boolean);
          
          // Extract unique categories from trades
          const companyCategories = [...new Set(companyTrades.map((t: any) => t.category).filter(Boolean))];
          const categoryObjects = companyCategories.map((cat: string) => ({ id: cat, name: cat }));
          
          return {
            ...company,
            trades: categoryObjects, // Use categories instead of individual trades
            subscription_plan: 'enterprise',
            _categories: companyCategories // Keep raw categories for filtering
          };
        });
        
        // Filter by selected category (client-side, case-insensitive)
        let filteredCompanies = companiesWithCategories;
        if (selectedCategory) {
          const normalizedSelectedCategory = selectedCategory.toLowerCase();
          filteredCompanies = companiesWithCategories.filter((c: any) => 
            c._categories.some((cat: string) => cat.toLowerCase() === normalizedSelectedCategory)
          );
        }
        
        // Client-side pagination
        const from = pageNum * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE;
        const paginatedCompanies = filteredCompanies.slice(from, to);
        
        if (reset) {
          setCompanies(paginatedCompanies);
        } else {
          setCompanies(prev => [...prev, ...paginatedCompanies]);
        }
        
        setHasMore(filteredCompanies.length > to);
      } else {
        if (reset) {
          setCompanies([]);
        }
        setHasMore(false);
      }
    } catch (err: any) {
      console.error('Error fetching companies:', err);
      setError('Nu s-au putut încărca companiile.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (supabase) {
      setPage(0);
      setHasMore(true);
      fetchCompanies(0, true);
    }
  }, [supabase, searchTerm, selectedCity, selectedCategory]);

  // Load more on scroll
  useEffect(() => {
    if (inView && hasMore && !isLoading && supabase) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCompanies(nextPage, false);
    }
  }, [inView, hasMore, isLoading, supabase]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    setHasMore(true);
    fetchCompanies(0, true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Search and Filters */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Caută companii..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <Filter className="w-5 h-5" />
            <span>Filtre</span>
          </button>
          
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Search className="w-5 h-5" />
            Caută
          </button>
        </form>
        
        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Filtre</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Oraș
                </label>
                <input
                  type="text"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  placeholder="ex: București, Cluj..."
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Briefcase className="w-4 h-4 inline mr-1" />
                  Categorie
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                >
                  <option value="">Toate categoriile</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {(selectedCity || selectedCategory) && (
              <button
                onClick={() => {
                  setSelectedCity('');
                  setSelectedCategory('');
                }}
                className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Resetează filtrele
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-slate-600">
          <Building2 className="w-5 h-5" />
          <span className="font-medium">
            {companies.length} {companies.length === 1 ? 'companie' : 'companii'} găsite
          </span>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={() => fetchCompanies(0, true)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Încearcă din nou
            </button>
          </div>
        </div>
      )}

      {/* Companies Grid */}
      {!error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
          
          {/* Loading Skeletons */}
          {isLoading && companies.length === 0 && (
            <>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-slate-200 rounded-3xl h-80"></div>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && companies.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-slate-100 rounded-3xl p-12 max-w-md mx-auto">
            <Building2 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Nicio companie găsită
            </h3>
            <p className="text-slate-600">
              {searchTerm || selectedCity
                ? 'Încearcă să modifici criteriile de căutare.'
                : 'Nu există companii înregistrate momentan.'}
            </p>
          </div>
        </div>
      )}

      {/* Load More Trigger */}
      {hasMore && !isLoading && companies.length > 0 && (
        <div ref={ref} className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      )}

      {/* Loading More Indicator */}
      {isLoading && companies.length > 0 && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      )}
    </div>
  );
}
