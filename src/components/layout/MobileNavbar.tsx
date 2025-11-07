import { useState } from 'react';
import { Home, Search, Menu, X, PlusCircle, LogIn, Briefcase, FileText, Info, Mail, BookOpen } from 'lucide-react';

interface MobileNavbarProps {
  currentPath: string;
  appUrl?: string;
  webUrl?: string;
}

export function MobileNavbar({ currentPath, appUrl = '', webUrl = '' }: MobileNavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'client' | 'tradesman'>('client');

  const isPathActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const closeDrawer = () => setDrawerOpen(false);

  // Check for session on mount
  useState(() => {
    if (typeof window === 'undefined') return;
    
    const isAstroSite = !window.location.hostname.includes('app.');
    
    if (isAstroSite && appUrl) {
      fetch(`${appUrl}/api/session-check`, {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => {
          if (data.isLoggedIn) {
            setIsLoggedIn(true);
            setUserType(data.userType || 'client');
          }
        })
        .catch(() => {
          // Silently fail
        });
    }
    
    setDrawerOpen(false);
  });

  const navActions = [
    { icon: <Home className="w-6 h-6" />, label: 'Acasă', href: webUrl || '/', id: 'home' },
    { icon: <Search className="w-6 h-6" />, label: 'Meșeriași', href: `${webUrl}/meseriasi`, id: 'search' },
    { icon: <PlusCircle className="w-6 h-6" />, label: 'Cere ofertă', href: `${appUrl}/cere-oferta`, id: 'new-job' },
    { 
      icon: <LogIn className="w-6 h-6" />, 
      label: isLoggedIn ? 'Dashboard' : 'Cont', 
      href: isLoggedIn 
        ? (userType === 'tradesman' ? `${appUrl}/dashboard/overview` : `${appUrl}/client-dashboard/overview`)
        : `${appUrl}/login`, 
      id: 'login' 
    },
    { 
      icon: drawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />, 
      label: drawerOpen ? 'Închide' : 'Meniu', 
      onClick: () => setDrawerOpen(!drawerOpen), 
      id: 'menu' 
    },
  ];

  const publicLinks = [
    { icon: <Search className="w-5 h-5" />, label: 'Meșeriași', href: `${webUrl}/meseriasi` },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Solicitări', href: `${webUrl}/solicitari` },
    { icon: <FileText className="w-5 h-5" />, label: 'Servicii', href: `${webUrl}/servicii` },
  ];

  const informationalLinks = [
    { icon: <Info className="w-5 h-5" />, label: 'Despre Noi', href: `${webUrl}/despre` },
    { icon: <Mail className="w-5 h-5" />, label: 'Contact', href: `${webUrl}/contact` },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Blog', href: `${webUrl}/blog` },
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed left-0 bottom-0 w-full h-20 bg-white border-t border-slate-200 shadow-2xl z-50 block lg:hidden">
        <div className="grid grid-cols-5 h-full relative z-10">
          {navActions.map((action) => {
            if (action.onClick) {
              return (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  className="flex flex-col items-center justify-center h-full w-full relative active:scale-95 transition-transform"
                  aria-label={action.label}
                >
                  <div className="text-slate-700">{action.icon}</div>
                  <span className="text-[10px] mt-1.5 font-medium text-slate-600">{action.label}</span>
                </button>
              );
            }
            
            const isActive = isPathActive(action.href!);
            return (
              <a
                key={action.id}
                href={action.href}
                className={`flex flex-col items-center justify-center h-full w-full relative ${
                  isActive ? 'text-blue-600' : 'text-slate-700'
                }`}
                aria-label={action.label}
              >
                <div>{action.icon}</div>
                <span className="text-[10px] mt-1.5 font-medium">{action.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                )}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Overlay */}
      {drawerOpen && (
        <button
          className="fixed inset-0 bg-black/30 z-[51] transition-opacity duration-300 lg:hidden"
          onClick={closeDrawer}
          aria-label="Close menu"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200/50 rounded-t-3xl z-[52] transition-all duration-300 ease-out lg:hidden shadow-2xl ${
          drawerOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{ maxHeight: '85vh' }}
        role="dialog"
        aria-modal="true"
      >
        {/* Drag Handle */}
        <div className="p-4 cursor-pointer" onClick={closeDrawer}>
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto" />
        </div>
        
        {/* Drawer Content */}
        <div className="px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 60px)' }}>
          {/* Auth Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {isLoggedIn ? (
              <>
                <a 
                  href={userType === 'tradesman' ? `${appUrl}/dashboard/overview` : `${appUrl}/client-dashboard/overview`}
                  onClick={closeDrawer} 
                  className="text-center font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-xl p-3.5 transition-all shadow-md"
                >
                  Dashboard
                </a>
                <a 
                  href={`${appUrl}/cere-oferta`}
                  onClick={closeDrawer} 
                  className="text-center font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 rounded-xl p-3.5 transition-all shadow-md"
                >
                  Cere Ofertă
                </a>
              </>
            ) : (
              <>
                <a 
                  href={`${appUrl}/login`}
                  onClick={closeDrawer} 
                  className="text-center font-bold bg-white text-slate-900 hover:bg-slate-50 rounded-xl p-3.5 transition-all border border-slate-200 shadow-sm"
                >
                  Autentificare
                </a>
                <a 
                  href={`${appUrl}/cere-oferta`}
                  onClick={closeDrawer} 
                  className="text-center font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-xl p-3.5 transition-all shadow-md"
                >
                  Cere Ofertă
                </a>
              </>
            )}
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent my-3" />
          
          {/* Public Links */}
          <div className="space-y-1">
            {publicLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeDrawer}
                className="flex items-center p-3.5 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
              >
                <div className="mr-3 text-slate-600">{link.icon}</div>
                <span className="font-semibold text-sm">{link.label}</span>
              </a>
            ))}
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent my-3" />
          
          {/* Informational Links */}
          <div className="space-y-1">
            {informationalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeDrawer}
                className="flex items-center p-3.5 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
              >
                <div className="mr-3 text-slate-600">{link.icon}</div>
                <span className="font-semibold text-sm">{link.label}</span>
              </a>
            ))}
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent my-3" />
          
          {/* Registration Link */}
          <a
            href={`${appUrl}/register?role=worker`}
            onClick={closeDrawer}
            className="flex items-center p-3.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all font-semibold"
          >
            <div className="mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <span className="text-sm">Înregistrare Meseriaș</span>
          </a>
        </div>
      </div>
    </>
  );
}
