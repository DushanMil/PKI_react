"use client";
import { useEffect, useState } from "react";
import styles from "./ShoppingCartPanel.module.css";
import { useRouter } from "next/navigation";
import { setSourceMapsEnabled } from "process";


export default function ShoppingCartPanel({ onToggleShoppingCart }: { onToggleShoppingCart: () => void }) {
  // Notifications pannel, similar to ProfilePanel

  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>([]);

  useEffect(() => {
    // Get user data from localStorage
    // get offers from storage for logged in user
    const storedUsername = localStorage.getItem("username")
    setShoppingCart(JSON.parse(localStorage.getItem("shoppingCart")).filter(item => item.username === storedUsername) || [])
  }, []);

  function confirmItem(item) {
    // set item state to confirmed
    item.state = "confirmed"
    const itemInList = shoppingCart.find(cartItem => cartItem.username == item.username &&
      cartItem.location == item.location &&
      cartItem.guests == item.guests &&
      cartItem.title == item.title &&
      cartItem.image == item.image)
    itemInList.state = "confirmed"
    // setShoppingCart([...itemInList])
    setShoppingCart(prev =>
      prev.map(i =>
        i.username === item.username &&
        i.location === item.location &&
        i.guests === item.guests &&
        i.title === item.title &&
        i.image === item.image ? { ...i, ...itemInList } : i
      )
    );
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
  }

  function removeItem(item) {
    // just remove the item from the shopping cart
    setShoppingCart(prev => prev.filter(cartItem => !(cartItem.username == item.username &&
      cartItem.location == item.location &&
      cartItem.guests == item.guests &&
      cartItem.title == item.title &&
      cartItem.image == item.image)))
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
  }

  return (
    <div className={styles.profileContainer}>
      {/* Grey overlay */}
      <div className={styles.overlay}></div>

      {/* Slide-out panel */}
      <div className={styles.sidePanel}>
        {/* dynamically render one element per item */}
        {shoppingCart.map((notif, index) => (
          <div key={index} className={styles.shoppingCartContainer}>
            <img src={notif.image} alt="Icon" width={100} height={100}/>
            <div className={styles.itemData}>
              <p>Lokacija:</p>
              <p>Broj zvanica:</p>
              <p>Naziv:</p>
              { notif.state === "" && <button className={styles.cartItemButton} onClick={() => confirmItem(notif)}>Potvrdi</button>}
            </div>
            <div className={styles.itemData}>
              <p>{notif.location}</p>
              <p>{notif.guests}</p>
              <p>{notif.title}</p>
              { notif.state === "" && <button className={styles.cartItemButton} onClick={() => removeItem(notif)}>Otkaži</button>}
            </div>
          </div>
        ))}
        <div className={styles.profileActions}>
          <button className={styles.btn} onClick={onToggleShoppingCart}>Nazad</button>
        </div>
      </div>
    </div>
  );
}
