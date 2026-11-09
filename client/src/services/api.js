const apiOrigin = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');
const apiBase = apiOrigin ? `${apiOrigin}/api` : '/api';

async function requestJson(endpoint, options) {
  let response;
  try {
    response = await fetch(`${apiBase}${endpoint}`, options);
  } catch {
    throw new Error(`Cannot reach the API at ${apiBase}. Start the backend locally or verify VITE_API_URL.`);
  }
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.error || `API request failed with HTTP ${response.status}.`);
  }
  return result;
}

export async function getJson(endpoint) {
  return requestJson(endpoint);
}

export async function submitForm(endpoint, payload) {
  return requestJson(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
}