const API_BASE_URL = '';

export async function searchProcurement(requestData, customApiKey = '') {
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

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.detail || `Server error: ${response.status}`);
  }

  return response.json();
}

export async function parseQuery(queryText) {
  const response = await fetch(`${API_BASE_URL}/api/procure/parse-query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: queryText }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.detail || 'Failed to parse natural query');
  }

  return response.json();
}

export async function recalculateCosts(params) {
  const response = await fetch(`${API_BASE_URL}/api/procure/recalculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error('Failed to recalculate costs');
  }

  return response.json();
}

export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return await response.json();
  } catch (err) {
    return { status: 'offline', error: err.message };
  }
}
