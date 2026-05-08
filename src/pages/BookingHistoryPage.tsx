import { type JSX } from "react";
import Navbar from "../components/Nav";
import dayjs from "dayjs";
import { useBookings, useCancelBooking } from "../hooks/useFlights";
import { getStatusColor, getStatusText } from "../utils/Utils";

export default function BookingHistoryPage(): JSX.Element {
    const { data: bookings = [], isLoading, error } = useBookings();
    const cancelMutation = useCancelBooking();

    const isExpired = (departureTime: string) => {
        const now = new Date();
        const departure = new Date(departureTime);

        return departure < now;
    };

    const handleCancel = (id: number) => {
        cancelMutation.mutate(id);
    };

    if (isLoading) return (<div style={styles.container}>
        <Navbar /><p style={{ padding: "16px 20px", textAlign: "left" }}>Đang tải...</p> </div>);
    if (error) return (<div style={styles.container}>
        <Navbar /><p style={{ padding: "16px 20px", textAlign: "left" }}>Lỗi tải dữ liệu</p> </div>);

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
                                <h2>{booking.id}</h2>

                                <span
                                    style={{
                                        ...styles.status,
                                        backgroundColor: getStatusColor(
                                            booking.status,
                                            isExpired(booking.departureTime)
                                        ),
                                    }}
                                >
                                    {getStatusText(
                                        booking.status,
                                        isExpired(booking.departureTime)
                                    )}
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
                                {(booking.seats ?? [])
                                    .map((seat) => `${seat.row}${seat.col}`)
                                    .join(", ") || "Chưa có ghế"}
                            </p>

                            <p>
                                <b>Tổng tiền:</b>{" "}
                                {booking.totalPrice.toLocaleString("vi-VN")} VNĐ
                            </p>

                            {booking.status === "confirmed" || booking.status === "pending" &&
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