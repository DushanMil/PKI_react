"use client";
import { useEffect, useState } from "react";
import styles from "./NotificationsPanel.module.css";
import { useRouter } from "next/navigation";


export default function NotificationsPanel({ onToggleNotifications }: { onToggleNotifications: () => void }) {
  // Notifications pannel, similar to ProfilePanel
  
  // logged in user
  const [username, setUsername] = useState("");

  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [userNotifications, setUserNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    // Get user data from localStorage
    // get notifications from storage for logged in user
    const storedUsername = localStorage.getItem("username")
    setUsername(storedUsername)
    setNotifications(JSON.parse(localStorage.getItem("notifications")).filter(notif => notif.username === storedUsername) || [])
  }, []);
  
  const router = useRouter();

  return (
    <div className={styles.profileContainer}>
      {/* Grey overlay */}
      <div className={styles.overlay}></div>

      {/* Slide-out panel */}
      <div className={styles.sidePanel}>
        {/* dynamically render one element per item */}
        {notifications.map((notif, index) => (
          <div key={index} className={styles.notifContainer}>
            <img src={notif.image} alt="Icon" width={40} height={40} style={{ borderRadius: "50%" }}/>
            <div>
              <p>{notif.title}</p>
              <p>{notif.message}</p>
            </div>
          </div>
        ))}
        <div className={styles.profileActions}>
          <button className={styles.btn} onClick={onToggleNotifications}>Nazad</button>
        </div>
      </div>
    </div>
  );
}
