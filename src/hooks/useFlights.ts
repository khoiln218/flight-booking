import { useQuery } from "@tanstack/react-query";

export const ROWS = 12;
export const COLS = ["A", "B", "C", "D", "E", "F"];

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
  date: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
};

export type SeatStatus = "available" | "booked" | "selected";

export type Seat = {
  id: string;
  row: number;
  col: string;
  status: SeatStatus;
  price: number;
};

export type BookingStatus =
  | "BOOKED"
  | "CANCELLED"
  | "USED"
  | "EXPIRED";

export type BookingSeat = {
  row: number;
  col: string;
};

export type Booking = {
  id: number;
  flightCode: string;
  from: string;
  to: string;
  departureTime: string;
  totalPrice: number;
  seats: BookingSeat[];
  status: BookingStatus;
};

export type BookingState = {
  flight: Flight;
  selectedSeats: Seat[];
  totalPrice: number;
};

export type SearchItem = {
  from: string;
  to: string;
  date: string;
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
          date: new Date().toISOString(),
          departureTime: new Date().toISOString(),
          arrivalTime: new Date().toISOString(),
          price: 1200000,
        },
      ];
    },
  });
};