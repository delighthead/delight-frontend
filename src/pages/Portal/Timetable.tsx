import { useEffect, useState, useCallback } from "react";
import { apiGet } from "../../lib/api";
import { getToken } from "../../lib/auth";
import styles from "./Dashboard.module.css";

interface TimetableEntry {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  subject: { name: string; code: string };
  teacher: { user: { name: string } };
  class: { id: string; name: string };
}

interface ClassOption {
  id: string;
  name: string;
}

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

export default function Timetable() {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchClasses = useCallback(async () => {
    try {
      const token = getToken();
      const data = await apiGet<{ classes: ClassOption[] }>("/classes", token || undefined);
      setClasses(data.classes);
      if (data.classes.length > 0) {
        setSelectedClass(data.classes[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchTimetable = useCallback(async () => {
    if (!selectedClass) return;
    setLoading(true);
    try {
      const token = getToken();
      const data = await apiGet<{ timetable: TimetableEntry[] }>(
        `/timetable?classId=${selectedClass}`,
        token || undefined
      );
      setEntries(data.timetable);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedClass]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  useEffect(() => {
    fetchTimetable();
  }, [fetchTimetable]);

  const entriesByDay = DAYS.map((day) => ({
    day,
    items: entries
      .filter((e) => e.dayOfWeek === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime)),
  }));

  return (
    <div>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Timetable</h2>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className={styles.searchInput}
          style={{ maxWidth: "250px" }}
        >
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p style={{ color: "#6b7280" }}>Loading...</p>
      ) : entries.length === 0 ? (
        <div className={styles.card}>
          <div className={styles.emptyState}>No timetable entries for this class.</div>
        </div>
      ) : (
        entriesByDay
          .filter((d) => d.items.length > 0)
          .map((d) => (
            <div key={d.day} className={styles.card} style={{ marginBottom: "1rem" }}>
              <h3 style={{ margin: "0 0 0.75rem", color: "var(--primary)", textTransform: "capitalize" }}>
                {d.day.charAt(0) + d.day.slice(1).toLowerCase()}
              </h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                  </tr>
                </thead>
                <tbody>
                  {d.items.map((entry) => (
                    <tr key={entry.id}>
                      <td style={{ fontWeight: 500 }}>
                        {entry.startTime} – {entry.endTime}
                      </td>
                      <td>
                        <span className={styles.badge}>{entry.subject.code}</span> {entry.subject.name}
                      </td>
                      <td style={{ color: "#6b7280" }}>{entry.teacher.user.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
      )}
    </div>
  );
}
