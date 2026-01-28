import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps {
  variant?: 'default' | 'wine' | 'blue' | 'cream';
}

export default function Header({ variant = 'default' }: HeaderProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`${styles.header} ${styles[variant]}`}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          Delight International School
        </Link>
        <ul className={styles.navList}>
          <li>
            <Link to="/" className={isActive('/') ? styles.active : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about') ? styles.active : ''}>
              About
            </Link>
          </li>
          <li>
            <Link to="/admissions" className={isActive('/admissions') ? styles.active : ''}>
              Admissions
            </Link>
          </li>
          <li>
            <Link to="/curriculum" className={isActive('/curriculum') ? styles.active : ''}>
              Curriculum
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={isActive('/gallery') ? styles.active : ''}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/events" className={isActive('/events') ? styles.active : ''}>
              Upcoming Events
            </Link>
          </li>
          <li>
            <Link to="/contact" className={isActive('/contact') ? styles.active : ''}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/apply" className={styles.applyBtn}>
              Apply Now
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
