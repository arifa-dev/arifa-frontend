import { useState, useEffect } from "react";
import { Form, useActionData, Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { auth_api } from "../../../utils/api";
import { Card } from "../../../components/ui";
import "./index.scss";

type ActionData = {
  error?: string;
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { data } = await auth_api("/auth/jwt/create/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data?.access) {
      localStorage.setItem("accessToken", data.access);
      window.location.href = "/dashboard"; // redirect after successful login
    }
  } catch (err: any) {
    return { error: err.message || "Failed to login" } as ActionData;
  }
};

export const SignInPage = () => {
  const actionData = useActionData() as ActionData;
  const [loading, setLoading] = useState(false);

  // Reset loading if there is an error returned from action
  useEffect(() => {
    if (actionData?.error) {
      setLoading(false);
    }
  }, [actionData]);

  const handleSubmit = () => {
    setLoading(true);
  };

  return (
    <div className="sign__in__page">
      <div className="rrr">
        <div className="logo">
          <h1>Arifa</h1>
        </div>
        <p className="subtitle">Sign in to continue</p>
      </div>

      <Card className="login__card">
        {actionData?.error && <div className="error">{actionData.error}</div>}

        <Form method="POST" className="login__form" onSubmit={handleSubmit}>
          <div className="input__group">
            <input type="email" name="email" required />
            <label>Email</label>
          </div>

          <div className="input__group">
            <input type="password" name="password" required />
            <label>Password</label>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? <FiLoader className="spin" size={20} /> : "Sign In"}
          </button>
        </Form>

        <p className="signup__text">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </Card>
    </div>
  );
};
