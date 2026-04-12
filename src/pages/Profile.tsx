import type { JSX } from "react";
import { useAuth } from "../hooks/useAuth";

// ✅ Define type User (nên tách ra file riêng /types)
type User = {
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  logout: () => void;
};

export default function Profile(): JSX.Element {
  const { user, logout } = useAuth() as AuthContextType;

  return (
    <div style={{ padding: 20 }}>
      <h2>Profile</h2>

      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}