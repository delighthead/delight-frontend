import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components/Layout';
import { Card } from '../../components/UI';
import styles from './Curriculum.module.css';

export default function Curriculum() {
  const subjects = [
    { title: 'Mathematics', description: 'Building strong numerical reasoning, logical thinking, and problem-solving skills across all grade levels.' },
    { title: 'English Language', description: 'Enhancing communication through reading, writing, grammar, and comprehension activities.' },
    { title: 'Science', description: 'Encouraging curiosity through practical experiments, environmental awareness, and scientific exploration.' },
    { title: 'ICT (Information & Communication Technology)', description: 'Preparing students for the digital world with coding, computing, and safe technology practices.' },
    { title: 'Social Studies', description: 'Fostering global awareness, civic responsibility, and appreciation for culture and history.' },
    { title: 'Creative Arts', description: 'Developing imagination and self-expression through art, music, and drama.' },
    { title: 'Religious & Moral Education', description: 'Instilling values such as honesty, kindness, and respect for diversity.' },
    { title: 'Physical Education', description: 'Promoting fitness, teamwork, and discipline through structured sports and activities.' },
  ];

  return (
    <div className={styles.page}>
      <Header variant="cream" />

      <section className={styles.hero}>
        <h2>Our Curriculum</h2>
        <p>Empowering students through a balanced curriculum focused on academics, creativity, and character development.</p>
      </section>

      <section className={styles.curriculumSection}>
        <h3>Academic Excellence with Purpose</h3>
        <p>Delight International School follows a holistic and engaging curriculum designed to inspire a lifelong love for learning. Our curriculum combines academic rigor with creativity, moral education, and real-world problem-solving skills.</p>

        <h3>Core Learning Areas</h3>
        <div className={styles.curriculumGrid}>
          {subjects.map((subject) => (
            <Card key={subject.title} title={subject.title} description={subject.description} variant="gold" />
          ))}
        </div>

        <div className={styles.applyCta}>
          <h3>Be Part of Our Academic Journey</h3>
          <p>Enroll your child today and experience quality education that inspires confidence and excellence.</p>
          <Link to="/apply" className={styles.applyBtn}>Apply Now</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
