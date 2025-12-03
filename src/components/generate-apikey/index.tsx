import { useEffect, useState } from "react";
import "./index.scss";
import { notification_api } from "../../utils/api";
import {
  FiGlobe,
  FiSmartphone,
  FiKey,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

interface Plan {
  id: string;
  name: string;
  price: number;
  duration_days: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  concurrent: number;
}

export const GenerateAPIKeys = () => {
  const [clientType, setClientType] = useState<"web" | "mobile">("web");
  const [keyType, setKeyType] = useState<"test" | "prod">("test");
  const [host, setHost] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Active plan state
  const [activePlan, setActivePlan] = useState<Plan | null>(null);

  // Fetch active plan from backend
  useEffect(() => {
    const fetchActivePlan = async () => {
      try {
        const { response, data } = await notification_api("/active/plan", {
          method: "GET",
        });

        if (response.ok && data?.data) {
          // Backend returns "none" if no active plan
          if (data.data !== "none") {
            setActivePlan(data.data as Plan);
          }
        }
      } catch (err) {
        console.error("Failed to fetch active plan:", err);
      }
    };

    fetchActivePlan();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedKey("");
    setErrorMessage("");

    if (!activePlan) {
      setErrorMessage("No active plan available for generating API key.");
      setLoading(false);
      return;
    }

    const payload =
      clientType === "web"
        ? { client: "web", host, key_type: keyType, plan_id: activePlan.id }
        : { client: "mobile", key_type: keyType, plan_id: activePlan.id };

    try {
      const { response, data } = await notification_api("/apikey/generate", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setGeneratedKey(data?.data?.api_key || "");
      } else {
        setErrorMessage(
          data?.message || data?.error || "Failed to generate API key"
        );
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error, please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="api-form">
      <h2 className="title">
        <FiKey size={22} style={{ marginRight: "6px" }} />
        Generate API Key
      </h2>

      {/* Show Active Plan if exists */}
      {activePlan ? (
        <div className="active-plan">
          <label>Active Plan:</label>
          <select value={activePlan.id} disabled>
            <option value={activePlan.id}>{activePlan.name}</option>
          </select>
        </div>
      ) : (
        <p>No active plan available</p>
      )}

      {/* Toggle Web or Mobile */}
      <div className="toggle-row">
        <button
          className={clientType === "web" ? "active" : ""}
          onClick={() => setClientType("web")}
        >
          <FiGlobe size={16} /> Web App
        </button>
        <button
          className={clientType === "mobile" ? "active" : ""}
          onClick={() => setClientType("mobile")}
        >
          <FiSmartphone size={16} /> Mobile App
        </button>
      </div>

      {/* Security note for mobile */}
      {clientType === "mobile" && (
        <div className="security-note">
          <FiAlertTriangle size={17} />
          <span>Do not expose this key publicly.</span>
        </div>
      )}

      {/* Toggle Test or Prod */}
      <div className="toggle-row mt-2">
        <button
          className={keyType === "test" ? "active" : ""}
          onClick={() => setKeyType("test")}
        >
          Test Key (4 hrs)
        </button>
        <button
          className={keyType === "prod" ? "active" : ""}
          onClick={() => setKeyType("prod")}
        >
          Prod Key
        </button>
      </div>

      <div className="security-note light">
        <FiAlertTriangle size={16} />
        <span>Never commit API keys to GitHub. Keep your keys safe.</span>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        {clientType === "web" && (
          <div className="input-group">
            <label>Domain</label>
            <input
              type="text"
              placeholder="https://myapp.com"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              required
            />
            <small className="hint">
              Websocket requests must come from this domain.
            </small>
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Generating..." : "Generate API Key"}
        </button>
      </form>

      {errorMessage && (
        <div className="error-message">
          <FiAlertTriangle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {generatedKey && (
        <div className="result">
          <FiCheckCircle size={20} />
          <p>Your API Key:</p>
          <code>{generatedKey}</code>
        </div>
      )}
    </div>
  );
};
