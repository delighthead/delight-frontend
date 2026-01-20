import styles from './Footer.module.css';

interface FooterProps {
  variant?: 'dark' | 'wine';
}

export default function Footer({ variant = 'dark' }: FooterProps) {
  return (
    <footer className={`${styles.footer} ${styles[variant]}`}>
      <p>&copy; 2025 Delight International School | All Rights Reserved</p>
    </footer>
  );
}
