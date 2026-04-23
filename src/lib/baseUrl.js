export const BASE_URL = import.meta.env.BASE_URL || "/";

export function withBase(path = "") {
  const value = String(path || "").trim();

  if (!value) {
    return BASE_URL;
  }

  if (
    /^(?:[a-z]+:)?\/\//i.test(value) ||
    value.startsWith("data:") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:")
  ) {
    return value;
  }

  const base = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
  return `${base}${value.replace(/^\/+/, "")}`;
}

export function stripBase(path = "") {
  const value = String(path || "");

  if (!value || BASE_URL === "/") {
    return value || "/";
  }

  return value.startsWith(BASE_URL) ? value.slice(BASE_URL.length - 1) || "/" : value;
}