import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Nav";
import type { Seat } from "../hooks/useFlights";
import dayjs from "dayjs";

export default function BookingSuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { flight, selectedSeats, method, totalPrice } = location.state || {};

    const success = Boolean(flight && selectedSeats?.length > 0);

    return (
        <div style={{ textAlign: "center" }}>
            <Navbar />
            <h1 style={{ color: "green" }}>🎉 Đặt vé thành công!</h1>

            <p style={{ textAlign: "center", lineHeight: "2.2" }}>Cảm ơn bạn đã đặt vé ✈️</p>

            <div style={{ textAlign: "center", lineHeight: "1.8" }}>
                <p style={{ textAlign: "center", lineHeight: "2.2" }}><b>Chuyến bay:</b> {flight?.departure.airportName} → {flight?.arrival.airportName}</p>
                <p><b>Ghế:</b> {selectedSeats?.map((seat: Seat) => `${seat.row}${seat.col}`).join(", ")}</p>
                <p><b>Ngày:</b> {dayjs(flight?.departure.time).format("DD/MM/YYYY HH:mm")}</p>
                <p><b>Phương thức:</b> {method}</p>
                <p><b>Tổng tiền:</b> {totalPrice?.toLocaleString()} VND</p>
            </div>

            {/* 👉 BUTTON HISTORY */}
            {success && (
                <div style={{ marginTop: "20px" }}>
                    <button
                        style={styles.historyBtn}
                        onClick={() => navigate("/history")}
                    >
                        📄 Đi đến lịch sử giao dịch
                    </button>
                </div>
            )}

            <button
                onClick={() => navigate("/")}
                style={styles.homeBtn}
            >
                Về trang chủ
            </button>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    historyBtn: {
        padding: "10px 20px",
        background: "#10b981",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
    },

    homeBtn: {
        marginTop: "20px",
        padding: "10px 20px",
        background: "green",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
    },
};