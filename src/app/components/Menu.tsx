'use client'

import { useState, useEffect } from 'react';
import styles from "./Menu.module.css";
import { usePathname, useRouter } from 'next/navigation';
import Image from "next/image";
import ProfilePanel from './ProfilePanel';
import NotificationsPanel from './NotificationsPanel';
import ShoppingCartPanel from './ShoppingCartPanel';

const Menu = () => {

    const [userDetailsVisible, setUserDetailsVisible] = useState(false);
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [shoppingCartVisible, setShoppingCartVisible] = useState(false);
    const [userNotificationItems, setUserNotificationItems] = useState(0) 
    const router = useRouter();

    const goHome = () => {
        router.push("/userHome");
    }

    // here logic is needed for slide-in panels from the right
    function toggleUserDetails() {
        setUserDetailsVisible(!userDetailsVisible);
    }

    function toggleNotifications() {
        setNotificationsVisible(!notificationsVisible);
    }

    function toggleShoppingCart() {
        setShoppingCartVisible(!shoppingCartVisible);
    }

    function logout() {
        // clear username and user details from localStorage
        localStorage.removeItem("username")
        localStorage.removeItem("loggedInUserDetails")
        router.push("/");
    }

    useEffect(() => {
        let username = "";
        username = localStorage.getItem("username");
        const notifications = JSON.parse(localStorage.getItem("notifications"))
        setUserNotificationItems(notifications === null ? 0 : notifications.filter(notif => notif.username === username).length);
    }, []);

    return (
        <header className={styles.header}>
            {/* Top bar */}
            <div className={styles.topBar}>
                <div className={styles.rightIcons}>
                    <span className={styles.icon} onClick={toggleNotifications}>
                        <Image src="/Alarm.png" alt="Alarm" width={70} height={70} />
                        <span className={styles.badge}>{userNotificationItems}</span>
                    </span>
                    <span className={styles.icon} onClick={toggleShoppingCart}>
                        <Image src="/Shopping cart.png" alt="Shopping cart" width={70} height={70} />
                    </span>
                    <span className={styles.icon} onClick={toggleUserDetails}>
                        <Image src="/Test Account.png" alt="Test Account" width={70} height={70} />
                    </span>
                    <span className={styles.icon} onClick={logout}>
                        <Image src="/logout.png" alt="Logout" width={70} height={70} />
                    </span>
                </div>
            </div>

            {/* Navigation bar */}
            <div className={styles.navBar}>
                <p className={styles.navItem} onClick={goHome}>
                    <a href="/userHome">Naslovna</a>
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
                    <a href="/aboutCompany">O nama</a>
                </p>
            </div>
            <div className={styles.navRight}>
                <Image src="/serbia_figma.png" alt="Serbian flag" width={45} height={35} className={styles.flag} />
                <Image src="/uk_figma.png" alt="UK flag" width={45} height={35} className={styles.flag} />
            </div>

            { userDetailsVisible && <ProfilePanel onToggleUserDetails={toggleUserDetails}/> }
            { notificationsVisible && <NotificationsPanel onToggleNotifications={toggleNotifications}/> }
            { shoppingCartVisible && <ShoppingCartPanel onToggleShoppingCart={toggleShoppingCart}/> }
        </header>
    );
};

export default Menu;