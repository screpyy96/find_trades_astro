// Caching utilities for service pages and tradesmen listings
import { useState, useEffect } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<any>>();
  
  set<T>(key: string, data: T, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }
  
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }
  
  delete(key: string): boolean {
    return this.cache.delete(key);
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// Global cache instance
const memoryCache = new MemoryCache();

// Cache cleanup interval (5 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => memoryCache.cleanup(), 5 * 60 * 1000);
}

// Cache key generators for better organization
export const CacheKeys = {
  // Tradesmen related
  workersList: (sort: string, city: string, trade: string, rating: number | undefined, verified: boolean, online: boolean, page: number) => 
    `workers:list:${sort}:${city}:${trade}:${rating || 'any'}:${verified}:${online}:${page}`,
  
  workerProfile: (id: string) => `workers:profile:${id}`,
  workerTrades: (id: string) => `workers:trades:${id}`,
  trades: () => `trades:all`,
  cities: () => `cities:all`,
  
  // Service pages (existing)
  servicePage: (tradeSlug: string, categorySlug: string, citySlug?: string) => 
    citySlug ? `service:${tradeSlug}:${categorySlug}:${citySlug}` : `service:${tradeSlug}:${categorySlug}`,
  
  metrics: (tradeId: string, serviceName: string, cityName: string) => 
    `metrics:${tradeId}:${serviceName}:${cityName}`,
  
  sanity: (serviceSlug: string, citySlug: string) => 
    `sanity:${serviceSlug}:${citySlug}`,
};

export class ServicePageCache {
  // Cache service page data
  static async getCachedServiceData<T>(
    tradeSlug: string, 
    categorySlug: string, 
    fetchFn: () => Promise<T>,
    citySlug?: string
  ): Promise<T> {
    const key = CacheKeys.servicePage(tradeSlug, categorySlug, citySlug);
    const cached = memoryCache.get<T>(key);
    
    if (cached) {
      return cached;
    }
    
    const data = await fetchFn();
    // Cache for 30 minutes
    memoryCache.set(key, data, 30 * 60 * 1000);
    
    return data;
  }
  
  // Cache metrics data
  static async getCachedMetrics<T>(
    tradeId: string, 
    serviceName: string, 
    cityName: string,
    fetchFn: () => Promise<T>
  ): Promise<T> {
    const key = CacheKeys.metrics(tradeId, serviceName, cityName);
    const cached = memoryCache.get<T>(key);
    
    if (cached) {
      return cached;
    }
    
    const data = await fetchFn();
    // Cache for 15 minutes (metrics change more frequently)
    memoryCache.set(key, data, 15 * 60 * 1000);
    
    return data;
  }
  
  // Cache Sanity content
  static async getCachedSanityContent<T>(
    serviceSlug: string, 
    citySlug: string,
    fetchFn: () => Promise<T>
  ): Promise<T> {
    const key = CacheKeys.sanity(serviceSlug, citySlug);
    const cached = memoryCache.get<T>(key);
    
    if (cached) {
      return cached;
    }
    
    const data = await fetchFn();
    // Cache for 1 hour (CMS content changes rarely)
    memoryCache.set(key, data, 60 * 60 * 1000);
    
    return data;
  }
  
  // NEW: Cache workers list
  static async getCachedWorkers<T>(
    sort: string,
    city: string,
    trade: string,
    rating: number | undefined,
    verified: boolean,
    online: boolean,
    page: number,
    fetchFn: () => Promise<T>
  ): Promise<T> {
    const key = CacheKeys.workersList(sort, city, trade, rating, verified, online, page);
    const cached = memoryCache.get<T>(key);
    
    if (cached) {
      return cached;
    }
    
    const data = await fetchFn();
    // Cache for 10 minutes (worker listings change frequently)
    memoryCache.set(key, data, 10 * 60 * 1000);
    
    return data;
  }
  
  // NEW: Cache worker profile
  static async getCachedWorkerProfile<T>(
    id: string,
    fetchFn: () => Promise<T>
  ): Promise<T> {
    const key = CacheKeys.workerProfile(id);
    const cached = memoryCache.get<T>(key);
    
    if (cached) {
      return cached;
    }
    
    const data = await fetchFn();
    // Cache for 15 minutes
    memoryCache.set(key, data, 15 * 60 * 1000);
    
    return data;
  }
  
  // NEW: Cache trades data
  static async getCachedTrades<T>(fetchFn: () => Promise<T>): Promise<T> {
    const key = CacheKeys.trades();
    const cached = memoryCache.get<T>(key);
    
    if (cached) {
      return cached;
    }
    
    const data = await fetchFn();
    // Cache for 1 hour (trades rarely change)
    memoryCache.set(key, data, 60 * 60 * 1000);
    
    return data;
  }
  
  // Invalidate cache for specific service
  static invalidateService(tradeSlug: string, categorySlug: string, citySlug?: string): void {
    const key = CacheKeys.servicePage(tradeSlug, categorySlug, citySlug);
    memoryCache.delete(key);
  }
  
  // NEW: Invalidate worker cache
  static invalidateWorker(id: string): void {
    memoryCache.delete(CacheKeys.workerProfile(id));
    memoryCache.delete(CacheKeys.workerTrades(id));
  }
  
  // NEW: Invalidate workers list cache
  static invalidateWorkersList(): void {
    // Clear all workers list cache entries
    for (const key of memoryCache['cache'].keys()) {
      if (key.startsWith('workers:list:')) {
        memoryCache.delete(key);
      }
    }
  }
  
  // Clear all cache
  static clearAll(): void {
    memoryCache.clear();
  }
}

// React hook for cached data
export function useCachedQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  ttl?: number
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check cache first
        const cached = memoryCache.get<T>(key);
        if (cached) {
          setData(cached);
          setLoading(false);
          return;
        }

        // Fetch fresh data
        setLoading(true);
        const result = await queryFn();
        memoryCache.set(key, result, ttl || 5 * 60 * 1000); // Default 5 minutes
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key, ttl]);

  return { data, loading, error };
}

// Cache warming utilities
export class CacheWarmer {
  static async warmPopularServices(): Promise<void> {
    // This would be called during build or by a cron job
    // to pre-populate cache with popular service pages
    console.log('Cache warming not implemented yet');
  }
}

export default memoryCache;
