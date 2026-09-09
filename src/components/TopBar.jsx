import { Box, Tab, Tabs, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FILTERS } from "../data/dashboardData.js";

const tabSx = {
  minHeight: 0,
  textTransform: "none",
  fontWeight: 600,
  fontSize: 13,
  borderRadius: "8px",
  "&.Mui-selected": { bgcolor: "#fff", boxShadow: "0 0 0 1px #e5e4df" },
};

export default function TopBar({ view, onViewChange, filter, onFilterChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1.5,
        mb: 3,
      }}
    >
      {/* <Tabs
        value={view}
        onChange={(_, v) => onViewChange(v)}
        sx={{
          minHeight: 0,
          bgcolor: "#efeee9",
          borderRadius: "10px",
          p: 0.5,
          "& .MuiTabs-indicator": { display: "none" },
        }}
      >
        <Tab value="public" label="Public · Main dashboard" sx={tabSx} />
        <Tab value="private" label="Private · Vendor detail" sx={tabSx} />
      </Tabs> */}

      {/* {view === "public" && (
        <ToggleButtonGroup
          size="small"
          value={filter}
          exclusive
          onChange={(_, v) => v && onFilterChange(v)}
          sx={{ bgcolor: "#efeee9", borderRadius: "10px", p: 0.5 }}
        >
          {FILTERS.map((f) => (
            <ToggleButton
              key={f}
              value={f}
              sx={{
                border: "none",
                textTransform: "none",
                fontSize: 12,
                borderRadius: "8px !important",
                px: 2,
                "&.Mui-selected": { bgcolor: "#fff !important", boxShadow: "0 0 0 1px #e5e4df" },
              }}
            >
              {f}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )} */}
    </Box>
  );
}
