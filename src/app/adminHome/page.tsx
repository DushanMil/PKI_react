'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import ProfilePanel from '../components/ProfilePanel';
import TopBar from '../components/TopBar';

export default function AdminPage() {
  const [userDetailsVisible, setUserDetailsVisible] = useState(false);

  return (
    <div className={styles.container}>
      <TopBar title="Rent-a-Bike" setUserDetailsVisible={setUserDetailsVisible} />

      <div className={styles.welcomeSection}>
        <pre className={styles.asciiArt}>
{`    __o
  _ \\<_
 (_)/(_)
`}
        </pre>
        <p className={styles.welcomeText}>Dobrodosli!</p>
      </div>

      {userDetailsVisible && (
        <ProfilePanel onToggleUserDetails={() => setUserDetailsVisible((prev) => !prev)} />
      )}
    </div>
  );
}
