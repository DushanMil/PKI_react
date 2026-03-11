import React, { useMemo, useState } from 'react';
import styles from '../page.module.css';
import type { Bike } from '../../types/Bike';

type AddBikeProps = {
  bikes: Bike[];
  onAdd: (bike: Bike) => void;
};

type BikeFormState = {
  bikeType: string;
  pricePerHour: string;
  latitude: string;
  longitude: string;
};

function getNextBikeId(bikes: Bike[]) {
  const maxIndex = bikes.reduce((max, bike) => {
    const match = bike.bikeId.match(/BK-(\d+)/);
    if (!match) {
      return max;
    }
    const value = Number(match[1]);
    return Number.isNaN(value) ? max : Math.max(max, value);
  }, 1000);

  return `BK-${String(maxIndex + 1).padStart(4, '0')}`;
}

export default function AddBike({ bikes, onAdd }: AddBikeProps) {
  const nextBikeId = useMemo(() => getNextBikeId(bikes), [bikes]);
  const [formData, setFormData] = useState<BikeFormState>({
    bikeType: '',
    pricePerHour: '',
    latitude: '',
    longitude: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function updateField(field: keyof BikeFormState, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function parseNumber(value: string) {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  function handleSave() {
    const requiredFields: { key: keyof BikeFormState; label: string }[] = [
      { key: 'bikeType', label: 'Tip bicikle' },
      { key: 'pricePerHour', label: 'Cena po satu' },
      { key: 'latitude', label: 'Geo. Sirina' },
      { key: 'longitude', label: 'Geo. Duzina' },
    ];

    const emptyField = requiredFields.find(
      (field) => formData[field.key].trim().length === 0,
    );

    if (emptyField) {
      setErrorMessage(`Polje ${emptyField.label} ne sme biti prazno!`);
      setSuccessMessage('');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    onAdd({
      bikeId: nextBikeId,
      bikeType: formData.bikeType.trim(),
      pricePerHour: parseNumber(formData.pricePerHour),
      latitude: parseNumber(formData.latitude),
      longitude: parseNumber(formData.longitude),
      parkingDistances: [],
      screenPosition: [],
    });

    setFormData({
      bikeType: '',
      pricePerHour: '',
      latitude: '',
      longitude: '',
    });
    setSuccessMessage('Uspesno dodata bicikla');
  }

  return (
    <div className={styles.editPanel}>
      <p className={styles.editTitle}>Dodavanje bicikle</p>
      <div className={styles.editForm}>
        <label className={styles.editLabel}>Bike ID:</label>
        <span className={styles.editValue}>{nextBikeId}</span>

        <label className={styles.editLabel}>Tip bicikle:</label>
        <input
          className={styles.editInput}
          type="text"
          value={formData.bikeType}
          onChange={(event) => updateField('bikeType', event.target.value)}
        />

        <label className={styles.editLabel}>Cena po satu:</label>
        <input
          className={styles.editInput}
          type="text"
          value={formData.pricePerHour}
          onChange={(event) => updateField('pricePerHour', event.target.value)}
        />

        <label className={styles.editLabel}>Geo. Sirina:</label>
        <input
          className={styles.editInput}
          type="text"
          value={formData.latitude}
          onChange={(event) => updateField('latitude', event.target.value)}
        />

        <label className={styles.editLabel}>Geo. Duzina:</label>
        <input
          className={styles.editInput}
          type="text"
          value={formData.longitude}
          onChange={(event) => updateField('longitude', event.target.value)}
        />
      </div>
      {errorMessage && <p className={styles.editError}>{errorMessage}</p>}
      {successMessage && <p className={styles.editSuccess}>{successMessage}</p>}
      <div className={styles.editActions}>
        <button className={styles.editButton} type="button" onClick={handleSave}>
          Dodaj
        </button>
      </div>
    </div>
  );
}
