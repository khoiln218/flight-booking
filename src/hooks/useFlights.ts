import { useQuery } from "@tanstack/react-query";

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

export const useFlights = (params: FlightParams) => {
  return useQuery<Flight[]>({
    queryKey: ["flights", params],
    queryFn: async () => {
      // mock data
      return [
        {
          id: "1",
          airline: "Vietnam Airlines",
          from: params.from,
          to: params.to,
          departureTime: new Date().toISOString(),
          price: 1200000,
        },
      ];
    },
  });
};