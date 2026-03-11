import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRole, type AppRole } from "../../lib/auth";
import styles from "./Dashboard.module.css";

const STAT_CARDS: { label: string; icon: string; roles: AppRole[] }[] = [
  { label: "Students", icon: "👨‍🎓", roles: ["ADMIN", "TEACHER"] },
  { label: "Teachers", icon: "👨‍🏫", roles: ["ADMIN"] },
  { label: "Classes", icon: "📚", roles: ["ADMIN", "TEACHER"] },
  { label: "Subjects", icon: "📖", roles: ["ADMIN", "TEACHER"] },
  { label: "My Grades", icon: "📊", roles: ["STUDENT"] },
  { label: "My Attendance", icon: "📋", roles: ["STUDENT"] },
  { label: "My Fees", icon: "💰", roles: ["STUDENT", "PARENT"] },
  { label: "My Children", icon: "👨‍👩‍👧", roles: ["PARENT"] },
];

export default function DashboardHome() {
  const [role, setRole] = useState<AppRole | null>(null);

  useEffect(() => {
    setRole(getRole());
  }, []);

  if (!role) return null;

  const cards = STAT_CARDS.filter((c) => c.roles.includes(role));

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h2 className={styles.pageTitle}>Welcome back!</h2>
        <p className={styles.statSub}>Here's an overview of your school management portal.</p>
      </div>

      <div className={styles.gridCards}>
        {cards.map((card) => (
          <div key={card.label} className={styles.statCard}>
            <div className={styles.statIcon}>{card.icon}</div>
            <div className={styles.statLabel}>{card.label}</div>
            <p className={styles.statSub}>Manage {card.label.toLowerCase()}</p>
          </div>
        ))}
      </div>

      {role === "ADMIN" && (
        <div className={styles.card} style={{ marginTop: "2.5rem", padding: "1.5rem" }}>
          <h3 className={styles.statLabel} style={{ marginBottom: "1rem" }}>Quick Actions</h3>
          <div className={styles.quickActions}>
            <Link to="/portal/dashboard/students" className={styles.actionBtn}>+ Add Student</Link>
            <Link to="/portal/dashboard/teachers" className={styles.actionBtn}>+ Add Teacher</Link>
            <Link to="/portal/dashboard/classes" className={styles.actionBtn}>+ Create Class</Link>
            <Link to="/portal/dashboard/subjects" className={styles.actionBtn}>+ Add Subject</Link>
          </div>
        </div>
      )}
    </div>
  );
}
