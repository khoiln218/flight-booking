import { useLocation, useNavigate } from "react-router-dom";
import type { Seat } from "./Seat";
import Navbar from "../components/Nav";

export default function SuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { flight, selectedSeats, method, totalPrice } = location.state || {};

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <Navbar />
            <h1 style={{ color: "green" }}>🎉 Đặt vé thành công!</h1>

            <p>Cảm ơn bạn đã đặt vé ✈️</p>

            <div style={{ marginTop: "20px" }}>
                <p><b>Chuyến bay:</b> {flight?.from} → {flight?.to}</p>
                <p><b>Ghế:</b> {selectedSeats?.map((seat: Seat) => `${seat.row}${seat.col}`).join(", ")}</p>
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