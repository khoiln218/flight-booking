import { useEffect, useState, type JSX } from "react";
import Navbar from "../components/Nav";
import type { Booking, BookingStatus } from "../hooks/useFlights";
import dayjs from "dayjs";

export default function BookingHistoryPage(): JSX.Element {
    const isExpired = (departureTime: string) => {
        return new Date(departureTime) < new Date();
    };

    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const data: Booking[] = [
            {
                id: 1,
                flightCode: "VN123",
                from: "Hồ Chí Minh",
                to: "Hà Nội",
                departureTime: "2026-05-10 08:30",
                totalPrice: 2500000,
                seats: [
                    { col: "A", row: 1 },
                    { col: "A", row: 2 },
                ],
                status: "BOOKED",
            },
            {
                id: 2,
                flightCode: "VJ888",
                from: "Đà Nẵng",
                to: "Phú Quốc",
                departureTime: "2026-05-15 14:00",
                totalPrice: 1800000,
                seats: [{ col: "C", row: 5 }],
                status: "USED",
            },
            {
                id: 3,
                flightCode: "VJ999",
                from: "Đà Nẵng",
                to: "Phú Quốc",
                departureTime: "2026-05-15 14:00",
                totalPrice: 1700000,
                seats: [{ col: "C", row: 3 }],
                status: "CANCELLED",
            },
            {
                id: 4,
                flightCode: "VN123",
                from: "Hồ Chí Minh",
                to: "Hà Nội",
                departureTime: "2024-05-10 08:30",
                totalPrice: 2500000,
                seats: [{ col: "A", row: 1 }],
                status: "BOOKED",
            },
        ];

        const updated = data.map((b) =>
            isExpired(b.departureTime) && b.status === "BOOKED"
                ? { ...b, status: "EXPIRED" as BookingStatus }
                : b
        );

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBookings(updated);
    }, []);

    const handleCancel = (id: number) => {
        setBookings((prev) =>
            prev.map((booking) =>
                booking.id === id
                    ? { ...booking, status: "CANCELLED" }
                    : booking
            )
        );
    };

    return (
        <div style={styles.container}>
            <Navbar />

            <h1 style={styles.title}>Lịch Sử Đặt Vé</h1>

            {bookings.length === 0 ? (
                <p>Chưa có vé nào.</p>
            ) : (
                <div style={styles.list}>
                    {bookings.map((booking) => (
                        <div key={booking.id} style={styles.card}>
                            <div style={styles.header}>
                                <h2>{booking.flightCode}</h2>

                                <span
                                    style={{
                                        ...styles.status,
                                        backgroundColor:
                                            booking.status === "BOOKED"
                                                ? "#22c55e"
                                                : booking.status === "USED"
                                                    ? "#3b82f6"
                                                    : booking.status === "EXPIRED"
                                                        ? "#f59e0b"
                                                        : "#9ca3af",
                                    }}
                                >
                                    {booking.status === "BOOKED"
                                        ? "Đã đặt"
                                        : booking.status === "USED"
                                            ? "Đã dùng"
                                            : booking.status === "EXPIRED"
                                                ? "Hết hạn"
                                                : "Đã hủy"}
                                </span>
                            </div>

                            <p>
                                <b>Tuyến:</b> {booking.from} → {booking.to}
                            </p>

                            <p>
                                <b>Khởi hành:</b> {dayjs(booking.departureTime).format("DD/MM/YYYY HH:mm")}
                            </p>

                            <p>
                                <b>Ghế:</b>{" "}
                                {booking.seats
                                    .map((seat) => `${seat.row}${seat.col}`)
                                    .join(", ")}
                            </p>

                            <p>
                                <b>Tổng tiền:</b>{" "}
                                {booking.totalPrice.toLocaleString("vi-VN")} VNĐ
                            </p>

                            {booking.status === "BOOKED" &&
                                !isExpired(booking.departureTime) && (
                                    <button
                                        style={styles.cancelButton}
                                        onClick={() =>
                                            handleCancel(booking.id)
                                        }
                                    >
                                        Hủy vé
                                    </button>
                                )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    title: {
        fontSize: "32px",
        marginBottom: "20px",
    },

    list: {
        margin: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },

    card: {
        textAlign: "left",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
    },

    status: {
        color: "#fff",
        padding: "6px 12px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "bold",
    },

    cancelButton: {
        marginTop: "15px",
        padding: "10px 16px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#ef4444",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
    },
};