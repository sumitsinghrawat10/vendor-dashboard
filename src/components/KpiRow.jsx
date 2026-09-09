import { Box } from "@mui/material";
import KpiCard from "./KpiCard.jsx";
import { KPIS } from "../data/dashboardData.js";

export default function KpiRow({ onNavigate }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1.75, mb: 2.5 }}>
      {KPIS.map((kpi) => (
        <KpiCard key={kpi.key} kpi={kpi} onNavigate={onNavigate} />
      ))}
    </Box>
  );
}
