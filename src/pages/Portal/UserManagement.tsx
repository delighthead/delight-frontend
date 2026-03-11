import { useState } from "react";
import { apiPost } from "../../lib/api";
import { getToken } from "../../lib/auth";

interface UserForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function UserManagement() {
  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    role: "TEACHER",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    try {
      // Step 1: Create user account
      const userRes = await apiPost(
        form.role === "TEACHER" ? "/api/v1/admin/staff" : "/api/v1/admin/students",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        },
        token
      );
      // Step 2: Create profile (if needed)
      // For teachers, create teacher profile
      if (form.role === "TEACHER") {
        await apiPost(
          "/api/v1/admin/teachers",
          {
            userId: userRes.id,
            employeeId: userRes.employeeId || "", // Adjust as needed
          },
          token
        );
      }
      // For students, create student profile
      if (form.role === "STUDENT") {
        await apiPost(
          "/api/v1/admin/students",
          {
            userId: userRes.id,
            admissionNo: userRes.admissionNo || "", // Adjust as needed
          },
          token
        );
      }
      alert("Account created successfully!");
      setForm({ name: "", email: "", password: "", role: "TEACHER" });
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="TEACHER">Teacher</option>
          <option value="STUDENT">Student</option>
        </select>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
