'use client';

import React from 'react';
import styles from './AdminMenu.module.css';

type AdminMenuProps = {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (path: string) => void;
};

export default function AdminMenu({ isOpen, onToggle, onNavigate }: AdminMenuProps) {
  return (
    <div className={styles.menuWrapper}>
      <button className={styles.menuButton} onClick={onToggle} aria-label="Open admin menu">
        <span className={styles.menuLine} />
        <span className={styles.menuLine} />
        <span className={styles.menuLine} />
      </button>
      {isOpen && (
        <div className={styles.menuDropdown}>
          <button
            className={styles.menuItem}
            onClick={() => onNavigate('/adminHome')}
          >
            Pocetna
          </button>
          <button
            className={styles.menuItem}
            onClick={() => onNavigate('/bicikle')}
          >
            Bicikle
          </button>
          <button
            className={styles.menuItem}
            onClick={() => onNavigate('/iznajmljivanja')}
          >
            Iznajmljivanja
          </button>
          <button
            className={styles.menuItem}
            onClick={() => onNavigate('/zalbe')}
          >
            Zalbe
          </button>
        </div>
      )}
    </div>
  );
}
