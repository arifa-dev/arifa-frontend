import { useState, useEffect } from "react";
import { Form, useActionData, redirect, Link } from "react-router-dom";
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
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const phone_number = formData.get("phone_number") as string;
  const location = formData.get("location") as string;
  const password = formData.get("password") as string;
  const re_password = formData.get("re_password") as string;

  if (password !== re_password) {
    return { error: "Passwords do not match" } as ActionData;
  }

  try {
    const { data } = await auth_api("/auth/users/", {
      method: "POST",
      body: JSON.stringify({
        email,
        first_name,
        last_name,
        phone_number,
        location,
        password,
        re_password,
      }),
    });

    if (data?.id) {
      return redirect("/email-sent");
    }
  } catch (err: any) {
    return { error: err.message || "Failed to sign up" } as ActionData;
  }
};

export const SignUpPage = () => {
  const actionData = useActionData() as ActionData;
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Stop spinner if action returns an error
  useEffect(() => {
    if (actionData?.error) {
      setLoading(false);
    }
  }, [actionData]);

  const handleSubmit = () => {
    setLoading(true);
  };

  return (
    <div className="sign__up__page">
      <div className="rrr">
        <div className="logo">
          <h1>Arifa</h1>
        </div>
        <p className="subtitle">Sign up to get started</p>
      </div>

      <Card className="signup__card">
        {actionData?.error && <div className="error">{actionData.error}</div>}

        <Form method="POST" className="signup__form" onSubmit={handleSubmit}>
          <div className="ttt">
            <div className="input__group">
              <input type="text" name="first_name" required />
              <label>First Name</label>
            </div>
            <div className="input__group">
              <input type="text" name="last_name" required />
              <label>Last Name</label>
            </div>
          </div>

          <div className="ttt">
            <div className="input__group">
              <input type="text" name="phone_number" required />
              <label>Phone Number</label>
            </div>
            <div className="input__group">
              <input type="text" name="location" required />
              <label>Location</label>
            </div>
          </div>

          <div className="input__group">
            <input type="email" name="email" required />
            <label>Email</label>
          </div>

          <div className="ttt">
            <div className="input__group">
              <input type="password" name="password" required />
              <label>Password</label>
            </div>
            <div className="input__group">
              <input type="password" name="re_password" required />
              <label>Confirm Password</label>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div
            className="terms__check"
            style={{ margin: "10px 0", textAlign: "left" }}
          >
            <label
              style={{
                fontSize: "0.85rem",
                color: "#333",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              I agree to the{" "}
              <Link to="/terms" style={{ color: "#7a2afd" }}>
                Terms & Conditions
              </Link>
            </label>
          </div>

          <button type="submit" className="btn" disabled={!agreed || loading}>
            {loading ? <FiLoader className="spin" size={20} /> : "Sign Up"}
          </button>
        </Form>

        <p className="signin__text">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </Card>
    </div>
  );
};
