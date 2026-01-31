import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Footer } from '../../components/Layout';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // Send email using EmailJS
      await emailjs.send(
        'service_delight', // You'll need to replace this with your EmailJS service ID
        'template_contact', // You'll need to replace this with your EmailJS template ID
        {
          from_name: formData.fullName,
          from_email: formData.email,
          message: formData.message,
          to_email: 'delightintschool@gmail.com',
        },
        'YOUR_PUBLIC_KEY' // You'll need to replace this with your EmailJS public key
      );

      alert('Thank you! Your message has been sent successfully.');
      setFormData({ fullName: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Sorry, there was an error sending your message. Please try again or contact us directly at delightintschool@gmail.com');
    } finally {
      setSending(false);
    }
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
          <button type="submit" disabled={sending}>
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>

      <Footer variant="wine" />
    </div>
  );
}
