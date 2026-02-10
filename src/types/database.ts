export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Profilee {
  id: string;
  name: string | null;
  email: string | null;
  created_at: string;
  role: string | null;
  phone: string | null;
  address: string | null;
  bio: string | null;
  avatar_url: string | null;
  is_verified: boolean | null;
  rating: number | null;
  updated_at: string | null;
  registered_by: string | null;


  is_online: boolean | null;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  work_radius: number | null;
  notifications_by_radius: boolean | null;
  notifications_all_trades: boolean | null;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profilee;
        Insert: Omit<Profilee, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Profilee, 'id' | 'created_at'>> & {
          updated_at?: string;
        };
      };
      user_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan_id: string;
          stripe_subscription_id: string | null;
          stripe_customer_id: string | null;
          status: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'trialing';
          current_period_start: string;
          current_period_end: string;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_subscriptions']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Database['public']['Tables']['user_subscriptions']['Row'], 'id' | 'created_at'>> & {
          updated_at?: string;
        };
      };
      user_credits: {
        Row: {
          user_id: string;
          balance: number;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          balance: number;
          updated_at?: string;
        };
        Update: Partial<Omit<Database['public']['Tables']['user_credits']['Row'], 'user_id'>> & {
          updated_at?: string;
        };
      };
      worker_trades: {
        Row: {
          profile_id: string;
          trade_ids: number[];
          created_at: string;
        };
        Insert: {
          profile_id: string;
          trade_ids: number[];
          created_at?: string;
        };
        Update: Partial<Omit<Database['public']['Tables']['worker_trades']['Row'], 'profile_id' | 'created_at'>>;
      };
      service_content: {
        Row: ServiceContent;
        Insert: Omit<ServiceContent, 'id' | 'created_at' | 'updated_at'> & {
          id?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<ServiceContent, 'id' | 'created_at' | 'updated_at'>> & {
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Tipuri pentru crearea profilului
export interface CreateProfileeData {
  name?: string;
  email?: string;
  role?: string;
  phone?: string;
  address?: string;
  bio?: string;
  avatar_url?: string;
  is_verified?: boolean;
  rating?: number;
  registered_by?: string;
  registered_at?: string;

  is_online?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  work_radius?: number;
  notifications_by_radius?: boolean;
  notifications_all_trades?: boolean;
}

// Tipuri pentru actualizarea profilului
export interface UpdateProfileeData {
  name?: string;
  email?: string;
  role?: string;
  phone?: string;
  address?: string;
  bio?: string;
  avatar_url?: string;
  is_verified?: boolean;
  rating?: number;


  is_online?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  work_radius?: number;
  notifications_by_radius?: boolean;
  notifications_all_trades?: boolean;
}

export type Trade = {
  id: number;
  name: string;
  category: string | null;
  created_at: string;
  updated_at: string;
  slug: string;
  description: string | null;
};

export type ServiceContent = {
  id: number;
  trade_slug: string;
  title: string | null;
  description: string | null;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string | null;
  features: Json | null;
  pricing: Json | null;
  faq: Json | null;
  created_at: string;
  updated_at: string;
};

export type WorkerProfilee = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  role: string;
  phone: string | null;
  address: string | null;
  bio: string | null;
  avatar_url: string | null;
  is_verified: boolean;
  rating: number | null;
  updated_at: string;
  registered_by: string | null;
  registered_at: string | null;
  is_pro: boolean;

  is_online: boolean;
  coordinates: { lat: number; lng: number } | null;
  work_radius: number | null;
  notifications_by_radius: boolean;
  notifications_all_trades: boolean;
  slug?: string | null;
  trades?: any[]; // Allow both string[] and Trade[] objects
  worker_trades?: { trade_ids: number[] }[];
}; 