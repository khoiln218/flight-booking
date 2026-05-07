import { authDataSource } from "../data/datasource";
import type { User } from "../hooks/useAuth";

export type LoginPayload = {
    email: string;
    password: string;
};

export type RegisterPayload = {
    email: string;
    password: string;
    fullName: string;
    phone: string;
};

export type AuthResponse = {
    user: User;
    token: string;
};

export const login = async (data: LoginPayload): Promise<AuthResponse> => {
    return authDataSource.login(data);
};

export const register = async (
    data: RegisterPayload
): Promise<AuthResponse> => {
    return authDataSource.register(data);
};