import { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Nav";
import type { SearchFlightParams, SearchItem } from "../hooks/useFlights";
import { formatDate } from "../utils/AppConverter";

export default function FlightSearchPage(): JSX.Element {
    const today = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState(today);
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [history, setHistory] = useState<SearchItem[]>(() => {
        try {
            return JSON.parse(localStorage.getItem("search_history") || "[]");
        } catch {
            return [];
        }
    });
    const navigate = useNavigate();

    const handleDeleteItem = (index: number) => {
        const newHistory = history.filter((_, i) => i !== index);
        setHistory(newHistory);
        localStorage.setItem("search_history", JSON.stringify(newHistory));
    };

    const handleSelectHistory = (item: SearchItem) => {
        navigate(
            `/flights?from=${item.from}&to=${item.to}&date=${item.date}`
        );
    };

    const handleSearch = () => {
        if (!from || !to || !date) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const newItem = { from, to, date };

        const oldHistory: SearchFlightParams[] =
            JSON.parse(localStorage.getItem("search_history") || "[]");

        const newHistory = [
            newItem,
            ...oldHistory,
        ].filter(
            (item, index, self) =>
                index ===
                self.findIndex(
                    (t) =>
                        t.from === item.from &&
                        t.to === item.to &&
                        t.date === item.date
                )
        ).slice(0, 5);

        localStorage.setItem("search_history", JSON.stringify(newHistory));

        navigate(`/flights?from=${from}&to=${to}&date=${date}`);

        setHistory(newHistory);
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
                    onChange={(e) => setFrom(e.target.value.trim().toUpperCase())}
                    style={styles.input}
                />

                <input
                    type="text"
                    placeholder="Điểm đến (VD: TP.HCM)"
                    value={to}
                    onChange={(e) => setTo(e.target.value.trim().toUpperCase())}
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

            {/* 🧠 HISTORY */}
            {history.length > 0 && (
                <div style={styles.card}>
                    <div style={styles.title}>🕘 Lịch sử tìm kiếm</div>
                    {(
                        history.map((item, index) => (
                            <div
                                key={index}
                                style={styles.historyItem}
                                onMouseEnter={(e) =>
                                    Object.assign(e.currentTarget.style, styles.historyHover)
                                }
                                onMouseLeave={(e) =>
                                    Object.assign(e.currentTarget.style, {
                                        background: "#fff",
                                        transform: "none",
                                    })
                                }
                                onClick={() => handleSelectHistory(item)}
                            >
                                <div style={styles.historyLeft}>
                                    <div style={styles.icon}>✈️</div>
                                    <div>
                                        <div style={styles.route}>
                                            {item.from} → {item.to}
                                        </div>
                                        <div style={styles.date}>
                                            {formatDate(new Date(item.date))}
                                        </div>
                                    </div>
                                </div>
                                {/* RIGHT - ACTION GROUP */}
                                <div style={styles.actions}>
                                    <button
                                        style={styles.selectBtn}
                                    >
                                        Chọn
                                    </button>

                                    <button
                                        style={styles.deleteBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteItem(index);
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    banner: {
        marginTop: "30px",
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

    card: {
        background: "#fff",
        borderRadius: "16px",
        padding: "20px",
        margin: "50px 50px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },

    title: {
        fontSize: "20px",
        fontWeight: "700",
        color: "#1e3a8a",
    },

    buttonHover: {
        background: "#0090dd",
    },

    historyItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px",
        borderRadius: "12px",
        border: "1px solid #eee",
        marginBottom: "10px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        background: "#fff",
        margin: "20px",
    },

    historyLeft: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },

    icon: {
        fontSize: "18px",
        color: "#00a8ff",
    },

    route: {
        fontWeight: "600",
        fontSize: "15px",
    },

    date: {
        fontSize: "12px",
        color: "#888",
    },

    historyHover: {
        background: "#e6f4ff",
        transform: "translateY(-2px)",
    },

    actions: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },


    selectBtn: {
        background: "#00a8ff",
        color: "#fff",
        border: "none",
        padding: "6px 10px",
        borderRadius: "8px",
        fontSize: "12px",
        cursor: "pointer",
    },

    deleteBtn: {
        background: "#f3f4f6",
        color: "#ef4444",
        border: "none",
        padding: "6px 10px",
        borderRadius: "8px",
        fontSize: "12px",
        cursor: "pointer",
    },

    empty: {
        color: "#999",
        fontStyle: "italic",
    },
};
