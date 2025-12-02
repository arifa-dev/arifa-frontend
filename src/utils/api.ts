const AUTH_BASE_URL = "https://auth.arifa.dev/bff_v001";
const COMMERCE_BASE_URL = "https://notifications.arifa.dev/bff_v001";

export async function auth_api(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ response: Response; data: any }> {
  const token = localStorage.getItem("accessToken");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${AUTH_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  let data: any = null;
  try {
    data = await response.json();
  } catch {}

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${JSON.stringify(data)}`);
  }

  return { response, data };
}

export async function notification_api(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ response: Response; data: any }> {
  const token = localStorage.getItem("accessToken");

  const isFormData = options.body instanceof FormData;

  const headers: HeadersInit = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${COMMERCE_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  // Parse JSON data here
  const data = await response.json();

  // Return both response and data
  return { response, data };
}
