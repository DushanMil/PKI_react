'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Swal from 'sweetalert2';

export default function AdminAddEvent() {
  const [confirmedEvents, setConfirmedEvents] = useState<ShoppingCartItem[]>([]);
  const router = useRouter();

  // Load data from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    const filtered = stored.filter((item: ShoppingCartItem) => item.state === 'confirmed');
    setConfirmedEvents(filtered);
  }, []);

  const [image, setImage] = useState('vlaska.png');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  const handleConfirm = () => {
    if (!image || !title || !text || !price || !location) {
      Swal.fire({
        text: "Popunite sva polja.",
        icon: "warning",
        iconColor: "#959595",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      return;
    }
    const newEvent: EventItem = { title, text, price, image, icon: "party.png", location, comments: [], };
    const existing = JSON.parse(localStorage.getItem('offers') || '[]');
    localStorage.setItem('offers', JSON.stringify([...existing, newEvent]));
    
    Swal.fire({
      text: "Dodat novi događaj.",
      icon: "success",
      iconColor: "green",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  };

  const handleClear = () => {
    setImage('')
    setTitle('')
    setText('')
    setPrice('')
    setLocation('')
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
        <button className={styles.addButton} onClick={() => router.push('/adminHome')}>
          Nazad
        </button>
      </div>

      <div className={styles.eventItem}>
        <div className={styles.legendColumn}>
          <p>Slika:</p>
          <p>Naziv:</p>
          <p>Opis:</p>
          <p>Lokacija:</p>
          <p>Cena:</p>
        </div>

        <div className={styles.valueColumn}>
          <div className={styles.inputRow}>
            <img src={'/logos/image.png'} alt="logo" width={20} height={20} />
            <select value={image} onChange={(e) => setImage(e.target.value)}>
              <option value="vlaska_carousel.jpg">vlaska.png</option>
              <option value="zurka_carousel.jpg">bgZurka.png</option>
              <option value="svadba_carousel.jpg">svadba.png</option>
              <option value="dragana_carousel.jpg">dragana.png</option>
              <option value="petlovac_carousel.jpg">petlovac.png</option>
            </select>
          </div>

          <div className={styles.inputRow}>
            <img src="/logos/title.png" alt="title logo" width={20} height={20} />
            <input type="text" value={title} placeholder='Unesi naziv' onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className={styles.inputRow}>
            <img src="/logos/text.png" alt="text logo" width={20} height={20} />
            <input type="text" value={text} placeholder='Unesi opis' onChange={(e) => setText(e.target.value)} />
          </div>

          <div className={styles.inputRow}>
            <img src="/logos/location.png" alt="text logo" width={20} height={20} />
            <input type="text" value={location} placeholder='Unesi lokaciju' onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div className={styles.inputRow}>
            <img src="/logos/price.png" alt="price logo" width={20} height={20} />
            <input type="text" value={price} placeholder='Unesi cenu' onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>

        <div className={styles.buttonsColumn}>
          <button className={styles.actionButton} onClick={handleConfirm}>
            Potvrdi
          </button>
          <button className={styles.actionButton} onClick={handleClear}>
            Obrisi
          </button>
        </div>
      </div>
    </div>
  );
}
