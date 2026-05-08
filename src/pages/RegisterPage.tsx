import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Nav";
import { register, type RegisterPayload } from "../services/auth.service";
import axios from "axios";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState<RegisterPayload>({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

        try {
            setLoading(true);
            await register(form);

            setSuccess("Đăng ký thành công!");
            setError("");

            setForm({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
            });

            navigate("/login", {
                replace: true,
            });
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const data = err.response?.data;

                const message =
                    data?.errors?.[0]?.message ||
                    data?.message ||
                    "Đăng ký thất bại";

                setError(message);
                return;
            }

            setError("Lỗi hệ thống");
        } finally {
            setLoading(false);
        }
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
                    type="text"
                    name="phone"
                    placeholder="Số điện thoại"
                    value={form.phone}
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
                    {loading
                        ? "Đang đăng ký..."
                        : "Đăng ký"}
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