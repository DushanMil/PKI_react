'use client'

import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Menu from '../components/Menu'; 

const HomePage = () => {

    return (
        <div className={styles.container}>
            { <Menu/> }
            
            <div className={styles.main}>
                {/* couple of images, pozarevac, svilajna, glupi tekst */}
            </div>

        </div>
    );
};

export default HomePage;