import styles from './Hero.module.css';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  variant?: 'blue' | 'wine' | 'cream';
  ctaText?: string;
  ctaLink?: string;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  variant = 'blue',
  ctaText,
  ctaLink,
}: HeroProps) {
  const style = backgroundImage
    ? { backgroundImage: `linear-gradient(var(--overlay), var(--overlay)), url(${backgroundImage})` }
    : {};

  return (
    <section className={`${styles.hero} ${styles[variant]}`} style={style}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {ctaText && ctaLink && (
        <a href={ctaLink} className={styles.ctaButton}>
          {ctaText}
        </a>
      )}
    </section>
  );
}
