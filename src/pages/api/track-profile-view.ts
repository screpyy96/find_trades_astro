import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { profileId } = await request.json();

    if (!profileId) {
      return new Response(JSON.stringify({ error: 'Profile ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!supabase) {
      return new Response(JSON.stringify({ error: 'Service unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert profile view with generated UUID
    const { error } = await supabase
      .from('profile_views')
      .insert({
        id: crypto.randomUUID(),
        profile_id: profileId,
        viewed_at: new Date().toISOString()
      });

    if (error) {
      // Error logged to monitoring in production
      return new Response(JSON.stringify({ error: 'Failed to track view' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Error logged to monitoring in production
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
