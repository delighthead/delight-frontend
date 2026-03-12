import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("ADMIN");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Replace with your actual API call
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: name, Password: password, Role: role, Email: email })
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Sign up failed");
      navigate("/portal/login");
    } catch (err: any) {
      setError(err.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <select value={role} onChange={e => setRole(e.target.value)} className={styles.input}>
          <option value="ADMIN">Admin</option>
          <option value="TEACHER">Teacher</option>
          <option value="PARENT">Parent</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.primaryBtn} disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
}
