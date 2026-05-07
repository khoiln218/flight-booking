import { createContext } from "react";
import type { AuthResponse } from "../services/auth.service";

export type User = {
    fullName: string;
    email: string;
    role: string;
};

export type AuthContextType = {
    user: User | null;
    loginUser: (data: AuthResponse) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);