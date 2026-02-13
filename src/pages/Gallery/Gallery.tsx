import { Header, Footer } from '../../components/Layout';
import styles from './Gallery.module.css';

export default function Gallery() {
  const imageFiles = [
    'IMG-20250305-WA0101.jpg',
    'IMG-20250320-WA0020.jpg',
    'IMG-20250802-WA0019.jpg',
    'IMG-20250802-WA0021.jpg',
    '1jpg',
    '1jpg (Copy)',
    'Pasted image.png',
    'Pasted image (2).png',
    'Pasted image (3).png',
    'Pasted image (4).png',
    'Pasted image (7).png',
    'Pasted image (8).png',
    'Pasted image (9).png',
    'Pasted image (10).png',
    'Pasted image (11).png',
    'Pasted image (12).png',
    'Pasted image (13).png',
    'Pasted image (14).png',
    'Pasted image (15).png',
    'Pasted image (16).png',
    'Pasted image (17).png',
    'Pasted image (18).png',
    'Pasted image (19).png',
    'Pasted image (20).png',
    'Pasted image (21).png',
    'Pasted image (22).png',
    'Pasted image (23).png',
    'Pasted image (24).png',
  ];

  const images = imageFiles.map((file, index) => ({
    src: `/images/${encodeURIComponent(file)}`,
    alt: `Gallery Image ${index + 1}`,
  }));

  return (
    <div className={styles.page}>
      <Header variant="cream" />

      <section className={styles.hero}>
        <h2>Our Gallery</h2>
        <p>Capturing memorable moments of learning, creativity, and community at Delight International School.</p>
      </section>

      <section className={styles.gallerySection}>
        <h2 className={styles.galleryTitle}>Our Gallery</h2>
        <div className={styles.galleryContainer}>
          {images.map((image, index) => (
            <img key={index} src={image.src} alt={image.alt} />
          ))}
        </div>
        <h3 className={styles.galleryTitle}>Career Day 2026</h3>
      </section>

      <Footer />
    </div>
  );
}
