import { authDataSource } from "../data/datasource";

// ✅ Types
export type LoginPayload = {
    email: string;
    password: string;
};

export type RegisterPayload = {
    email: string;
    password: string;
    name: string;
};

export type User = {
    name: string;
    email: string;
    role: string;
};

export type AuthResponse = {
    user: User;
    token: string;
};

// ✅ Service
export const login = async (data: LoginPayload): Promise<AuthResponse> => {
    return authDataSource.loginMock(data);
};

export const register = async (
    data: RegisterPayload
): Promise<AuthResponse> => {
    return authDataSource.registerMock(data);
};