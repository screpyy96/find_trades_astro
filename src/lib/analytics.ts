// Analytics helper for GTM tracking
// Usage: import { trackEvent } from '~/lib/analytics';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export interface TrackEventParams {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

export function trackEvent(params: TrackEventParams) {
  if (typeof window === 'undefined') return;
  
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(params);
  
  console.log('[Analytics] Event tracked:', params);
}

// Predefined tracking functions for common events

export function trackPageView(pagePath: string, pageTitle: string) {
  trackEvent({
    event: 'page_view',
    page_path: pagePath,
    page_title: pageTitle,
  });
}

export function trackCereOferta(service?: string, city?: string) {
  trackEvent({
    event: 'cere_oferta_click',
    category: 'conversion',
    action: 'click',
    label: 'cere_oferta_button',
    service: service || 'unknown',
    city: city || 'unknown',
  });
}

export function trackContactTradesman(tradesmanId: string, service: string, city?: string) {
  trackEvent({
    event: 'contact_tradesman',
    category: 'engagement',
    action: 'contact',
    tradesman_id: tradesmanId,
    service: service,
    city: city || 'unknown',
  });
}

export function trackSearch(searchTerm: string, resultsCount?: number) {
  trackEvent({
    event: 'search',
    category: 'engagement',
    action: 'search',
    search_term: searchTerm,
    results_count: resultsCount,
  });
}

export function trackServiceView(service: string, city?: string) {
  trackEvent({
    event: 'service_view',
    category: 'engagement',
    action: 'view',
    service: service,
    city: city || 'all',
  });
}

export function trackBlogRead(articleTitle: string, category?: string, readingTime?: number) {
  trackEvent({
    event: 'blog_read',
    category: 'content',
    action: 'read',
    article_title: articleTitle,
    article_category: category || 'uncategorized',
    reading_time: readingTime,
  });
}

export function trackOutboundLink(url: string, label?: string) {
  trackEvent({
    event: 'outbound_link',
    category: 'engagement',
    action: 'click',
    label: label || url,
    outbound_url: url,
  });
}

export function trackScrollDepth(depth: number) {
  trackEvent({
    event: 'scroll_depth',
    category: 'engagement',
    action: 'scroll',
    scroll_depth: depth,
  });
}

export function trackFormSubmit(formName: string, formType: string) {
  trackEvent({
    event: 'form_submit',
    category: 'conversion',
    action: 'submit',
    form_name: formName,
    form_type: formType,
  });
}

export function trackPhoneReveal(tradesmanId: string, service: string) {
  trackEvent({
    event: 'phone_reveal',
    category: 'conversion',
    action: 'reveal',
    tradesman_id: tradesmanId,
    service: service,
  });
}

export function trackChatbotOpen() {
  trackEvent({
    event: 'chatbot_open',
    category: 'engagement',
    action: 'open',
    label: 'ai_chatbot',
  });
}

export function trackChatbotMessage(messageType: 'user' | 'bot') {
  trackEvent({
    event: 'chatbot_message',
    category: 'engagement',
    action: 'message',
    message_type: messageType,
  });
}
