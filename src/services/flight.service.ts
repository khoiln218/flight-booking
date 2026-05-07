import type { Flight } from "../hooks/useFlights";

export const getFlights = async (
): Promise<Flight[]> => {
  return [];
};


export const getFlightDetail = async (
  id: string
): Promise<Flight> => {
  return {
    id,
    airline: "",
    from: "",
    to: "",
    date: "",
    departureTime: "",
    arrivalTime: "",
    price: 0
  };
};