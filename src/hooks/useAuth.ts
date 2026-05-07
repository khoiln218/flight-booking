import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context/AuthContext";

export type User = {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  createdAt: string;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};