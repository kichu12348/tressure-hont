import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.branding}>
        <img src="/iedc_logo.svg" alt="IEDC Logo" className={styles.brandingLogo} />
        <span>Powered by IEDC Bootcamp CEC</span>
      </div>
    </footer>
  );
};

export default Footer;
