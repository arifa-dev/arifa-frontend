import { useState } from "react";
import "./index.scss";
import { notification_api } from "../../utils/api";

import {
  FiGlobe,
  FiSmartphone,
  FiKey,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

export const GenerateAPIKeys = () => {
  const [clientType, setClientType] = useState<"web" | "mobile">("web");
  const [keyType, setKeyType] = useState<"test" | "prod">("test");

  const [host, setHost] = useState("");

  const [loading, setLoading] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedKey("");
    setErrorMessage("");

    const payload =
      clientType === "web"
        ? { client: "web", host, key_type: keyType }
        : { client: "mobile", key_type: keyType };

    try {
      const { response, data } = await notification_api("/apikey/generate", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setGeneratedKey(data?.data?.api_key || "");
      } else {
        // Backend may return message field
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

      {/* Additional security note */}
      <div className="security-note light">
        <FiAlertTriangle size={16} />
        <span>Never commit API keys to GitHub. Keep your keys safe.</span>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        {/* Web Domain Input */}
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

      {/* Display error message */}
      {errorMessage && (
        <div className="error-message">
          <FiAlertTriangle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Display generated key */}
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
