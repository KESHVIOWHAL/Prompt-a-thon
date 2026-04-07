export const API_BASE = process.env.NEXT_PUBLIC_API_URL 
  ? (process.env.NEXT_PUBLIC_API_URL.endsWith('/api') ? process.env.NEXT_PUBLIC_API_URL : `${process.env.NEXT_PUBLIC_API_URL}/api`)
  : 'http://localhost:5000/api';

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('ns_token');
  }
  return null;
}

export function authHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  // Ensure endpoint starts with slash, and API_BASE has no trailing slash
  const url = `${API_BASE.replace(/\/$/, '')}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const res = await fetch(url, {
    ...options,
    headers: {
      ...authHeaders(),
      ...options.headers,
    },
  });
  
  // Attempt to parse JSON safely since a 404 might return HTML
  let data;
  try {
    data = await res.json();
  } catch (err) {
    if (!res.ok) throw new Error(`Server Error (${res.status}): Make sure the backend is running.`);
    throw new Error('Invalid JSON response from server');
  }

  if (!res.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
}
