import { useState, useMemo } from 'react';

interface Job {
  id: string;
  title: string;
  description: string;
  status: string;
  budget: number | null;
  address: string | null;
  tradeType: string | null;
  urgency: string | null;
  images: string[] | null;
  created_at: string;
}

interface JobsClientListProps {
  jobs: Job[];
}

export function JobsClientList({ jobs }: JobsClientListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minBudget: '',
    maxBudget: '',
    tradeType: '',
    urgency: '',
    city: '',
  });

  // Generate job URL
  function generateJobUrl(job: Job): string {
    const parts: string[] = [];
    
    if (job.title) {
      const titleWords = job.title.trim().split(/\s+/).slice(0, 3);
      const titleSlug = titleWords.join(' ')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      if (titleSlug) parts.push(titleSlug);
    }
    
    if (parts.length === 0) parts.push('lucrare');
    
    const shortId = job.id.replace(/-/g, '').substring(0, 6);
    parts.push(shortId);
    
    return `/solicitari/${parts.join('-')}`;
  }

  // Check if job is new
  function isNewJob(dateString: string): boolean {
    return new Date(dateString).getTime() > Date.now() - 24 * 60 * 60 * 1000;
  }

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const searchLower = searchTerm.toLowerCase().trim();
      
      // Search filter
      if (searchLower) {
        const matchesSearch = 
          job.title?.toLowerCase().includes(searchLower) ||
          job.description?.toLowerCase().includes(searchLower) ||
          job.tradeType?.toLowerCase().includes(searchLower) ||
          job.address?.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Budget filter
      if (filters.minBudget && job.budget) {
        if (job.budget < parseFloat(filters.minBudget)) return false;
      }
      if (filters.maxBudget && job.budget) {
        if (job.budget > parseFloat(filters.maxBudget)) return false;
      }

      // Trade type filter
      if (filters.tradeType && job.tradeType) {
        if (!job.tradeType.toLowerCase().includes(filters.tradeType.toLowerCase())) return false;
      }

      // City filter
      if (filters.city) {
        const cityLower = filters.city.toLowerCase();
        const matchesCity = job.address?.toLowerCase().includes(cityLower);
        if (!matchesCity) return false;
      }

      // Urgency filter
      if (filters.urgency && job.urgency) {
        if (!job.urgency.toLowerCase().includes(filters.urgency.toLowerCase())) return false;
      }

      return true;
    });
  }, [jobs, searchTerm, filters]);

  const handleResetFilters = () => {
    setFilters({
      minBudget: '',
      maxBudget: '',
      tradeType: '',
      urgency: '',
      city: '',
    });
    setSearchTerm('');
  };

  const hasActiveFilters = 
    filters.minBudget || 
    filters.maxBudget || 
    filters.tradeType || 
    filters.urgency || 
    filters.city ||
    searchTerm;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Caută după meserie, locație, descriere..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Filter toggle and count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{filteredJobs.length}</span> lucrări găsite
        </p>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {showFilters ? 'Ascunde filtre' : 'Filtre avansate'}
          {hasActiveFilters && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
              !
            </span>
          )}
        </button>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="mb-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* City filter */}
            <div>
              <label htmlFor="city-filter" className="block text-sm font-semibold text-slate-900 mb-2">
                Oraș
              </label>
              <input
                id="city-filter"
                type="text"
                placeholder="Ex: București, Cluj..."
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Trade type filter */}
            <div>
              <label htmlFor="trade-filter" className="block text-sm font-semibold text-slate-900 mb-2">
                Tip meserie
              </label>
              <input
                id="trade-filter"
                type="text"
                placeholder="Ex: electrician, zugrav..."
                value={filters.tradeType}
                onChange={(e) => setFilters({ ...filters, tradeType: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Urgency filter */}
            <div>
              <label htmlFor="urgency-filter" className="block text-sm font-semibold text-slate-900 mb-2">
                Urgență
              </label>
              <select
                id="urgency-filter"
                value={filters.urgency}
                onChange={(e) => setFilters({ ...filters, urgency: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Toate</option>
                <option value="urgent">Urgent</option>
                <option value="normal">Normal</option>
                <option value="flexibil">Flexibil</option>
              </select>
            </div>

            {/* Min budget */}
            <div>
              <label htmlFor="min-budget" className="block text-sm font-semibold text-slate-900 mb-2">
                Buget minim (RON)
              </label>
              <input
                id="min-budget"
                type="number"
                placeholder="0"
                value={filters.minBudget}
                onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Max budget */}
            <div>
              <label htmlFor="max-budget" className="block text-sm font-semibold text-slate-900 mb-2">
                Buget maxim (RON)
              </label>
              <input
                id="max-budget"
                type="number"
                placeholder="10000"
                value={filters.maxBudget}
                onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Reset button */}
            <div className="flex items-end">
              <button
                onClick={handleResetFilters}
                disabled={!hasActiveFilters}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Resetează filtrele
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Listings */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => {
            const urgency = job.urgency || 'Nespecificat';
            const location = job.address || 'Nespecificat';
            const isNew = isNewJob(job.created_at);
            const jobUrl = generateJobUrl(job);

            return (
              <div key={job.id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-transparent hover:ring-2 hover:ring-amber-400/50 flex flex-col relative">
                {/* New badge */}
                {isNew && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg animate-pulse">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      NOU
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-br from-white to-slate-50/50">
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="font-bold text-slate-900 text-lg leading-tight flex-1 group-hover:text-amber-600 transition-colors">
                      <a href={jobUrl} className="hover:underline decoration-2 underline-offset-2">
                        {job.title || 'Fără titlu'}
                      </a>
                    </h3>
                    <span className="px-3 py-1.5 text-xs font-bold rounded-full whitespace-nowrap bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md">
                      DESCHIS
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-grow bg-white">
                  <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed mb-4">
                    {job.description || 'Fără descriere'}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {job.tradeType && (
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-700 shadow-sm">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {job.tradeType}
                      </span>
                    )}
                    {urgency !== 'Nespecificat' && (
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 px-3 py-1.5 rounded-full text-xs font-semibold text-amber-700 shadow-sm">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {urgency}
                      </span>
                    )}
                    {job.images && job.images.length > 0 && (
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 px-3 py-1.5 rounded-full text-xs font-semibold text-purple-700 shadow-sm">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {job.images.length} {job.images.length === 1 ? 'foto' : 'foto'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-5 sm:p-6 border-t border-slate-100 bg-gradient-to-br from-slate-50 to-white">
                  {/* Location and Budget */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm bg-white rounded-lg p-2 border border-slate-200">
                      <svg className="h-4 w-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate text-slate-700 font-medium">{location.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-2 border border-amber-200">
                      <svg className="h-4 w-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="truncate font-bold text-amber-900">
                        {job.budget ? `${job.budget} RON` : 'La negociere'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <a
                    href={jobUrl}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-bold shadow-md hover:shadow-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Vezi Detalii
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">Niciun rezultat</h3>
          <p className="mt-2 text-sm text-slate-600">Nu am găsit nicio lucrare care să corespundă filtrelor selectate.</p>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Resetează filtrele
            </button>
          )}
        </div>
      )}
    </div>
  );
}
