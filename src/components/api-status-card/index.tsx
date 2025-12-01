import "./index.scss";

interface ApiStatusCardProps {
  active: boolean;
}

export const ApiStatusCard: React.FC<ApiStatusCardProps> = ({ active }) => {
  return (
    <div className="card api-status-card">
      <h4>API Key Status</h4>
      <div className="status">
        <span className={`status-dot ${active ? "live" : "offline"}`}></span>
        {active ? "Live" : "Offline / Test"}
      </div>
    </div>
  );
};
