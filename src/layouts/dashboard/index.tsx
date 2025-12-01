import "./index.scss";
import { useState } from "react";
import { ApiKeysCard, SubscriptionCard, DashHeader } from "../../components";
import { Outlet } from "react-router-dom";
import { useUserApiKeysInfo } from "../../hooks";
import { FiRefreshCw } from "react-icons/fi";

export const UserDashboard = () => {
  const [copied, setCopied] = useState(false);
  const { data, loading, error, refetch } = useUserApiKeysInfo();

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  // Organize keys by client and type
  const liveWeb =
    data?.live_keys.find((k) => k.client === "web")?.api_key || "";
  const liveMobile =
    data?.live_keys.find((k) => k.client === "mobile")?.api_key || "";
  const testWeb =
    data?.test_keys.find((k) => k.client === "web")?.api_key || "";
  const testMobile =
    data?.test_keys.find((k) => k.client === "mobile")?.api_key || "";

  const subscriptionStatus = {
    plan: "Pro",
    nextBilling: data?.subscription?.next_billing_date || "-",
    daysRemaining: data?.subscription?.days_remaining || 0,
  };

  return (
    <div className="user__dashboard">
      <div className="header">
        <DashHeader />
      </div>

      <aside className="left__panel">
        <SubscriptionCard {...subscriptionStatus} />

        <div className="refresh-wrapper">
          <h4>
            Your API Keys
            <button
              className="refresh-btn"
              onClick={() => refetch()}
              title="Refresh API Keys"
            >
              <FiRefreshCw />
            </button>
          </h4>

          <ApiKeysCard
            keys={[
              { client: "web", testKey: testWeb, liveKey: liveWeb },
              { client: "mobile", testKey: testMobile, liveKey: liveMobile },
            ]}
            copied={copied}
            onCopy={copyToClipboard}
          />
        </div>
      </aside>

      <div className="content">
        <Outlet />
        <br />
        <span style={{ fontSize: "0.8rem", color: "#555" }}>
          <small style={{ marginRight: "4px" }}>
            © {new Date().getFullYear()}
          </small>
          Arifa — All rights reserved.
        </span>
      </div>
    </div>
  );
};
