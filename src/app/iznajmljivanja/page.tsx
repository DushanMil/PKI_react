'use client';

import React, { useEffect, useState } from 'react';
import adminStyles from '../adminHome/page.module.css';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProfilePanel from '../components/ProfilePanel';
import AdminMenu from '../components/AdminMenu';
import type { Rent, RentStatus } from '../types/Rent';
import type { UserData } from '../types/UserData';

export default function IznajmljivanjaPage() {
  const [userDetailsVisible, setUserDetailsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rents, setRents] = useState<Rent[]>([]);
  const [selectedRent, setSelectedRent] = useState<Rent | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>('');
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

  useEffect(() => {
    if (localStorage.getItem('rents')) {
      setRents(JSON.parse(localStorage.getItem('rents') ?? '[]'));
    } else {
      setRents([]);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      setUsers(JSON.parse(localStorage.getItem('userData') ?? '[]'));
    }
  }, []);

  useEffect(() => {
    if (rents.length > 0) {
      localStorage.setItem('rents', JSON.stringify(rents));
    }
  }, [rents]);

  function formatTime(timestamp: number) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  function getStatusLabel(status: RentStatus) {
    return status === 'inProgress' ? 'U toku' : 'Zavrseno';
  }

  function handleUserClick(username: string) {
    const user = users.find((item) => item.username === username) ?? null;
    setSelectedUser(user);
    if (user) {
      setSelectedUserEmail(`${user.username}@example.com`);
    } else {
      setSelectedUserEmail('');
    }
  }

  return (
    <div className={styles.container}>
      <div className={adminStyles.topBar}>
        <AdminMenu
          isOpen={menuOpen}
          onToggle={toggleMenu}
          onNavigate={handleMenuNavigation}
        />
        <h1 className={adminStyles.barTitle}>Rent-a-Bike</h1>
        <div className={adminStyles.rightGroup}>
          <span className={adminStyles.icon} onClick={toggleUserDetails}>
            <Image src="/Test Account.png" alt="Test Account" width={50} height={50} />
          </span>
          <span className={adminStyles.icon} onClick={logout}>
            <Image src="/logout.png" alt="Logout" width={50} height={50} />
          </span>
        </div>
      </div>

      <div className={styles.contentArea}>
        <div className={styles.listWrapper}>
          {[...rents]
            .sort((a, b) => b.endTimeMillis - a.endTimeMillis)
            .map((rent) => (
            <div key={`${rent.bikeId}-${rent.startTimeMillis}`} className={styles.rentCard}>
              <div className={styles.rentInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Tip bicikle:</span>
                  <span className={styles.infoValue}>{rent.bikeType}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Vreme pocetka:</span>
                  <span className={styles.infoValue}>{formatTime(rent.startTimeMillis)}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Vreme zavrsetka:</span>
                  <span className={styles.infoValue}>
                    {rent.status === 'finished' ? formatTime(rent.endTimeMillis) : 'U toku'}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Korisnik:</span>
                  <button
                    type="button"
                    className={styles.userButton}
                    onClick={() => handleUserClick(rent.username)}
                  >
                    {rent.username}
                  </button>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Ukupna cena:</span>
                  <span className={styles.infoValue}>
                    {rent.status === 'finished' ? rent.totalCost : 'U toku'}
                  </span>
                </div>
              </div>
              {rent.pictureUrl && (
                <button
                  type="button"
                  className={styles.rentImageButton}
                  onClick={() => setSelectedRent(rent)}
                  aria-label="Prikazi sliku iznajmljivanja"
                >
                  <Image
                    src={rent.pictureUrl}
                    alt={`Iznajmljivanje ${rent.bikeId}`}
                    width={170}
                    height={130}
                    className={styles.rentImage}
                  />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {userDetailsVisible && <ProfilePanel onToggleUserDetails={toggleUserDetails} />}
      {selectedRent?.pictureUrl && (
        <div className={styles.imageModalContainer}>
          <div className={styles.imageOverlay} onClick={() => setSelectedRent(null)} />
          <div className={styles.imageModalPanel}>
            <Image
              src={selectedRent.pictureUrl}
              alt={`Iznajmljivanje ${selectedRent.bikeId}`}
              width={480}
              height={360}
              className={styles.rentImage}
            />
          </div>
        </div>
      )}
      {selectedUser && (
        <div className={styles.userModalContainer}>
          <div className={styles.userOverlay} onClick={() => setSelectedUser(null)} />
          <div className={styles.userPanel}>
            <p className={styles.userTitle}>Informacije o korisniku</p>
            <div className={styles.userDetails}>
              <div className={styles.userRow}>
                <span className={styles.userLabel}>Ime:</span>
                <span className={styles.userValue}>{selectedUser.name}</span>
              </div>
              <div className={styles.userRow}>
                <span className={styles.userLabel}>Prezime:</span>
                <span className={styles.userValue}>{selectedUser.surname}</span>
              </div>
              <div className={styles.userRow}>
                <span className={styles.userLabel}>Telefon:</span>
                <span className={styles.userValue}>{selectedUser.phone}</span>
              </div>
              <div className={styles.userRow}>
                <span className={styles.userLabel}>Email adresa:</span>
                <span className={styles.userValue}>{selectedUserEmail}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
