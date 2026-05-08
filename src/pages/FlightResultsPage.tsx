import { type JSX } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Nav";
import { formatDate } from "../utils/AppConverter";
import { useFlights, type Flight } from "../hooks/useFlights";
import dayjs from "dayjs";

export default function FlightResultsPage(): JSX.Element {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";
    const date = searchParams.get("date") || "";

    const { data: flights = [], isLoading, isError, error } = useFlights({
        from,
        to,
        date,
    });

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

            <div style={styles.separator}>
                {isLoading && <p>🔄 Đang tìm chuyến bay...</p>}

                {isError && (
                    <div style={styles.errorBox}>
                        <p style={styles.errorText}>
                            ❌ {(error as Error).message}
                        </p>
                        <button
                            style={styles.backButton}
                            onClick={() => navigate("/")}
                        >
                            ⬅️ Quay lại tìm kiếm
                        </button></div>

                )}

                {!isError && !isLoading && flights.length === 0 && (
                    <div style={styles.errorBox}>
                        <p >
                            Không có chuyến bay
                        </p>
                        <button
                            style={styles.backButton}
                            onClick={() => navigate("/")}
                        >
                            ⬅️ Quay lại tìm kiếm
                        </button></div>
                )}

                {!isLoading && flights.length > 0 && (
                    <div style={styles.list}>
                        {flights.map((flight) => (
                            <div key={flight.id} style={styles.card}>
                                <h3>{flight.airline.name}</h3>

                                <p>✈️ {flight.departure.airportName} → {flight.arrival.airportName}</p>

                                <p>🕒 {dayjs(flight.departure.time).format("HH:mm")} -
                                    {dayjs(flight.arrival.time).format("HH:mm")}</p>

                                <p>
                                    📅 {formatDate(new Date(flight.departure.time))}
                                </p>

                                <p style={styles.price}>
                                    {flight.price.toLocaleString()} VND
                                </p>

                                <button
                                    style={styles.button}
                                    onClick={() => handleSelect(flight)}
                                >
                                    Đặt vé
                                </button>
                            </div>
                        ))}
                    </div>
                )}</div>
        </div>
    );
}

// 🎨 STYLES
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        textAlign: "left",
    },

    separator: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "30px",
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

    errorBox: {
        textAlign: "left",
    },

    errorText: {
        color: "red",
        fontSize: "16px",
    },

    backButton: {
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
};