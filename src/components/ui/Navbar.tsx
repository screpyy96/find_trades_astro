import React, { useState, useRef, useEffect, memo, useCallback, useMemo } from 'react';

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

function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>, callback: () => void) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside, { passive: true });
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
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
    : `inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
        isActive 
          ? (onDark 
              ? 'text-white font-bold bg-white/10' 
              : 'text-amber-600 font-bold bg-amber-50') 
          : (onDark 
              ? 'text-white hover:text-white hover:bg-white/10' 
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
  isLoggedIn, 
  userType = 'client', 
  profile, 
  currentPath,
  onLogout,
  appUrl = '',
  webUrl = ''
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasTransparentHero, setHasTransparentHero] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const isTransparent = useMemo(() => hasTransparentHero && !isScrolled, [hasTransparentHero, isScrolled]);

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
  
  useOutsideAlerter(moreDropdownRef, () => setShowMoreDropdown(false));

  const handleMouseEnter = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    if (!isLoggingOut) {
      setShowMoreDropdown(true);
    }
  }, [isLoggingOut]);

  const handleMouseLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShowMoreDropdown(false);
    }, 200);
  }, []);

  const closeDropdown = useCallback(() => setShowMoreDropdown(false), []);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);
    if (onLogout) {
      onLogout();
    }
  };

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
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <a href={webUrl || '/'} className="flex-shrink-0 flex items-center gap-3 group">
              <img src="/logo.svg" alt="" className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" width="40" height="40" decoding="async" style={{ imageRendering: 'auto' }} />
              <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-slate-900'}`}>FindTrades</span>
            </a>
          </div>

          {/* Centered Navigation */}
          <div className="flex items-center gap-1">
            <NavLink href={webUrl || '/'} onDark={isTransparent} isActive={isPathActive('/')}>Home</NavLink>
            <NavLink href={`${webUrl}/services`} onDark={isTransparent} isActive={isPathActive('/services')}>Services</NavLink>
            <NavLink href={`${webUrl}/tradesmen/`} onDark={isTransparent} isActive={isPathActive('/tradesmen/')}>Find Tradesmen</NavLink>
            <NavLink href={`${appUrl}/request-quote`} onDark={isTransparent}>Request Quote</NavLink>
            <NavLink href={`${appUrl}/requests`} onDark={isTransparent} isActive={isPathActive('/requests')}>Requests</NavLink>
            <NavLink href={`${webUrl}/blog`} onDark={isTransparent} isActive={isPathActive('/blog')}>Blog</NavLink>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn && profile ? (
              <>
                {/* Avatar dropdown */}
                <div className="relative" ref={moreDropdownRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <button
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group ${
                      isTransparent 
                        ? 'bg-white/10 hover:bg-white/20 border border-white/20' 
                        : 'bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border border-slate-200/60'
                    }`}
                    disabled={isLoggingOut}
                  >
                    <div className={`h-8 w-8 rounded-full ring-2 transition-all duration-300 flex items-center justify-center ${
                      isTransparent 
                        ? 'ring-white/40 group-hover:ring-white/60' 
                        : 'ring-slate-200 group-hover:ring-slate-300'
                    } bg-gradient-to-br from-amber-500 to-orange-600 text-white font-semibold text-sm`}>
                      {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="text-left">
                      <span className={`text-sm font-semibold block transition-colors duration-300 ${
                        isTransparent 
                          ? 'text-white group-hover:text-white/90' 
                          : 'text-slate-700 group-hover:text-slate-900'
                      }`}>Profile</span>
                      <span className={`text-xs block transition-colors duration-300 ${
                        isTransparent 
                          ? 'text-white/70 group-hover:text-white/80' 
                          : 'text-slate-500 group-hover:text-slate-600'
                      }`}>
                        {userType === 'tradesman' ? 'Tradesman' : 'Client'}
                      </span>
                    </div>
                    <svg className={`w-4 h-4 transition-all duration-300 group-hover:rotate-180 ${
                      isTransparent 
                        ? 'text-white/60 group-hover:text-white/80' 
                        : 'text-slate-400 group-hover:text-slate-600'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`absolute right-0 mt-3 w-96 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 transition-all duration-300 ${
                    showMoreDropdown 
                      ? 'opacity-100 visible translate-y-0 scale-100' 
                      : 'opacity-0 invisible -translate-y-2 scale-95 pointer-events-none'
                  }`}>
                    {userType === 'tradesman' ? (
                      <>
                        <div className="px-5 py-3 border-b border-slate-100">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dashboard</p>
                        </div>
                        <a href={`${appUrl}/dashboard/overview`} onClick={closeDropdown} className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150">
                          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 text-base block">Overview</span>
                            <p className="text-xs text-slate-500 mt-0.5">Stats and activity</p>
                          </div>
                        </a>
                        <a href={`${appUrl}/dashboard/profile`} onClick={closeDropdown} className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150">
                          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 text-base block">Public Profile</span>
                            <p className="text-xs text-slate-500 mt-0.5">Info and portfolio</p>
                          </div>
                        </a>
                        <a href={`${appUrl}/dashboard/messages`} onClick={closeDropdown} className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150">
                          <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 text-base block">Messages</span>
                            <p className="text-xs text-slate-500 mt-0.5">Conversations with clients</p>
                          </div>
                        </a>
                        <a href={`${appUrl}/dashboard/sent-offers`} onClick={closeDropdown} className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150">
                          <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 text-base block">Sent Quotes</span>
                            <p className="text-xs text-slate-500 mt-0.5">Your quotes to clients</p>
                          </div>
                        </a>
                        <a href={`${appUrl}/dashboard/applications`} onClick={closeDropdown} className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150">
                          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 text-base block">Requests</span>
                            <p className="text-xs text-slate-500 mt-0.5">Work requests</p>
                          </div>
                        </a>
                        <a href={`${appUrl}/dashboard/contact-unlocks`} onClick={closeDropdown} className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150">
                          <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 text-base block">Unlocked Contacts</span>
                            <p className="text-xs text-slate-500 mt-0.5">Clients contacted</p>
                          </div>
                        </a>
                        <a href={`${appUrl}/dashboard/reviews`} onClick={closeDropdown} className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150">
                          <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 text-base block">Reviews</span>
                            <p className="text-xs text-slate-500 mt-0.5">Client feedback</p>
                          </div>
                        </a>
                        <a href={`${appUrl}/dashboard/subscription`} onClick={closeDropdown} className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150">
                          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 text-base block">Subscription</span>
                            <p className="text-xs text-slate-500 mt-0.5">Plan and credits</p>
                          </div>
                        </a>
                        <a href={`${appUrl}/dashboard/settings`} onClick={closeDropdown} className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150">
                          <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 text-base block">Account Settings</span>
                            <p className="text-xs text-slate-500 mt-0.5">Preferences and security</p>
                          </div>
                        </a>
                        <div className="border-t border-slate-100 my-1"></div>
                        <button 
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="flex items-center gap-3 w-full px-5 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors duration-150">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                          </div>
                          <div className="text-left flex-1">
                            <span className="font-semibold text-red-600 text-base block">Logout</span>
                            <p className="text-xs text-red-500 mt-0.5">Sign out of your account</p>
                          </div>
                        </button>
                      </>
                    ) : (
                      <>
                        <a href={`${appUrl}/client-dashboard/overview`} onClick={closeDropdown} className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150">
                          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 text-base block">Overview</span>
                            <p className="text-xs text-slate-500 mt-0.5">Client dashboard</p>
                          </div>
                        </a>
                        <a href={`${appUrl}/client-dashboard/requests`} onClick={closeDropdown} className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150">
                          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 text-base block">My Requests</span>
                            <p className="text-xs text-slate-500 mt-0.5">Active requests</p>
                          </div>
                        </a>
                        <a href={`${appUrl}/client-dashboard/messages`} onClick={closeDropdown} className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150">
                          <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 text-base block">Messages</span>
                            <p className="text-xs text-slate-500 mt-0.5">Conversations with tradesmen</p>
                          </div>
                        </a>
                        <a href={`${appUrl}/client-dashboard/offers`} onClick={closeDropdown} className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150">
                          <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 text-base block">Received Quotes</span>
                            <p className="text-xs text-slate-500 mt-0.5">Quotes from tradesmen</p>
                          </div>
                        </a>
                        <a href={`${appUrl}/client-dashboard/reviews-de-lasat`} onClick={closeDropdown} className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150">
                          <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 text-base block">Reviews de lăsat</span>
                            <p className="text-xs text-slate-500 mt-0.5">Feedback for tradesmen</p>
                          </div>
                        </a>
                        <a href={`${appUrl}/client-dashboard/profile`} onClick={closeDropdown} className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150">
                          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 text-base block">Profile</span>
                            <p className="text-xs text-slate-500 mt-0.5">Account Settings</p>
                          </div>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <NavLink href={`${appUrl}/login`} onDark={isTransparent} isActive={isPathActive('/login')}>Login</NavLink>
                <NavLink href={`${appUrl}/register?type=tradesman`} isOutline onDark={isTransparent}>
                  Are you a tradesman?
                </NavLink>
                <NavLink href={`${appUrl}/request-quote`} isPrimary>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Get a Quote
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
