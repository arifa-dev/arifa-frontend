import { FiLogOut } from "react-icons/fi";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { NotificationBell } from "../notification-bell";

interface DashHeaderProps {
  userEmail?: string;
  notificationsCount?: number;
}

export const DashHeader: React.FC<DashHeaderProps> = ({}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/signin");
  };

  return (
    <nav className="dash__header">
      {/* Left Navigation */}
      <div className="dash__nav-left">
        <Link to="." className="nav-btn">
          Subscription History
        </Link>
        <Link to="apikeys" className="nav-btn">
          ApiKeys
        </Link>
        <Link to="subscribe" className="nav-btn">
          Plans
        </Link>
        <Link to="analytics" className="nav-btn">
          Analytics
        </Link>
      </div>

      {/* Right Info */}
      <div className="dash__nav-right">
        <NotificationBell />

        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  );
};
