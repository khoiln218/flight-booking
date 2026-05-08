import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import Login from "./pages/LoginPage.tsx";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import FlightResultsPage from "./pages/FlightResultsPage";
import BookingSeatPage from "./pages/BookingSeatPage.tsx";
import BookingConfirmPage from "./pages/BookingConfirmPage.tsx";
import BookingSuccessPage from "./pages/BookingSuccessPage.tsx";
import BookingPaymentPage from "./pages/BookingPaymentPage.tsx";
import FlightSearchPage from "./pages/FlightSearchPage.tsx";
import BookingHistoryPage from "./pages/BookingHistoryPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route
            path="/login"
            element={<Login />} />

          <Route
            path="/register"
            element={<RegisterPage />} />

          {/* Private */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <FlightSearchPage />
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
                <BookingSeatPage />
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
                <BookingPaymentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <BookingSuccessPage />
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