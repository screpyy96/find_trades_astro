import { useState, useMemo } from 'react';

interface Trade {
  id: number;
  name: string;
  slug: string;
  category: string;
  description?: string | null;
}

interface GroupedTrades {
  [category: string]: Trade[];
}

interface ServicesSearchProps {
  trades: Trade[];
  groupedTrades: GroupedTrades;
  categories: string[];
}

export function ServicesSearch({ trades, groupedTrades, categories }: ServicesSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter trades based on search query only
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return trades; // Show all when no search
    }

    const query = searchQuery.toLowerCase();
    return trades.filter(trade =>
      trade.name.toLowerCase().includes(query) ||
      trade.description?.toLowerCase().includes(query) ||
      trade.category.toLowerCase().includes(query)
    );
  }, [trades, searchQuery]);

  // Group filtered results by category
  const filteredGrouped = useMemo(() => {
    const grouped: GroupedTrades = {};
    filteredResults.forEach(trade => {
      const category = trade.category || 'Altele';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(trade);
    });
    return grouped;
  }, [filteredResults]);

  const filteredCategories = Object.keys(filteredGrouped).sort();

  const createCategorySlug = (category: string) => {
    return category.toLowerCase()
      .replace(/\s+&\s+/g, '-')  // Replace " & " with "-"
      .replace(/&/g, '')  // Remove any remaining &
      .replace(/\s+/g, '-')
      .replace(/ș/g, 's')
      .replace(/ț/g, 't')
      .replace(/ă/g, 'a')
      .replace(/â/g, 'a')
      .replace(/î/g, 'i')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-');  // Replace multiple dashes with single dash
  };

  return (
    <div className="space-y-8">
      {/* Search Bar - Simplified */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Caută servicii (ex: zugrav, electrician, instalator...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 text-base border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Simple results count */}
        {searchQuery && (
          <div className="mt-3 text-sm text-slate-600">
            {filteredResults.length === 0 ? (
              <span>Niciun rezultat găsit</span>
            ) : (
              <span>Găsite <strong className="text-slate-900">{filteredResults.length}</strong> servicii</span>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {filteredResults.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Nu am găsit servicii
            </h3>
            <p className="text-slate-600 mb-6">
              Încearcă să modifici criteriile de căutare sau să alegi o altă categorie.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Vezi toate serviciile
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <div key={category} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-2xl">🔧</span>
                  {category}
                  <span className="text-sm font-normal text-slate-500">
                    ({filteredGrouped[category].length} servicii)
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredGrouped[category].map((trade) => {
                  const categorySlug = createCategorySlug(category);

                  return (
                    <a
                      key={trade.id}
                      href={`/servicii/${categorySlug}/${trade.slug}/`}
                      className="group bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg p-3 transition-all duration-200"
                    >
                      <h4 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm">
                        {trade.name}
                      </h4>
                      {trade.description && (
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          {trade.description}
                        </p>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
