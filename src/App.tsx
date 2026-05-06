import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import Login from "./pages/LoginPage.tsx";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import FlightResultsPage from "./pages/FlightResultsPage";
import SeatBookingPage from "./pages/SeatBookingPage.tsx";
import BookingConfirmPage from "./pages/BookingConfirmPage.tsx";
import SuccessPage from "./pages/SuccessPage.tsx";
import PaymentPage from "./pages/PaymentPage";
import FlightsPage from "./pages/FlightsPage.tsx";
import BookingHistoryPage from "./pages/BookingHistoryPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route
            path="/login"
            element={<Login />} />

          {/* Private */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <FlightsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/flights"
            element={
              <ProtectedRoute>
                <FlightResultsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <SeatBookingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/confirm"
            element={
              <ProtectedRoute>
                <BookingConfirmPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <SuccessPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <BookingHistoryPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;