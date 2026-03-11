import { useEffect, useState, useCallback } from "react";
import { apiGet } from "../../lib/api";
import { getToken, getRole } from "../../lib/auth";
import styles from "./Dashboard.module.css";

interface FeeRecord {
  id: string;
  amount: number;
  description: string;
  dueDate: string;
  paidDate: string | null;
  status: string;
  student?: { user: { name: string }; admissionNumber: string };
}

export default function Fees() {
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const role = getRole();

  const fetchFees = useCallback(async () => {
    try {
      const token = getToken();
      const data = await apiGet<{ fees: FeeRecord[] }>("/fees", token || undefined);
      setFees(data.fees);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFees();
  }, [fetchFees]);

  const statusStyle = (status: string) => {
    switch (status) {
      case "PAID":
        return { background: "#16a34a", color: "#fff" };
      case "PENDING":
        return { background: "#f59e0b", color: "#fff" };
      case "OVERDUE":
        return { background: "#dc2626", color: "#fff" };
      case "PARTIAL":
        return { background: "#6366f1", color: "#fff" };
      default:
        return {};
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Fee Payments</h2>
      </div>

      {loading ? (
        <p style={{ color: "#6b7280" }}>Loading...</p>
      ) : fees.length === 0 ? (
        <div className={styles.card}>
          <div className={styles.emptyState}>No fee records found.</div>
        </div>
      ) : (
        <div className={styles.card}>
          <table className={styles.table}>
            <thead>
              <tr>
                {(role === "ADMIN" || role === "TEACHER") && <th>Student</th>}
                <th>Description</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Paid Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((f) => (
                <tr key={f.id}>
                  {(role === "ADMIN" || role === "TEACHER") && (
                    <td style={{ fontWeight: 500 }}>{f.student?.user.name ?? "—"}</td>
                  )}
                  <td>{f.description}</td>
                  <td style={{ fontWeight: 600 }}>GH₵ {f.amount.toFixed(2)}</td>
                  <td>{new Date(f.dueDate).toLocaleDateString()}</td>
                  <td>{f.paidDate ? new Date(f.paidDate).toLocaleDateString() : "—"}</td>
                  <td>
                    <span className={styles.badge} style={statusStyle(f.status)}>
                      {f.status}
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
