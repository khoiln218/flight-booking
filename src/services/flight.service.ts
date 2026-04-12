import { flightDataSource } from "../data/datasource";

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
  params: FlightParams
): Promise<Flight[]> => {
  return flightDataSource.getFlightsMock(params);
};

export const getFlightDetail = async (
  id: string
): Promise<Flight> => {
  return flightDataSource.getFlightDetailMock(id);
};