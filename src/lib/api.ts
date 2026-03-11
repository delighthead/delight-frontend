const API = (import.meta.env.VITE_API_URL || "http://localhost:4000").trim();

export function getApiBase() {
  return API;
}

async function parseError(res: Response) {
  const text = await res.text();
  try {
    const j = JSON.parse(text);
    if (j?.error) return j.error;
  } catch {
    /* not json */
  }
  return text || `HTTP ${res.status}`;
}

export async function apiGet<T>(path: string, token?: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function apiPost<T>(path: string, body: unknown, token?: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function apiPatch<T>(path: string, body: unknown, token?: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function apiDelete<T>(path: string, token?: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}
