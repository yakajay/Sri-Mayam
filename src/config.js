const trimTrailingSlash = (value = "") => value.replace(/\/$/, "");

const apiBaseUrl = trimTrailingSlash(import.meta.env.VITE_API_BASE_URL || "");

export const apiConfig = {
  baseUrl: apiBaseUrl,
  timeoutMs: Number(import.meta.env.VITE_API_TIMEOUT_MS || 10000),
  endpoints: {
    sevas: import.meta.env.VITE_SEVAS_ENDPOINT || "/sevas",
    benefits: import.meta.env.VITE_BENEFITS_ENDPOINT || "/benefits",
    testimonials: import.meta.env.VITE_TESTIMONIALS_ENDPOINT || "/testimonials",
    faqs: import.meta.env.VITE_FAQS_ENDPOINT || "/faqs",
    booking: import.meta.env.VITE_BOOKING_ENDPOINT || "/bookings",
  },
};

export const buildApiUrl = (endpoint) => {
  if (/^https?:\/\//i.test(endpoint)) {
    return endpoint;
  }

  if (!apiConfig.baseUrl) {
    return endpoint;
  }

  return `${apiConfig.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
};
