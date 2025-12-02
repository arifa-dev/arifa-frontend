import { useState } from "react";
import { auth_api } from "../../utils/api";

export const EmailSentPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleResend = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const email = localStorage.getItem("pending_email");
      if (!email) {
        setMessage("Missing email. Please register again.");
        setLoading(false);
        return;
      }

      const { data } = await auth_api("/auth/users/resend_activation/", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      setMessage(data?.detail || "Activation email has been resent!");
    } catch (err: any) {
      setMessage(err.message || "Failed to resend activation email");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📧 Email Sent!</h1>
      <p style={styles.message}>
        We've sent a verification email to your inbox. Please click the link to
        activate your account.
      </p>

      <button style={styles.button} onClick={handleResend} disabled={loading}>
        {loading ? "Sending..." : "Resend Activation Email"}
      </button>

      {message && (
        <p style={{ marginTop: 15, color: "#333", fontSize: "15px" }}>
          {message}
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    textAlign: "center" as const,
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: "28px",
    color: "#333",
    marginBottom: "10px",
  },
  message: {
    fontSize: "16px",
    color: "#555",
    maxWidth: "400px",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#7a2afd",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
