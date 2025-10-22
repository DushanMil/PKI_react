"use client";
import { useEffect, useState } from "react";
import styles from "./OfferPanel.module.css";
import { useRouter } from "next/navigation";

export default function OfferPannel({ onToggleOffer }: { onToggleOffer: () => void }) {
  // This is an offer pannel that is used to display offer details
  // It's overlaid on top of other page elements
  // User can add comments and make an appointment for the offer
  
  // logged in user
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
    address: "",
    phone: ""
  });

  const [selectedOffer, setSelectedOffer] = useState<EventItem>()


  useEffect(() => {
    // Get user data from localStorage
    if (localStorage.getItem("userData")) {
      setUserDetails(JSON.parse(localStorage.getItem("loggedInUserDetails")));
    }
  }, []);
  
  const router = useRouter();

  function doSomething(attribute, value) {
  }

  function handleReturnClick() {
    localStorage.removeItem("selectedOffer")
    onToggleOffer()
  }

  return (
    <div className={styles.profileContainer}>

      {/* Slide-out panel */}
      <div className={styles.sidePanel}>
        My content

        <div className={styles.profileActions}>
          <button className={styles.btn} onClick={handleReturnClick}>Nazad</button>
        </div>
      </div>
    </div>
  );
}
