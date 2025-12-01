export const EmailSentPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📧 Email Sent!</h1>
      <p style={styles.message}>
        We've sent a verification email to your inbox. Please check your email
        and click the verification link to activate your account.
      </p>
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
