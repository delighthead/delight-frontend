import { useEffect, useState, useCallback } from "react";
import { apiGet } from "../../lib/api";
import { getToken } from "../../lib/auth";
import styles from "./Dashboard.module.css";

interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: { user: { name: string } } | null;
}

export default function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = useCallback(async () => {
    try {
      const token = getToken();
      const data = await apiGet<{ subjects: Subject[] }>("/subjects", token || undefined);
      setSubjects(data.subjects);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Subjects</h2>
      </div>

      {loading ? (
        <p style={{ color: "#6b7280" }}>Loading...</p>
      ) : subjects.length === 0 ? (
        <div className={styles.card}>
          <div className={styles.emptyState}>No subjects found.</div>
        </div>
      ) : (
        <div className={styles.card}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Subject Name</th>
                <th>Teacher</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s) => (
                <tr key={s.id}>
                  <td>
                    <span className={styles.badge}>{s.code}</span>
                  </td>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td style={{ color: "#6b7280" }}>{s.teacher ? s.teacher.user.name : "Not assigned"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
