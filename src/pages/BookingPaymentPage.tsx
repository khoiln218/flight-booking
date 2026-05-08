import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { BookingState } from "../hooks/useFlights";
import Navbar from "../components/Nav";
import { formatDate } from "../utils/AppConverter";

export default function BookingPaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { flight, selectedSeats, totalPrice } =
        (location.state as BookingState) || {};

    const [method, setMethod] = useState("momo");
    const [loading, setLoading] = useState(false);

    const handlePayment = () => {
        setLoading(true);

        // fake API thanh toán
        setTimeout(() => {
            setLoading(false);

            navigate("/success", {
                state: {
                    flight,
                    selectedSeats,
                    totalPrice,
                    method,
                },
            });
        }, 2000);
    };

    if (!flight) return <p>Không có dữ liệu thanh toán</p>;

    return (
        <div style={{ textAlign: "left" }}>
            <Navbar />
            <h2 style={{ margin: "20px 20px" }}>Thanh toán 💳</h2>

            {/* Thông tin chuyến */}
            <div style={{ margin: "20px 20px" }}>
                <p><b>Chuyến bay:</b> {flight.departure.airportName} → {flight.arrival.airportName}</p>
                <p><b>Ngày:</b> {formatDate(new Date(flight.departure.time))}</p>
                <p>
                    <b>Ghế:</b>{" "}
                    {selectedSeats?.map((s) => `${s.row}${s.col}`).join(", ")}
                </p>
                <p><b>Tổng tiền:</b> {totalPrice.toLocaleString()} VND</p>
            </div>

            {/* Chọn phương thức */}
            <div style={{ margin: "20px 20px" }}>
                <h4 style={{ marginBottom: "10px" }}>Chọn phương thức thanh toán:</h4>

                <label>
                    <input
                        type="radio"
                        value="momo"
                        checked={method === "momo"}
                        onChange={() => setMethod("momo")}
                    />
                    MoMo
                </label>
                <br />

                <label>
                    <input
                        type="radio"
                        value="zalopay"
                        checked={method === "zalopay"}
                        onChange={() => setMethod("zalopay")}
                    />
                    ZaloPay
                </label>
                <br />

                <label>
                    <input
                        type="radio"
                        value="card"
                        checked={method === "card"}
                        onChange={() => setMethod("card")}
                    />
                    Thẻ ngân hàng
                </label>
            </div>

            {/* Button thanh toán */}
            <button
                onClick={handlePayment}
                disabled={loading}
                style={{
                    margin: "0px 20px",
                    padding: "10px 20px",
                    background: "green",
                    color: "#fff",
                    border: "none",
                }}
            >
                {loading ? "Đang thanh toán..." : "Thanh toán"}
            </button>
        </div>
    );
}