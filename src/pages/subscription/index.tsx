import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { notification_api } from "../../utils/api";
import "./index.scss";

type Plan = {
  id: string;
  name: string;
  price: number;
  features: string[];
  concurrent: number;
};

export function SubscriptionPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingPlans, setLoadingPlans] = useState(true);

  // Fetch plans from backend
  useEffect(() => {
    const fetchPlans = async () => {
      setLoadingPlans(true);
      try {
        const { response, data } = await notification_api("/plans");
        if (!response.ok) {
          setError(data?.message || "Failed to fetch plans");
          setPlans([]);
        } else if (data?.data?.length === 0) {
          setError("No plans available at the moment");
          setPlans([]);
        } else {
          // Transform backend plan with features into our Plan type
          const formattedPlans = data.data.map((p: any) => ({
            id: p.plan.id,
            name: p.plan.name,
            price: p.plan.price,
            features: p.features.map((f: any) => f.feature),
            concurrent: p.plan.concurrent,
          }));
          setPlans(formattedPlans);
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (planId: string) => {
    // Accept numbers starting with 2547 and 8-10 extra digits
    const phoneRegex = /^2547\d{8,10}$/;

    if (!phoneRegex.test(phone)) {
      setError(
        "Please enter a valid phone number in the format 2547XXXXXXXX or longer (up to 13 digits)"
      );
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const { response, data } = await notification_api(
        "/subscription/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan_id: planId, phone_number: phone }),
        }
      );

      if (!response.ok) {
        setError(data?.message || "Failed to create subscription");
      } else {
        setMessage(
          "Subscription created successfully! Follow the M-Pesa prompt."
        );
        setPhone("");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loadingPlans) return <p>Loading plans...</p>;

  return (
    <div className="subscription">
      <h1 className="subscription__title">Choose Your Plan</h1>
      <p className="subscription__desc">
        Subscribe with your M-Pesa number and get instant access.
      </p>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <div className="subscription__grid">
        {plans.map((plan) => (
          <div key={plan.id} className="plan-card">
            <h2 className="plan-card__name">{plan.name}</h2>
            <p className="plan-card__price">
              Ksh {plan.price}
              <span>/ month</span>
            </p>

            <ul className="plan-card__features">
              <li>
                <FaCheck className="icon" />
                {plan.concurrent} concurrent connections
              </li>

              {plan.features.map((f, index) => (
                <li key={index}>
                  <FaCheck className="icon" /> {f}
                </li>
              ))}
            </ul>

            <input
              type="tel"
              placeholder="254712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="plan-card__input"
              required
            />

            <button
              className="plan-card__btn"
              onClick={() => handleSubscribe(plan.id)}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FiRefreshCcw className="rotating" /> Processing...
                </>
              ) : (
                "Subscribe Now"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
