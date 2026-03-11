import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getToken, getRole, logout, type AppRole } from "../../lib/auth";
import styles from "./Dashboard.module.css";

interface NavItem {
  label: string;
  path: string;
  roles: AppRole[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: "/portal/dashboard", roles: ["ADMIN", "TEACHER", "STUDENT", "PARENT"] },
  { label: "Students", path: "/portal/dashboard/students", roles: ["ADMIN", "TEACHER"] },
  { label: "Teachers", path: "/portal/dashboard/teachers", roles: ["ADMIN"] },
  { label: "Classes", path: "/portal/dashboard/classes", roles: ["ADMIN", "TEACHER"] },
  { label: "Subjects", path: "/portal/dashboard/subjects", roles: ["ADMIN", "TEACHER"] },
  { label: "Attendance", path: "/portal/dashboard/attendance", roles: ["ADMIN", "TEACHER", "STUDENT"] },
  { label: "Grades", path: "/portal/dashboard/grades", roles: ["ADMIN", "TEACHER", "STUDENT", "PARENT"] },
  { label: "Timetable", path: "/portal/dashboard/timetable", roles: ["ADMIN", "TEACHER", "STUDENT"] },
  { label: "Fees", path: "/portal/dashboard/fees", roles: ["ADMIN", "STUDENT", "PARENT"] },
];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState<AppRole | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/portal/login");
      return;
    }
    setRole(getRole());
  }, [navigate]);

  function handleLogout() {
    logout();
    navigate("/portal/login");
  }

  if (!role) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#6b7280" }}>Loading...</p>
      </div>
    );
  }

  const visibleNav = NAV_ITEMS.filter((item) => item.roles.includes(role));
  const currentTitle = visibleNav.find((n) => n.path === location.pathname)?.label || "Dashboard";

  return (
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarVisible : ""}`}>
        <div className={styles.sidebarBrand}>
          <span>🎓</span>
          <span>Delight School</span>
        </div>

        <nav className={styles.sidebarNav}>
          {visibleNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`${styles.navLink} ${location.pathname === item.path ? styles.navLinkActive : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.roleTag}>
            Signed in as <strong>{role}</strong>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <span className={styles.topTitle}>{currentTitle}</span>
        </header>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
