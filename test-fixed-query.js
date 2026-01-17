import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rcnpakhabqbqmnvuwjzo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbnBha2hhYnFicW1udnV3anpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1ODI3ODcsImV4cCI6MjA0NDE1ODc4N30.IalgVgBGKcLkuypZqiuC99MMSYPDJ3vz7X4trWKiOiE'
);

async function testFixedQuery() {
  console.log('🔍 Testing fixed query for zugrav in București...');
  
  const tradeId = 12;
  const cityName = 'București';
  
  // 1. Get workers with this trade
  const { data: workerTradesData, error: workerTradesError } = await supabase
    .from('worker_trades')
    .select('profile_id, trade_ids')
    .contains('trade_ids', [tradeId]);
  
  console.log('📊 Worker trades:', { count: workerTradesData?.length, error: workerTradesError });
  
  if (workerTradesData && workerTradesData.length > 0) {
    const workerIds = workerTradesData.map(wt => wt.profile_id);
    
    // 2. Get worker profiles with fixed query
    let workersQuery = supabase
      .from('profiles')
      .select('id, name, avatar_url, address, bio, rating, is_verified, is_online, phone')
      .in('id', workerIds)
      .eq('role', 'worker')
      .eq('is_verified', true)
      .or('rating.gte.4.0,rating.is.null') // Fixed rating filter
      .order('rating', { ascending: false })
      .limit(12);

    // Filter by city
    workersQuery = workersQuery.ilike('address', `%${cityName}%`);

    const { data: workersData, error: workersError } = await workersQuery;
    
    console.log('👤 Workers query result:', {
      count: workersData?.length || 0,
      error: workersError,
      workers: workersData?.map(w => ({
        name: w.name,
        address: w.address,
        rating: w.rating,
        is_verified: w.is_verified
      }))
    });
    
    if (workersData && workersData.length > 0) {
      // 3. Get subscriptions
      const { data: subscriptions } = await supabase
        .from('user_subscriptions')
        .select('user_id, plan_id, status')
        .in('user_id', workersData.map(w => w.id))
        .eq('status', 'active');
      
      console.log('💳 Subscriptions:', {
        count: subscriptions?.length || 0,
        data: subscriptions
      });
      
      // 4. Map subscriptions to workers
      const subscriptionMap = new Map(
        subscriptions?.map(sub => [sub.user_id, sub.plan_id]) || []
      );
      
      const workersWithSubs = workersData.map(worker => ({
        ...worker,
        subscription_plan: subscriptionMap.get(worker.id) || null
      }));
      
      // 5. Sort PRO users first
      workersWithSubs.sort((a, b) => {
        const aIsPro = a.subscription_plan === 'pro';
        const bIsPro = b.subscription_plan === 'pro';
        
        if (aIsPro && !bIsPro) return -1;
        if (!aIsPro && bIsPro) return 1;
        
        return (b.rating || 0) - (a.rating || 0);
      });
      
      console.log('🏆 Final sorted workers:', {
        count: workersWithSubs.length,
        proUsers: workersWithSubs.filter(w => w.subscription_plan === 'pro').length,
        workers: workersWithSubs.map(w => ({
          name: w.name,
          subscription: w.subscription_plan,
          rating: w.rating,
          isPro: w.subscription_plan === 'pro' ? '👑' : '👤'
        }))
      });
    }
  }
}

testFixedQuery().catch(console.error);