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

  // Admin account creation form state
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminSuccess, setAdminSuccess] = useState("");
  async function handleAdminCreate(e: React.FormEvent) {
    e.preventDefault();
    setAdminError("");
    setAdminSuccess("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/v1/sys/users/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name: adminName, email: adminEmail, phone: adminPhone, password: adminPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAdminError(data.error || "Failed to create admin account.");
      } else {
        setAdminSuccess("Admin account created successfully.");
        setAdminName(""); setAdminEmail(""); setAdminPhone(""); setAdminPassword("");
        setShowAdminForm(false);
      }
    } catch (err) {
      setAdminError("Server error.");
    }
  }
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
            <button className={styles.actionBtn} onClick={() => setShowAdminForm((v) => !v)}>
              + Create Account as Admin
            </button>
          </div>
          {showAdminForm && (
            <form onSubmit={handleAdminCreate} style={{ marginTop: "1.5rem" }}>
              <div style={{ marginBottom: "0.5rem" }}>
                <input
                  type="text"
                  placeholder="Name"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <input
                  type="email"
                  placeholder="Email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <input
                  type="text"
                  placeholder="Phone"
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <input
                  type="password"
                  placeholder="Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <button type="submit" className={styles.primaryBtn}>Create Admin Account</button>
              {adminError && <div style={{ color: "#d32f2f", marginTop: "0.5rem" }}>{adminError}</div>}
              {adminSuccess && <div style={{ color: "#388e3c", marginTop: "0.5rem" }}>{adminSuccess}</div>}
            </form>
          )}
        </div>
      )}
    </div>
  );
}
