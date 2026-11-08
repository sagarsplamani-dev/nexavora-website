const apiOrigin = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');
const apiBase = apiOrigin ? `${apiOrigin}/api` : '/api';

export async function getJson(endpoint) {
  let response;
  try {
    response = await fetch(`${apiBase}${endpoint}`);
  } catch {
    throw new Error('Course services are unavailable. Confirm the API configuration.');
  }
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'Unable to load course information.');
  return result;
}

export async function submitForm(endpoint, payload) {
  let response;
  try {
    response = await fetch(`${apiBase}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Course services are unavailable. Confirm the API and database configuration.');
  }
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || result.message || 'Request could not be completed.');
  return result;
}