'use client'

import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";

const HomePage = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('next');

    const images1 = [
        "/home_lake.png",
        "/home_18.png",
        "/home_wed.jpg"
    ];
    
    const images2 = [
        "/home_tr.jpg",
        "/home_wine.jpeg",
        "/home_corp.jpg"
    ];

    const images3 = [
        "/home_venue.jpg",
        "/home_ppl.jpg",
        "/home_bw.jpg"
    ];

    const nextSlide = () => {
        setDirection('next');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images1.length); 
    };

    const prevSlide = () => {
        setDirection('prev');
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images1.length) % images1.length); 
    };

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 3000); // 3s
        return () => clearInterval(intervalId);
    }, []); 


    return (
        <div>
            {/* <Menu/> */}
            
            <div className={styles.title}>
                <p>PORTFOLIO</p>
            </div>

            <div className={styles.carouselContainer}>  
                <div className={`${styles.carouselSlide} ${styles[direction]}`}> 
                    <img src={images1[currentIndex]} alt={`Slika ${currentIndex + 1}`} />
                    <img src={images2[currentIndex]} alt={`Slika ${currentIndex + 1}`} />
                    <img src={images3[currentIndex]} alt={`Slika ${currentIndex + 1}`} />
                </div> 
            </div>

        </div>
    );
};

export default HomePage;