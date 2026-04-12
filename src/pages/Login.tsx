import { useState, type ChangeEvent, type JSX } from "react";
import { login } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// ✅ Type cho form
type LoginForm = {
    email: string;
    password: string;
};

export default function Login(): JSX.Element {
    const [form, setForm] = useState<LoginForm>({
        email: "",
        password: "",
    });

    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleChange =
        (field: keyof LoginForm) => (e: ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, [field]: e.target.value });
        };

    const handleSubmit = async (): Promise<void> => {
        try {
            const res = await login(form);
            loginUser(res);
            navigate("/");
        } catch (err: unknown) {
            handleError(err);
        }
    };

    const handleError = (err: unknown) => {
        if (err instanceof Error) {
            alert(err.message);
            return;
        }

        if (typeof err === "object" && err !== null && "message" in err) {
            alert(String(err.message));
            return;
        }

        alert("Login failed");
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Login</h2>

            <input
                placeholder="Email"
                value={form.email}
                onChange={handleChange("email")}
            />
            <br />

            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange("password")}
            />
            <br />

            <button onClick={handleSubmit}>Login</button>
        </div>
    );
}