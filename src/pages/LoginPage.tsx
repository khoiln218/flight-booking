import {
    useState,
    type ChangeEvent,
    type JSX,
    type CSSProperties,
} from "react";

import { login } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type LoginForm = {
    email: string;
    password: string;
};

export default function LoginPage(): JSX.Element {
    const [form, setForm] = useState<LoginForm>({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleChange =
        (field: keyof LoginForm) =>
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
            <form style={styles.form} onSubmit={handleSubmit}>
                <h1 style={styles.title}>Đăng nhập</h1>

                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.group}>
                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Nhập email"
                        value={form.email}
                        onChange={handleChange("email")}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.group}>
                    <label>Mật khẩu</label>

                    <input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={form.password}
                        onChange={handleChange("password")}
                        style={styles.input}
                        required
                    />
                </div>

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
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
    },

    form: {
        width: 400,
        background: "#fff",
        padding: 30,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },

    title: {
        textAlign: "center",
        marginBottom: 24,
    },

    group: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 16,
    },

    input: {
        padding: 12,
        marginTop: 8,
        borderRadius: 8,
        border: "1px solid #ccc",
        fontSize: 16,
    },

    button: {
        width: "100%",
        padding: 14,
        border: "none",
        borderRadius: 8,
        background: "#007bff",
        color: "#fff",
        fontSize: 16,
        cursor: "pointer",
    },

    error: {
        color: "red",
        marginBottom: 12,
        textAlign: "center",
    },
};