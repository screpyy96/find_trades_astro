import React, { useState, useEffect } from 'react';
import { Star, MapPin, Phone, Mail, Award, CheckCircle, Eye, Camera, Grid3X3, List, TrendingUp, Trophy, BarChart3, Crown, ExternalLink, Badge, X, CalendarDays, Shield, Zap, Clock, Users, MessageCircle, Share2, AlertTriangle, Flag, Send, Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale/ro';
import { createClient } from '@supabase/supabase-js';

interface WorkerProfile {
  id: string;
  name: string;
  email?: string;
  avatar_url?: string | null;
  address?: string | null;
  bio?: string | null;
  rating: number;
  is_verified?: boolean;
  is_online?: boolean;
  phone?: string | null;
  coordinates?: { lat: number; lng: number } | null;
  [key: string]: any;
}

interface SupabaseBrowserConfig {
  url?: string;
  anonKey?: string;
}

const getSupabaseBrowserClient = (config?: SupabaseBrowserConfig) => {
  const url = config?.url || import.meta.env.PUBLIC_SUPABASE_URL;
  const key = config?.anonKey || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    console.warn('Supabase credentials not configured');
    return null;
  }
  
  return createClient(url, key);
};

// --- Report Profile Modal Component ---
function ReportModal({ worker, onClose }: { worker: WorkerProfile; onClose: () => void }) {
  const [complaintType, setComplaintType] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const complaintTypes = [
    { value: 'fake_profile', label: 'Profil fals sau înșelător' },
    { value: 'inappropriate_content', label: 'Conținut nepotrivit' },
    { value: 'spam', label: 'Spam sau publicitate' },
    { value: 'harassment', label: 'Hărțuire sau comportament abuziv' },
    { value: 'fraud', label: 'Fraudă sau înșelăciune' },
    { value: 'other', label: 'Altele' }
  ];

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintType || !details.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/report-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: worker.id,
          complaintType,
          details: details.trim(),
          reference: `profile:${worker.id}`
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        console.error('Failed to submit report');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!worker) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {isSubmitted ? (
          <div className="p-6 sm:p-8 text-center">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 inline-block mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Raport trimis!</h3>
            <p className="text-slate-600">Mulțumim pentru raport. Vom investiga în cel mai scurt timp.</p>
          </div>
        ) : (
          <>
            <div className="p-4 sm:p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500">
                    <Flag className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Raportează Profil</h3>
                    <p className="text-slate-600 text-sm">Ajută-ne să menținem comunitatea sigură</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-3">Motivul raportului</label>
                <div className="space-y-2">
                  {complaintTypes.map((type) => (
                    <label key={type.value} className="flex items-center gap-3 p-2 sm:p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="complaintType"
                        value={type.value}
                        checked={complaintType === type.value}
                        onChange={(e) => setComplaintType(e.target.value)}
                        className="w-4 h-4 text-red-600 border-slate-300 focus:ring-red-500"
                      />
                      <span className="text-slate-700 font-medium">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="details" className="block text-sm font-bold text-slate-900 mb-2">
                  Detalii suplimentare
                </label>
                <textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Descrie problema în detaliu..."
                  rows={4}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
                >
                  Anulează
                </button>
                <button
                  type="submit"
                  disabled={!complaintType || !details.trim() || isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Trimite...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Trimite Raport
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// --- Portfolio Modal Component ---
function PortfolioModal({ item, onClose }: { item: any; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {item.images && item.images.length > 0 ? (
          <div className="relative flex-shrink-0">
            <img src={item.images[0]} alt={item.title} className="w-full h-80 object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <span className="text-white font-medium text-sm">{item.category}</span>
              </div>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 p-3 rounded-2xl text-white bg-black/50 hover:bg-black/70 transition-all backdrop-blur-sm">
              <X className="w-6 h-6" />
            </button>
          </div>
        ) : (
          <div className="p-6 flex justify-between items-center border-b border-slate-200 flex-shrink-0">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
              <span className="text-slate-600">{item.category}</span>
            </div>
            <button onClick={onClose} className="p-3 rounded-2xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        <div className="p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
          <div className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-6 mb-8 border border-slate-200">
            <h4 className="text-lg font-bold text-slate-900 mb-3">Descrierea Proiectului</h4>
            <p className="text-slate-700 leading-relaxed text-lg">{item.description}</p>
          </div>

          {item.images && item.images.length > 1 && (
            <div className="mb-8">
              <h4 className="text-lg font-bold text-slate-900 mb-4">Galerie Foto</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {item.images.slice(1, 7).map((img: string, idx: number) => (
                  <div key={idx} className="relative group overflow-hidden rounded-2xl">
                    <img src={img} alt={`${item.title} ${idx + 2}`} className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-slate-900">Detalii Proiect</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-200">
                <span className="text-blue-600 font-medium text-sm">Categorie</span>
                <p className="font-bold text-blue-900">{item.category}</p>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-200">
                <span className="text-emerald-600 font-medium text-sm">Client</span>
                <p className="font-bold text-emerald-900">{item.client_name || 'Confidențial'}</p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-200">
                <span className="text-purple-600 font-medium text-sm">Locație</span>
                <p className="font-bold text-purple-900">{item.location || 'N/A'}</p>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200">
                <span className="text-amber-600 font-medium text-sm">Data Finalizării</span>
                <p className="font-bold text-amber-900">{item.completion_date ? format(new Date(item.completion_date), 'dd MMM yyyy', { locale: ro }) : 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


interface TradesmanProfileProps {
  worker: WorkerProfile;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

export function TradesmanProfile({ worker, supabaseUrl, supabaseAnonKey }: TradesmanProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews' | 'certifications'>('overview');
  const [isContactRevealed, setIsContactRevealed] = useState(false);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<any | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  // Handle share functionality
  const handleShare = async () => {
    const shareData = {
      title: `${worker.name} - Meseriaș Verificat`,
      text: `Descoperă profilul lui ${worker.name} pe Meserias Local`,
      url: window.location.href
    };

    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiat în clipboard!');
      }
    } catch (error) {
      // User cancelled or error occurred
      console.log('Share cancelled or failed:', error);
    }
  };

  // Generate Schema.org structured data for rich snippets with proper capitalization
  const workerTrades = (worker as any).trades || [];
  const tradeNames = workerTrades.map((trade: any) =>
    trade.name.split(' ').map((word: string) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ')
  ).join(', ');
  const primaryTrade = workerTrades[0]?.name ?
    workerTrades[0].name.split(' ').map((word: string) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ') : 'Servicii Profesionale';
  const location = worker.address ?
    worker.address.split(' ').map((word: string) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ') : '';
  const rating = worker.rating || 0;
  const totalJobs = (worker as any).total_jobs || 0;

  // Capitalize worker name properly
  const capitalizedWorkerName = worker.name ?
    worker.name.split(' ').map((word: string) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ') : 'Meseriaș';

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": capitalizedWorkerName,
    "jobTitle": primaryTrade,
    "description": worker.bio || `Specialist în ${tradeNames}`,
    "url": `https://www.meseriaslocal.ro/meseriasi/${worker.id}`,
    "image": worker.avatar_url,
    "telephone": worker.phone,
    "address": worker.address ? {
      "@type": "PostalAddress",
      "addressLocality": location,
      "addressCountry": "RO"
    } : undefined,
    "geo": worker.coordinates ? {
      "@type": "GeoCoordinates",
      "latitude": worker.coordinates.lat,
      "longitude": worker.coordinates.lng
    } : undefined,
    "aggregateRating": rating > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "ratingCount": totalJobs,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "hasOccupation": {
      "@type": "Occupation",
      "name": primaryTrade,
      "occupationLocation": {
        "@type": "City",
        "name": location || "România"
      }
    },
    "knowsAbout": workerTrades.map((trade: any) =>
      trade.name.split(' ').map((word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ')
    ),
    "worksFor": {
      "@type": "Organization",
      "name": "Meserias Local",
      "url": "https://www.meseriaslocal.ro"
    }
  };

  const trades = (worker as any).trades || [];
  const portfolioItems = (worker as any).portfolio_items || [];
  const reviews = (worker as any).reviews || [];
  const certifications = (worker as any).certifications || [];

  // Debug: log trades data
  console.log('Trades data:', trades);
  console.log('Worker trades:', (worker as any).trades);

  // Calculate average rating from reviews
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0) / reviews.length
    : 0;

  const stats = {
    totalJobs: (worker as any).totalJobs || (worker as any).total_jobs || 0,
    completedJobs: (worker as any).completedJobs || (worker as any).completed_jobs || 0,
    rating: (worker as any).rating || averageRating,
    reviewCount: reviews.length,
    profileViews: (worker as any).profileViews || (worker as any).profile_views || 0,
    phoneReveals: (worker as any).phoneReveals || (worker as any).phone_reveals || 0,
    responseRate: (worker as any).responseRate || (worker as any).response_rate || 95
  };

  // Determine if current user owns this profile (for better empty states)
  useEffect(() => {
    try {
      const supabase = getSupabaseBrowserClient({ url: supabaseUrl, anonKey: supabaseAnonKey });
      if (!supabase) {
        setIsOwner(false);
        return;
      }
      supabase.auth.getUser().then(({ data }) => {
        const uid = data?.user?.id;
        setIsOwner(Boolean(uid && uid === worker.id));
      }).catch(() => setIsOwner(false));
    } catch {
      setIsOwner(false);
    }
  }, [worker.id, supabaseUrl, supabaseAnonKey]);

  const handleContactReveal = async () => {
    try {
      console.log('Attempting to track phone reveal for worker:', worker.id);
      const response = await fetch('/api/track-phone-reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: worker.id })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Phone reveal tracking failed:', errorData);
      } else {
        console.log('Phone reveal tracked successfully');
      }

      setIsContactRevealed(true);
      // Save to session storage
      sessionStorage.setItem(`contact_revealed_${worker.id}`, 'true');
    } catch (error) {
      console.error('Error tracking phone reveal:', error);
      // Still reveal contact even if tracking fails
      setIsContactRevealed(true);
      sessionStorage.setItem(`contact_revealed_${worker.id}`, 'true');
    }
  };

  // Client-side tracking as backup
  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch('/api/track-profile-view', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profileId: worker.id })
        });
      } catch (error) {
        console.log('Client-side tracking failed:', error);
      }
    };

    // Track after a short delay to avoid double counting
    const timer = setTimeout(trackView, 1000);
    return () => clearTimeout(timer);
  }, [worker.id]);

  // Reset contact reveal on page load (session-based)
  useEffect(() => {
    const sessionKey = `contact_revealed_${worker.id}`;
    const wasRevealed = sessionStorage.getItem(sessionKey);
    if (wasRevealed === 'true') {
      setIsContactRevealed(true);
    }

    // Clean up on unmount
    return () => {
      if (isContactRevealed) {
        sessionStorage.setItem(sessionKey, 'true');
      }
    };
  }, [worker.id, isContactRevealed]);

  return (
    <>
      {/* Schema.org structured data for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData)
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 lg:pt-20">
        {/* Premium Hero Section with Enhanced Background */}
        <div className="relative overflow-hidden">
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04),transparent_70%)] pointer-events-none" />

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-xl animate-pulse delay-1000" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            {/* Premium Header Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 p-4 sm:p-8 mb-4 sm:mb-6 shadow-xl shadow-slate-900/5 relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-slate-50/30 pointer-events-none" />
              {/* Mobile compact layout */}
              <div className="flex sm:hidden items-start gap-4 mb-6 relative z-10">
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30"></div>
                  {worker.avatar_url ? (
                    <img
                      src={worker.avatar_url}
                      alt={worker.name}
                      loading="eager"
                      className="relative w-20 h-20 rounded-2xl object-cover ring-2 ring-white shadow-lg"
                    />
                  ) : (
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-white shadow-lg">
                      <span className="text-white font-bold text-2xl">
                        {(worker.name || 'M').charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {worker.is_verified && (
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center ring-2 ring-white">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent truncate">{worker.name}</h1>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                  
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm">
                      <Shield className="w-3 h-3 text-white" />
                      <span className="text-xs font-bold">Verificat</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span className="truncate">{worker.address}</span>
                    </div>
                    {stats.rating > 0 && stats.reviewCount > 0 && (
                      <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 text-amber-500 fill-current" />
                        <span className="text-amber-600 font-semibold">{stats.rating.toFixed(1)}</span>
                        <span className="text-slate-500">({stats.reviewCount})</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop layout */}
              <div className="hidden sm:flex flex-col lg:flex-row items-start gap-8 relative z-10">
                {/* Avatar and Basic Info */}
                <div className="flex items-start gap-8">
                  <div className="relative group">
                    {/* Animated gradient ring */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-3xl blur opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
                    {worker.avatar_url ? (
                      <img
                        src={worker.avatar_url}
                        alt={worker.name}
                        loading="eager"
                        className="relative w-32 h-32 rounded-3xl object-cover ring-4 ring-white shadow-2xl"
                      />
                    ) : (
                      <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-4 ring-white shadow-2xl">
                        <span className="text-white font-bold text-4xl">
                          {(worker.name || 'M').charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    {worker.is_verified && (
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center ring-4 ring-white shadow-lg">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">{worker.name}</h1>
                      <div className="flex items-center gap-2">
                       
                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
                          <Shield className="w-4 h-4 text-white" />
                          <span className="text-sm font-bold">Verificat</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-slate-700 mb-6">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                        <MapPin className="w-4 h-4 text-slate-600" />
                        <span className="font-medium">{worker.address}</span>
                      </div>
                      {stats.rating > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
                          <Star className="w-4 h-4 text-amber-500 fill-current" />
                          <span className="font-bold text-amber-700">{stats.rating.toFixed(1)}</span>
                          <span className="text-amber-600 font-medium">({stats.reviewCount} recenzii)</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span className="font-medium text-emerald-700">{stats.responseRate}% răspuns</span>
                      </div>
                    </div>

                    {/* Premium Trades Display */}
                    {trades.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {trades.slice(0, 4).map((trade: any, index: number) => {
                          const gradients = [
                            'from-blue-500 to-cyan-500',
                            'from-purple-500 to-pink-500',
                            'from-emerald-500 to-teal-500',
                            'from-orange-500 to-red-500'
                          ];
                          return (
                            <span key={index} className={`inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r ${gradients[index % gradients.length]} text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow`}>
                              <Zap className="w-3 h-3 mr-1.5" />
                              {trade.name}
                            </span>
                          );
                        })}
                        {trades.length > 4 && (
                          <span className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 text-white text-sm font-semibold shadow-lg">
                            +{trades.length - 4} mai multe
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Premium Contact & Actions */}
                <div className="flex flex-col gap-4 lg:ml-auto min-w-[280px] w-full lg:w-auto">
                  {/* Primary Actions */}
                  <div className="space-y-3">
                    {worker.phone && (
                      <button
                        onClick={handleContactReveal}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                      >
                        <Phone className="w-5 h-5 text-white group-hover:animate-pulse" />
                        <span className="font-bold text-lg">
                          {isContactRevealed ? worker.phone : 'Afișează numărul'}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Secondary Actions */}
                  <div className="flex gap-2">
                    <button 
                      onClick={handleShare}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all group"
                    >
                      <Share2 className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
                      <span className="font-medium">Distribuie</span>
                    </button>
                    <button
                      onClick={() => setIsReportModalOpen(true)}
                      className="flex items-center justify-center px-3 py-3 rounded-xl bg-white border-2 border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-600 transition-all"
                      title="Raportează profil"
                    >
                      <Flag className="w-4 h-4" />
                    </button>
                  </div>

                  
                </div>
              </div>

              {/* Mobile Trades */}
              {trades.length > 0 && (
                <div className="sm:hidden flex flex-wrap gap-1.5 mb-4">
                  {trades.slice(0, 4).map((trade: any, index: number) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600">
                      {trade.name}
                    </span>
                  ))}
                  {trades.length > 4 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600">
                      +{trades.length - 4}
                    </span>
                  )}
                </div>
              )}

              {/* Mobile Premium Contact Buttons */}
              <div className="sm:hidden space-y-3">
                <div className="flex gap-3">
                  {worker.phone && (
                    <button
                      onClick={handleContactReveal}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg transition-all duration-300 shadow-md"
                    >
                      <Phone className="w-4 h-4 text-white" />
                      <span className="font-bold text-sm">
                        {isContactRevealed ? worker.phone : 'Apelează'}
                      </span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="flex items-center justify-center p-2.5 rounded-xl bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200 hover:text-slate-600 transition-all duration-200"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 transition-all"
                  >
                    <Share2 className="w-3 h-3" />
                    <span className="font-medium text-xs">Distribuie</span>
                  </button>
                </div>
              </div>
            </div>

            
            {/* Premium Tabs */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-900/5 overflow-hidden">
              {/* Mobile Premium Tab Navigation */}
              <div className="flex sm:hidden overflow-x-auto gap-2 p-3 border-b border-slate-200/60 scrollbar-hide bg-gradient-to-r from-slate-50/50 to-white/50">
                {[
                  { id: 'overview', label: 'Info', icon: BarChart3, gradient: 'from-blue-500 to-cyan-500' },
                  { id: 'portfolio', label: 'Portofoliu', icon: Grid3X3, gradient: 'from-purple-500 to-pink-500' },
                  { id: 'reviews', label: 'Recenzii', icon: Star, gradient: 'from-amber-500 to-orange-500' },
                  { id: 'certifications', label: 'Certificări', icon: Award, gradient: 'from-emerald-500 to-teal-500' }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as 'overview' | 'portfolio' | 'reviews' | 'certifications')}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition-all duration-300 whitespace-nowrap text-sm shadow-lg ${activeTab === tab.id
                          ? `bg-gradient-to-r ${tab.gradient} text-white shadow-xl scale-105`
                          : 'bg-white text-slate-700 hover:bg-slate-50 hover:shadow-md border border-slate-200'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Desktop Premium Tab Navigation */}
              <div className="hidden sm:flex overflow-x-auto gap-3 p-4 border-b border-slate-200/60 scrollbar-hide bg-gradient-to-r from-slate-50/50 to-white/50">
                {[
                  { id: 'overview', label: 'Prezentare Generală', icon: BarChart3, gradient: 'from-blue-500 to-cyan-500' },
                  { id: 'portfolio', label: 'Portofoliu', icon: Grid3X3, gradient: 'from-purple-500 to-pink-500' },
                  { id: 'reviews', label: 'Recenzii', icon: Star, gradient: 'from-amber-500 to-orange-500' },
                  { id: 'certifications', label: 'Certificări', icon: Award, gradient: 'from-emerald-500 to-teal-500' }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as 'overview' | 'portfolio' | 'reviews' | 'certifications')}
                      className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 whitespace-nowrap shadow-lg ${activeTab === tab.id
                          ? `bg-gradient-to-r ${tab.gradient} text-white shadow-xl scale-105`
                          : 'bg-white text-slate-700 hover:bg-slate-50 hover:shadow-xl border border-slate-200'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Premium Tab Content */}
              <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-slate-50/30">
                {activeTab === 'overview' && (
                  <div className="space-y-4 sm:space-y-8">

                    {worker.bio ? (
                      <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-lg">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0">
                            <Users className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">Prezentare Personală</h4>
                            <p className="text-slate-800 leading-relaxed text-sm sm:text-lg">{worker.bio}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-lg text-center">
                        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-400 to-slate-500 inline-block mb-3 sm:mb-4">
                          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <p className="text-slate-600 italic text-sm sm:text-lg">Acest meseriaș nu a adăugat încă o descriere personală.</p>
                      </div>
                    )}

                    {trades.length > 0 && (
                      <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-lg">
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                          <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex-shrink-0">
                            <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-base sm:text-xl font-bold text-slate-900">Specializări & Servicii</h4>
                            <p className="text-slate-600 text-xs sm:text-base hidden sm:block">Domeniile de expertiză ale meseriașului</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                          {trades.slice(0, 8).map((trade: any, index: number) => {
                            const gradients = [
                              'from-blue-500 to-cyan-500',
                              'from-emerald-500 to-teal-500',
                              'from-purple-500 to-pink-500',
                              'from-amber-500 to-orange-500',
                              'from-rose-500 to-pink-500',
                              'from-indigo-500 to-purple-500',
                              'from-teal-500 to-cyan-500',
                              'from-orange-500 to-red-500'
                            ];
                            const gradient = gradients[index % gradients.length];
                            return (
                              <div key={index} className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-slate-200 p-3 sm:p-4 hover:shadow-lg transition-all duration-300">
                                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                                <div className="relative flex items-center gap-3 sm:gap-4">
                                  <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r ${gradient} shadow-lg flex-shrink-0`}>
                                    <Badge className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                                  </div>
                                  <div className="min-w-0">
                                    <span className="text-slate-900 font-bold text-sm sm:text-lg block truncate">{trade.name}</span>
                                    <p className="text-slate-600 text-xs sm:text-sm hidden sm:block">Servicii profesionale</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {trades.length > 8 && (
                          <div className="mt-6 text-center">
                            <span className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold shadow-lg">
                              <Zap className="w-4 h-4 mr-2" />
                              +{trades.length - 8} specializări suplimentare
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'portfolio' && (
                  <div className="space-y-8">

                    {portfolioItems.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolioItems.map((item: any, index: number) => (
                          <div
                            key={index}
                            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                            onClick={() => setSelectedPortfolioItem(item)}
                          >
                            {item.images && item.images.length > 0 && (
                              <div className="relative overflow-hidden">
                                <img src={item.images[0]} alt={item.title} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" decoding="async" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                  <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
                                    <ExternalLink className="w-8 h-8 text-white" />
                                  </div>
                                </div>
                                {item.images.length > 1 && (
                                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl px-3 py-1.5">
                                    <span className="text-white text-sm font-bold">+{item.images.length - 1}</span>
                                  </div>
                                )}
                                <div className="absolute bottom-4 left-4 right-4">
                                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">{item.category}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="p-6">
                              <h4 className="font-bold text-slate-900 mb-3 text-lg">{item.title}</h4>
                              <p className="text-slate-700 mb-4 line-clamp-2 leading-relaxed">{item.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                  <span className="text-sm font-medium text-emerald-700">Finalizat</span>
                                </div>
                                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                  Vezi detalii →
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-100 to-slate-200 inline-block mb-6">
                          <Camera className="w-16 h-16 text-slate-500" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-700 mb-2">Portofoliu în construcție</h4>
                        <p className="text-slate-500 text-lg">Acest meseriaș nu a adăugat încă proiecte în portofoliu.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-8">

                    {reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review: any, index: number) => (
                          <div key={index} className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-start gap-6">
                              <div className="relative">
                                {review.profiles?.avatar_url ? (
                                  <img
                                    src={review.profiles.avatar_url}
                                    alt={review.profiles?.name || 'Client'}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                                  />
                                ) : (
                                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-4 ring-white shadow-lg">
                                    <span className="text-white font-bold text-lg">
                                      {(review.profiles?.name || 'Client').charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                )}
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center ring-2 ring-white">
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <span className="font-bold text-slate-900 text-lg">{review.profiles?.name || 'Client'}</span>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-500 fill-current' : 'text-slate-300'}`} />
                                        ))}
                                      </div>
                                      <span className="text-sm font-medium text-amber-600">{review.rating}/5</span>
                                    </div>
                                  </div>
                                  <span className="text-sm text-slate-500 font-medium">
                                    {review.created_at ?
                                      (() => {
                                        try {
                                          return format(new Date(review.created_at), 'dd MMM yyyy', { locale: ro });
                                        } catch (error) {
                                          console.error('Invalid date for review:', review.created_at, error);
                                          return 'Data invalidă';
                                        }
                                      })()
                                      : 'Data necunoscută'
                                    }
                                  </span>
                                </div>
                                
                                {/* Job info */}
                                {review.job && (
                                  <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                                    <div className="flex items-center gap-2 text-blue-700">
                                      <Briefcase className="w-4 h-4" />
                                      <span className="font-medium text-sm">Pentru lucrarea:</span>
                                      <span className="font-bold text-sm">{review.job.title}</span>
                                    </div>
                                    {review.job.tradeType && (
                                      <div className="flex items-center gap-2 text-blue-600 mt-1">
                                        <span className="text-xs">•</span>
                                        <span className="text-xs font-medium">{review.job.tradeType}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                <div className="bg-white rounded-2xl p-4 border border-slate-100">
                                  <p className="text-slate-800 leading-relaxed text-lg italic">"{review.comment}"</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-100 to-orange-100 inline-block mb-6">
                          <Star className="w-16 h-16 text-amber-500" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-700 mb-2">Fii primul care lasă o recenzie!</h4>
                        <p className="text-slate-500 text-lg">Acest meseriaș nu are încă recenzii de la clienți.</p>
                        <button className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:shadow-lg transition-all">
                          Lasă prima recenzie
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'certifications' && (
                  <div className="space-y-8">

                    {certifications.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {certifications.map((cert: any, index: number) => {
                          const gradients = [
                            'from-emerald-500 to-teal-500',
                            'from-blue-500 to-cyan-500',
                            'from-purple-500 to-pink-500',
                            'from-amber-500 to-orange-500'
                          ];
                          const gradient = gradients[index % gradients.length];
                          return (
                            <div key={index} className="group bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                              <div className="flex items-start gap-4">
                                <div className={`p-4 rounded-2xl bg-gradient-to-r ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                  <Award className="w-8 h-8 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-slate-900 mb-2 text-lg">{cert.name}</h4>
                                  <div className="bg-white rounded-xl p-3 border border-slate-100 mb-3">
                                    <p className="text-slate-700 font-medium">{cert.issuer}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4 text-slate-500" />
                                    <span className="text-slate-600 font-medium">
                                      {cert.issued_date ?
                                        (() => {
                                          try {
                                            return format(new Date(cert.issued_date), 'dd MMMM yyyy', { locale: ro });
                                          } catch (error) {
                                            console.error('Invalid date for certification:', cert.issued_date, error);
                                            return 'Data invalidă';
                                          }
                                        })()
                                        : 'Data necunoscută'
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-100 to-teal-100 inline-block mb-6">
                          <Award className="w-16 h-16 text-emerald-500" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-700 mb-2">Certificări în curs de adăugare</h4>
                        <p className="text-slate-500 text-lg">Acest meseriaș nu a adăugat încă certificări profesionale.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Render the modals */}
      <PortfolioModal item={selectedPortfolioItem} onClose={() => setSelectedPortfolioItem(null)} />
      {isReportModalOpen && (
        <ReportModal worker={worker} onClose={() => setIsReportModalOpen(false)} />
      )}
    </>
  );
} 
