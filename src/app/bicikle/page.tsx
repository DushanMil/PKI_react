'use client';

import React, { useEffect, useState } from 'react';
import adminStyles from '../adminHome/page.module.css';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProfilePanel from '../components/ProfilePanel';
import AdminMenu from '../components/AdminMenu';
import BikeList from './components/BikeList';
import AddBike from './components/AddBike';
import EditBikeModal from './components/EditBikeModal';
import type { Bike } from '../types/Bike';

export default function BiciklePage() {
  const [userDetailsVisible, setUserDetailsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [editingBike, setEditingBike] = useState<Bike | null>(null);
  const [editingBikeId, setEditingBikeId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('bikes')) {
      setBikes(JSON.parse(localStorage.getItem('bikes') ?? '[]'));
    } else {
      setBikes([]);
    }
  }, []);

  useEffect(() => {
    if (bikes.length > 0) {
      localStorage.setItem('bikes', JSON.stringify(bikes));
    }
  }, [bikes]);

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

  function handleEditBike(bike: Bike) {
    setEditingBikeId(bike.bikeId);
    setEditingBike(bike);
  }

  function handleCloseEdit() {
    setEditingBike(null);
    setEditingBikeId(null);
  }

  function handleSaveBike(updatedBike: Bike) {
    setBikes((prev) =>
      prev.map((bike) => (bike.bikeId === editingBikeId ? updatedBike : bike)),
    );
    handleCloseEdit();
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

      <div className={styles.secondaryBar}>
        <button
          className={`${styles.tabButton} ${activeTab === 'list' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('list')}
          type="button"
        >
          Lista bicikla
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'add' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('add')}
          type="button"
        >
          Dodaj biciklu
        </button>
      </div>

      <div className={styles.contentArea}>
        {activeTab === 'list' ? (
          <BikeList bikes={bikes} onEdit={handleEditBike} />
        ) : (
          <AddBike bikes={bikes} onAdd={(bike) => setBikes((prev) => [...prev, bike])} />
        )}
      </div>

      {userDetailsVisible && <ProfilePanel onToggleUserDetails={toggleUserDetails} />}
      {editingBike && (
        <EditBikeModal bike={editingBike} onSave={handleSaveBike} onClose={handleCloseEdit} />
      )}
    </div>
  );
}
