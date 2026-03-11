'use client';

import React, { useState } from 'react';
import adminStyles from '../adminHome/page.module.css';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProfilePanel from '../components/ProfilePanel';
import AdminMenu from '../components/AdminMenu';

export default function BiciklePage() {
  const [userDetailsVisible, setUserDetailsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  function toggleUserDetails() {
    setUserDetailsVisible(!userDetailsVisible);
  }

  function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('loggedInUserDetails');
    router.push('/');
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
      <div className={adminStyles.topBar}>
        <AdminMenu
          isOpen={menuOpen}
          onToggle={toggleMenu}
          onNavigate={handleMenuNavigation}
        />
        <h1 className={adminStyles.barTitle}>Kafana kod Španca</h1>
        <div className={adminStyles.rightGroup}>
          <span className={adminStyles.icon} onClick={toggleUserDetails}>
            <Image src="/Test Account.png" alt="Test Account" width={50} height={50} />
          </span>
          <span className={adminStyles.icon} onClick={logout}>
            <Image src="/logout.png" alt="Logout" width={50} height={50} />
          </span>
        </div>
      </div>

      <div className={adminStyles.listContainer}>
        <p className={styles.pageMessage}>Stranica za bicikle je u pripremi.</p>
      </div>

      {userDetailsVisible && <ProfilePanel onToggleUserDetails={toggleUserDetails} />}
    </div>
  );
}
