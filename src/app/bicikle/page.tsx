'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import ProfilePanel from '../components/ProfilePanel';
import TopBar from '../components/TopBar';
import BikeList from './components/BikeList';
import AddBike from './components/AddBike';
import EditBikeModal from './components/EditBikeModal';
import type { Bike } from '../types/Bike';

export default function BiciklePage() {
  const [userDetailsVisible, setUserDetailsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [editingBike, setEditingBike] = useState<Bike | null>(null);
  const [editingBikeId, setEditingBikeId] = useState<string | null>(null);
  const [bikesLoaded, setBikesLoaded] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('bikes')) {
      setBikes(JSON.parse(localStorage.getItem('bikes') ?? '[]'));
    } else {
      setBikes([]);
    }
    setBikesLoaded(true);
  }, []);

  useEffect(() => {
    if (bikesLoaded) {
      localStorage.setItem('bikes', JSON.stringify(bikes));
    }
  }, [bikes, bikesLoaded]);


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
      <TopBar title="Rent-a-Bike" setUserDetailsVisible={setUserDetailsVisible} />

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

      {userDetailsVisible && (
        <ProfilePanel onToggleUserDetails={() => setUserDetailsVisible((prev) => !prev)} />
      )}
      {editingBike && (
        <EditBikeModal bike={editingBike} onSave={handleSaveBike} onClose={handleCloseEdit} />
      )}
    </div>
  );
}
