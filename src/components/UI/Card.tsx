import styles from './Card.module.css';

interface CardProps {
  title: string;
  description: string;
  variant?: 'wine' | 'blue' | 'gold';
}

export default function Card({ title, description, variant = 'wine' }: CardProps) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}
