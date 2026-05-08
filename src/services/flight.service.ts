import { flightDataSource } from "../data/datasource";
import type { Flight, SearchFlightParams } from "../hooks/useFlights";

export const searchFlights = async (
  params: SearchFlightParams
): Promise<Flight[]> => {
  if (!params.from || !params.to || !params.date) {
    throw new Error("Missing params");
  }

  return flightDataSource.searchFlights({
    departure: params.from,
    arrival: params.to,
    departureDate: params.date,
  });
};