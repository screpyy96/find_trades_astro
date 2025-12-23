// Component reutilizabil pentru badge-urile de download ale aplicației mobile
interface AppDownloadBadgesProps {
  variant?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  showTitle?: boolean;
  className?: string;
}

export function AppDownloadBadges({ 
  variant = 'horizontal', 
  size = 'md',
  showTitle = false,
  className = '' 
}: AppDownloadBadgesProps) {
  const googlePlayUrl = 'https://play.google.com/store/apps/details?id=com.screpyy.meserias';
  const appStoreUrl = 'https://apps.apple.com/gb/app/meserias-local/id6755662662';
  
  const sizeClasses = {
    sm: 'h-10',
    md: 'h-12',
    lg: 'h-14'
  };

  const containerClasses = variant === 'horizontal' 
    ? 'flex flex-wrap items-center gap-3' 
    : 'flex flex-col items-start gap-3';

  return (
    <div className={`${className}`}>
      {showTitle && (
        <div className="text-sm font-semibold text-foreground mb-2">
          Descarcă aplicația
        </div>
      )}
      <div className={containerClasses}>
        {/* Google Play Badge */}
        <a
          href={googlePlayUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block transition-transform hover:scale-105 active:scale-95"
          aria-label="Descarcă din Google Play"
        >
          <img
            src="/images/google-play-badge.svg"
            alt="Disponibil pe Google Play"
            className={`${sizeClasses[size]} w-auto`}
            loading="lazy"
          />
        </a>

        {/* App Store Badge */}
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block transition-transform hover:scale-105 active:scale-95"
          aria-label="Descarcă din App Store"
        >
          <img
            src="/images/app-store-badge.svg"
            alt="Disponibil pe App Store"
            className={`${sizeClasses[size]} w-auto`}
            loading="lazy"
          />
        </a>
      </div>
    </div>
  );
}
