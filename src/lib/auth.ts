const TOKEN_KEY = "sms_token";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function logout() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

function decodeJwt(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(payload)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export type AppRole = "ADMIN" | "TEACHER" | "STUDENT" | "PARENT";

export function getRole(): AppRole | null {
  const t = getToken();
  if (!t) return null;
  const p = decodeJwt(t);
  const role = p?.role as string | undefined;
  if (role === "ADMIN" || role === "TEACHER" || role === "STUDENT" || role === "PARENT") return role;
  return null;
}

export function getUserInfo(): { id: string; email: string; role: AppRole } | null {
  const t = getToken();
  if (!t) return null;
  const p = decodeJwt(t);
  if (!p) return null;
  return {
    id: p.id as string,
    email: p.email as string,
    role: p.role as AppRole,
  };
}
