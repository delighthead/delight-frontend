import { Header, Footer } from '../../components/Layout';
import { Card } from '../../components/UI';
import styles from './About.module.css';

export default function About() {
  const values = [
    { title: 'Excellence', description: 'We pursue the highest standards in academics and character, inspiring students to be their best selves.' },
    { title: 'Discipline', description: 'We instill self-control and respect, ensuring a learning environment that promotes focus and growth.' },
    { title: 'Integrity', description: 'Honesty and accountability are at the heart of everything we do.' },
    { title: 'Creativity', description: 'We encourage innovative thinking and problem-solving in all aspects of learning.' },
    { title: 'Teamwork', description: 'We believe in collaboration and community, nurturing unity among students, staff, and families.' },
  ];

  return (
    <div className={styles.page}>
      <Header variant="wine" />

      <section className={styles.hero}>
        <h2>About Delight International School</h2>
        <p>Inspiring young minds through excellence, discipline, and creativity.</p>
      </section>

      <section className={styles.aboutSection}>
        <h3>Who We Are</h3>
        <p>Delight International School is a modern learning institution dedicated to providing holistic education that nurtures the mind, body, and spirit. We believe that every child is unique and capable of achieving greatness when guided with care, patience, and purpose.</p>

        <h3>Our Mission</h3>
        <p>To provide a world-class education that fosters intellectual curiosity, moral integrity, and lifelong learning, preparing students to make meaningful contributions to society.</p>

        <h3>Our Vision</h3>
        <p>To become a beacon of excellence where students are empowered to discover their talents, achieve their dreams, and shape a better world.</p>

        <h3>Our Core Values</h3>
        <div className={styles.values}>
          {values.map((value) => (
            <Card key={value.title} title={value.title} description={value.description} variant="wine" />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
