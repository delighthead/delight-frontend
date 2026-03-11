import { useEffect, useState, useCallback } from "react";
import { apiGet } from "../../lib/api";
import { getToken } from "../../lib/auth";
import styles from "./Dashboard.module.css";

interface ClassItem {
  id: string;
  name: string;
  section: string | null;
  academicYear: string;
  teacher: { user: { name: string } } | null;
  _count: { students: number };
}

export default function Classes() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClasses = useCallback(async () => {
    try {
      const token = getToken();
      const data = await apiGet<{ classes: ClassItem[] }>("/classes", token || undefined);
      setClasses(data.classes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Classes</h2>
      </div>

      {loading ? (
        <p style={{ color: "#6b7280" }}>Loading...</p>
      ) : classes.length === 0 ? (
        <div className={styles.card}>
          <div className={styles.emptyState}>No classes found.</div>
        </div>
      ) : (
        <div className={styles.cardGrid}>
          {classes.map((c) => (
            <div key={c.id} className={styles.card}>
              <h3 style={{ margin: "0 0 0.5rem", color: "var(--primary)" }}>{c.name}</h3>
              {c.section && (
                <p style={{ margin: "0.25rem 0", color: "#6b7280", fontSize: "0.875rem" }}>
                  Section: {c.section}
                </p>
              )}
              <p style={{ margin: "0.25rem 0", fontSize: "0.875rem" }}>
                Academic Year: <strong>{c.academicYear}</strong>
              </p>
              <p style={{ margin: "0.25rem 0", fontSize: "0.875rem" }}>
                Class Teacher: {c.teacher ? c.teacher.user.name : "Not assigned"}
              </p>
              <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className={styles.badge}>{c._count.students} students</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
