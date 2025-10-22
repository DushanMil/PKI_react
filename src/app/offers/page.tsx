'use client'

import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Menu from '../components/Menu';
import OfferPannel from '../components/OfferPanel';

const OffersPage = () => {
  const [offers, setOffers] = useState<EventItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const offersPerPage = 3;

  const [offerVisible, setOfferVisible] = useState(false);

  useEffect(() => {
    // Load offers from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("offers");
      if (stored) {
        setOffers(JSON.parse(stored));
      }
    }
  }, []);

  const startIndex = currentPage * offersPerPage;
  const visibleOffers = offers.slice(startIndex, startIndex + offersPerPage);

  const handleNext = () => {
    if (startIndex + offersPerPage < offers.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  function toggleOffer() {
      setOfferVisible(!offerVisible);
  }

  const handleOfferClick = (offer: EventItem) => {
    console.log("Clicked offer:", offer.title);
    // View the selected offer. This will visualise the new component
    setOfferVisible(!offerVisible)
    // set the selected offer to the localstorage
    localStorage.setItem("selectedOffer", JSON.stringify(offer))

  };

  return (
    <div className={styles.container}>
      { <Menu/> }
      <div className={styles.main}>
        <div className={styles.offersContainer}>
          {visibleOffers.map((offer, index) => (
            <div
              key={index}
              className={styles.offer}
              onClick={() => handleOfferClick(offer)}
            >
              <div className={styles.offerRow}>
                <img
                  src={offer.image}
                  alt={offer.title}
                  width={150}
                  height={100}
                  className={styles.image}
                />
                <img
                  src={offer.icon}
                  alt="icon"
                  width={30}
                  height={30}
                  className={styles.icon}
                />
                <h2 className={styles.title}>{offer.title}</h2>
              </div>
            </div>
          ))}

          <div className={styles.buttonContainer}>
            <button onClick={handlePrev} disabled={currentPage === 0}>
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex + offersPerPage >= offers.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {offerVisible && <OfferPannel onToggleOffer={toggleOffer}/> }
    </div>
  );
};

export default OffersPage;
