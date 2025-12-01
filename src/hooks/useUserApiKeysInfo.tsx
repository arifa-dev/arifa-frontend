import { useState, useEffect } from "react";
import { notification_api } from "../utils/api";

// Types
export interface ApiKeyInfo {
  api_key: string;
  key_type: string;
  client: string;
  status: string; // active / expired / deactivated
  expires_at?: string;
  created_at: string;
}

export interface SubscriptionInfo {
  active: boolean;
  start_date?: string;
  end_date?: string;
  days_remaining: number;
  next_billing_date?: string;
}

export interface UserApiData {
  subscription?: SubscriptionInfo;
  live_keys: ApiKeyInfo[];
  test_keys: ApiKeyInfo[];
}

// Hook
export const useUserApiKeysInfo = () => {
  const [data, setData] = useState<UserApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchUserApiData = async () => {
    setLoading(true);
    setError("");

    try {
      const { response, data } = await notification_api("/apikey/info", {
        method: "GET",
      });

      if (response.ok) {
        setData(data);
      } else {
        setError(data?.error || "Failed to fetch API keys info");
      }
    } catch (err) {
      console.error(err);
      setError("Network error, please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUserApiData();
  }, []);

  return { data, loading, error, refetch: fetchUserApiData };
};
