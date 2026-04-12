import { users } from "./user.mock";

// ✅ Types
export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

// ✅ delay helper
const delay = (ms: number): Promise<void> =>
  new Promise((res) => setTimeout(res, ms));

// ✅ login
export const loginMock = async (
  data: LoginPayload
): Promise<AuthResponse> => {
  const { email, password } = data;

  await delay(500);

  const user = users.find(
    (u: User) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return {
    token: "fake-jwt-token",
    user,
  };
};

// ✅ register
export const registerMock = async (
  data: RegisterPayload
): Promise<AuthResponse> => {
  const { email, password, name } = data;

  await delay(500);

  const exists = users.find((u: User) => u.email === email);
  if (exists) throw new Error("Email already exists");

  const newUser: User = {
    id: "U" + Date.now(),
    email,
    password,
    name,
    role: "user",
  };

  users.push(newUser);

  return {
    token: "fake-jwt-token",
    user: newUser,
  };
};