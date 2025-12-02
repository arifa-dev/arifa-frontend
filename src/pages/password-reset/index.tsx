import "./index.scss";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { auth_api } from "../../utils/api";

/* 1. REQUEST RESET PASSWORD */
export const RequestResetPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await auth_api("/auth/users/reset_password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="reset__container">
      <div className="reset__card">
        <h2>Password Reset</h2>
        <p className="subtitle">Enter your email to receive a reset link.</p>

        <form onSubmit={handleSubmit}>
          <div className="input__group">
            <input
              className="reset-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="reset-label">Email</label>
          </div>

          {status === "success" && (
            <p className="success">Link sent! Check your email</p>
          )}
          {status === "error" && (
            <p className="error">Email not found or server error.</p>
          )}

          <button className="btn" disabled={status === "loading"}>
            {status === "loading" ? (
              <FiLoader className="spin" size={20} />
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

/* 2. RESET PASSWORD FORM */
export const ResetPasswordForm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      await auth_api("/auth/users/reset_password_confirm/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid,
          token,
          new_password: password,
          re_new_password: password2,
        }),
      });

      setStatus("success");
      setTimeout(() => navigate("/signin"), 1500);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="reset__container">
      <div className="reset__card">
        <h2>Set New Password</h2>
        <p className="subtitle">Enter and confirm your new password.</p>

        <form onSubmit={handleSubmit}>
          <div className="input__group">
            <input
              className="reset-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="reset-label">New Password</label>
          </div>

          <div className="input__group">
            <input
              className="reset-input"
              type="password"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <label className="reset-label">Confirm Password</label>
          </div>

          {status === "success" && (
            <p className="success">Password updated. Redirecting...</p>
          )}
          {status === "error" && (
            <p className="error">Something went wrong. Try again.</p>
          )}

          <button className="btn" disabled={status === "loading"}>
            {status === "loading" ? (
              <FiLoader className="spin" size={20} />
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
