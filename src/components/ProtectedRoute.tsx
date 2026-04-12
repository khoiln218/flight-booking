import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { JSX, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props): JSX.Element {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}