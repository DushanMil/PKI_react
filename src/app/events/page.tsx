'use client'

import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Menu from '../components/Menu';

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "petlovac_carousel.jpg",
    title: "Veridba kod bata Mile",
    description: "Nezaboravan provod u raju zemaljskom zvanom Petlovac",
  },
  {
    id: 2,
    image: "vlaska_carousel.jpg",
    title: "Vlaška svadba",
    description: "Veselje sa živom muzikom, masnom hranom i rodbinom",
  },
  {
    id: 3,
    image: "zurka_carousel.jpg",
    title: "Žurka za mlade",
    description: "Tehno žurka za najmlađu publiku sa DJ i povoljnim pićem",
  },
  {
    id: 4,
    image: "dragana_carousel.jpg",
    title: "Koncert Dragane",
    description: "Nasa Dragana drži koncert za publiku svih uzrasta",
  },
  {
    id: 5,
    image: "veridba_carousel.jpg",
    title: "Prostor sa svadbe",
    description: "Zapoćnite vaš brak velikom proslavom u našem prostoru",
  },
  {
    id: 6,
    image: "prase_carousel.jpg",
    title: "Praseća gozba",
    description: "Masna hrana pećenje i ladno pivo",
  },
];

const EventsPage = () => {

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex(prev => (prev + 1) % slides.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const visibleSlides = [
    slides[startIndex],
    slides[(startIndex + 1) % slides.length],
    slides[(startIndex + 2) % slides.length],
  ];

  return (
    <div className={styles.container}>
      { <Menu/> }
        
      <div className={styles.main}>
          <div className={styles.carouselContent}>
            {visibleSlides.map(slide => (
              <div key={slide.id} className={styles.slide}>
                <h2 className={styles.title}>{slide.title}</h2>
                <div className={styles.imageWrapper}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    width={400}
                    height={300}
                    className={styles.image}
                  />
                </div>
                <p className={styles.description}>{slide.description}</p>
              </div>
            ))}
          </div>
      </div>

    </div>
  );
};

export default EventsPage;
