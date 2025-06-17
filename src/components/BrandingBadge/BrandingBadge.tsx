import React from 'react';
import styles from './BrandingBadge.module.css';

const BrandingBadge: React.FC = () => {
  return (
    <div className={styles.brandingBadge}>
      <img src="/iedc_logo.svg" alt="IEDC Logo" className={styles.brandingLogo} />
      <span className={styles.brandingText}>Powered by IEDC Bootcamp CEC</span>
    </div>
  );
};

export default BrandingBadge;
