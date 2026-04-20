import { useEffect, useState, type JSX, type ReactNode } from "react";
import { AuthContext, type User } from "../context/AuthContext";
import type { AuthResponse } from "../services/auth.service";

type Props = {
    children: ReactNode;
};

export default function AuthProvider({ children }: Props): JSX.Element {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const loginUser = (data: AuthResponse) => {
        setUser(data.user);
        localStorage.setItem("token", data.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}