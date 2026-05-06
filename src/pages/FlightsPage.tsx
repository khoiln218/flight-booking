import { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Nav";

export default function FlightsPage(): JSX.Element {
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!from || !to || !date) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        navigate(`/flights?from=${from}&to=${to}&date=${date}`);
    };

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <Navbar />

            {/* Banner */}
            <div style={styles.banner}>
                <p>Tìm chuyến bay giá tốt nhất cho bạn</p>
            </div>

            {/* Form tìm kiếm */}
            <div style={styles.form}>
                <input
                    type="text"
                    placeholder="Điểm đi (VD: Hà Nội)"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="text"
                    placeholder="Điểm đến (VD: TP.HCM)"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={styles.input}
                />

                <button onClick={handleSearch} style={styles.button}>
                    Tìm chuyến bay
                </button>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: "20px"
    },
    banner: {
        marginBottom: "30px",
        textAlign: "center",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "4px 20px",
        background: "#1976d2",
        color: "#fff",
    },
    menu: {
        display: "flex",
        gap: "10px",
    },
    form: {
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        width: "200px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },
};