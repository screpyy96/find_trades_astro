import { useEffect, useMemo, useCallback } from 'react';
import type { Trade } from '../../types/database';
import { useTradesAutocomplete } from '../../hooks/useTradesAutocomplete';

// Flexible trade type for search component
type SearchTrade = Pick<Trade, 'id' | 'name' | 'slug'> & Partial<Pick<Trade, 'category' | 'created_at' | 'updated_at' | 'description'>>;

interface HeroSearchProps {
  trades: SearchTrade[];
  isLoading: boolean;
  onSelectTrade: (trade: SearchTrade) => void;
  initialQuery?: string;
}

export function HeroSearch({ trades, isLoading, onSelectTrade, initialQuery = '' }: HeroSearchProps) {
  const {
    searchQuery,
    setSearchQuery,
    showDropdown,
    setShowDropdown,
    filteredTrades,
    dropdownRef,
    inputRef,
    handleTradeSelect,
    handleInputFocus,
  } = useTradesAutocomplete({
    trades: trades as Trade[],
    initialValue: initialQuery,
    onSelectTrade: onSelectTrade as (trade: Trade) => void,
  });

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery, setSearchQuery]);

  const hasTrades = useMemo(() => trades && trades.length > 0, [trades]);

  const openDropdown = useCallback(() => {
    handleInputFocus();
    setShowDropdown(true);
  }, [handleInputFocus, setShowDropdown]);

  const handleEnter = useCallback(() => {
    if (filteredTrades.length > 0) {
      handleTradeSelect(filteredTrades[0] as Trade);
    } else if (searchQuery.trim()) {
      window.location.href = `/meseriasi?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  }, [filteredTrades, handleTradeSelect, searchQuery]);

  return (
    <div className="relative w-full z-[120]" ref={dropdownRef}>
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative flex-1">
            <label htmlFor="hero-search-input" className="sr-only">
              Caută meseriaș
            </label>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-slate-400" aria-hidden="true">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="7" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder={searchQuery || 'Ce meseriaș cauți? Ex: electrician'}
              className="w-full pl-12 pr-4 py-4 text-base rounded-xl bg-white text-slate-900 placeholder-slate-500 caret-amber-500 border border-slate-200 focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 focus:outline-none font-medium transition-all duration-200 shadow-sm"
              id="hero-search-input"
              name="query"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={openDropdown}
              onClick={openDropdown}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleEnter();
                }
              }}
              autoComplete="off"
              aria-autocomplete="list"
              aria-controls="hero-search-suggestions"
              role="combobox"
              aria-expanded={showDropdown}
              aria-haspopup="listbox"
            />
          </div>
          <button
            onClick={() => {
              if (searchQuery.trim()) {
                window.location.href = `/meseriasi?q=${encodeURIComponent(searchQuery.trim())}`;
              } else {
                window.location.href = '/meseriasi';
              }
            }}
            className="group w-full sm:w-auto min-h-[56px] px-6 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Caută</span>
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            <span><strong className="text-amber-300">Click pe rezultat</strong> → Cere ofertă direct</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
            <span><strong className="text-orange-300">Buton Caută</strong> → Caută meseriași</span>
          </div>
          {!hasTrades && (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
              <span className="text-red-300/80">Lista de meserii nu s-a încărcat încă</span>
            </div>
          )}
        </div>
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 mt-2 z-[999] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 bg-white">
          {isLoading ? (
            <div className="p-4 text-center text-slate-600 font-medium">Se încarcă...</div>
          ) : filteredTrades.length > 0 ? (
            <ul
              id="hero-search-suggestions"
              className="max-h-[440px] overflow-y-auto custom-scrollbar"
              role="listbox"
            >
              {filteredTrades.map((trade) => (
                <li
                  key={trade.id ?? trade.name}
                  className="px-4 py-3 cursor-pointer hover:bg-slate-100 transition-colors text-slate-800 font-medium border-b border-slate-100 last:border-b-0"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    handleTradeSelect(trade as Trade);
                  }}
                  role="option"
                  tabIndex={0}
                  aria-selected="false"
                >
                  {trade.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-slate-600 font-medium space-y-2">
              <div>Niciun rezultat pentru "{searchQuery}"</div>
              <a
                href="/meseriasi"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-sm transition"
              >
                Vezi toate meseriile
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
