import "./index.scss";

export const FAQ = () => {
  return (
    <section id="faq" className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-container">
        <div className="faq-item">
          <h4>How does Arifa send notifications?</h4>
          <p>
            We use secure WebSockets + your API key to deliver instant messages.
          </p>
        </div>

        <div className="faq-item">
          <h4>How do I get an API key?</h4>
          <p>
            Once you create an account and subscribe, your API key is generated
            automatically.
          </p>
        </div>

        <div className="faq-item">
          <h4>Can I use this with React Native?</h4>
          <p>Yes! Arifa supports mobile apps through WebSockets.</p>
        </div>

        <div className="faq-item">
          <h4>Do you offer a free trial?</h4>
          <p>Yes. The starter plan is free forever.</p>
        </div>
      </div>
    </section>
  );
};
