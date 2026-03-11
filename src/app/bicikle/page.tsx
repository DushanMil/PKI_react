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

const defaultBikes: Bike[] = [
  {
    bikeId: 'BK-1001',
    bikeType: 'Gradska',
    pricePerHour: 120,
    latitude: 44.7866,
    longitude: 20.4489,
    parkingDistances: [0.4, 0.9, 1.2],
    screenPosition: [0.2, 0.3],
  },
  {
    bikeId: 'BK-1002',
    bikeType: 'Planinska',
    pricePerHour: 150,
    latitude: 44.8152,
    longitude: 20.4606,
    parkingDistances: [0.2, 0.6, 1.1],
    screenPosition: [0.57, 0.32],
  },
  {
    bikeId: 'BK-1003',
    bikeType: 'Elektricna',
    pricePerHour: 220,
    latitude: 44.8042,
    longitude: 20.4176,
    parkingDistances: [0.3, 0.8, 1.5],
    screenPosition: [0.35, 0.55],
  },
  {
    bikeId: 'BK-1004',
    bikeType: 'Gravel',
    pricePerHour: 180,
    latitude: 44.7977,
    longitude: 20.4811,
    parkingDistances: [0.5, 0.7, 1.0],
    screenPosition: [0.745, 0.55],
  },
];

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
      localStorage.setItem('bikes', JSON.stringify(defaultBikes));
      setBikes(defaultBikes);
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
