import { useQuery } from "@tanstack/react-query";
import { searchFlights } from "../services/flight.service";

export const ROWS = 12;
export const COLS = ["A", "B", "C", "D", "E", "F"];

export type SearchFlightParams = {
  from: string;
  to: string;
  date: string;
};

export type FlightModel = {
  id: number;

  airline_id: number;
  airline_name: string;
  airline_code: string;

  departure_airport_id: number;
  departure_airport_name: string;
  departure_airport_code: string;
  departure_airport_city: string;

  arrival_airport_id: number;
  arrival_airport_name: string;
  arrival_airport_code: string;
  arrival_airport_city: string;

  departure_time: string;
  arrival_time: string;

  base_price: number;
  total_seats: number;
  available_seats: number;

  status: string;
  created_at: string;
};

export type Flight = {
  id: number;

  airline: {
    id: number;
    name: string;
    code: string;
  };

  departure: {
    airportId: number;
    airportName: string;
    airportCode: string;
    city: string;
    time: string;
  };

  arrival: {
    airportId: number;
    airportName: string;
    airportCode: string;
    city: string;
    time: string;
  };

  price: number;
  totalSeats: number;
  availableSeats: number;

  status: string;
  createdAt: string;
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

export interface FlightSearchResponse {
  data: FlightModel[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const mapFlight = (item: FlightModel): Flight => {
  return {
    id: item.id,

    airline: {
      id: item.airline_id,
      name: item.airline_name,
      code: item.airline_code,
    },

    departure: {
      airportId: item.departure_airport_id,
      airportName: item.departure_airport_name,
      airportCode: item.departure_airport_code,
      city: item.departure_airport_city,
      time: item.departure_time,
    },

    arrival: {
      airportId: item.arrival_airport_id,
      airportName: item.arrival_airport_name,
      airportCode: item.arrival_airport_code,
      city: item.arrival_airport_city,
      time: item.arrival_time,
    },

    price: item.base_price,
    totalSeats: item.total_seats,
    availableSeats: item.available_seats,

    status: item.status,
    createdAt: item.created_at,
  };
};

export const useFlights = (params: SearchFlightParams) => {
  return useQuery<Flight[]>({
    queryKey: ["flights", params.from, params.to, params.date],

    queryFn: () =>
      searchFlights({
        from: params.from,
        to: params.to,
        date: params.date,
      }),

    enabled: !!params.from && !!params.to && !!params.date,
    retry: false,
    refetchOnWindowFocus: false,
  });
};