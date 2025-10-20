'use client'

import React from 'react';
import styles from "./Menu.module.css";
import { usePathname, useRouter } from 'next/navigation';
import Image from "next/image";

const Menu = () => {

    const pathname = usePathname();
    const router = useRouter();

    const goHome = () => {
        router.push("/userHome");
    }

    return (
        <header className={styles.header}>
            {/* Top bar */}
            <div className={styles.topBar}>
                <div className={styles.rightIcons}>
                    <span className={styles.icon}>
                        <Image src="/Alarm.png" alt="Alarm" width={70} height={70} />
                        <span className={styles.badge}>4</span>
                    </span>
                    <span className={styles.icon}>
                        <Image src="/Shopping cart.png" alt="Shopping cart" width={70} height={70} />
                    </span>
                    <span className={styles.icon}>
                        <Image src="/Test Account.png" alt="Test Account" width={70} height={70} />
                    </span>
                </div>
            </div>

            {/* Navigation bar */}
            <div className={styles.navBar}>
                <p className={styles.navItem} onClick={goHome}>
                    <a href="#">Naslovna</a>
                </p>

                <p className={styles.navItem}>
                    <a href="#">Događaji</a>
                </p>

                <Image src="/logo.png" alt="Kafana Kod Španca" width={300} height={250} className={styles.logo} />
                <p>Placeholder</p>

                <p className={styles.navItem}>
                    <a href="#">Ponuda</a>
                </p>

                <p className={styles.navItem}>
                    <a href="#">O nama</a>
                </p>
            </div>
            <div className={styles.navRight}>
                <Image src="/serbia_figma.png" alt="Serbian flag" width={45} height={35} className={styles.flag} />
                <Image src="/uk_figma.png" alt="UK flag" width={45} height={35} className={styles.flag} />
            </div>
        </header>
    );
};

export default Menu;