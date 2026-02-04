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
    { title: 'Leadership', description: 'Developing confidence and responsibility in students by encouraging initiative, decision-making and positive influence, preparing them to lead with integrity in school and in the wider community.' },
  ];

  const subjects = [
    { title: 'Mathematics', description: 'Building strong numerical reasoning, logical thinking, and problem-solving skills across all grade levels.' },
    { title: 'English Language', description: 'Enhancing communication through reading, writing, grammar, and comprehension activities.' },
    { title: 'Science', description: 'Encouraging curiosity through practical experiments, environmental awareness, and scientific exploration.' },
    { title: 'ICT (Information & Communication Technology)', description: 'Preparing students for the digital world with coding, computing, and safe technology practices.' },
    { title: 'Social Studies', description: 'Fostering global awareness, civic responsibility, and appreciation for culture and history.' },
    { title: 'Creative Arts', description: 'Developing imagination and self-expression through art, music, and drama.' },
    { title: 'Music', description: 'Developing musical skills through, rhythm, and musical appreciation through singing, instrumental practice, listening activities, and performance.' },
    { title: 'Religious & Moral Education', description: 'Instilling values such as honesty, kindness, and respect for diversity.' },
    { title: 'Physical Education', description: 'Promoting fitness, teamwork, and discipline through structured sports and activities.' },
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
        <p>To provide holistic education—academic, social, and spiritual—to underprivileged members of society, empowering them to realize their full potential, become positive role models, and uplift others along the way.</p>

        <h3>Our Vision</h3>
        <p>To utilize available resources to achieve our mission while expanding our infrastructure to cover all levels of education—basic, junior high, senior high, and tertiary—by the grace of God, in pursuit of this vision.</p>

        <h3>Our Core Values</h3>
        <div className={styles.values}>
          {values.map((value) => (
            <Card key={value.title} title={value.title} description={value.description} variant="wine" />
          ))}
        </div>

        <h3>Core Learning Areas</h3>
        <p>Our curriculum combines academic rigor with creativity, moral education, and real-world problem-solving skills.</p>
        <div className={styles.values}>
          {subjects.map((subject) => (
            <Card key={subject.title} title={subject.title} description={subject.description} variant="wine" />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
