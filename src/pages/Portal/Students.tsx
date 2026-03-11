import { useEffect, useState, useCallback } from "react";
import { apiGet } from "../../lib/api";
import { getToken } from "../../lib/auth";
import styles from "./Dashboard.module.css";

interface Student {
  id: string;
  admissionNo: string;
  gender: string | null;
  user: { name: string; email: string; phone: string | null };
  class: { id: string; name: string } | null;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchStudents = useCallback(async () => {
    try {
      const token = getToken();
      const params = search ? `?q=${encodeURIComponent(search)}` : "";
      const data = await apiGet<{ students: Student[] }>(`/students${params}`, token || undefined);
      setStudents(data.students);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Students</h2>
        <input
          type="text"
          placeholder="Search by name or admission no..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {loading ? (
        <p style={{ color: "#6b7280" }}>Loading...</p>
      ) : students.length === 0 ? (
        <div className={styles.card}>
          <div className={styles.emptyState}>No students found.</div>
        </div>
      ) : (
        <div className={styles.card}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Admission No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Class</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 500 }}>{s.admissionNo}</td>
                  <td>{s.user.name}</td>
                  <td style={{ color: "#6b7280" }}>{s.user.email}</td>
                  <td>{s.class?.name || "—"}</td>
                  <td>{s.gender || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
