import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type { Trade } from '../types/database';

interface UseTradesAutocompleteProps {
  trades: Trade[];
  initialValue?: string;
  onSelectTrade?: (trade: Trade) => void;
}

export function useTradesAutocomplete({ 
  trades, 
  initialValue = '', 
  onSelectTrade 
}: UseTradesAutocompleteProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter trades based on search query with smart matching
  const filteredTrades = useMemo(() => {
    if (searchQuery.length === 0) {
      return trades; // Show all trades when no search query
    }

    const term = searchQuery.toLowerCase();
    return trades.filter(trade => trade.name.toLowerCase().includes(term)); // Show all matching results
  }, [searchQuery, trades]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Ensure dropdown is closed initially and when initialValue changes
  useEffect(() => {
    setShowDropdown(false);
  }, []);

  // Update search query when initialValue changes
  useEffect(() => {
    setSearchQuery(initialValue);
  }, [initialValue]);

  const handleTradeSelect = useCallback((trade: Trade) => {
    setSelectedTrade(trade.name);
    setSearchQuery(trade.name);
    setShowDropdown(false);
    if (onSelectTrade) {
      onSelectTrade(trade);
    }
  }, [onSelectTrade]);

  const handleInputFocus = useCallback(() => {
    setShowDropdown(true);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setSearchQuery(value);
    setSelectedTrade('');
    setShowDropdown(true);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedTrade('');
    setSearchQuery('');
    setShowDropdown(false);
  }, []);

  const syncSearchQuery = useCallback((value: string) => {
    setSearchQuery(value);
    setShowDropdown(false);
  }, []);

  return {
    searchQuery,
    setSearchQuery: handleInputChange,
    syncSearchQuery, // Expose the new function
    showDropdown,
    setShowDropdown,
    selectedTrade,
    filteredTrades,
    dropdownRef,
    inputRef,
    handleTradeSelect,
    handleInputFocus,
    clearSelection,
  };
} 
