import { useEffect, useState, useCallback } from "react";
import { apiGet } from "../../lib/api";
import { getToken, getRole } from "../../lib/auth";
import styles from "./Dashboard.module.css";

interface AttendanceRecord {
  id: string;
  date: string;
  status: string;
  student?: { user: { name: string }; admissionNumber: string };
  class?: { name: string };
}

export default function Attendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const role = getRole();

  const fetchAttendance = useCallback(async () => {
    try {
      const token = getToken();
      const data = await apiGet<{ attendance: AttendanceRecord[] }>("/attendance", token || undefined);
      setRecords(data.attendance);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const statusColor = (status: string) => {
    switch (status) {
      case "PRESENT":
        return "#16a34a";
      case "ABSENT":
        return "#dc2626";
      case "LATE":
        return "#f59e0b";
      case "EXCUSED":
        return "#6366f1";
      default:
        return "#6b7280";
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Attendance</h2>
      </div>

      {loading ? (
        <p style={{ color: "#6b7280" }}>Loading...</p>
      ) : records.length === 0 ? (
        <div className={styles.card}>
          <div className={styles.emptyState}>No attendance records found.</div>
        </div>
      ) : (
        <div className={styles.card}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                {(role === "ADMIN" || role === "TEACHER") && <th>Student</th>}
                {(role === "ADMIN" || role === "TEACHER") && <th>Admission #</th>}
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  {(role === "ADMIN" || role === "TEACHER") && (
                    <td style={{ fontWeight: 500 }}>{r.student?.user.name ?? "—"}</td>
                  )}
                  {(role === "ADMIN" || role === "TEACHER") && (
                    <td style={{ color: "#6b7280" }}>{r.student?.admissionNumber ?? "—"}</td>
                  )}
                  <td>
                    <span
                      className={styles.badge}
                      style={{ background: statusColor(r.status), color: "#fff" }}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
