import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCreateBooking, type BookingState, type CreateBookingPayload } from "../hooks/useFlights";
import Navbar from "../components/Nav";
import dayjs from "dayjs";

export default function BookingPaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { flight, selectedSeats, totalPrice } =
        (location.state as BookingState) || {};

    const [method, setMethod] = useState("momo");
    const [loading, setLoading] = useState(false);

    const { mutate } = useCreateBooking();

    const getUserFromStorage = () => {
        try {
            return JSON.parse(localStorage.getItem("user") || "{}");
        } catch {
            return null;
        }
    };


    const handlePayment = () => {
        if (selectedSeats.length === 0) {
            alert("Vui lòng chọn ghế");
            return;
        }

        const user = getUserFromStorage();

        if (!user) {
            alert("Không tìm thấy thông tin người dùng");
            return;
        }

        setLoading(true);
        const payload: CreateBookingPayload = {
            flightId: flight.id,
            seatIds: selectedSeats.map((s) => s.id),

            passengers: selectedSeats.map(() => ({
                fullName: user.fullName,
                dateOfBirth: '1990-01-01',
                idNumber: '123456789',
                idType: user.idType || "cccd",
            })),
        };

        mutate(payload, {
            onSuccess: (data) => {
                setLoading(false);

                navigate("/success", {
                    state: {
                        flight,
                        selectedSeats,
                        totalPrice,
                        method,
                        booking: data,
                    },
                    replace: true,
                });
            },
            onError: () => {
                setLoading(false);
                alert("Đặt vé thất bại!");
            },
        });
    };



    if (!flight) return <p>Không có dữ liệu thanh toán</p>;

    return (
        <div style={{ textAlign: "left" }}>
            <Navbar />
            <h2 style={{ margin: "20px 20px" }}>Thanh toán 💳</h2>

            {/* Thông tin chuyến */}
            <div style={{ margin: "20px 20px" }}>
                <p><b>Chuyến bay:</b> {flight.departure.airportName} → {flight.arrival.airportName}</p>
                <p><b>Ngày:</b> {dayjs(flight.departure.time).format("DD/MM/YYYY HH:mm")}</p>
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