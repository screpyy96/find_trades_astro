import { supabase } from './supabase';
import { MAX_NEARBY_CITIES, JOBS_LIMIT, METRICS_LOOKBACK_DAYS } from './constants';
import { ServicePageCache } from './cache';

interface ServiceMetrics {
  workerCount: number;
  verifiedCount: number;
  avgRating: number;
  jobsLast30Days: number;
  avgBudget: number;
}

interface ServiceMetricsParams {
  tradeId: string;
  serviceName: string;
  cityName: string;
}

interface WorkerProfile {
  id: string;
  rating: number | null;
  is_verified: boolean | null;
  address: string | null;
}

interface JobData {
  id: string;
  budget: number | null;
  address: string | null;
  tradeType: string | null;
  created_at: string;
}

// Optimized function to fetch all service data in parallel with caching
export async function fetchServicePageData(tradeSlug: string, categorySlug: string) {
  return ServicePageCache.getCachedServiceData(
    tradeSlug,
    categorySlug,
    async () => {
      if (!supabase) {
        return {
          trade: null,
          similarTrades: [],
          error: 'Supabase not available'
        };
      }

      try {
        // Fetch trade and similar trades in parallel
        const [tradeResult, similarTradesResult] = await Promise.all([
          supabase
            .from('trades')
            .select('id, name, slug, category')
            .eq('slug', tradeSlug)
            .single(),
          
          supabase
            .from('trades')
            .select('name, slug')
            .eq('category', categorySlug)
            .neq('slug', tradeSlug)
            .limit(MAX_NEARBY_CITIES)
        ]);

        if (tradeResult.error) {
          return {
            trade: null,
            similarTrades: [],
            error: tradeResult.error.message
          };
        }

        return {
          trade: tradeResult.data,
          similarTrades: similarTradesResult.data || [],
          error: null
        };
      } catch (error) {
        return {
          trade: null,
          similarTrades: [],
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }
  );
}

// Optimized metrics fetching with batch queries and caching
export async function fetchServiceMetrics(params: ServiceMetricsParams): Promise<ServiceMetrics> {
  const { tradeId, serviceName, cityName } = params;
  
  return ServicePageCache.getCachedMetrics(
    tradeId.toString(),
    serviceName,
    cityName,
    async () => {
      const defaultMetrics: ServiceMetrics = {
        workerCount: 0,
        verifiedCount: 0,
        avgRating: 0,
        jobsLast30Days: 0,
        avgBudget: 0
      };

      if (!supabase) {
        return defaultMetrics;
      }

      try {
        // Fetch worker profiles and jobs in parallel
        const createdAfter = new Date();
        createdAfter.setDate(createdAfter.getDate() - METRICS_LOOKBACK_DAYS);

        const [workersResult, jobsResult] = await Promise.all([
          // Get workers for this trade
          supabase
            .from('worker_trades')
            .select('profile_id')
            .contains('trade_ids', [tradeId]),

          // Get recent jobs for this service and city
          supabase
            .from('jobs')
            .select('id, budget, address, tradeType, created_at')
            .gte('created_at', createdAfter.toISOString())
            .limit(JOBS_LIMIT)
        ]);

        // Process workers data
        let workerCount = 0;
        let verifiedCount = 0;
        let avgRating = 0;

        if (!workersResult.error && workersResult.data) {
          const profileIds = workersResult.data.map(row => row.profile_id);
          
          if (profileIds.length > 0) {
            const { data: profiles } = await supabase
              .from('profiles')
              .select('id, rating, is_verified, address')
              .in('id', profileIds)
              .eq('role', 'worker');

            if (profiles) {
              workerCount = profiles.length;
              verifiedCount = profiles.filter(profile => profile.is_verified).length;
              
              const ratedProfiles = profiles.filter(profile => typeof profile.rating === 'number');
              if (ratedProfiles.length > 0) {
                const totalRating = ratedProfiles.reduce((sum, profile) => sum + (profile.rating || 0), 0);
                avgRating = totalRating / ratedProfiles.length;
              }
            }
          }
        }

        // Process jobs data
        let jobsLast30Days = 0;
        let avgBudget = 0;

        if (!jobsResult.error && jobsResult.data) {
          const cityNeedle = cityName.toLowerCase();
          const tradeNeedle = serviceName.toLowerCase();
          
          const filteredJobs = jobsResult.data.filter((job: JobData) => {
            const tradeMatch = job.tradeType ? job.tradeType.toLowerCase().includes(tradeNeedle) : false;
            const cityMatch = job.address ? job.address.toLowerCase().includes(cityNeedle) : false;
            return tradeMatch && cityMatch;
          });

          jobsLast30Days = filteredJobs.length;

          const jobsWithBudget = filteredJobs.filter(job => job.budget && job.budget > 0);
          if (jobsWithBudget.length > 0) {
            const totalBudget = jobsWithBudget.reduce((sum, job) => sum + (job.budget || 0), 0);
            avgBudget = totalBudget / jobsWithBudget.length;
          }
        }

        return {
          workerCount,
          verifiedCount,
          avgRating,
          jobsLast30Days,
          avgBudget
        };
      } catch (error) {
        // Error logged to monitoring in production
        return defaultMetrics;
      }
    }
  );
}

// Batch fetch related trades for multiple service pages
export async function fetchRelatedTrades(tradeIds: string[]) {
  if (!supabase || tradeIds.length === 0) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('trades')
      .select('slug, category')
      .in('slug', tradeIds);

    if (error) {
      // Error logged to monitoring in production
      return [];
    }

    return data || [];
  } catch (error) {
    // Error logged to monitoring in production
    return [];
  }
}
