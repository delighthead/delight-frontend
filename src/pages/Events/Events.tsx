import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import Hero from '../../components/UI/Hero';
import styles from './Events.module.css';

export default function Events() {
  const events = [
    {
      id: 1,
      title: 'Career Day',
      date: 'February 13, 2026',
      description: 'Join us for a day of excitement as our students dress up as their future career.',
      location: 'School Grounds',
      image: '/images/1jpg%20(Copy)',
    },
    {
      id: 2,
      title: 'Excursion to Boti and Akaa Waterfalls',
      date: 'March 7, 2026',
      description: 'Students will learn about waterfalls and river systems. Understand tourism and environmental conservation. Observe physical features studied in Geography. Learn teamwork, discipline, and time management.',
      location: 'Boti and Akaa Waterfalls',
      image: '/images/Picture1.png',
    },
    {
      id: 3,
      title: 'Cultural Day / Reading competition',
      date: 'March 23, 2026',
      description: 'Celebrate diversity through music, dance, food, and cultural performances from around the world.',
      location: 'School Grounds',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      title: 'Exams week',
      date: 'April 13, 2026',
      description: 'A focused week for assessments across classes as students demonstrate their learning progress.',
      location: 'School Campus',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
    },
    {
      id: 5,
      title: 'Computer lessons',
      date: 'April 20, 2026',
      description: 'Hands-on computer lessons to build digital literacy and practical skills across classes.',
      location: 'School Auditorium',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    },
  ];

  const pastEvents = [
    {
      id: 1,
      title: 'Inter-House Sports Festival',
      description: 'A vibrant day of sportsmanship, teamwork, and school spirit across all houses.',
    },
    {
      id: 2,
      title: 'End of Term Thanksgiving Service',
      description: 'A reflective service celebrating achievements and gratitude with students and families.',
    },
  ];

  return (
    <div className={styles.page}>
      <Header variant="default" />
      <Hero
        title="Upcoming Events"
        subtitle="Stay informed about school activities and events"
        backgroundImage="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        titleColor="#000"
      />
      <main className={styles.main}>
        <section className={styles.eventsContainer}>
          <h2 className={styles.sectionTitle}>Upcoming Events</h2>
          <div className={styles.eventsList}>
            {events.map((event) => (
              <article key={event.id} className={styles.eventCard}>
                <img src={event.image} alt={event.title} className={styles.eventImage} />
                <div className={styles.eventContent}>
                  <div className={styles.eventHeader}>
                    <h3 className={styles.eventTitle}>{event.title}</h3>
                    <span className={styles.eventDate}>{event.date}</span>
                  </div>
                  <p className={styles.eventLocation}>📍 {event.location}</p>
                  <p className={styles.eventDescription}>{event.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.pastEventsContainer}>
          <h2 className={styles.sectionTitle}>Past Events</h2>
          <div className={styles.pastEventsGrid}>
            {pastEvents.map((event) => (
              <article key={event.id} className={styles.pastEventCard}>
                <div className={styles.pastEventHeader}>
                  <h3 className={styles.pastEventTitle}>{event.title}</h3>
                </div>
                <p className={styles.pastEventDescription}>{event.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
