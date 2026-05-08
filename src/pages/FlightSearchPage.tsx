import { useEffect, useRef, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Nav";
import {
    AIRPORTS,
    type SearchFlightParams,
    type SearchItem,
} from "../hooks/useFlights";
import dayjs from "dayjs";

export default function FlightSearchPage(): JSX.Element {
    const today = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState(today);
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");

    const [fromSuggest, setFromSuggest] = useState<typeof AIRPORTS>([]);
    const [toSuggest, setToSuggest] = useState<typeof AIRPORTS>([]);

    const navigate = useNavigate();

    const [history, setHistory] = useState<SearchItem[]>(() => {
        try {
            return JSON.parse(localStorage.getItem("search_history") || "[]");
        } catch {
            return [];
        }
    });

    const fromRef = useRef<HTMLDivElement>(null);
    const toRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (fromRef.current && !fromRef.current.contains(target)) {
                setFromSuggest([]);
            }

            if (toRef.current && !toRef.current.contains(target)) {
                setToSuggest([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFromChange = (value: string) => {
        setFrom(value);
        const v = value.toLowerCase();
        if (!v) return setFromSuggest([]);

        setFromSuggest(
            AIRPORTS.filter(
                (a) =>
                    a.name.toLowerCase().includes(v) ||
                    a.city.toLowerCase().includes(v) ||
                    a.code.toLowerCase().includes(v)
            )
        );
    };

    const handleToChange = (value: string) => {
        setTo(value);
        const v = value.toLowerCase();
        if (!v) return setToSuggest([]);

        setToSuggest(
            AIRPORTS.filter(
                (a) =>
                    a.name.toLowerCase().includes(v) ||
                    a.city.toLowerCase().includes(v) ||
                    a.code.toLowerCase().includes(v)
            )
        );
    };

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

        const oldHistory: SearchFlightParams[] = JSON.parse(
            localStorage.getItem("search_history") || "[]"
        );

        const newHistory = [newItem, ...oldHistory]
            .filter(
                (item, index, self) =>
                    index ===
                    self.findIndex(
                        (t) =>
                            t.from === item.from &&
                            t.to === item.to &&
                            t.date === item.date
                    )
            )
            .slice(0, 5);

        localStorage.setItem(
            "search_history",
            JSON.stringify(newHistory)
        );

        setHistory(newHistory);

        navigate(`/flights?from=${from}&to=${to}&date=${date}`);
    };

    return (
        <div style={styles.container}>
            <Navbar />

            <div style={styles.banner}>
                <p>Tìm chuyến bay giá tốt nhất cho bạn</p>
            </div>

            <div style={styles.form}>
                <div style={{ position: "relative" }}>
                    <input
                        type="text"
                        placeholder="Điểm đi(HAN, DAD,...)"
                        value={from}
                        onChange={(e) =>
                            handleFromChange(e.target.value)
                        }
                        onBlur={() => setTimeout(() => setFromSuggest([]), 150)}
                        style={styles.input}
                    />

                    {fromSuggest.length > 0 && (
                        <div style={styles.suggestBox}>
                            {fromSuggest.map((a) => (
                                <div
                                    key={a.id}
                                    style={styles.suggestItem}
                                    onClick={() => {
                                        setFrom(a.code);
                                        setFromSuggest([]);
                                    }}
                                >
                                    ✈️ {a.city} - {a.name} ({a.code})
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ position: "relative" }}>
                    <input
                        type="text"
                        placeholder="Điểm đến(SGN, CXR,...)"
                        value={to}
                        onChange={(e) =>
                            handleToChange(e.target.value)
                        }

                        onBlur={() => setTimeout(() => setToSuggest([]), 150)}
                        style={styles.input}
                    />

                    {toSuggest.length > 0 && (
                        <div style={styles.suggestBox}>
                            {toSuggest.map((a) => (
                                <div
                                    key={a.id}
                                    style={styles.suggestItem}
                                    onClick={() => {
                                        setTo(a.code);
                                        setToSuggest([]);
                                    }}
                                >
                                    ✈️ {a.city} - {a.name} ({a.code})
                                </div>
                            ))}
                        </div>
                    )}
                </div>

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

            {history.length > 0 && (
                <div style={styles.card}>
                    <div style={styles.title}>🕘 Lịch sử tìm kiếm</div>

                    {(history.map((item, index) => (
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
                            onClick={() =>
                                handleSelectHistory(item)
                            }
                        >
                            <div style={styles.historyLeft}>
                                <div>✈️</div>
                                <div>
                                    <div>
                                        {item.from} → {item.to}
                                    </div>
                                    <div>
                                        {dayjs(item.date).format("DD/MM/YYYY")}
                                    </div>
                                </div>
                            </div>

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
                    )))}
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

    suggestBox: {
        position: "absolute",
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: "10px",
        width: "320px",
        marginTop: "5px",
        zIndex: 10,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },

    suggestItem: {
        padding: "10px",
        cursor: "pointer",
        fontSize: "14px",
        borderBottom: "1px solid #f3f3f3",
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
};