import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../../lib/api";
import styles from "./Auth.module.css";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiPost("/auth/register", {
        name,
        email,
        password,
        role,
        phone: phone || undefined,
      });
      navigate("/portal/login");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <Link to="/">🎓 Delight International School</Link>
          <h1>Create your account</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <label>Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className={styles.field}>
            <label>Phone (optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+233 XX XXX XXXX"
            />
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className={styles.field}>
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="PARENT">Parent</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className={styles.submit}>
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className={styles.switchLink}>
            Already have an account? <Link to="/portal/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
