import "./index.scss";

export const Features = () => {
  return (
    <section id="features" className="features-section">
      <h2>Powerful Features</h2>

      <div className="features-grid">
        <div className="feature-card">
          <h3>⚡ Real-Time Delivery</h3>
          <p>Send instant notifications using a fast WebSocket engine.</p>
        </div>

        <div className="feature-card">
          <h3>🛡️ Secure API Keys</h3>
          <p>Each user gets a dedicated, secure API key.</p>
        </div>

        <div className="feature-card">
          <h3>📱 Cross-Platform</h3>
          <p>Works on web apps, backend services, and mobile apps.</p>
        </div>
        <div className="feature-card">
          <h3>Push Notifications</h3>
          <p>Coming Soon!!</p>
        </div>
      </div>
    </section>
  );
};
