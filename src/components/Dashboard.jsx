

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import TopBar from "./TopBar.jsx";
import KpiRow from "./KpiRow.jsx";
import SolutionsBreakdown from "./SolutionsBreakdown.jsx";
import AiBenchCard from "./AiBenchCard.jsx";
import VendorDetail from "./VendorDetail.jsx";

const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];

export default function Dashboard() {
  const [view, setView] = useState("public");
  const [filter, setFilter] = useState("Actual");
  const [selectedQuarter, setSelectedQuarter] =
    useState("Q1");

  const navigate = useNavigate();

  const handleKpiNavigate = (kpiKey) => {
    navigate(`/kpi/${kpiKey}`, {
      state: {
        quarter: selectedQuarter,
      },
    });
  };

  return (
    <Box
      sx={{
        mx: "auto",
        p: { xs: 2, md: 3 },
        bgcolor: "#f7f7f5",
        minHeight: "100vh",
      }}
    >
      {/* Dashboard title and quarter filter */}
      <Box
        component="header"
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Breadcrumbs>
          <Typography
            component="h1"
      
            sx={{
              color:"#2F80C9",
              fontSize: {
                xs: "1.25rem",
                sm: "1.5rem",
              },
              fontWeight: 700,
            }}
          >
            Vendor Dashboard
          </Typography>
        </Breadcrumbs>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            component="label"
            htmlFor="quarter-select"
      
            sx={{
              color:"#2F80C9",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Quarter
          </Typography>

          <FormControl size="small">
            <Select
              id="quarter-select"
              value={selectedQuarter}
              onChange={(event) =>
                setSelectedQuarter(event.target.value)
              }
              inputProps={{
                "aria-label": "Select quarter",
              }}
              sx={{
                minWidth: 100,
                height: 40,
                borderRadius: "10px",
                bgcolor: "background.paper",
                fontWeight: 700,

                "& .MuiSelect-select": {
                  py: 1,
                },
              }}
            >
              {QUARTERS.map((quarter) => (
                <MenuItem key={quarter} value={quarter}>
                  {quarter}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TopBar
        view={view}
        onViewChange={setView}
        filter={filter}
        onFilterChange={setFilter}
      />

      {view === "public" ? (
        <>
          <KpiRow
            quarter={selectedQuarter}
            onNavigate={handleKpiNavigate}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1.4fr 1fr",
              },
              gap: 1.75,
              mb: 1.75,
            }}
          >
            <AiBenchCard quarter={selectedQuarter} />

            <SolutionsBreakdown
              quarter={selectedQuarter}
            />
          </Box>
        </>
      ) : (
        <VendorDetail quarter={selectedQuarter} />
      )}
    </Box>
  );
}