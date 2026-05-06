import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Seat } from "./Seat";
import Navbar from "../components/Nav";

export default function BookingConfirmPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { flight, selectedSeats, totalPrice } = location.state || {};

    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);

        // fake API delay
        setTimeout(() => {
            setLoading(false);

            navigate("/payment", {
                state: {
                    flight,
                    selectedSeats,
                    totalPrice,
                },
            });
        }, 1500);
    };

    if (!flight) return <p>Không có dữ liệu đặt vé</p>;

    return (
        <div style={{ padding: "20px" }}>
            <Navbar />
            <h2>Xác nhận đặt vé ✈️</h2>

            <div style={{ marginBottom: "20px" }}>
                <p><b>Chuyến bay:</b> {flight.from} → {flight.to}</p>
                <p><b>Thời gian:</b> {flight.time}</p>
                <p><b>Ghế:</b> {selectedSeats?.map((seat: Seat) => `${seat.row}${seat.col}`).join(", ")}</p>
                <p><b>Tổng tiền:</b> {totalPrice.toLocaleString()} VND</p>
            </div>

            <button
                onClick={handleConfirm}
                disabled={loading}
                style={{
                    padding: "10px 20px",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                {loading ? "Đang xử lý..." : "Xác nhận đặt vé"}
            </button>
        </div>
    );
}