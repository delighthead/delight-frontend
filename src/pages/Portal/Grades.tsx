import { useEffect, useState, useCallback } from "react";
import { apiGet } from "../../lib/api";
import { getToken, getRole } from "../../lib/auth";
import styles from "./Dashboard.module.css";

interface Grade {
  id: string;
  score: number;
  maxScore: number;
  examType: string;
  term: string;
  remarks: string | null;
  student?: { user: { name: string }; admissionNumber: string };
  subject: { name: string; code: string };
}

export default function Grades() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const role = getRole();

  const fetchGrades = useCallback(async () => {
    try {
      const token = getToken();
      const data = await apiGet<{ grades: Grade[] }>("/grades", token || undefined);
      setGrades(data.grades);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGrades();
  }, [fetchGrades]);

  const percentage = (score: number, max: number) => ((score / max) * 100).toFixed(1);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Grades</h2>
      </div>

      {loading ? (
        <p style={{ color: "#6b7280" }}>Loading...</p>
      ) : grades.length === 0 ? (
        <div className={styles.card}>
          <div className={styles.emptyState}>No grade records found.</div>
        </div>
      ) : (
        <div className={styles.card}>
          <table className={styles.table}>
            <thead>
              <tr>
                {(role === "ADMIN" || role === "TEACHER") && <th>Student</th>}
                <th>Subject</th>
                <th>Exam Type</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Term</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => (
                <tr key={g.id}>
                  {(role === "ADMIN" || role === "TEACHER") && (
                    <td style={{ fontWeight: 500 }}>{g.student?.user.name ?? "—"}</td>
                  )}
                  <td>
                    <span className={styles.badge}>{g.subject.code}</span> {g.subject.name}
                  </td>
                  <td>{g.examType}</td>
                  <td>
                    {g.score}/{g.maxScore}
                  </td>
                  <td style={{ fontWeight: 600 }}>{percentage(g.score, g.maxScore)}%</td>
                  <td>{g.term}</td>
                  <td style={{ color: "#6b7280", fontSize: "0.875rem" }}>{g.remarks || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
