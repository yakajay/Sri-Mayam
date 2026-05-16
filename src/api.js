import { apiConfig, buildApiUrl } from "./config";

const withTimeout = async (request, timeoutMs) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await request(controller.signal);
  } finally {
    window.clearTimeout(timeoutId);
  }
};

const parseResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API request failed with ${response.status}`);
  }

  return response.json();
};

export const fetchCollection = async (endpointKey, fallbackData) => {
  if (!apiConfig.baseUrl) {
    return fallbackData;
  }

  try {
    const response = await withTimeout(
      (signal) =>
        fetch(buildApiUrl(apiConfig.endpoints[endpointKey]), { signal }),
      apiConfig.timeoutMs,
    );
    const data = await parseResponse(response);
    return Array.isArray(data) ? data : data.items || fallbackData;
  } catch (error) {
    console.warn(`Sri Mayam: using fallback ${endpointKey} data.`, error);
    return fallbackData;
  }
};

export const submitBooking = async (booking) => {
  if (!apiConfig.baseUrl) {
    return { ok: true, offline: true };
  }

  const response = await withTimeout(
    (signal) =>
      fetch(buildApiUrl(apiConfig.endpoints.booking), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
        signal,
      }),
    apiConfig.timeoutMs,
  );

  return parseResponse(response);
};
