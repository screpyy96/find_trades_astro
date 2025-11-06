export function TradesmanCardSkeleton() {
  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200/60 shadow-lg overflow-hidden animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 pointer-events-none" />

      <div className="relative z-10 p-7">
        {/* Header Section */}
        <div className="flex items-start gap-5 mb-6">
          {/* Avatar Skeleton */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-slate-200"></div>
          </div>
          
          {/* Name and Badges Skeleton */}
          <div className="flex-1 min-w-0">
            <div className="mb-3">
              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-slate-200 rounded w-24"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-slate-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Location Skeleton */}
        <div className="flex items-center gap-2 mb-5">
          <div className="h-10 bg-slate-200 rounded-xl w-48"></div>
        </div>
        
        {/* Bio Skeleton */}
        <div className="mb-6 p-4 bg-slate-100 rounded-2xl">
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 rounded w-4/6"></div>
          </div>
        </div>
        
        {/* Trades Skeleton */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <div className="h-8 bg-slate-200 rounded-full w-24"></div>
            <div className="h-8 bg-slate-200 rounded-full w-32"></div>
            <div className="h-8 bg-slate-200 rounded-full w-28"></div>
          </div>
        </div>
        
        {/* Action Buttons Skeleton */}
        <div className="flex flex-col gap-3 mt-6">
          <div className="h-12 bg-slate-200 rounded-2xl w-full"></div>
          <div className="h-12 bg-slate-200 rounded-2xl w-full"></div>
        </div>
      </div>
    </div>
  );
}
