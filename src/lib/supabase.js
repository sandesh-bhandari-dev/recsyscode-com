// =============================================================
// supabase.js — Supabase REST client using env variables
// =============================================================

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Lightweight Supabase REST fetch wrapper.
 * Usage: sbFetch('videos?order=published_at.desc&select=id,title')
 */
export function sbFetch(path, opts = {}) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn('Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
    return Promise.reject(new Error('Supabase not configured'));
  }

  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...opts,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
  });
}
