import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, type CSSProperties } from "react";
import Navbar from "../components/Nav";
import {
    COLS,
    ROWS,
    useSeat,
    type Seat,
    type SeatStatus,
} from "../hooks/useFlights";
import { Legend } from "../components/Legend";
import dayjs from "dayjs";

export default function BookingSeatPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const flight = location.state?.flight;

    const { data: seatmodels = [], isLoading } = useSeat(flight.id);

    const [selectedSeatIds, setSelectedSeatIds] = useState<number[]>([]);

    const toggleSeat = (seat: Seat) => {
        if (seat.status === "booked") return;

        setSelectedSeatIds((prev) =>
            prev.includes(seat.id)
                ? prev.filter((id) => id !== seat.id)
                : [...prev, seat.id]
        );
    };

    const seats = useMemo(() => {
        return seatmodels.map((s) => {
            let status: SeatStatus = "available";

            if (s.status === "booked") status = "booked";
            else if (selectedSeatIds.includes(s.id)) status = "selected";

            return {
                ...s,
                status,
            };
        });
    }, [seatmodels, selectedSeatIds]);

    const selectedSeats = useMemo(
        () => seats.filter((s) => s.status === "selected"),
        [seats]
    );

    const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

    const getColor = (status: SeatStatus) => {
        switch (status) {
            case "available":
                return "#e5e7eb";
            case "booked":
                return "#ef4444";
            case "selected":
                return "#3b82f6";
        }
    };

    const handleConfirm = () => {
        if (selectedSeats.length === 0) {
            alert("Vui lòng chọn ghế!");
            return;
        }

        navigate("/confirm", {
            state: {
                flight,
                selectedSeats,
                totalPrice,
            },
        });
    };

    if (isLoading) {
        return (
            <div style={styles.container}>
                <Navbar />
                <p style={{
                    textAlign: "left",
                    marginLeft: 20,
                    marginTop: 16,
                    marginBottom: 16,
                }}>Đang tải ghế...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <Navbar />

            <h2 style={styles.title}>Chọn ghế</h2>

            {/* Flight info */}
            {flight && (
                <div style={styles.flightInfo}>
                    <b>Chuyến bay:</b> {flight.airline.name} <br />
                    <b>Từ:</b> {flight.departure.airportName} → {flight.arrival.airportName} <br />
                    <b>Ngày:</b> {dayjs(flight.date).format("DD/MM/YYYY")}
                </div>
            )}

            {/* Legend */}
            <div style={{ display: "flex", gap: 16, marginBottom: 16, marginLeft: 16 }}>
                <Legend color="#e5e7eb" label="Trống" />
                <Legend color="#3b82f6" label="Đang chọn" />
                <Legend color="#ef4444" label="Đã đặt" />
            </div>

            {/* Seat map */}
            {Array.from({ length: ROWS }, (_, rowIndex) => (
                <div
                    key={rowIndex}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "4px",
                    }}
                >
                    {COLS.map((col) => {
                        const seat = seats.find(
                            (s) => s.row === rowIndex + 1 && s.col === col
                        );

                        if (!seat) return null;

                        return (
                            <div
                                key={seat.id}
                                onClick={() => toggleSeat(seat)}
                                style={{
                                    width: 45,
                                    height: 45,
                                    margin: 4,
                                    borderRadius: 6,
                                    cursor:
                                        seat.status === "booked"
                                            ? "not-allowed"
                                            : "pointer",
                                    background: getColor(seat.status),
                                    color:
                                        seat.status === "selected"
                                            ? "#fff"
                                            : "#000",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: 10,
                                }}
                            >
                                <div>
                                    {seat.row}
                                    {seat.col}
                                </div>
                                <div>{seat.price / 1000}k</div>
                            </div>
                        );
                    })}
                </div>
            ))}

            {/* Selected */}
            <div style={styles.selected}>
                <h4 style={{ margin: 0, padding: "6px 0px" }}>Ghế đã chọn:</h4>
                <p>
                    {selectedSeats.map((s) => `${s.row}${s.col}`).join(", ") ||
                        "Chưa chọn"}
                </p>

                <h3 style={{ margin: 0, padding: "6px 0px" }}>
                    Tổng tiền: {(totalPrice / 1000).toFixed(0)}k VND
                </h3>

                <button
                    onClick={handleConfirm}
                    style={{
                        marginTop: 12,
                        padding: "10px 20px",
                        background: "#22c55e",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                    }}
                >
                    Xác nhận đặt ghế
                </button>
            </div>
        </div>
    );
}

const styles: Record<string, CSSProperties> = {
    container: {
        paddingBottom: 40,
    },

    title: {
        marginTop: 16,
        marginBottom: 16,
        textAlign: "center",
    },

    selected: {
        paddingLeft: 20,
        textAlign: "left",
    },

    flightInfo: {
        padding: 20,
        textAlign: "left",
    },
};