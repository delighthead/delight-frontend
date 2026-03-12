// ...existing code...

interface UserForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function UserManagement() {
  return (
    <div>
      <h2>User Management</h2>
      <p>Account creation has been disabled.</p>
    </div>
  );
}
