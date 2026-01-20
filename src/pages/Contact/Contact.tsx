import { useState, type FormEvent } from 'react';
import { Footer } from '../../components/Layout';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ fullName: '', email: '', message: '' });
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>Delight International School</div>
          <ul className={styles.navList}>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/admissions">Admissions</a></li>
            <li><a href="/curriculum">Curriculum</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/contact" className={styles.active}>Contact</a></li>
            <li><a href="/apply" className={styles.applyBtn}>Apply Now</a></li>
          </ul>
        </nav>
      </header>

      <section className={styles.hero}>
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Reach out with questions, feedback, or admissions inquiries.</p>
      </section>

      <section className={styles.contactSection}>
        <h3>Get in Touch</h3>
        <div className={styles.contactDetails}>
          <div>
            <h4>Address</h4>
            <p>Delight International School<br />New Achimota, Ga North, Accra</p>
          </div>
          <div>
            <h4>Phone</h4>
            <p>+233 24 123 4567<br />+233 20 765 4321</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>info@delightinternationalschool.edu.gh</p>
          </div>
          <div>
            <h4>Office Hours</h4>
            <p>Monday - Friday: 8:00 AM - 4:00 PM<br />Saturday & Sunday: Closed</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <textarea
            rows={5}
            placeholder="Your Message..."
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          <button type="submit">Send Message</button>
        </form>
      </section>

      <Footer variant="wine" />
    </div>
  );
}
