import { useNavigate } from "react-router-dom";
import "./index.scss";

export const Pricing = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  return (
    <section id="pricing" className="pricing-section">
      <h2>Pricing</h2>

      <div className="pricing-grid">
        <div className="plan">
          <h3>Developer</h3>
          <div className="price">Free</div>
          <ul>
            <li>One-time test apikey valid for 4hrs</li>
          </ul>
          <button className="btn-primary" onClick={handleNavigate}>
            Get Started
          </button>
        </div>

        <div className="plan popular">
          <h3>Pro</h3>
          <div className="price">Ksh 350 / Month</div>
          <ul>
            <li>Unlimited notifications</li>
            <li>Live apikey</li>
          </ul>
          <button className="btn-primary" onClick={handleNavigate}>
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
};
