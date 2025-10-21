'use client'

import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Menu from '../components/Menu';
import Image from "next/image";

const AboutCompanyPage = () => {

    return (
        <div className={styles.container}>
          { <Menu/> }
            
          <div className={styles.main}>
              <Image src="/mesiste.jpg" alt="Description" width={250} height={400}/>
              <div>
                <div>
                  <p className={styles.title}>Požarevac - Centrala</p>
                  <p>Mitra Mirića bb</p>
                  <p>+381/63-18-500-67</p>
                  <p>kafanakodspanca@gmail.com</p>
                </div>
                <div>
                  <p className={styles.title}>Svilajnac - Istureno odeljenje</p>
                  <p>Halida Bešlića bb</p>
                  <p>+381/69-99-500-67</p>
                  <p>kafana.svilajnac@gmail.com</p>
                </div>
                <div>
                  <p className={styles.title}>Petlovac - Omaž Radošu Bajiću</p>
                  <p>Glavna ulica bb</p>
                  <p>+381/69-99-500-67</p>
                  <p>kafana.petlovac@gmail.com</p>
                </div>
              </div>
              <Image src="/mapa.png" alt="Description" width={500} height={500}/>
          </div>

        </div>
    );
};

export default AboutCompanyPage;