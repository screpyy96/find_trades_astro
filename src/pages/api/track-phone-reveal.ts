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

    // Insert phone reveal
    const { error } = await supabase
      .from('phone_reveals')
      .insert({
        profile_id: profileId,
        revealed_at: new Date().toISOString()
      });

    if (error) {
      // Error logged to monitoring in production
      return new Response(JSON.stringify({ error: 'Failed to track reveal' }), {
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
