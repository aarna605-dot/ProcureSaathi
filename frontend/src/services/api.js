import { runClientSimulation, recalculateCostsClient, parseQueryClient } from './clientSimulation';

const API_BASE_URL = '';

export async function searchProcurement(requestData, customApiKey = '') {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (customApiKey) {
      headers['X-TinyFish-Key'] = customApiKey;
    }

    const response = await fetch(`${API_BASE_URL}/api/procure/search`, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      return await response.json();
    }
    console.warn(`[ScoutB2B API] Backend returned HTTP ${response.status}. Engaging client procurement intelligence engine.`);
  } catch (err) {
    console.warn(`[ScoutB2B API] Backend unreachable (${err.message}). Engaging client procurement intelligence engine.`);
  }

  // Graceful client simulation fallback for Netlify, Vercel, offline, or when backend is unavailable
  return runClientSimulation(requestData);
}

export async function parseQuery(queryText) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/procure/parse-query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: queryText }),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn("[ScoutB2B API] Parse endpoint notice:", err.message);
  }

  return parseQueryClient(queryText);
}

export async function recalculateCosts(params) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/procure/recalculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn("[ScoutB2B API] Recalculate endpoint notice:", err.message);
  }

  return recalculateCostsClient(params);
}

export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    // Offline / static host
  }
  return { status: 'client_active', service: 'ScoutB2B Autonomous Intelligence' };
}
