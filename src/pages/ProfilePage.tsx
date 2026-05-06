import type { JSX } from "react";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Nav";

type User = {
  fullName: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  logout: () => void;
};

export default function ProfilePage(): JSX.Element {
  const { user, logout } =
    useAuth() as AuthContextType;

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div style={styles.container}>
        {/* Avatar */}
        <div style={styles.avatar}>
          {user?.fullName?.charAt(0)}
        </div>

        <h2 style={styles.title}>
          My Profile
        </h2>

        {/* Card */}
        <div style={styles.card}>
          <div style={styles.infoItem}>
            <span style={styles.label}>
              Full Name
            </span>

            <span style={styles.value}>
              {user?.fullName}
            </span>
          </div>

          <div style={styles.infoItem}>
            <span style={styles.label}>
              Email
            </span>

            <span style={styles.value}>
              {user?.email}
            </span>
          </div>

          <div style={styles.infoItem}>
            <span style={styles.label}>
              Role
            </span>

            <span style={styles.role}>
              {user?.role}
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          style={styles.logoutButton}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles: {
  [key: string]: React.CSSProperties;
} = {
  page: {
    padding: "20px",
  },

  container: {
    maxWidth: "500px",
    margin: "40px auto",
    background: "#fff",
    borderRadius: "18px",
    padding: "32px",
    boxShadow:
      "0 4px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "#1976d2",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    fontWeight: "bold",
    margin: "0 auto 20px",
  },

  title: {
    marginBottom: "24px",
    color: "#222",
  },

  card: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    textAlign: "left",
  },

  infoItem: {
    background: "#f9fafc",
    padding: "16px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    fontSize: "13px",
    color: "#777",
    fontWeight: 500,
  },

  value: {
    fontSize: "16px",
    color: "#222",
    fontWeight: 600,
  },

  role: {
    display: "inline-block",
    width: "fit-content",
    background: "#e3f2fd",
    color: "#1976d2",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 600,
  },

  logoutButton: {
    marginTop: "28px",
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "#d32f2f",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};