import { FiCopy } from "react-icons/fi";
import "./index.scss";

interface ApiKeysCardProps {
  keys: {
    client: "web" | "mobile";
    testKey?: string;
    liveKey?: string;
  }[];
  copied: boolean;
  onCopy: (key: string) => void;
}

export const ApiKeysCard: React.FC<ApiKeysCardProps> = ({
  keys,
  copied,
  onCopy,
}) => {
  return (
    <div className="card api-keys-card">
      {keys.map(({ client, testKey, liveKey }) => (
        <div key={client} className="client-section">
          <h5>{client === "web" ? "Web App" : "Mobile App"}</h5>

          {testKey && (
            <div className="key">
              <span>Test:</span>
              <p>{testKey}</p>
              <button onClick={() => onCopy(testKey)}>
                <FiCopy /> {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          )}

          {liveKey && (
            <div className="key">
              <span>Live:</span>
              <p>{liveKey}</p>
              <button onClick={() => onCopy(liveKey)}>
                <FiCopy /> {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
