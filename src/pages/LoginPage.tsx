import {
    useState,
    type ChangeEvent,
    type JSX,
    type CSSProperties,
} from "react";

import { login, type LoginPayload } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Nav";

export default function LoginPage(): JSX.Element {
    const [form, setForm] = useState<LoginPayload>({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleChange =
        (field: keyof LoginPayload) =>
            (e: ChangeEvent<HTMLInputElement>) => {
                setForm((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                }));
            };

    const handleSubmit = async (
        e: ChangeEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            const res = await login(form);
            loginUser(res);
            navigate("/");
        } catch (err: unknown) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleError = (err: unknown): void => {
        if (err instanceof Error) {
            setError(err.message);
            return;
        }

        if (
            typeof err === "object" &&
            err !== null &&
            "message" in err
        ) {
            setError(String(err.message));
            return;
        }

        setError("Đăng nhập thất bại");
    };

    return (
        <div style={styles.container}>
            <Navbar />
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2 style={styles.title}>Đăng nhập</h2>

                {error && <p style={styles.error}>{error}</p>}

                <input
                    type="email"
                    placeholder="Nhập email"
                    value={form.email}
                    onChange={handleChange("email")}
                    style={styles.input}
                    required
                />

                <input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={form.password}
                    onChange={handleChange("password")}
                    style={styles.input}
                    required
                />

                <button
                    type="submit"
                    style={styles.button}
                    disabled={loading}
                >
                    {loading
                        ? "Đang đăng nhập..."
                        : "Đăng nhập"}
                </button>
            </form>
        </div>
    );
}

const styles: Record<string, CSSProperties> = {
    form: {
        width: "100%",
        maxWidth: 320,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 16,
        padding: 32,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: 12,
    },

    input: {
        marginBottom: 12,
        padding: 10,
        borderRadius: 6,
        border: "1px solid #ccc",
    },

    button: {
        padding: 12,
        border: "none",
        borderRadius: 6,
        background: "#007bff",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
    },

    error: {
        color: "red",
        marginBottom: 12,
        textAlign: "center",
    },
};