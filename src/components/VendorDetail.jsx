import { Box, Paper, Stack, Typography } from "@mui/material";
import { VENDOR_DETAIL } from "../data/dashboardData.js";

const rows = [
  ["Revenue contribution", VENDOR_DETAIL.revenue, "text.primary"],
  ["Pipeline stage", VENDOR_DETAIL.pipelineStage, "text.primary"],
  ["Gross Margin", VENDOR_DETAIL.g2m, "#0ca30c"],
  ["Head Count", VENDOR_DETAIL.headCount, "#0ca30c"],
  ["NPS / CSAT", VENDOR_DETAIL.csat, "text.primary"],
  ["Solution stage", VENDOR_DETAIL.solutionStage, "text.primary"],
];

export default function VendorDetail() {
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: "14px" }}>
      <Typography sx={{ fontSize: 13, fontWeight: 700, color: "text.secondary", mb: 1.5 }}>
        {VENDOR_DETAIL.name} — detail view
      </Typography>
      <Stack divider={<Box sx={{ borderBottom: "1px solid #e5e4df" }} />} spacing={1}>
        {rows.map(([label, value, color]) => (
          <Box key={label} sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
            <Typography sx={{ fontSize: 13 }}>{label}</Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color, textAlign: "right" }}>{value}</Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}