import { Header, Footer } from '../../components/Layout';
import styles from './Gallery.module.css';

export default function Gallery() {
  const imageFiles = [
    '1jpg',
    '1jpg (Copy)',
    'IMG20251023130839.jpg',
    'IMG20251023130941.jpg',
    'IMG20251030163000.jpg',
    'IMG20251030163245.jpg',
    'IMG20251030163331.jpg',
    'IMG20251030163623.jpg',
    'IMG20251030163644.jpg',
    'IMG20251030163657.jpg',
    'IMG20251030163708.jpg',
    'IMG20251030163731.jpg',
    'IMG20251030163820.jpg',
    'IMG20251030163832.jpg',
    'IMG20251030171429.jpg',
    'IMG20251212144010.jpg',
    'IMG20251212144126.jpg',
    'IMG20251212144545.jpg',
    'IMG20251212145708.jpg',
    'IMG-20260129-WA0002.jpg',
    'IMG-20260129-WA0003.jpg',
    'IMG-20260129-WA0005.jpg',
    'IMG-20260129-WA0006.jpg',
    'IMG-20260129-WA0007.jpg',
    'IMG-20260129-WA0008.jpg',
    'IMG-20260129-WA0009.jpg',
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
      </section>

      <Footer />
    </div>
  );
}
