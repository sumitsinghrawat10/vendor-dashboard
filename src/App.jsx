import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import KpiDetailPage from "./components/KpiDetailPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/kpi/:kpiKey"
        element={
          <ProtectedRoute>
            <KpiDetailPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
