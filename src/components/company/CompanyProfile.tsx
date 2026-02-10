import React, { useState, useEffect } from 'react';
import { Star, MapPin, Phone, Award, CheckCircle, Camera, Grid3X3, X, CalendarDays, Shield, Users, Share2, Flag, Send, Briefcase, Building2, Globe, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale/ro';
import { createClient } from '@supabase/supabase-js';

interface CompanyProfilee {
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
  trades?: any[];
  portfolio_items?: any[];
  reviews?: any[];
  certifications?: any[];
  [key: string]: any;
}

interface CompanyProfileeProps {
  company: CompanyProfilee;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

const getSupabaseBrowserClient = (config?: { url?: string; anonKey?: string }) => {
  const url = config?.url || import.meta.env.PUBLIC_SUPABASE_URL;
  const key = config?.anonKey || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
};

// Report Modal Component
function ReportModal({ company, onClose }: { company: CompanyProfilee; onClose: () => void }) {
  const [complaintType, setComplaintType] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const complaintTypes = [
    { value: 'fake_profile', label: 'Profile fals sau înșelător' },
    { value: 'inappropriate_content', label: 'Conținut nepotrivit' },
    { value: 'spam', label: 'Spam sau publicitate' },
    { value: 'fraud', label: 'Fraudă sau înșelăciune' },
    { value: 'other', label: 'Altele' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintType || !details.trim()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/report-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: company.id, complaintType, details: details.trim(), reference: `company:${company.id}` })
      });
      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => onClose(), 2000);
      }
    } catch (error) {}
    finally { setIsSubmitting(false); }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-3xl p-8 text-center max-w-md" onClick={e => e.stopPropagation()}>
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Raport trimis!</h3>
          <p className="text-slate-600">Mulțumim. Vom investiga în cel mai scurt timp.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500">
              <Flag className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Raportează Compania</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-6 h-6" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            {complaintTypes.map(type => (
              <label key={type.value} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input type="radio" name="complaintType" value={type.value} checked={complaintType === type.value} onChange={e => setComplaintType(e.target.value)} className="w-4 h-4 text-red-600" />
                <span className="text-slate-700 font-medium">{type.label}</span>
              </label>
            ))}
          </div>
          <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Descrie problema..." rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500" required />
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Anulează</button>
            <button type="submit" disabled={!complaintType || !details.trim() || isSubmitting} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold disabled:opacity-50">
              {isSubmitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
              Trimite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Portfolio Modal Component
function PortfolioModal({ item, onClose }: { item: any; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        {item.images?.[0] && (
          <div className="relative flex-shrink-0">
            <img src={item.images[0]} alt={item.title} className="w-full h-80 object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">{item.category}</span>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 p-3 rounded-2xl text-white bg-black/50 hover:bg-black/70"><X className="w-6 h-6" /></button>
          </div>
        )}
        <div className="p-8 overflow-y-auto">
          <div className="bg-slate-50 rounded-2xl p-6 mb-6">
            <h4 className="text-lg font-bold text-slate-900 mb-3">Descrierea Proiectului</h4>
            <p className="text-slate-700 leading-relaxed">{item.description}</p>
          </div>
          {item.images?.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {item.images.slice(1, 7).map((img: string, idx: number) => (
                <img key={idx} src={img} alt={`${item.title} ${idx + 2}`} className="w-full h-24 object-cover rounded-xl" loading="lazy" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CompanyProfilee({ company, supabaseUrl, supabaseAnonKey }: CompanyProfileeProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews'>('overview');
  const [isContactRevealed, setIsContactRevealed] = useState(false);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<any | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const trades = company.trades || [];
  const portfolioItems = company.portfolio_items || [];
  const reviews = company.reviews || [];
  const certifications = company.certifications || [];

  const stats = {
    rating: company.rating || 0,
    reviewCount: reviews.length,
    totalProjects: portfolioItems.length
  };

  const handleContactReveal = async () => {
    try {
      await fetch('/api/track-phone-reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: company.id })
      });
    } catch {}
    setIsContactRevealed(true);
    sessionStorage.setItem(`contact_revealed_company_${company.id}`, 'true');
  };

  const handlePhoneCall = () => {
    if (company.phone) {
      if (!isContactRevealed) {
        handleContactReveal().then(() => {
          setTimeout(() => { window.location.href = `tel:${company.phone}`; }, 100);
        });
      } else {
        window.location.href = `tel:${company.phone}`;
      }
    }
  };

  const handleShare = async () => {
    const shareData = { title: `${company.name} - Companie Verificată`, text: `Descoperă ${company.name} pe Meserias Local`, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else { await navigator.clipboard.writeText(window.location.href); alert('Link copiat!'); }
    } catch {}
  };

  useEffect(() => {
    const wasRevealed = sessionStorage.getItem(`contact_revealed_company_${company.id}`) === 'true';
    if (wasRevealed) setIsContactRevealed(true);
  }, [company.id]);

  useEffect(() => {
    const trackView = async () => {
      try { await fetch('/api/track-profile-view', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ profileId: company.id }) }); } catch {}
    };
    const timer = setTimeout(trackView, 1000);
    return () => clearTimeout(timer);
  }, [company.id]);

  const capitalizedName = company.name?.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') || 'Companie';
  const tradeNames = trades.map((t: any) => t.name).join(', ');
  const primaryTrade = trades[0]?.name || 'Services Profesionale';
  const location = company.address?.split(',').pop()?.trim() || 'România';

  return (
    <>
      {selectedPortfolioItem && <PortfolioModal item={selectedPortfolioItem} onClose={() => setSelectedPortfolioItem(null)} />}
      {isReportModalOpen && <ReportModal company={company} onClose={() => setIsReportModalOpen(false)} />}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/40">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-6 shadow-xl border-2 border-blue-200/60">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl blur opacity-40"></div>
                  {company.avatar_url ? (
                    <img src={company.avatar_url} alt={company.name} className="relative w-32 h-32 rounded-3xl object-cover ring-4 ring-white shadow-2xl" />
                  ) : (
                    <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center ring-4 ring-white shadow-2xl">
                      <Building2 className="w-16 h-16 text-white" />
                    </div>
                  )}
                  {company.is_verified && (
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center ring-4 ring-white shadow-lg">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{capitalizedName}</h1>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
                      <Building2 className="w-4 h-4 text-white" />
                      <span className="text-sm font-bold text-white">ENTERPRISE</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    {company.address && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">{company.address}</span>
                      </div>
                    )}
                    {stats.rating > 0 && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300">
                        <Star className="w-5 h-5 text-amber-500 fill-current" />
                        <span className="font-bold text-amber-700">{stats.rating.toFixed(1)}</span>
                        <span className="text-amber-600">({stats.reviewCount} recenzii)</span>
                      </div>
                    )}
                  </div>

                  {/* Trades */}
                  {trades.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {trades.slice(0, 5).map((trade: any, idx: number) => {
                        const colors = ['from-blue-600 to-indigo-600', 'from-purple-600 to-pink-600', 'from-emerald-600 to-teal-600', 'from-orange-500 to-red-500', 'from-cyan-500 to-blue-500'];
                        return (
                          <span key={trade.id || idx} className={`px-4 py-2 rounded-xl bg-gradient-to-r ${colors[idx % colors.length]} text-white text-sm font-bold shadow-md`}>
                            {trade.name}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {company.bio && <p className="text-slate-600 leading-relaxed max-w-2xl">{company.bio}</p>}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 w-full lg:w-auto">
                  <button onClick={handlePhoneCall} className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                    <Phone className="w-6 h-6" />
                    <span>{isContactRevealed && company.phone ? company.phone : 'Contact'}</span>
                  </button>
                  <div className="flex gap-2">
                    <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Distribuie</span>
                    </button>
                    <button onClick={() => setIsReportModalOpen(true)} className="flex items-center justify-center px-4 py-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors">
                      <Flag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-blue-100"><Building2 className="w-5 h-5 text-blue-600" /></div>
                  <span className="text-slate-600 font-medium">Tip</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">Enterprise</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-amber-100"><Star className="w-5 h-5 text-amber-600" /></div>
                  <span className="text-slate-600 font-medium">Rating</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats.rating > 0 ? stats.rating.toFixed(1) : '-'}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-emerald-100"><CheckCircle className="w-5 h-5 text-emerald-600" /></div>
                  <span className="text-slate-600 font-medium">Reviews</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats.reviewCount}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-purple-100"><Camera className="w-5 h-5 text-purple-600" /></div>
                  <span className="text-slate-600 font-medium">Projects</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats.totalProjects}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="flex border-b border-slate-200">
                {(['overview', 'portfolio', 'reviews'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 px-6 py-4 font-bold transition-colors ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                    {tab === 'overview' ? 'Prezentare' : tab === 'portfolio' ? `Portofoliu (${portfolioItems.length})` : `Reviews (${reviews.length})`}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {company.bio && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-3">About Companie</h3>
                        <p className="text-slate-700 leading-relaxed">{company.bio}</p>
                      </div>
                    )}
                    {trades.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-blue-600" />Services Oferite</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {trades.map((trade: any, idx: number) => (
                            <div key={trade.id || idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                              <CheckCircle className="w-5 h-5 text-emerald-500" />
                              <span className="font-medium text-slate-700">{trade.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {certifications.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-amber-600" />Certificări</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {certifications.map((cert: any) => (
                            <div key={cert.id} className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                              <Award className="w-8 h-8 text-amber-600" />
                              <div>
                                <p className="font-bold text-slate-900">{cert.name}</p>
                                <p className="text-sm text-slate-600">{cert.issuer}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                  <div>
                    {portfolioItems.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolioItems.map((item: any) => (
                          <button key={item.id} onClick={() => setSelectedPortfolioItem(item)} className="group text-left bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                            {item.images?.[0] && (
                              <div className="relative h-48 overflow-hidden">
                                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                  <h4 className="text-white font-bold text-lg">{item.title}</h4>
                                  <span className="text-white/80 text-sm">{item.category}</span>
                                </div>
                              </div>
                            )}
                            {!item.images?.[0] && (
                              <div className="p-6">
                                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                                <p className="text-slate-600 text-sm line-clamp-2">{item.description}</p>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Camera className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Niciun proiect încă</h3>
                        <p className="text-slate-600">Portofoliul companiei va fi actualizat în curând.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    {reviews.length > 0 ? (
                      <div className="space-y-4">
                        {reviews.map((review: any) => (
                          <div key={review.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                {(review.profiles?.name || 'A').charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-slate-900">{review.profiles?.name || 'Client Anonim'}</h4>
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-500 fill-current' : 'text-slate-300'}`} />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-slate-700 mb-2">{review.comment}</p>
                                <p className="text-sm text-slate-500">{format(new Date(review.created_at), 'dd MMM yyyy', { locale: ro })}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Star className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Nicio recenzie încă</h3>
                        <p className="text-slate-600">Fii primul care lasă o recenzie pentru această companie.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
