import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Nav";
import type { Seat } from "../hooks/useFlights";
import { formatDate } from "../utils/AppConverter";

export default function BookingSuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { flight, selectedSeats, method, totalPrice } = location.state || {};

    return (
        <div style={{ textAlign: "center" }}>
            <Navbar />
            <h1 style={{ color: "green" }}>🎉 Đặt vé thành công!</h1>

            <p style={{ textAlign: "center", lineHeight: "2.2" }}>Cảm ơn bạn đã đặt vé ✈️</p>

            <div style={{ textAlign: "center", lineHeight: "1.8" }}>
                <p style={{ textAlign: "center", lineHeight: "2.2" }}><b>Chuyến bay:</b> {flight?.from} → {flight?.to}</p>
                <p><b>Ghế:</b> {selectedSeats?.map((seat: Seat) => `${seat.row}${seat.col}`).join(", ")}</p>
                <p><b>Ngày:</b> {formatDate(new Date(flight?.date))}</p>
                <p><b>Phương thức:</b> {method}</p>
                <p><b>Tổng tiền:</b> {totalPrice?.toLocaleString()} VND</p>
            </div>

            <button
                onClick={() => navigate("/")}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    background: "green",
                    color: "#fff",
                    border: "none",
                }}
            >
                Về trang chủ
            </button>
        </div>
    );
}