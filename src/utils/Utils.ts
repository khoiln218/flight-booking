export const getStatusColor = (status: string, expired: boolean) => {
    if (status === "cancelled") return "#9ca3af";
    if (expired) return "#f59e0b";
    return "#3b82f6";
};

export const getStatusText = (status: string, expired: boolean) => {
    if (status === "cancelled") return "Đã hủy";
    if (expired) return "Hết hạn";
    return "Đã đặt";
};