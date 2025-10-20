'use client'

import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Menu from '../components/Menu';
import Image from "next/image";

const HomePage = () => {

    return (
        <div className={styles.container}>
            { <Menu/> }
            
            <div className={styles.main}>
                <Image src="/naslovna1.jpg" alt="Description" width={1440} height={320} className={styles.banner}/>

                <Image src="/pozarevac-danas.jpg" alt="Description" width={1440} height={320} className={styles.poImage}/>
                <div className={styles.poBlueTint}></div>
                <p className={styles.poText}>Požarevac</p>

                <Image src="/svilajnac.jpg" alt="Description" width={1440} height={320} className={styles.svilImage}/>
                <div className={styles.svilBlueTint}></div>
                <p className={styles.svilText}>Svilajnac</p>

                <div className={styles.welcomeSection}>
                    <p className={styles.upperText}>Mesto dobre hrane i dobrog drustva</p>
                    <p className={styles.lowerText}>Dođite da se upoznamo</p>
                </div>
            </div>

        </div>
    );
};

export default HomePage;