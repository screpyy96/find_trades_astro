export function TradesmanCardSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/40 to-transparent animate-shimmer"></div>

      {/* Image Skeleton */}
      <div className="relative w-full aspect-square bg-slate-100 animate-pulse"></div>

      {/* Content Skeleton */}
      <div className="p-2">
        {/* Name */}
        <div className="h-4 bg-slate-100 rounded animate-pulse w-3/4 mb-1"></div>
        
        {/* Address */}
        <div className="flex items-center gap-0.5 mb-1">
          <div className="w-3 h-3 bg-slate-100 rounded animate-pulse"></div>
          <div className="h-3 bg-slate-100 rounded animate-pulse w-2/3"></div>
        </div>

        {/* Bio */}
        <div className="space-y-1 mb-1">
          <div className="h-3 bg-slate-100 rounded animate-pulse w-full"></div>
          <div className="h-3 bg-slate-100 rounded animate-pulse w-4/5"></div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-0.5">
          <div className="w-3 h-3 bg-slate-100 rounded animate-pulse"></div>
          <div className="h-3 bg-slate-100 rounded animate-pulse w-8"></div>
        </div>
      </div>
    </div>
  );
}
