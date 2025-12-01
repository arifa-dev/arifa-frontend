import React, { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import ring from "../../sounds/ring2.mp3";
import "./index.scss";
import { useWS } from "../../context";
import { timeAgo } from "../../utils";

interface Notification {
  id: string;
  message: string;
  time: string;
}

export const NotificationBell: React.FC = () => {
  const { data } = useWS();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!data) return;

    let parsedData: any;
    try {
      parsedData = typeof data === "string" ? JSON.parse(data) : data;
    } catch (err) {
      console.error("Invalid WS data:", data, err);
      return;
    }

    if (!parsedData.message) return;

    const newNotification: Notification = {
      id: Date.now().toString(),
      message: parsedData.message,
      time: parsedData.created_at || new Date().toISOString(),
    };

    setNotifications((prev) => [newNotification, ...prev]);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [data]);

  const unreadCount = notifications.length;
  const latestNotifications = notifications.slice(0, 50); // show latest 50

  return (
    <>
      <div className="notification-bell" onClick={() => setOpen(true)}>
        <FiBell className="icon" />
        {unreadCount > 0 && (
          <span className="badge">{unreadCount > 9 ? "9+" : unreadCount}</span>
        )}
      </div>

      {open && (
        <div className="notification-modal">
          <div className="modal-overlay" onClick={() => setOpen(false)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Notifications ({unreadCount})</h3>
              <FaTimes className="close" onClick={() => setOpen(false)} />
            </div>
            <div className="modal-body">
              {latestNotifications.length === 0 ? (
                <p className="empty">No new notifications</p>
              ) : (
                latestNotifications.map((n) => (
                  <div key={n.id} className="notification-item">
                    <p>{n.message}</p>
                    <span className="time">{timeAgo(n.time)}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <audio ref={audioRef} src={ring} preload="auto" />
    </>
  );
};
