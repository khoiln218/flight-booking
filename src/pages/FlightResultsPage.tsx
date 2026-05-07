import { useEffect, useState, type JSX } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Nav";
import { formatDate } from "../utils/AppConverter";
import type { Flight } from "../hooks/useFlights";

export default function FlightResultsPage(): JSX.Element {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";
    const date = searchParams.get("date") || "";

    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFlights = async () => {
            setLoading(true);

            // 👉 MOCK DATA
            const mockData: Flight[] = [
                {
                    id: "1",
                    airline: "Vietnam Airlines",
                    from,
                    to,
                    date,
                    departureTime: "08:00",
                    arrivalTime: "10:00",
                    price: 1200000,
                },
                {
                    id: "2",
                    airline: "VietJet Air",
                    from,
                    to,
                    date,
                    departureTime: "12:00",
                    arrivalTime: "14:00",
                    price: 900000,
                },
                {
                    id: "3",
                    airline: "Bamboo Airways",
                    from,
                    to,
                    date,
                    departureTime: "06:00",
                    arrivalTime: "08:00",
                    price: 850000,
                },
            ];


            setTimeout(() => {
                setFlights(mockData);
                setLoading(false);
            }, 800);
        };

        fetchFlights();
    }, [from, to, date]);

    const handleSelect = (flight: Flight) => {
        navigate("/booking", {
            state: { flight },
        });
    };

    return (
        <div style={styles.container}>
            <Navbar />

            {/* 📌 TITLE */}
            <h2 style={styles.title}>
                Kết quả: {from} → {to}{" "}
                {date ? `(${formatDate(new Date(date))})` : ""}
            </h2>

            {/* ⏳ LOADING */}
            {loading ? (
                <p style={styles.title}>Đang tìm chuyến bay...</p>
            ) : flights.length === 0 ? (
                <p style={styles.title}>Không có chuyến bay nào.</p>
            ) : (
                <div style={styles.list}>
                    {flights.map((flight) => (
                        <div key={flight.id} style={styles.card}>
                            <h3 style={{ margin: 0 }}>
                                {flight.airline}
                            </h3>

                            <p>
                                ✈️ {flight.from} → {flight.to}
                            </p>

                            <p>
                                🕒 {flight.departureTime} -{" "}
                                {flight.arrivalTime}
                            </p>

                            <p>
                                📅{" "}
                                {flight.date
                                    ? formatDate(new Date(flight.date))
                                    : ""}
                            </p>

                            <p style={styles.price}>
                                {flight.price.toLocaleString()} VND
                            </p>

                            <button
                                style={styles.button}
                                onClick={() => handleSelect(flight)}
                            >
                                Chọn chuyến
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// 🎨 STYLES
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        textAlign: "left",
    },

    title: {
        margin: "30px 0 0 30px",
    },

    list: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "30px",
    },

    card: {
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "8px",
        lineHeight: "1.8",
    },

    price: {
        color: "red",
        fontWeight: "bold",
    },

    button: {
        marginTop: "10px",
        padding: "8px 16px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },

    box: {
        background: "#e7f3ff",
        padding: "15px",
        borderRadius: "8px",
        margin: "20px 30px",
    },

    row: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
    },

    smallBtn: {
        padding: "5px 10px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },
};