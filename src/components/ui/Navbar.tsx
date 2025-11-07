import React, { useState, useEffect, memo, useMemo } from 'react';

type NavbarProfile = {
  name: string | null;
  avatar_url: string | null;
  role: string | null;
};

interface NavbarProps {
  isLoggedIn: boolean;
  userType?: 'client' | 'tradesman';
  profile?: NavbarProfile | null;
  currentPath: string;
  onLogout?: () => void;
  // URL configuration for cross-app navigation
  appUrl?: string; // URL for the Remix app
  webUrl?: string; // URL for the Astro site
}

const NavLink = memo(({ 
  href, 
  children, 
  isPrimary = false, 
  isOutline = false, 
  onClick, 
  onDark = false, 
  isActive = false,
  isExternal = false
}: { 
  href: string; 
  children: React.ReactNode; 
  isPrimary?: boolean; 
  isOutline?: boolean; 
  onClick?: () => void; 
  onDark?: boolean; 
  isActive?: boolean;
  isExternal?: boolean;
}) => {
  const className = isPrimary
    ? "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 hover:shadow-lg hover:shadow-amber-500/25 transform hover:scale-105"
    : isOutline
    ? `inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 border ${
        onDark 
          ? 'border-white/60 text-white hover:bg-white/10 hover:border-white/80' 
          : 'border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
      } transform hover:scale-105`
    : `inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
        isActive 
          ? (onDark 
              ? 'text-white font-bold bg-white/10' 
              : 'text-amber-600 font-bold bg-amber-50') 
          : (onDark 
              ? 'text-white/90 hover:text-white hover:bg-white/10' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50')
      }`;

  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
});
NavLink.displayName = 'NavLink';

export function Navbar({ 
  isLoggedIn: initialIsLoggedIn, 
  userType: initialUserType = 'client', 
  profile: initialProfile, 
  currentPath,
  onLogout,
  appUrl = '',
  webUrl = ''
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasTransparentHero, setHasTransparentHero] = useState(false);
  
  // Client-side session check for Astro
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [userType, setUserType] = useState(initialUserType);
  const [profile, setProfile] = useState(initialProfile);
  
  const isTransparent = useMemo(() => hasTransparentHero && !isScrolled, [hasTransparentHero, isScrolled]);

  // Check for session on mount (only on Astro site)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Only check session if we're on the Astro site (not on Remix app)
    const isAstroSite = !window.location.hostname.includes('app.');
    
    if (isAstroSite && appUrl) {
      // Check if user has a session by calling the Remix app
      fetch(`${appUrl}/api/session-check`, {
        credentials: 'include', // Important: include cookies
      })
        .then(res => res.json())
        .then(data => {
          if (data.isLoggedIn) {
            setIsLoggedIn(true);
            setUserType(data.userType || 'client');
            setProfile(data.profile || null);
          }
        })
        .catch(() => {
          // Silently fail - user is not logged in
        });
    }
  }, [appUrl]);

  // Combined scroll and hero detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const heroElement = document.querySelector('[data-navbar-transparent="true"]') as HTMLElement | null;
    
    let ticking = false;
    const checkNavbarState = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 20);
          
          if (heroElement) {
            const rect = heroElement.getBoundingClientRect();
            setHasTransparentHero(rect.top <= 20 && rect.bottom > 20);
          } else {
            setHasTransparentHero(false);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    checkNavbarState();
    window.addEventListener('scroll', checkNavbarState, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkNavbarState);
    };
  }, [currentPath]);

  // Helper to check if path is active
  const isPathActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className={`hidden lg:block fixed top-0 left-0 right-0 w-full z-[60] transition-all duration-300 ${
      isTransparent ? 'bg-transparent border-transparent' : 'bg-white/95 backdrop-blur-md border-b border-slate-200'
    } ${isScrolled && !isTransparent ? 'shadow-lg shadow-slate-200/50' : ''}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <a href={webUrl || '/'} className="flex-shrink-0 flex items-center gap-3 group mr-12">
              <img src="/logo.svg" alt="" className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" width="40" height="40" decoding="async" style={{ imageRendering: 'auto' }} />
              <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-slate-900'}`}>Meserias Local</span>
            </a>
          </div>

          {/* Centered Navigation */}
          <div className="flex items-center gap-2">
            <NavLink href={webUrl || '/'} onDark={isTransparent} isActive={isPathActive('/')}>Acasă</NavLink>
            <NavLink href={`${webUrl}/servicii`} onDark={isTransparent} isActive={isPathActive('/servicii')}>Servicii</NavLink>
            <NavLink href={`${webUrl}/meseriasi`} onDark={isTransparent} isActive={isPathActive('/meseriasi')}>Caută meșeriași</NavLink>
            <NavLink href={`${webUrl}/solicitari`} onDark={isTransparent} isActive={isPathActive('/solicitari')}>Solicitări</NavLink>
            <NavLink href={`${webUrl}/blog`} onDark={isTransparent} isActive={isPathActive('/blog')}>Blog</NavLink>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <NavLink 
                  href={userType === 'tradesman' ? `${appUrl}/dashboard/overview` : `${appUrl}/client-dashboard/overview`} 
                  onDark={isTransparent}
                >
                  Contul meu
                </NavLink>
                <NavLink href={`${appUrl}/cere-oferta`} isPrimary>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Cere ofertă
                  </span>
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <NavLink href={`${appUrl}/login`} onDark={isTransparent} isActive={isPathActive('/login')}>Intră în cont</NavLink>
                <NavLink href={`${appUrl}/register?type=tradesman`} isOutline onDark={isTransparent}>
                  Ești meseriaș?
                </NavLink>
                <NavLink href={`${appUrl}/cere-oferta`} isPrimary>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Cere ofertă
                  </span>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
