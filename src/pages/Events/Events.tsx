import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import Hero from '../../components/UI/Hero';
import styles from './Events.module.css';

export default function Events() {
  const events = [
    {
      id: 1,
      title: 'Annual Sports Day',
      date: 'February 15, 2026',
      description: 'Join us for a day of excitement as our students compete in various sporting activities.',
      location: 'School Grounds',
    },
    {
      id: 2,
      title: 'Science Fair Exhibition',
      date: 'March 5, 2026',
      description: 'Showcase of innovative projects by our young scientists demonstrating creativity and scientific thinking.',
      location: 'School Auditorium',
    },
    {
      id: 3,
      title: 'Cultural Festival',
      date: 'April 10, 2026',
      description: 'Celebrate diversity through music, dance, food, and cultural performances from around the world.',
      location: 'School Grounds',
    },
    {
      id: 4,
      title: 'Parent-Teacher Conference',
      date: 'April 20, 2026',
      description: 'Meet with teachers to discuss student progress and academic development.',
      location: 'School Campus',
    },
    {
      id: 5,
      title: 'Graduation Ceremony',
      date: 'May 30, 2026',
      description: 'Celebrating the achievements of our graduating class as they move forward to new horizons.',
      location: 'School Auditorium',
    },
  ];

  return (
    <div className={styles.page}>
      <Header variant="default" />
      <Hero
        title="Upcoming Events"
        subtitle="Stay informed about school activities and events"
        backgroundImage="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      />
      <main className={styles.main}>
        <section className={styles.eventsContainer}>
          <div className={styles.eventsList}>
            {events.map((event) => (
              <article key={event.id} className={styles.eventCard}>
                <div className={styles.eventHeader}>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <span className={styles.eventDate}>{event.date}</span>
                </div>
                <p className={styles.eventLocation}>📍 {event.location}</p>
                <p className={styles.eventDescription}>{event.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
