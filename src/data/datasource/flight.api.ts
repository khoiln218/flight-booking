import axios from "axios";
import { mapFlight, type Flight, type FlightSearchResponse } from "../../hooks/useFlights";

const api = axios.create({
    baseURL: "https://backend-flightbooking.onrender.com/api/",
    timeout: 60000,
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
