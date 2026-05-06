// ✅ Types
export type FlightParams = {
  from: string;
  to: string;
  maxPrice?: number;
};

export type Flight = {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  price: number;
};

// ✅ Service
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
    departureTime: "",
    price: 0
  };
};