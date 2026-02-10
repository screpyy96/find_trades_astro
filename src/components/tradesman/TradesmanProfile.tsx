import React, { useState, useEffect } from 'react';
import { Star, MapPin, Phone, Award, CheckCircle, Camera, X, CalendarDays, Share2, Flag, Send, Briefcase, Crown } from 'lucide-react';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale/ro';
import { createClient } from '@supabase/supabase-js';
import { AvatarModal } from './AvatarModal';

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
  subscription_plan?: string | null;
  [key: string]: any;
}

interface SupabaseBrowserConfig {
  url?: string;
  anonKey?: string;
}

const getSupabaseBrowserClient = (config?: SupabaseBrowserConfig) => {
  const url = config?.url || import.meta.env.PUBLIC_SUPABASE_URL;
  const key = config?.anonKey || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
};

// --- Report Modal ---
function ReportModal({ worker, onClose }: { worker: WorkerProfile; onClose: () => void }) {
  const [complaintType, setComplaintType] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const complaintTypes = [
    { value: 'fake_profile', label: 'Fake or misleading profile' },
    { value: 'inappropriate_content', label: 'Inappropriate content' },
    { value: 'spam', label: 'Spam or advertising' },
    { value: 'harassment', label: 'Harassment or abuse' },
    { value: 'fraud', label: 'Fraud or scam' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintType || !details.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/report-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: worker.id, complaintType, details: details.trim(), reference: `profile:${worker.id}` })
      });
      if (res.ok) { setIsSubmitted(true); setTimeout(onClose, 2000); }
    } catch { /* silent */ } finally { setIsSubmitting(false); }
  };

  if (!worker) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
        {isSubmitted ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Report submitted</h3>
            <p className="text-slate-600 text-sm">Thank you. We'll investigate shortly.</p>
          </div>
        ) : (
          <>
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Report Profile</h3>
              <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Reason</label>
                <div className="space-y-1.5">
                  {complaintTypes.map((type) => (
                    <label key={type.value} className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                      <input type="radio" name="complaintType" value={type.value} checked={complaintType === type.value} onChange={(e) => setComplaintType(e.target.value)} className="w-4 h-4 text-slate-900 border-slate-300 focus:ring-slate-500" />
                      <span className="text-sm text-slate-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-slate-700 mb-1.5">Details</label>
                <textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Describe the issue..." rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-slate-400 focus:border-slate-400 resize-none" required />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200">Cancel</button>
                <button type="submit" disabled={!complaintType || !details.trim() || isSubmitting} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// --- Portfolio Modal ---
function PortfolioModal({ item, onClose }: { item: any; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {item.images?.[0] && (
          <div className="relative flex-shrink-0">
            <img src={item.images[0]} alt={item.title} className="w-full h-64 object-cover" loading="lazy" decoding="async" />
            <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-lg bg-black/50 text-white hover:bg-black/70"><X className="w-5 h-5" /></button>
          </div>
        )}
        <div className="p-6 overflow-y-auto">
          <h3 className="text-xl font-semibold text-slate-900 mb-1">{item.title}</h3>
          <span className="text-sm text-slate-500 mb-4 block">{item.category}</span>
          <p className="text-slate-700 leading-relaxed mb-6">{item.description}</p>
          {item.images?.length > 1 && (
            <div className="grid grid-cols-3 gap-2 mb-6">
              {item.images.slice(1, 7).map((img: string, idx: number) => (
                <img key={idx} src={img} alt={`${item.title} ${idx + 2}`} className="w-full h-20 object-cover rounded-lg" loading="lazy" decoding="async" />
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-slate-50 rounded-lg"><span className="text-slate-500 block text-xs">Category</span><span className="font-medium text-slate-900">{item.category}</span></div>
            <div className="p-3 bg-slate-50 rounded-lg"><span className="text-slate-500 block text-xs">Location</span><span className="font-medium text-slate-900">{item.location || 'N/A'}</span></div>
            <div className="p-3 bg-slate-50 rounded-lg"><span className="text-slate-500 block text-xs">Client</span><span className="font-medium text-slate-900">{item.client_name || 'Confidential'}</span></div>
            <div className="p-3 bg-slate-50 rounded-lg"><span className="text-slate-500 block text-xs">Completed</span><span className="font-medium text-slate-900">{item.completion_date ? format(new Date(item.completion_date), 'dd MMM yyyy', { locale: ro }) : 'N/A'}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface TradesmanProfileProps {
  worker: WorkerProfile;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

export function TradesmanProfile({ worker, supabaseUrl, supabaseAnonKey }: TradesmanProfileProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'reviews' | 'certifications'>('about');
  const [isContactRevealed, setIsContactRevealed] = useState(false);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<any | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const trades = (worker as any).trades || [];
  const portfolioItems = (worker as any).portfolio_items || [];
  const certifications = (worker as any).certifications || [];
  const reviews = (worker as any).reviews || [];
  const totalJobs = (worker as any).total_jobs || (worker as any).totalJobs || 0;
  const rating = worker.rating || 0;
  const reviewCount = reviews.length;

  const isPro = (() => {
    const plan = worker.subscription_plan;
    if (!plan) return false;
    const p = plan.trim().toLowerCase();
    return p === 'pro' || p.startsWith('enterprise');
  })();

  const tradeNames = trades.map((t: any) => t.name).join(', ');
  const primaryTrade = trades[0]?.name || 'Professional Services';

  // Schema.org
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": worker.name,
    "jobTitle": primaryTrade,
    "description": worker.bio || `Specialist in ${tradeNames}`,
    "url": `https://www.findtrades.app/tradesman/${worker.id}`,
    "image": worker.avatar_url,
    "telephone": worker.phone,
    "address": worker.address ? { "@type": "PostalAddress", "addressLocality": worker.address, "addressCountry": "GB" } : undefined,
    "aggregateRating": rating > 0 ? { "@type": "AggregateRating", "ratingValue": rating, "ratingCount": reviewCount || 1, "bestRating": 5, "worstRating": 1 } : undefined,
    "knowsAbout": trades.map((t: any) => t.name),
    "worksFor": { "@type": "Organization", "name": "FindTrades", "url": "https://www.findtrades.app" }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: `${worker.name} - FindTrades`, text: `Check out ${worker.name}'s profile on FindTrades`, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard');
      }
    } catch { /* cancelled */ }
  };

  const handleContactReveal = async () => {
    try {
      await fetch('/api/track-phone-reveal', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ profileId: worker.id }) });
    } catch { /* silent */ }
    setIsContactRevealed(true);
    sessionStorage.setItem(`contact_revealed_${worker.id}`, 'true');
  };

  const handlePhoneCall = () => {
    if (!worker.phone) return;
    if (isContactRevealed) {
      window.location.href = `tel:${worker.phone}`;
    } else {
      handleContactReveal().then(() => setTimeout(() => { window.location.href = `tel:${worker.phone}`; }, 100));
    }
  };

  // Track profile view
  useEffect(() => {
    const timer = setTimeout(async () => {
      try { await fetch('/api/track-profile-view', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ profileId: worker.id }) }); } catch { /* silent */ }
    }, 1000);
    return () => clearTimeout(timer);
  }, [worker.id]);

  // Restore contact reveal from session
  useEffect(() => {
    if (sessionStorage.getItem(`contact_revealed_${worker.id}`) === 'true') setIsContactRevealed(true);
  }, [worker.id]);

  const tabs = [
    { id: 'about' as const, label: 'About' },
    { id: 'portfolio' as const, label: `Portfolio${portfolioItems.length ? ` (${portfolioItems.length})` : ''}` },
    { id: 'reviews' as const, label: `Reviews${reviewCount ? ` (${reviewCount})` : ''}` },
    { id: 'certifications' as const, label: `Certifications${certifications.length ? ` (${certifications.length})` : ''}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <button onClick={() => setIsAvatarModalOpen(true)} className="relative group">
                  {worker.avatar_url ? (
                    <img src={worker.avatar_url} alt={worker.name} loading="eager" referrerPolicy="no-referrer" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-slate-200 group-hover:border-slate-300 transition-colors" />
                  ) : (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-200">
                      <span className="text-slate-400 font-semibold text-3xl sm:text-4xl">{(worker.name || 'T').charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  {worker.is_verified && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-7 h-7 sm:w-8 sm:h-8 bg-emerald-500 rounded-full flex items-center justify-center ring-2 ring-white">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  )}
                </button>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 truncate">{worker.name}</h1>
                  {isPro && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold flex-shrink-0">
                      <Crown className="w-3.5 h-3.5" />
                      PRO
                    </span>
                  )}
                </div>

                {worker.address && (
                  <div className="flex items-center gap-1.5 text-slate-500 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm sm:text-base">{worker.address}</span>
                  </div>
                )}

                {/* Rating */}
                {rating > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-amber-400 fill-current' : 'text-slate-200'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{rating.toFixed(1)}</span>
                    {reviewCount > 0 && <span className="text-sm text-slate-400">({reviewCount} reviews)</span>}
                  </div>
                )}

                {/* Trades */}
                {trades.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {trades.map((trade: any, i: number) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">{trade.name}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2.5 sm:min-w-[200px]">
                {worker.phone && (
                  <button onClick={handlePhoneCall} className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors">
                    <Phone className="w-4 h-4" />
                    {isContactRevealed ? worker.phone : 'Show phone number'}
                  </button>
                )}
                <div className="flex gap-2">
                  <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button onClick={() => setIsReportModalOpen(true)} className="flex items-center justify-center px-3 py-2.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors" title="Report profile">
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="flex gap-0 overflow-x-auto -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-slate-900 text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

          {/* About */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              {worker.bio ? (
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-3">About</h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{worker.bio}</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400">This tradesman hasn't added a bio yet.</p>
                </div>
              )}

              {/* Quick stats */}
              {(totalJobs > 0 || rating > 0) && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  {totalJobs > 0 && (
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">{totalJobs}</div>
                      <div className="text-sm text-slate-500">Jobs completed</div>
                    </div>
                  )}
                  {rating > 0 && (
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">{rating.toFixed(1)}</div>
                      <div className="text-sm text-slate-500">Average rating</div>
                    </div>
                  )}
                  {reviewCount > 0 && (
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">{reviewCount}</div>
                      <div className="text-sm text-slate-500">Reviews</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Portfolio */}
          {activeTab === 'portfolio' && (
            <div>
              {portfolioItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {portfolioItems.map((item: any, i: number) => (
                    <div key={i} onClick={() => setSelectedPortfolioItem(item)} className="group border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 cursor-pointer transition-colors">
                      {item.images?.[0] && (
                        <img src={item.images[0]} alt={item.title} className="w-full h-48 object-cover" loading="lazy" decoding="async" />
                      )}
                      <div className="p-4">
                        <h3 className="font-medium text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>
                        {item.category && <span className="inline-block mt-2 text-xs text-slate-400">{item.category}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Camera className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-400">No portfolio items yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && (
            <div>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review: any, i: number) => (
                    <div key={i} className="border border-slate-200 rounded-lg p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {review.profiles?.avatar_url ? (
                            <img src={review.profiles.avatar_url} alt={review.profiles?.name || 'Client'} loading="lazy" decoding="async" referrerPolicy="no-referrer" className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                              <span className="text-slate-400 font-medium text-sm">{(review.profiles?.name || 'C').charAt(0).toUpperCase()}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-slate-900">{review.profiles?.name || 'Client'}</span>
                            <span className="text-xs text-slate-400">
                              {review.created_at ? (() => { try { return format(new Date(review.created_at), 'dd MMM yyyy', { locale: ro }); } catch { return ''; } })() : ''}
                            </span>
                          </div>
                          <div className="flex items-center gap-0.5 mb-2">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? 'text-amber-400 fill-current' : 'text-slate-200'}`} />
                            ))}
                          </div>
                          {review.job && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                              <Briefcase className="w-3 h-3" />
                              <span>{review.job.title}</span>
                            </div>
                          )}
                          <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Star className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-400">No reviews yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Certifications */}
          {activeTab === 'certifications' && (
            <div>
              {certifications.length > 0 ? (
                <div className="space-y-3">
                  {certifications.map((cert: any, i: number) => (
                    <div key={i} className="flex items-start gap-4 border border-slate-200 rounded-lg p-4">
                      <div className="p-2 bg-slate-50 rounded-lg flex-shrink-0">
                        <Award className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900">{cert.name}</h3>
                        <p className="text-sm text-slate-500">{cert.issuer}</p>
                        {cert.issued_date && (
                          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                            <CalendarDays className="w-3 h-3" />
                            <span>{(() => { try { return format(new Date(cert.issued_date), 'dd MMM yyyy', { locale: ro }); } catch { return ''; } })()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Award className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-400">No certifications added yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <PortfolioModal item={selectedPortfolioItem} onClose={() => setSelectedPortfolioItem(null)} />
      {isReportModalOpen && <ReportModal worker={worker} onClose={() => setIsReportModalOpen(false)} />}
      {isAvatarModalOpen && <AvatarModal worker={worker} onClose={() => setIsAvatarModalOpen(false)} />}
    </>
  );
}
