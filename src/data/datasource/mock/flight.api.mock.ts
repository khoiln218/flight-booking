import { flights } from "./flight.mock";

// ✅ Types
export type Flight = {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  price: number;
};

export type FlightParams = {
  from?: string;
  to?: string;
  maxPrice?: number;
};

// ✅ delay helper
const delay = (ms: number): Promise<void> =>
  new Promise((res) => setTimeout(res, ms));

// ✅ get list
export const getFlightsMock = async (
  params?: FlightParams
): Promise<Flight[]> => {
  await delay(500);

  let result: Flight[] = [...flights];

  if (params?.from) {
    result = result.filter((f) => f.from === params.from);
  }

  if (params?.to) {
    result = result.filter((f) => f.to === params.to);
  }

  const { maxPrice } = params || {};
  if (maxPrice !== undefined) {
    result = result.filter((f) => f.price <= maxPrice);
  }

  return result;
};

// ✅ get detail
export const getFlightDetailMock = async (
  id: string
): Promise<Flight> => {
  await delay(300);

  const flight = flights.find((f) => f.id === id);

  if (!flight) {
    throw new Error("Flight not found");
  }

  return flight;
};