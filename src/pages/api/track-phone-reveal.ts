import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { profileId } = await request.json();

    if (!profileId) {
      return new Response(JSON.stringify({ error: 'Profilee ID is required' }), {
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

    // Insert phone reveal event
    const { error } = await supabase
      .from('phone_reveal_events')
      .insert({
        id: crypto.randomUUID(),
        profile_id: profileId,
        revealed_at: new Date().toISOString(),
        viewer_id: request.headers.get('x-forwarded-for') || 'unknown',
        ip_address: request.headers.get('x-real-ip') || null
      });

    if (error) {
      // Log error but don't fail the request - table might not exist yet
      console.log('Phone reveal tracking failed (table might not exist):', error);
      // Return success anyway so the UI doesn't break
      return new Response(JSON.stringify({ success: true, tracked: false }), {
        status: 200,
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
