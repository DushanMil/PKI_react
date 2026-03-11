import React, { useMemo, useState } from 'react';
import styles from '../page.module.css';
import type { Bike } from '../../types/Bike';

type EditBikeModalProps = {
  bike: Bike;
  onSave: (bike: Bike) => void;
  onClose: () => void;
};

type BikeFormState = {
  bikeId: string;
  bikeType: string;
  pricePerHour: string;
  latitude: string;
  longitude: string;
};

export default function EditBikeModal({ bike, onSave, onClose }: EditBikeModalProps) {
  const initialForm = useMemo<BikeFormState>(
    () => ({
      bikeId: bike.bikeId,
      bikeType: bike.bikeType,
      pricePerHour: String(bike.pricePerHour),
      latitude: String(bike.latitude),
      longitude: String(bike.longitude),
    }),
    [bike],
  );

  const [formData, setFormData] = useState<BikeFormState>(initialForm);
  const [errorMessage, setErrorMessage] = useState('');

  function updateField(field: keyof BikeFormState, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function parseNumber(value: string) {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  function handleSave() {
    const requiredFields: { key: keyof BikeFormState; label: string }[] = [
      { key: 'bikeId', label: 'Bike ID' },
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
      return;
    }

    setErrorMessage('');
    const updatedBike: Bike = {
      bikeId: formData.bikeId.trim(),
      bikeType: formData.bikeType.trim(),
      pricePerHour: parseNumber(formData.pricePerHour),
      latitude: parseNumber(formData.latitude),
      longitude: parseNumber(formData.longitude),
      parkingDistances: bike.parkingDistances,
      screenPosition: bike.screenPosition,
    };

    onSave(updatedBike);
  }

  return (
    <div className={styles.editModalContainer}>
      <div className={styles.editOverlay} onClick={onClose} />
      <div className={styles.editPanel}>
        <p className={styles.editTitle}>Izmena bicikle</p>
        <div className={styles.editForm}>
          <label className={styles.editLabel}>Bike ID:</label>
          <span className={styles.editValue}>{formData.bikeId}</span>

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
        <div className={styles.editActions}>
          <button className={styles.editButton} type="button" onClick={handleSave}>
            Sacuvaj promene
          </button>
          <button className={styles.editButton} type="button" onClick={onClose}>
            Nazad
          </button>
        </div>
      </div>
    </div>
  );
}
