'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function AdminPage() {
  const [confirmedEvents, setConfirmedEvents] = useState<ShoppingCartItem[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const router = useRouter();

  // Load data from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    const filtered = stored.filter((item: ShoppingCartItem) => item.state === 'confirmed');
    setConfirmedEvents(filtered);

    setNotifications(JSON.parse(localStorage.getItem("notifications")) || [])
  }, []);

  // Save changes back to localStorage
  const updateLocalStorage = (items: ShoppingCartItem[]) => {
    localStorage.setItem('shoppingCart', JSON.stringify(items));
  };

  const handleConfirm = (index: number) => {
    const updated = [...confirmedEvents];
    updated[index].state = 'accepted';
    setConfirmedEvents(updated);
    const allItems = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    const updatedAll = allItems.map((i: ShoppingCartItem) =>
      i.username === updated[index].username &&
      i.title === updated[index].title &&
      i.location === updated[index].location &&
      i.guests === updated[index].guests &&
      i.date === updated[index].date
        ? { ...i, state: 'accepted' }
        : i
    );
    updateLocalStorage(updatedAll);
    addNotification("confirm", updated[index])
  };

  const handleCancel = (index: number) => {
    const itemToRemove = confirmedEvents[index];
    addNotification("cancel", itemToRemove)
    const updated = confirmedEvents.filter((_, i) => i !== index);
    setConfirmedEvents(updated);
    const allItems = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    const updatedAll = allItems.filter(
      (i: ShoppingCartItem) =>
        !(
          i.username === itemToRemove.username &&
          i.title === itemToRemove.title &&
          i.date === itemToRemove.date &&
          i.location === itemToRemove.location &&
          i.guests === itemToRemove.guests
        )
    );
    updateLocalStorage(updatedAll);
  };

  const addNotification = (action: string, updated: ShoppingCartItem) => {
    let notification = null;
    if (action == "cancel") {
      notification = {
        username: updated.username,
        title: "Odbijeno zakazivanje događaja",
        message: "Događaj: " + updated.title + " je odbijen.",
        image: updated.image,
      }
    }
    else if (action == "confirm") {
      notification = {
        username: updated.username,
        title:  "Uspesno zakazivanje događaja",
        message: "Događaj: " + updated.title + " je uspešno zakazan.",
        image: updated.image,
      }
    }

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('notifications') || '[]');
    localStorage.setItem('notifications', JSON.stringify([...existing, notification]));
  }

  function logout() {
    // clear username and user details from localStorage
    localStorage.removeItem("username")
    localStorage.removeItem("loggedInUserDetails")
    router.push("/");
  }

  return (
    <div className={styles.container}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <span className={styles.icon} onClick={logout}>
            <Image src="/logout.png" alt="Logout" width={50} height={50} />
        </span>
        <h1 className={styles.barTitle}>Kafana kod Španca</h1>
        <button className={styles.addButton} onClick={() => router.push('/add-event')}>
          Dodaj događaj
        </button>
      </div>

      {/* List of confirmed events */}
      <div className={styles.listContainer}>
        {confirmedEvents.length === 0 ? (
          <p className={styles.noEvents}>Nema potvrđenih događaja.</p>
        ) : (
          confirmedEvents.map((item, index) => (
            <div key={index} className={styles.eventItem}>
              <div className={styles.legendColumn}>
                <p>Korisnik:</p>
                <p>Naslov:</p>
                <p>Broj zvanica:</p>
                <p>Datum:</p>
              </div>
              <div className={styles.valueColumn}>
                <p>{item.username}</p>
                <p>{item.title}</p>
                <p>{item.guests}</p>
                <p>{item.date}</p>
              </div>
              <div className={styles.buttonsColumn}>
                <button
                  className={styles.actionButton}
                  onClick={() => handleConfirm(index)}
                >
                  Potvrdi
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => handleCancel(index)}
                >
                  Otkazi
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
