import { Header, Footer } from '../../components/Layout';
import styles from './Gallery.module.css';

export default function Gallery() {
  const images = [
    { src: '/images/BGM LOGO.jpg', alt: 'Gallery Image 1' },
    { src: '/images/gallery2.jpg', alt: 'Gallery Image 2' },
    { src: '/images/CRS LOGO.jpg', alt: 'Gallery Image 3' },
    { src: '/images/gallery4.jpg', alt: 'Gallery Image 4' },
    { src: '/images/logo OFANKOR.jpg', alt: 'Gallery Image 5' },
    { src: '/images/gallery3.jpg', alt: 'Gallery Image 6' },
    { src: '/images/logo 1.jpg', alt: 'Gallery Image 7' },
    { src: '/images/DELIGHT LOGO.jpg', alt: 'Gallery Image 8' },
    { src: '/images/CRS LOGO.jpg', alt: 'Gallery Image 9' },
    { src: '/images/gallery4.jpg', alt: 'Gallery Image 10' },
    { src: '/images/logo OFANKOR.jpg', alt: 'Gallery Image 11' },
    { src: '/images/gallery3.jpg', alt: 'Gallery Image 12' },
    { src: '/images/CRS LOGO.jpg', alt: 'Gallery Image 13' },
    { src: '/images/gallery4.jpg', alt: 'Gallery Image 14' },
    { src: '/images/logo OFANKOR.jpg', alt: 'Gallery Image 15' },
    { src: '/images/gallery3.jpg', alt: 'Gallery Image 16' },
    { src: '/images/logo 1.jpg', alt: 'Gallery Image 17' },
    { src: '/images/DELIGHT LOGO.jpg', alt: 'Gallery Image 18' },
    { src: '/images/gallery3.jpg', alt: 'Gallery Image 19' },
    { src: '/images/gallery4.jpg', alt: 'Gallery Image 20' },
  ];

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
