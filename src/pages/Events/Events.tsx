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
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop',
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
      </main>
      <Footer />
    </div>
  );
}
