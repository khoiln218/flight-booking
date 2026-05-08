import axios from "axios";
import { mapBooking, mapFlight, mapSeat, type Booking, type BookingModel, type CreateBookingPayload, type Flight, type FlightBookingResponse, type FlightSearchResponse, type FlightSeatResponse, type Seat } from "../../hooks/useFlights";

const api = axios.create({
    baseURL: "https://backend-flightbooking.onrender.com/api/",
    timeout: 60000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const searchFlights = async (
    params: { departure: string; arrival: string; departureDate: string }
): Promise<Flight[]> => {
    try {
        const { data } = await api.get<FlightSearchResponse>("/flights/search", {
            params,
        });

        return data.data.map(mapFlight);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;

            const message =
                data?.errors?.[0]?.message ||
                data?.message ||
                "Tìm kiếm thất bại";

            throw new Error(message);
        }

        throw error;
    }
};

export const getSeatsByFlight = async (
    flightId: number
): Promise<Seat[]> => {
    try {
        const { data } = await api.get<FlightSeatResponse>(`/flights/${flightId}/seats`);

        return data.seats.map(mapSeat);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;

            const message =
                data?.errors?.[0]?.message ||
                data?.message ||
                "Lấy ghế thất bại";

            throw new Error(message);
        }

        throw error;
    }
};

export const getBookingHistory = async (): Promise<Booking[]> => {
    try {
        const { data } = await api.get<FlightBookingResponse>("/bookings");

        return data.data.map(mapBooking);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;

            const message =
                data?.errors?.[0]?.message ||
                data?.message ||
                "Lấy lịch sử dụng thất bại";

            throw new Error(message);
        }

        throw error;
    }
};

export const cancelBooking = async (id: number): Promise<Booking> => {
    try {
        const res = await api.post<{ booking: BookingModel }>(`bookings/${id}/cancel`);

        return mapBooking(res.data.booking);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;

            const message =
                data?.errors?.[0]?.message ||
                data?.message ||
                "Lấy lịch sử dụng thất bại";

            throw new Error(message);
        }

        throw error;
    }
};


export const createBooking = async (payload: CreateBookingPayload) => {
    const res = await api.post("/bookings", payload);
    return res.data;
};