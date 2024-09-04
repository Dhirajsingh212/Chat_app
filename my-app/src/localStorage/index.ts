"use client"; // Ensure this is at the top

export function getItem(key: string): string {
  if (typeof window !== "undefined") {
    // Check if we're in the browser environment
    return localStorage.getItem(key) || "";
  }
  return ""; // Return a fallback value for SSR or initial render
}

export function setItem(key: string, value: any) {
  if (typeof window !== "undefined") {
    // Check if we're in the browser environment
    localStorage.setItem(key, value);
  }
}
