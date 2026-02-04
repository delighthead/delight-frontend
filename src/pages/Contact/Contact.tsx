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
    const subject = 'New Message from Contact Form';
    const body = [
      `From: ${formData.fullName}`,
      `Email: ${formData.email}`,
      ``,
      `Message:`,
      formData.message,
    ].join('\n');

    window.location.href = `mailto:delightintschool@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

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
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/contact" className={styles.active}>Contact</a></li>
            <li>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe0gID4VYQBk6m1ZTvgodypO1bKIYs1m43R22ueAxqXClhK4Q/viewform?usp=sharing&ouid=114204056174231630483"
                className={styles.applyBtn}
                target="_blank"
                rel="noreferrer"
              >
                Apply Now
              </a>
            </li>
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
            <p>Delight International School<br />Box AN 5044 Accra North</p>
          </div>
          <div>
            <h4>Physical Location</h4>
            <p>Branch 1 @ Accra ~ Kotobabi, Ghana<br />Branch 2 @ Accra – Ofankor, Ghana</p>
          </div>
          <div>
            <h4>Phone</h4>
            <p>+233 244 113 286<br />+233 277 776 449</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>delightintschool@gmail.com</p>
          </div>
          <div>
            <h4>Social Media Links</h4>
            <p>WhatsApp (+233244113286 , +233277776449)</p>
          </div>
          <div>
            <h4>Office Hours</h4>
            <p>Monday - Friday: 8:00 AM - 4:00 PM<br />Saturday & Sunday: Closed</p>
          </div>
        </div>

        <div className={styles.applySection}>
          <h4>Ready to Apply?</h4>
          <p>Begin your student application online in just a few minutes.</p>
          <a
            className={styles.applyLink}
            href="https://docs.google.com/forms/d/e/1FAIpQLSe0gID4VYQBk6m1ZTvgodypO1bKIYs1m43R22ueAxqXClhK4Q/viewform?usp=sharing&ouid=114204056174231630483"
            target="_blank"
            rel="noreferrer"
          >
            Apply Now
          </a>
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
