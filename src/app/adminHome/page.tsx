'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import ProfilePanel from '../components/ProfilePanel';
import AdminMenu from '../components/AdminMenu';

export default function AdminPage() {
  const [userDetailsVisible, setUserDetailsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  function toggleUserDetails() {
    setUserDetailsVisible(!userDetailsVisible);
  }

  function logout() {
    // clear username and user details from localStorage
    localStorage.removeItem("username")
    localStorage.removeItem("loggedInUserDetails")
    router.push("/");
  }

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function handleMenuNavigation(path: string) {
    setMenuOpen(false);
    router.push(path);
  }

  return (
    <div className={styles.container}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <AdminMenu
          isOpen={menuOpen}
          onToggle={toggleMenu}
          onNavigate={handleMenuNavigation}
        />
        <h1 className={styles.barTitle}>Rent-a-Bike</h1>
        <div className={styles.rightGroup}>
          <span className={styles.icon} onClick={toggleUserDetails}>
              <Image src="/Test Account.png" alt="Test Account" width={50} height={50} />
          </span>
          <span className={styles.icon} onClick={logout}>
              <Image src="/logout.png" alt="Logout" width={50} height={50} />
          </span>
        </div>
      </div>

      <div className={styles.welcomeSection}>
        <pre className={styles.asciiArt}>
{`    __o
  _ \\<_
 (_)/(_)
`}
        </pre>
        <p className={styles.welcomeText}>Dobrodosli!</p>
      </div>

      { userDetailsVisible && <ProfilePanel onToggleUserDetails={toggleUserDetails}/> }
    </div>
  );
}
