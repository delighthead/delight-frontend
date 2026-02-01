import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  // Academic background images for hero slideshow
  const backgroundImages = [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop', // Students graduation
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop', // University library
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&h=1080&fit=crop', // Classroom learning
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080&fit=crop', // Students studying
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1920&h=1080&fit=crop', // Teacher with students
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const features = [
    { icon: '📚', title: 'Modern Library', description: 'State-of-the-art library with thousands of books and digital resources' },
    { icon: '💻', title: 'Computer Labs', description: 'Fully equipped computer labs with the latest technology' },
    { icon: '🎨', title: 'Creative Arts', description: 'Dedicated spaces for music, art, and creative expression' },
    { icon: '⚽', title: 'Sports Facilities', description: 'Playgrounds, courts, and fields for physical development' },
  ];

  const stats = [
    { number: '500+', label: 'Students' },
    { number: '35+', label: 'Teachers' },
    { number: '20+', label: 'Years' },
    { number: '98%', label: 'Success Rate' },
  ];

  const testimonials = [
    { quote: "Delight International School has transformed my child's approach to learning!", author: 'Mrs. Adwoa Mensah', role: 'Parent' },
    { quote: "The best decision we made was enrolling our kids here. Excellent environment!", author: 'Mr. Kwame Asante', role: 'Parent' },
    { quote: "I love my school! The teachers make learning fun and I've made so many friends.", author: 'Ama, Age 10', role: 'Student' },
  ];

  return (
    <div className={styles.page}>
      {/* Animated Background Elements */}
      <div className={styles.floatingElements}>
        <img
          className={`${styles.float1} ${styles.floatLogo}`}
          src="/images/logo.jpg"
          alt="Delight International School logo"
        />
        <span className={styles.float2}>✏️</span>
        <span className={styles.float3}>🎓</span>
        <img
          className={`${styles.float4} ${styles.floatLogo}`}
          src="/images/logo.jpg"
          alt="Delight International School logo"
        />
        <span className={styles.float5}>📐</span>
        <span className={styles.float6}>🔬</span>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>🎓</span>
            <span>Delight International School</span>
          </Link>
          <nav className={styles.nav}>
            <Link to="/" className={styles.active}>Home</Link>
            <Link to="/about">About</Link>
            <Link to="/admissions">Admissions</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/apply" className={styles.applyBtn}>Apply Now</Link>
            <a
              href="/files/ADMISSION%20FORM%20NEW.pdf"
              className={styles.applyBtn}
              download
            >
              Download Form
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Background Image Slideshow */}
        <div className={styles.heroBackgrounds}>
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`${styles.heroBgImage} ${index === currentBgIndex ? styles.activeBg : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>🏆 Excellence in Education Since 2010</span>
          <h1>Where Young Minds <span className={styles.highlight}>Blossom</span></h1>
          <p>Empowering students with knowledge, creativity, and integrity to succeed in a rapidly changing world.</p>
          <div className={styles.heroButtons}>
            <Link to="/apply" className={styles.primaryBtn}>
              Start Your Journey <span>→</span>
            </Link>
            <a
              href="/files/ADMISSION%20FORM%20NEW.pdf"
              className={styles.secondaryBtn}
              download
            >
              Download Form
            </a>
            <Link to="/gallery" className={styles.secondaryBtn}>
              <span className={styles.playIcon}>▶</span> Virtual Tour
            </Link>
          </div>
        </div>
        <div className={styles.heroImages}>
          <img src="https://images.unsplash.com/photo-1613896527026-f195d5c818ed?w=400&h=300&fit=crop" alt="African students learning" className={styles.heroImg1} />
          <img src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?w=350&h=250&fit=crop" alt="Classroom" className={styles.heroImg2} />
          <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=300&h=200&fit=crop" alt="Happy African students" className={styles.heroImg3} />
        </div>
        <div className={styles.scrollIndicator}>
          <div className={styles.mouse}></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>✨ Our Facilities</span>
          <h2>World-Class Learning Environment</h2>
          <p>We provide everything your child needs to thrive academically and personally</p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryGrid}>
          <div className={styles.galleryItem}>
            <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop" alt="Library" />
            <div className={styles.galleryOverlay}><span>📚 Our Library</span></div>
          </div>
          <div className={styles.galleryItem}>
            <img src="https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=600&h=400&fit=crop" alt="African students at computer" />
            <div className={styles.galleryOverlay}><span>💻 Computer Lab</span></div>
          </div>
          <div className={styles.galleryItem}>
            <img src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop" alt="African children playing" />
            <div className={styles.galleryOverlay}><span>🎢 Playground</span></div>
          </div>
          <div className={styles.galleryItem}>
            <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop" alt="Science Lab" />
            <div className={styles.galleryOverlay}><span>🔬 Science Lab</span></div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutImages}>
          <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&h=600&fit=crop" alt="African teacher with students" className={styles.aboutImg1} />
          <img src="/files/Blessing" alt="Student" className={styles.aboutImg2} />
          <div className={styles.expBadge}>
            <span className={styles.expNumber}>20+</span>
            <span>Years</span>
          </div>
        </div>
        <div className={styles.aboutContent}>
          <span className={styles.sectionBadge}>🏫 About Us</span>
          <h2>Nurturing Tomorrow's Leaders Today</h2>
          <p>Delight International School is committed to nurturing young minds through holistic education that combines academic excellence with moral and social development.</p>
          <ul className={styles.checkList}>
            <li>✓ Experienced and caring teachers</li>
            <li>✓ Small class sizes for personalized attention</li>
            <li>✓ Modern facilities and resources</li>
            <li>✓ Safe and nurturing environment</li>
          </ul>
          <Link to="/about" className={styles.learnMoreBtn}>Learn More About Us →</Link>
        </div>
      </section>

      {/* Programs Section */}
      <section className={styles.programsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>📚 Our Programs</span>
          <h2>Education for Every Stage</h2>
        </div>
        <div className={styles.programsGrid}>
          <div className={styles.programCard}>
            <img src="https://images.unsplash.com/photo-1597892657493-6847b9640bac?w=400&h=250&fit=crop" alt="African toddlers learning" />
            <div className={styles.programContent}>
              <span className={styles.programAge}>Ages 2-5</span>
              <h3>Early Years</h3>
              <p>Play-based learning that nurtures curiosity and builds strong foundations.</p>
            </div>
          </div>
          <div className={styles.programCard}>
            <img src="https://images.unsplash.com/photo-1613896527026-f195d5c818ed?w=400&h=250&fit=crop" alt="African primary students" />
            <div className={styles.programContent}>
              <span className={styles.programAge}>Ages 6-11</span>
              <h3>Primary School</h3>
              <p>Comprehensive curriculum developing literacy, numeracy, and critical thinking.</p>
            </div>
          </div>
          <div className={styles.programCard}>
            <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=250&fit=crop" alt="African JHS students" />
            <div className={styles.programContent}>
              <span className={styles.programAge}>Ages 12-15</span>
              <h3>Junior High School</h3>
              <p>Preparing students for higher education with advanced academics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>💬 Testimonials</span>
          <h2>What Parents & Students Say</h2>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((t, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.quoteIcon}>"</div>
              <p>{t.quote}</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.avatar}>{t.author[0]}</div>
                <div><strong>{t.author}</strong><span>{t.role}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Be Part of Our Academic Journey</h2>
          <p>Enroll your child today and experience quality education that inspires confidence and excellence.</p>
          <div className={styles.ctaButtons}>
            <Link to="/apply" className={styles.ctaPrimaryBtn}>Apply Now</Link>
            <a
              href="/files/ADMISSION%20FORM%20NEW.pdf"
              className={styles.ctaSecondaryBtn}
              download
            >
              Download Form
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>📞 Phone: +233 244 113 286 and +233 277 776 449  |  📍 Address: Delight International School Box AN 5044 Accra North  |  ✉️ Email: delightintschool@gmail.com</p>
          <p>&copy; 2025 Delight International School All Rights Reserved | Designed and Developed by CRS Tech Solutions</p>
        </div>
      </footer>
    </div>
  );
}
