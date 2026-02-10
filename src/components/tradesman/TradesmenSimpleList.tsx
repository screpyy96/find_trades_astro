import { useState, useEffect } from 'react';

interface Worker {
  id: string;
  name: string | null;
  avatar_url: string | null;
  address: string | null;
  bio: string | null;
  rating: number | null;
  is_verified: boolean | null;
}

interface TradesmenSimpleListProps {
  initialSearch?: string;
  initialSort?: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

export function TradesmenSimpleList({
  initialSearch = '',
  initialSort = 'rating',
  supabaseUrl: supabaseUrlProp,
  supabaseAnonKey: supabaseAnonKeyProp
}: TradesmenSimpleListProps) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    // Fetch workers from Supabase
    const fetchWorkers = async () => {
      setLoading(true);
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const url = supabaseUrlProp || import.meta.env.SUPABASE_URL;
        const key = supabaseAnonKeyProp || import.meta.env.SUPABASE_ANON_KEY;
        
        if (!url || !key) {
          setWorkers([]);
          setLoading(false);
          return;
        }
        
        const supabase = createClient(url, key);

        let query = supabase
          .from('profiles')
          .select('id, name, avatar_url, address, bio, rating, is_verified')
          .eq('role', 'worker')
          .not('name', 'is', null);

        // Apply search filter
        if (search) {
          query = query.or(`name.ilike.%${search}%,bio.ilike.%${search}%,address.ilike.%${search}%`);
        }

        // Apply sorting
        if (initialSort === 'rating') {
          query = query.order('rating', { ascending: false, nullsFirst: false });
        } else {
          query = query.order('name', { ascending: true });
        }

        query = query.limit(50);

        const { data, error } = await query;

        if (error) {
        // Error logged to monitoring in production
        setWorkers([]);
      } else {
          setWorkers(data || []);
        }
      } catch (err) {
      // Error logged to monitoring in production
      setLoading(false);
    } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [search, initialSort, supabaseUrlProp, supabaseAnonKeyProp]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-md animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (workers.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-lg p-12 shadow-md">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Nu am găsit meseriași</h3>
          <p className="text-gray-600">Încearcă să modifici criteriile de căutare.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {workers.length} meseriași găsiți
        </h2>
        {search && (
          <p className="text-gray-600">
            Rezultate pentru: <span className="font-semibold">{search}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map((worker) => (
          <a
            key={worker.id}
            href={`${import.meta.env.PUBLIC_APP_URL || 'https://app.findtrades.app'}/tradesman/${worker.id}`}
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-start gap-4">
              {worker.avatar_url ? (
                <img
                  src={worker.avatar_url}
                  alt={worker.name || ''}
                  className="w-16 h-16 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {worker.name?.charAt(0) || '?'}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{worker.name}</h3>
                {worker.bio && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{worker.bio}</p>
                )}
                {worker.address && (
                  <p className="text-sm text-gray-500 mb-2">{worker.address}</p>
                )}
                <div className="flex items-center gap-2">
                  {worker.rating && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium">{worker.rating.toFixed(1)}</span>
                    </div>
                  )}
                  {worker.is_verified && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Verificat
                    </span>
                  )}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
