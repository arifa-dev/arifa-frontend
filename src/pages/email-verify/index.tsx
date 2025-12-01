import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth_api } from "../../utils/api";

export const ActivationPage = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  const activateAccount = async () => {
    if (!uid || !token) {
      setStatus("error");
      setMessage("Missing activation parameters.");
      return;
    }

    try {
      const { data } = await auth_api("/auth/users/activation/", {
        method: "POST",
        body: JSON.stringify({ uid, token }),
      });

      setStatus("success");
      setMessage(data?.detail || "Your account has been activated!");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Activation failed.");
    }
  };

  useEffect(() => {
    activateAccount();
  }, []);

  return (
    <div style={styles.container}>
      {status === "loading" && <h2>Activating your account...</h2>}

      {status === "success" && (
        <>
          <h2 style={styles.success}>{message}</h2>
          <button style={styles.button} onClick={() => navigate("/signin")}>
            Go to Login
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <h2 style={styles.error}>{message}</h2>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    textAlign: "center" as const,
  },
  success: {
    color: "green",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    background: "#5c62f7",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
  },
};






