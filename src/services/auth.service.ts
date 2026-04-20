import { authDataSource } from "../data/datasource";

// ✅ Types
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

export type User = {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    role: string;
    createdAt: string;

};

export type AuthResponse = {
    user: User;
    token: string;
};

// ✅ Service
export const login = async (data: LoginPayload): Promise<AuthResponse> => {
    return authDataSource.login(data);
};

export const register = async (
    data: RegisterPayload
): Promise<AuthResponse> => {
    return authDataSource.register(data);
};