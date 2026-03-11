import React, { useState } from 'react';
import Image from 'next/image';
import AdminMenu from './AdminMenu';
import styles from './TopBar.module.css';
import { useRouter } from 'next/navigation';

type TopBarProps = {
  title: string;
  setUserDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TopBar({
  title,
  setUserDetailsVisible,
}: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  function toggleUserDetails() {
    setUserDetailsVisible((prev) => !prev);
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
    <div className={styles.topBar}>
      <AdminMenu isOpen={menuOpen} onToggle={toggleMenu} onNavigate={handleMenuNavigation} />
      <h1 className={styles.barTitle}>{title}</h1>
      <div className={styles.rightGroup}>
        <span className={styles.icon} onClick={toggleUserDetails}>
          <Image src="/Test Account.png" alt="Test Account" width={50} height={50} />
        </span>
        <span className={styles.icon} onClick={logout}>
          <Image src="/logout.png" alt="Logout" width={50} height={50} />
        </span>
      </div>
    </div>
  );
}
