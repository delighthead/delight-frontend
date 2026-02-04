import { Header, Footer } from '../../components/Layout';
import { Card } from '../../components/UI';
import styles from './Admissions.module.css';

export default function Admissions() {
  const steps = [
    { title: 'Step 1: Inquiry', description: 'Contact our admissions office or visit the school to learn more about our programs, fees, and enrollment details.' },
    { title: 'Step 2: Application', description: 'Complete and submit the admission form along with the required documents listed below.' },
    { title: 'Step 3: Entrance Assessment', description: 'Prospective students may be invited for an assessment or interview based on their grade level.' },
    { title: 'Step 4: Admission Decision', description: 'Once the evaluation is complete, successful applicants will receive an admission offer and details for registration.' },
  ];

  const programs = [
    { title: 'Early Years', subtitle: 'Ages 2–5 • Play-based learning' },
    { title: 'Primary', subtitle: 'Ages 6–11 • Literacy & numeracy foundations' },
    { title: 'Junior High', subtitle: 'Ages 12–15 • Critical thinking & pathways' },
  ];

  return (
    <div className={styles.page}>
      <Header variant="blue" />

      <section className={styles.hero}>
        <h2>Admissions</h2>
        <p>Join a community dedicated to nurturing excellence and inspiring young minds for the future.</p>
      </section>

      <section className={styles.admissionSection}>
        <h3>Welcome to Delight International School Admissions</h3>
        <p>At Delight International School, we are excited to welcome new students and families into our vibrant learning community. Our admissions process is designed to ensure that each child's unique abilities and potential are recognized and nurtured from day one.</p>

        <h3>Admission Process</h3>
        <div className={styles.steps}>
          {steps.map((step) => (
            <Card key={step.title} title={step.title} description={step.description} variant="blue" />
          ))}
        </div>

        <div className={styles.programsSection}>
          <h3>Admissions & Entry</h3>
          <p>We accept applications year-round. Our admission process is simple: submit an application, attend an open day (optional), and complete a brief assessment/interview.</p>
          <div className={styles.programs}>
            {programs.map((program) => (
              <div key={program.title} className={styles.programCard}>
                <strong>{program.title}</strong>
                <p>{program.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        <h3>Admission Requirements</h3>
        <p>Parents or guardians should submit the following documents during the admission process:</p>
        <ul className={styles.requirementsList}>
          <li>Copy of birth certificate</li>
          <li>One recent passport-size photograph</li>
          <li>Previous school report (if applicable)</li>
          <li>Ghana Card Number of parents</li>
          <li>Residential and digital Address</li>
        </ul>

        <div className={styles.applyCta}>
          <h3>Ready to Join Us?</h3>
          <p>Begin your child's journey with Delight International School today.</p>
          <div className={styles.applyActions}>
            <a
              className={styles.applyBtn}
              href="https://docs.google.com/forms/d/e/1FAIpQLSe0gID4VYQBk6m1ZTvgodypO1bKIYs1m43R22ueAxqXClhK4Q/viewform?usp=sharing&ouid=114204056174231630483"
              target="_blank"
              rel="noreferrer"
            >
              Apply Now
            </a>
            <button type="button" className={styles.downloadBtn}>Download Form</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
