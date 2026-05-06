import { useEffect, useState, type JSX } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Nav";

type Flight = {
    id: number;
    airline: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
};

export default function FlightResultsPage(): JSX.Element {
    const [searchParams] = useSearchParams();

    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";
    const date = searchParams.get("date") || "";

    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlights = async () => {
            setLoading(true);

            // 👉 MOCK DATA (sau này thay bằng API)
            const mockData: Flight[] = [
                {
                    id: 1,
                    airline: "Vietnam Airlines",
                    from,
                    to,
                    departureTime: "08:00",
                    arrivalTime: "10:00",
                    price: 1200000,
                },
                {
                    id: 2,
                    airline: "VietJet Air",
                    from,
                    to,
                    departureTime: "12:00",
                    arrivalTime: "14:00",
                    price: 900000,
                },
            ];

            setTimeout(() => {
                setFlights(mockData);
                setLoading(false);
            }, 1000);
        };

        fetchFlights();
    }, [from, to, date]);

    const handleSelect = (flight: Flight) => {
        navigate("/booking", {
            state: { flight }, // truyền data qua booking
        });
    };

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <Navbar />

            <h2>
                Kết quả: {from} → {to} ({date})
            </h2>

            {loading ? (
                <p>Đang tìm chuyến bay...</p>
            ) : flights.length === 0 ? (
                <p>Không có chuyến bay nào.</p>
            ) : (
                <div style={styles.list}>
                    {flights.map((flight) => (
                        <div key={flight.id} style={styles.card}>
                            <h3>{flight.airline}</h3>

                            <p>
                                {flight.from} → {flight.to}
                            </p>

                            <p>
                                🕒 {flight.departureTime} - {flight.arrivalTime}
                            </p>

                            <p style={styles.price}>
                                {flight.price.toLocaleString()} VND
                            </p>

                            <button style={styles.button} onClick={() => handleSelect(flight)}>Chọn chuyến</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: "20px",
    },
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginTop: "20px",
    },
    card: {
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "8px",
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
};