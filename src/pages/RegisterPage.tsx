import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../hooks/useAuth";
import Navbar from "../components/Nav";

type RegisterForm = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState<RegisterForm>({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.fullName || !form.email || !form.password) {
            return setError("Vui lòng nhập đầy đủ thông tin");
        }

        if (form.password.length < 6) {
            return setError("Mật khẩu phải >= 6 ký tự");
        }

        if (form.password !== form.confirmPassword) {
            return setError("Mật khẩu không khớp");
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const existed = users.find((u: User) => u.email === form.email);
        if (existed) {
            return setError("Email đã tồn tại");
        }

        const newUser = {
            id: Date.now(),
            fullName: form.fullName,
            email: form.email,
            password: form.password,
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        setSuccess("Đăng ký thành công!");
        setError("");

        setTimeout(() => {
            navigate("/login");
        }, 500);
    };

    return (
        <div style={styles.container}>
            <Navbar />
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>Đăng ký</h2>

                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}

                <input
                    type="text"
                    name="fullName"
                    placeholder="Họ và tên"
                    value={form.fullName}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={form.password}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>
                    Đăng ký
                </button>

                <p style={{ marginTop: 10 }}>
                    Đã có tài khoản?{" "}
                    <span
                        style={styles.link}
                        onClick={() => navigate("/login")}
                    >
                        Đăng nhập
                    </span>
                </p>
            </form>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    form: {
        width: 350,
        maxWidth: "500px",
        margin: "40px auto",
        background: "#fff",
        borderRadius: "18px",
        padding: "32px",
        boxShadow:
            "0 4px 20px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
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

    success: {
        color: "green",
        marginBottom: 12,
        textAlign: "center",
        fontSize: 14,
    },

    link: {
        color: "#007bff",
        cursor: "pointer",
        fontWeight: "bold",
    },
};