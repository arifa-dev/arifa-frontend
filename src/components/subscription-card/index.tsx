import "./index.scss";

interface SubscriptionCardProps {
  plan: string;
  nextBilling: string;
  daysRemaining: number;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  plan,
  nextBilling,
  daysRemaining,
}) => {
  return (
    <div className="card subscription-card">
      <h4>Subscription Status</h4>
      <p>
        <strong>Plan:</strong> {plan}
      </p>
      <p>
        <strong>Next Billing:</strong> {nextBilling}
      </p>
      <p>
        <strong>Days Remaining:</strong> {daysRemaining} days
      </p>
    </div>
  );
};
