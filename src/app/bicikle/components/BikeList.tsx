import React from 'react';
import styles from '../page.module.css';
import type { Bike } from '../../types/Bike';
import Image from 'next/image';

type BikeListProps = {
  bikes: Bike[];
  onEdit: (bike: Bike) => void;
};

export default function BikeList({ bikes, onEdit }: BikeListProps) {
  function getStatusLabel(status?: Bike['status']) {
    switch (status) {
      case 'Repairing':
        return 'U popravci';
      case 'Removed':
        return 'Uklonjen';
      case 'Operating':
      default:
        return 'U sluzbi';
    }
  }

  return (
    <div className={styles.listWrapper}>
      {bikes.map((bike) => (
        <div key={bike.bikeId} className={styles.bikeCard}>
          <button
            type="button"
            className={styles.editIcon}
            onClick={() => onEdit(bike)}
            aria-label="Izmeni biciklu"
          >
            <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path
                d="M15.7 3.6l4.7 4.7-11 11H4.7V14.6l11-11zm1.4-1.4L3.3 15v6.7H10l13.8-13.8-6.7-6.7z"
                fill="currentColor"
              />
            </svg>
          </button>
          <div className={styles.bikeCardContent}>
            <div className={styles.bikeImageWrapper}>
              <Image
                src={`/bike_pictures/${bike.bikeId}.jpg`}
                alt={`Bicikl ${bike.bikeId}`}
                width={140}
                height={110}
                className={styles.bikeImage}
              />
            </div>
            <div className={styles.bikeDetails}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Bike ID:</span>
                <span className={styles.detailValue}>{bike.bikeId}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Tip bicikle:</span>
                <span className={styles.detailValue}>{bike.bikeType}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Cena po satu:</span>
                <span className={styles.detailValue}>{bike.pricePerHour}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Geo. Sirina:</span>
                <span className={styles.detailValue}>{bike.latitude}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Geo. Duzina:</span>
                <span className={styles.detailValue}>{bike.longitude}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Status:</span>
                <span className={styles.detailValue}>{getStatusLabel(bike.status)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
