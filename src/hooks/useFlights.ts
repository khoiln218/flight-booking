import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { searchFlights } from "../services/flight.service";
import { cancelBooking, createBooking, getBookingHistory, getSeatsByFlight } from "../data/datasource/flight.api";

export const ROWS = 12;
export const COLS = ["A", "B", "C", "D", "E", "F"];

export const AIRPORTS = [
  { id: 1, code: "SGN", name: "Tân Sơn Nhất", city: "Hồ Chí Minh" },
  { id: 2, code: "HAN", name: "Nội Bài", city: "Hà Nội" },
  { id: 3, code: "DAD", name: "Đà Nẵng", city: "Đà Nẵng" },
  { id: 4, code: "CXR", name: "Cam Ranh", city: "Nha Trang" },
  { id: 5, code: "PQC", name: "Phú Quốc", city: "Phú Quốc" },
];

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
  id: number;
  row: number;
  col: string;
  status: SeatStatus;
  price: number;
};

export type BookingSeat = {
  row: number;
  col: string;
};

export type BookingStatus = "confirmed" | "pending" | "cancelled";

export type BookingModel = {
  id: number;
  user_id: number;
  flight_id: number;

  booking_code: string;
  status: BookingStatus;
  total_amount: number;

  created_at: string;
  updated_at: string;

  // Airline
  airline_name: string;
  airline_code: string;

  // Departure
  departure_airport_code: string;
  departure_airport_city: string;

  // Arrival
  arrival_airport_code: string;
  arrival_airport_city: string;

  // Time
  departure_time: string;
  arrival_time: string;
};

export type Booking = {
  id: number;
  flightCode: number;
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

export interface FlightBookingResponse {
  data: BookingModel[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type SeatModel = {
  id: number;
  flight_id: number;
  seat_number: string;
  class: string;
  status: string;
  price_modifier: number;
}

export interface FlightSeatResponse {
  seats: SeatModel[];
}

export type Passenger = {
  fullName: string;
  dateOfBirth: string;
  idNumber: string;
  idType: "cccd" | "cmnd" | "passport";
};

export type CreateBookingPayload = {
  flightId: number;
  passengers: Passenger[];
  seatIds: number[];
};

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

export const mapSeat = (seat: SeatModel): Seat => {
  const row = parseInt(seat.seat_number.slice(0, -1));
  const col = seat.seat_number.slice(-1);

  return {
    id: seat.id,
    row,
    col,
    status: seat.status === "booked" ? "booked" : "available",
    price: 500000 * seat.price_modifier,
  };
};

export const mapBooking = (data: BookingModel): Booking => {
  return {
    id: data.id,
    flightCode: data.flight_id,
    from: data.departure_airport_city,
    to: data.arrival_airport_city,
    departureTime: data.departure_time,
    totalPrice: data.total_amount,
    seats: [],
    status: data.status,
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

export const useSeat = (flightId: number) => {
  return useQuery<Seat[]>({
    queryKey: ["seats", flightId],
    queryFn: () => getSeatsByFlight(flightId),

    enabled: !!flightId,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useBookings = () => {
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: getBookingHistory,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<Booking, Error, number>({
    mutationFn: (id: number) => cancelBooking(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: createBooking,
  });
};