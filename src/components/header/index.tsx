import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "./index.scss";
import logo from "../../assets/images/logo.png";

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className={`links ${open ? "show" : ""}`}>
        <a href="#features" onClick={() => setOpen(false)}>
          Features
        </a>
        <a
          href="https://notifications.arifa.dev/docs/"
          onClick={() => setOpen(false)}
        >
          Docs
        </a>
        <a href="#pricing" onClick={() => setOpen(false)}>
          Pricing
        </a>
        <a href="#faq" onClick={() => setOpen(false)}>
          FAQ
        </a>

        {/* Auth Buttons inside mobile menu */}
        <div className="auth mobile-auth">
          <a href="/dashboard" className="login">
            Sign In
          </a>
          <a href="/signup" className="register">
            Sign Up
          </a>
        </div>
      </div>

      <div className="auth desktop-auth">
        <a href="/dashboard" className="login">
          Sign In
        </a>
        <a href="/signup" className="register">
          Sign Up
        </a>
      </div>

      <div className="menu-icon" onClick={() => setOpen(!open)}>
        {open ? <FiX size={28} /> : <FiMenu size={28} />}
      </div>
    </nav>
  );
};
