import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../../lib/api";
import styles from "./Auth.module.css";

export default function Register() {
  return (
    <div style={{ padding: 32 }}>
      <h1>Registration is disabled.</h1>
      <p>Please contact the school for access.</p>
    </div>
  );
}
  const [loading, setLoading] = useState(false);
