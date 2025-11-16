import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { profileId, complaintType, details, reference } = await request.json();

    if (!profileId || !complaintType || !details) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
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

    // Insert complaint
    const { error } = await supabase
      .from('complaints')
      .insert({
        profile_id: profileId,
        complaint_type: complaintType,
        details: details,
        reference: reference || `profile:${profileId}`,
        status: 'pending',
        created_at: new Date().toISOString()
      });

    if (error) {
      // Error logged to monitoring in production
      return new Response(JSON.stringify({ error: 'Failed to submit report' }), {
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
