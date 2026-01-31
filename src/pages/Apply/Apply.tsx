import { useState, type FormEvent } from 'react';
import { Footer } from '../../components/Layout';
import styles from './Apply.module.css';

export default function Apply() {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    grade: '',
    parent: '',
    contact: '',
    address: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = 'New Student Application';
    const body = [
      `Full Name: ${formData.fullName}`,
      `Date of Birth: ${formData.dob}`,
      `Gender: ${formData.gender}`,
      `Applying for Grade: ${formData.grade}`,
      `Parent/Guardian Name: ${formData.parent}`,
      `Parent Contact: ${formData.contact}`,
      `Residential Address: ${formData.address}`,
    ].join('\n');

    window.location.href = `mailto:delightintschool@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setFormData({
      fullName: '',
      dob: '',
      gender: '',
      grade: '',
      parent: '',
      contact: '',
      address: '',
    });
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
            <li><a href="/contact">Contact</a></li>
            <li><a href="/apply" className={`${styles.applyBtn} ${styles.active}`}>Apply Now</a></li>
          </ul>
        </nav>
      </header>

      <section className={styles.hero}>
        <h2>Apply Now</h2>
        <p>Join the Delight International School community — where excellence begins.</p>
      </section>

      <section className={styles.applySection}>
        <h3>Student Application Form</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            placeholder="Enter full name"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />

          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            required
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />

          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            required
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="">-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label htmlFor="grade">Applying for Grade</label>
          <select
            id="grade"
            required
            value={formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
          >
            <option value="">-- Select Grade --</option>
            <option>Nursery</option>
            <option>Kindergarten</option>
            <option>Primary</option>
            <option>JHS</option>
          </select>

          <label htmlFor="parent">Parent/Guardian Name</label>
          <input
            type="text"
            id="parent"
            placeholder="Parent or guardian full name"
            required
            value={formData.parent}
            onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
          />

          <label htmlFor="contact">Parent Contact</label>
          <input
            type="tel"
            id="contact"
            placeholder="e.g. +233 24 123 4567"
            required
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          />

          <label htmlFor="address">Residential Address</label>
          <textarea
            id="address"
            rows={3}
            placeholder="Enter address"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />

          <button type="submit">Submit Application</button>
        </form>
      </section>

      <Footer variant="wine" />
    </div>
  );
}
