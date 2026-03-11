import { useEffect, useState, useCallback } from "react";
import { apiGet } from "../../lib/api";
import { getToken } from "../../lib/auth";
import styles from "./Dashboard.module.css";

interface Teacher {
  id: string;
  employeeId: string;
  qualification: string | null;
  user: { name: string; email: string; phone: string | null };
  subjects: { id: string; name: string; code: string }[];
  classes: { id: string; name: string }[];
}

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = useCallback(async () => {
    try {
      const token = getToken();
      const data = await apiGet<{ teachers: Teacher[] }>("/teachers", token || undefined);
      setTeachers(data.teachers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Teachers</h2>
      </div>

      {loading ? (
        <p style={{ color: "#6b7280" }}>Loading...</p>
      ) : teachers.length === 0 ? (
        <div className={styles.card}>
          <div className={styles.emptyState}>No teachers found.</div>
        </div>
      ) : (
        <div className={styles.card}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subjects</th>
                <th>Classes</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 500 }}>{t.employeeId}</td>
                  <td>{t.user.name}</td>
                  <td style={{ color: "#6b7280" }}>{t.user.email}</td>
                  <td>{t.subjects.length > 0 ? t.subjects.map((s) => s.name).join(", ") : "—"}</td>
                  <td>{t.classes.length > 0 ? t.classes.map((c) => c.name).join(", ") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
