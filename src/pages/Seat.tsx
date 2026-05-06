import type { SeatStatus } from "./SeatBookingPage";

export type Seat = {
    id: string;
    row: number;
    col: string;
    status: SeatStatus;
    price: number;
};
