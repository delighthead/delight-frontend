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

  const careerDayFiles = [
    'IMG-20250220-WA0012.jpg',
    'IMG-20250305-WA0073.jpg',
    'IMG-20250305-WA0098.jpg',
    'IMG-20250305-WA0117.jpg',
    'IMG-20250305-WA0156.jpg',
    'IMG-20250305-WA0183.jpg',
    'IMG-20250305-WA0211.jpg',
    'IMG-20250305-WA0231.jpg',
    'IMG-20250305-WA0234.jpg',
    'IMG-20250305-WA0235.jpg',
    'IMG-20250305-WA0270.jpg',
    'IMG-20250305-WA0291.jpg',
    'IMG-20250305-WA0292.jpg',
    'IMG-20250305-WA0294.jpg',
    'IMG-20250305-WA0295.jpg',
    'IMG-20250305-WA0297.jpg',
    'Pasted image.png',
    'Pasted image (2).png',
    'Pasted image (3).png',
    'Pasted image (4).png',
    'Pasted image (5).png',
    'Pasted image (6).png',
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
  ];

  const careerDayImages = careerDayFiles.map((file, index) => ({
    src: `/career%20day%202026/${encodeURIComponent(file)}`,
    alt: `Career Day 2026 Image ${index + 1}`,
  }));

  const ghanaMonthFiles = [];

  const ghanaMonthImages = ghanaMonthFiles.map((file, index) => ({
    src: `/Ghana%20Month%20and%20Mega%20Fruit%20Day/${encodeURIComponent(file)}`,
    alt: `Ghana Month and Mega Fruit Day Image ${index + 1}`,
  }));

  const botiAkaaFiles = [
    'WhatsApp Image 2026-03-07 at 4.37.22 PM(1).jpeg',
    'WhatsApp Image 2026-03-07 at 4.37.22 PM.jpeg',
    'WhatsApp Image 2026-03-07 at 4.37.23 PM(1).jpeg',
    'WhatsApp Image 2026-03-07 at 4.37.23 PM(10).jpeg',
    'WhatsApp Image 2026-03-07 at 4.37.23 PM(11).jpeg',
    'WhatsApp Image 2026-03-07 at 4.37.23 PM(2).jpeg',
    'WhatsApp Image 2026-03-07 at 4.37.23 PM(3).jpeg',
    'WhatsApp Image 2026-03-07 at 4.37.23 PM(4).jpeg',
    'WhatsApp Image 2026-03-07 at 4.37.23 PM(5).jpeg',
    'WhatsApp Image 2026-03-07 at 4.37.23 PM(6).jpeg',
    'WhatsApp Image 2026-03-07 at 4.37.23 PM(7).jpeg',
    'WhatsApp Image 2026-03-07 at 4.37.23 PM(8).jpeg',
    'WhatsApp Image 2026-03-07 at 4.37.23 PM(9).jpeg',
    'WhatsApp Image 2026-03-07 at 4.37.23 PM.jpeg',
    'WhatsApp Image 2026-03-07 at 9.58.43 PM.jpeg',
    'WhatsApp Image 2026-03-07 at 9.58.46 PM.jpeg',
  ];

  const botiAkaaImages = botiAkaaFiles.map((file, index) => ({
    src: `/Excursion%20to%20Boti/${encodeURIComponent(file)}`,
    alt: `Boti & Akaa 2026 Image ${index + 1}`,
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
        <div className={styles.galleryContainer}>
          {careerDayImages.map((image, index) => (
            <img key={index} src={image.src} alt={image.alt} />
          ))}
        </div>
        {/* Ghana Month and Mega Fruit Day section removed as requested */}
        <h3 className={styles.galleryTitle}>Boti &amp; Akaa 2026</h3>
        <div className={styles.galleryContainer}>
          {botiAkaaImages.map((image, index) => (
            <img key={index} src={image.src} alt={image.alt} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
