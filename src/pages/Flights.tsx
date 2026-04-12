import { useState, type JSX } from "react";
import { useFlights } from "../hooks/useFlights";

// ✅ Define type cho params
type FlightParams = {
  from: string;
  to: string;
  maxPrice?: number;
};

// ✅ Define type cho Flight
type Flight = {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  price: number;
};

export default function Flights(): JSX.Element {
  const [params, setParams] = useState<FlightParams>({
    from: "SGN",
    to: "HAN",
  });

  // 👉 nếu hook chưa có type thì ép tạm
  const { data, isLoading } = useFlights(params) as {
    data: Flight[] | undefined;
    isLoading: boolean;
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Flight List</h1>

      <button
        onClick={() =>
          setParams({ from: "SGN", to: "HAN", maxPrice: 1000000 })
        }
      >
        Filter Price ≤ 1,000,000
      </button>

      {isLoading && <p>Loading...</p>}

      {data?.map((f) => (
        <div
          key={f.id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <h3>{f.airline}</h3>
          <p>
            {f.from} → {f.to}
          </p>
          <p>{new Date(f.departureTime).toLocaleTimeString()}</p>
          <p>
            <b>{f.price.toLocaleString()} VND</b>
          </p>
        </div>
      ))}
    </div>
  );
}