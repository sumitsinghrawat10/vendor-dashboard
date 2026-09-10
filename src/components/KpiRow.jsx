// import { Box } from "@mui/material";
// import KpiCard from "./KpiCard.jsx";
// import { KPIS } from "../data/dashboardData.js";

// export default function KpiRow({ onNavigate }) {
//   return (
//     <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1.75, mb: 2.5 }}>
//       {KPIS.map((kpi) => (
//         <KpiCard key={kpi.key} kpi={kpi} onNavigate={onNavigate} />
//       ))}
//     </Box>
//   );
// }


import { Box } from "@mui/material";
import KpiCard from "./KpiCard.jsx";
import { KPIS } from "../data/dashboardData.js";
import { getKpiSummary } from "../data/revenueData.js";

export default function KpiRow({ quarter, vendor, onNavigate }) {
  const summary = getKpiSummary(quarter, vendor);

  // Static KPI definitions (label, color, icon) merged with live,
  // filtered numbers computed from revenueData.js for this
  // quarter + vendor selection.
  const liveKpis = KPIS.map((kpi) => {
    switch (kpi.key) {
      case "revenue":
        return {
          ...kpi,
          value: `${summary.revenuePct}%`,
          // sub: `$${summary.totalRevenue.toLocaleString()} of $${summary.totalTarget.toLocaleString()} target`,
        };
      case "pipeline":
        return {
          ...kpi,
          value: summary.totalPipeline ? `$${(summary.totalPipeline / 1000).toFixed(0)}K` : "$0",
          sub: "Total pipeline value",
        };
      case "headCount":
        return {
          ...kpi,
          value: `${summary.headcountTotal}`,
          sub: `${summary.headcountOnshore} onshore · ${summary.headcountOffshore} offshore`,
        };
      // csat has no quarter/vendor-tagged data source yet — stays static
      default:
        return kpi;
    }
  });

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1.75, mb: 2.5 }}>
      {liveKpis.map((kpi) => (
        <KpiCard key={kpi.key} kpi={kpi} onNavigate={onNavigate} />
      ))}
    </Box>
  );
}