import { History } from "@/pages/History";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Timesheet } from "@/pages/Timesheet";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route
        path="/timesheet"
        element={
          <ProtectedRoute>
            <Timesheet />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
