import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import type { Seat } from "./Seat";
import Navbar from "../components/Nav";

export type SeatStatus = "available" | "booked" | "selected";

const ROWS = 12;
const COLS = ["A", "B", "C", "D", "E", "F"];

// 🎯 Fake pricing logic
const getSeatPrice = (row: number, col: string) => {
    let price = 500000;

    if (row <= 2) price += 200000; // VIP
    if (col === "A" || col === "F") price += 100000; // window
    if (col === "C" || col === "D") price += 50000; // aisle

    return price;
};

// 🎯 Generate seats
const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];

    for (let row = 1; row <= ROWS; row++) {
        for (const col of COLS) {
            seats.push({
                id: `${row}${col}`,
                row,
                col,
                status: Math.random() < 0.2 ? "booked" : "available",
                price: getSeatPrice(row, col),
            });
        }
    }

    return seats;
};

export default function SeatBookingPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const flight = location.state?.flight;

    const [seats, setSeats] = useState<Seat[]>(generateSeats());

    // 🎯 chọn ghế
    const toggleSeat = (seat: Seat) => {
        if (seat.status === "booked") return;

        setSeats((prev) =>
            prev.map((s) =>
                s.id === seat.id
                    ? {
                        ...s,
                        status:
                            s.status === "selected" ? "available" : "selected",
                    }
                    : s
            )
        );
    };

    // 🎯 danh sách ghế chọn
    const selectedSeats = useMemo(
        () => seats.filter((s) => s.status === "selected"),
        [seats]
    );

    const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

    // 🎯 UI color
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

    // 🎯 confirm booking
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

    return (
        <div style={{ padding: 20 }}>
            <Navbar />

            <h2>Chọn ghế</h2>

            {/* Flight info */}
            {flight && (
                <div style={{ marginBottom: 16 }}>
                    <b>Chuyến bay:</b> {flight.id} <br />
                    <b>Từ:</b> {flight.from} → {flight.to}
                </div>
            )}

            {/* Legend */}
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                <Legend color="#e5e7eb" label="Trống" />
                <Legend color="#3b82f6" label="Đang chọn" />
                <Legend color="#ef4444" label="Đã đặt" />
            </div>

            {/* Seat map */}
            <div>
                {Array.from({ length: ROWS }, (_, rowIndex) => (
                    <div
                        key={rowIndex}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 8,
                        }}
                    >
                        {COLS.map((col) => {
                            const seat = seats.find(
                                (s) => s.id === `${rowIndex + 1}${col}`
                            )!;

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
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: 10,
                                    }}
                                >
                                    <div>{seat.col}</div>
                                    <div>{seat.price / 1000}k</div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Selected */}
            <div style={{ marginTop: 20 }}>
                <h4>Ghế đã chọn:</h4>
                <p>
                    {selectedSeats.map((s) => s.id).join(", ") || "Chưa chọn"}
                </p>

                <h3>Tổng tiền: {(totalPrice / 1000).toFixed(0)}k VND</h3>

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

// 🎯 Legend component
function Legend({ color, label }: { color: string; label: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
                style={{
                    width: 16,
                    height: 16,
                    background: color,
                    borderRadius: 4,
                }}
            />
            <span>{label}</span>
        </div>
    );
}