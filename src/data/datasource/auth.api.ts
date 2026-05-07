import axios from "axios";
import type { AuthResponse } from "../../services/auth.service";

const api = axios.create({
    baseURL: "https://backend-flightbooking.onrender.com/api/",
    timeout: 60000,
});

export const login = async (
    payload: { email: string; password: string }
): Promise<AuthResponse> => {
    const res = await api.post("/auth/login", payload);
    return res.data;
};

export const register = async (
    payload: { email: string; password: string; fullName: string }
): Promise<AuthResponse> => {
    const res = await api.post("/auth/register", payload);
    return res.data;
};