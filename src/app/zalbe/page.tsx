'use client';

import React, { useEffect, useState } from 'react';
import adminStyles from '../adminHome/page.module.css';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProfilePanel from '../components/ProfilePanel';
import AdminMenu from '../components/AdminMenu';
import type { Bike, BikeStatus } from '../types/Bike';
import type { Complaint } from '../types/Complaint';

export default function ZalbePage() {
  const [userDetailsVisible, setUserDetailsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [complaintsLoaded, setComplaintsLoaded] = useState(false);
  const [bikesLoaded, setBikesLoaded] = useState(false);
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
    if (localStorage.getItem('complaints')) {
      setComplaints(JSON.parse(localStorage.getItem('complaints') ?? '[]'));
    } else {
      setComplaints([]);
    }
    setComplaintsLoaded(true);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('bikes')) {
      setBikes(JSON.parse(localStorage.getItem('bikes') ?? '[]'));
    } else {
      setBikes([]);
    }
    setBikesLoaded(true);
  }, []);

  useEffect(() => {
    if (complaintsLoaded) {
      localStorage.setItem('complaints', JSON.stringify(complaints));
    }
  }, [complaints, complaintsLoaded]);

  useEffect(() => {
    if (bikesLoaded) {
      localStorage.setItem('bikes', JSON.stringify(bikes));
    }
  }, [bikes, bikesLoaded]);

  function updateBikeStatus(bikeId: string, status: BikeStatus) {
    setBikes((prev) =>
      prev.map((bike) =>
        bike.bikeId === bikeId ? { ...bike, status } : bike,
      ),
    );
  }

  function resolveComplaint(complaintId: string, bikeId: string, status: BikeStatus) {
    updateBikeStatus(bikeId, status);
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId ? { ...complaint, status: 'Resolved' } : complaint,
      ),
    );
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
          {complaints.filter((complaint) => complaint.status === 'In progress').length === 0 ? (
            <p className={styles.emptyMessage}>Nema zalbi!</p>
          ) : (
            complaints
              .filter((complaint) => complaint.status === 'In progress')
              .map((complaint) => (
                <div key={complaint.id} className={styles.complaintCard}>
                  <div className={styles.complaintInfo}>
                    <p className={styles.complaintDescription}>{complaint.description}</p>
                    <div className={styles.actionRow}>
                      <button
                        className={styles.actionButton}
                        type="button"
                        onClick={() => resolveComplaint(complaint.id, complaint.bikeId, 'Repairing')}
                      >
                        Servis
                      </button>
                      <button
                        className={styles.actionButton}
                        type="button"
                        onClick={() => resolveComplaint(complaint.id, complaint.bikeId, 'Removed')}
                      >
                        Iskljuci
                      </button>
                    </div>
                  </div>
                  {complaint.pictureUrl && (
                    <button
                      type="button"
                      className={styles.complaintImageButton}
                      onClick={() => setSelectedComplaint(complaint)}
                      aria-label="Prikazi sliku zalbe"
                    >
                      <Image
                        src={complaint.pictureUrl}
                        alt="Slika zalbe"
                        width={170}
                        height={130}
                        className={styles.complaintImage}
                      />
                    </button>
                  )}
                </div>
              ))
          )}
        </div>
      </div>

      {userDetailsVisible && <ProfilePanel onToggleUserDetails={toggleUserDetails} />}
      {selectedComplaint?.pictureUrl && (
        <div className={styles.imageModalContainer}>
          <div className={styles.imageOverlay} onClick={() => setSelectedComplaint(null)} />
          <div className={styles.imageModalPanel}>
            <Image
              src={selectedComplaint.pictureUrl}
              alt="Slika zalbe"
              width={480}
              height={360}
              className={styles.complaintImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
