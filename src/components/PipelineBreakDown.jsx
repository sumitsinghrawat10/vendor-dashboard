import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
const FILTERS = ["All", ...QUARTERS];

const STATUS_ORDER = [
  "Pending",
  "Running",
  "Completed",
  "On Hold",
];

const PROJECTS = [
  {
    projectId: "PRJ-001",
    vendor: "Amazon",
    projectName: "QuickSuite Expansion",
    quarter: "Q1",
    projectValue: 150000,
    startDate: "10-Jan-26",
    expectedEndDate: "25-Mar-26",
    owner: "John",
    teamSize: 6,
    progress: 100,
    status: "Completed",
  },
  {
    projectId: "PRJ-002",
    vendor: "Amazon",
    projectName: "Synthetic Data Platform",
    quarter: "Q2",
    projectValue: 180000,
    startDate: "15-Apr-26",
    expectedEndDate: "30-Jun-26",
    owner: "Priya",
    teamSize: 8,
    progress: 70,
    status: "Running",
  },
  {
    projectId: "PRJ-003",
    vendor: "Amazon",
    projectName: "AI Reporting Solution",
    quarter: "Q3",
    projectValue: 210000,
    startDate: "01-Jul-26",
    expectedEndDate: "20-Sep-26",
    owner: "John",
    teamSize: 5,
    progress: 25,
    status: "Running",
  },
  {
    projectId: "PRJ-004",
    vendor: "Amazon",
    projectName: "Customer Analytics Suite",
    quarter: "Q4",
    projectValue: 240000,
    startDate: "10-Oct-26",
    expectedEndDate: "20-Dec-26",
    owner: "Priya",
    teamSize: 7,
    progress: 0,
    status: "Pending",
  },
  {
    projectId: "PRJ-005",
    vendor: "Microsoft",
    projectName: "Copilot Analytics",
    quarter: "Q1",
    projectValue: 350000,
    startDate: "05-Jan-26",
    expectedEndDate: "28-Mar-26",
    owner: "Rahul",
    teamSize: 10,
    progress: 100,
    status: "Completed",
  },
  {
    projectId: "PRJ-006",
    vendor: "Microsoft",
    projectName: "Azure AI Search",
    quarter: "Q2",
    projectValue: 420000,
    startDate: "05-Apr-26",
    expectedEndDate: "15-Jun-26",
    owner: "Rahul",
    teamSize: 12,
    progress: 85,
    status: "Running",
  },
  {
    projectId: "PRJ-007",
    vendor: "Microsoft",
    projectName: "Copilot Studio",
    quarter: "Q3",
    projectValue: 390000,
    startDate: "01-Jul-26",
    expectedEndDate: "30-Sep-26",
    owner: "Neha",
    teamSize: 9,
    progress: 45,
    status: "Running",
  },
  {
    projectId: "PRJ-008",
    vendor: "Microsoft",
    projectName: "AI Foundry Implementation",
    quarter: "Q4",
    projectValue: 460000,
    startDate: "05-Oct-26",
    expectedEndDate: "15-Dec-26",
    owner: "Neha",
    teamSize: 14,
    progress: 0,
    status: "Pending",
  },
  {
    projectId: "PRJ-009",
    vendor: "Google",
    projectName: "AI Analyst",
    quarter: "Q1",
    projectValue: 15000,
    startDate: "15-Jan-26",
    expectedEndDate: "12-Mar-26",
    owner: "Amit",
    teamSize: 3,
    progress: 100,
    status: "Completed",
  },
  {
    projectId: "PRJ-010",
    vendor: "Google",
    projectName: "Gemini Research",
    quarter: "Q2",
    projectValue: 18000,
    startDate: "10-Apr-26",
    expectedEndDate: "22-Jun-26",
    owner: "Amit",
    teamSize: 4,
    progress: 60,
    status: "Running",
  },
  {
    projectId: "PRJ-011",
    vendor: "Google",
    projectName: "Foresight Expansion",
    quarter: "Q3",
    projectValue: 22000,
    startDate: "05-Jul-26",
    expectedEndDate: "15-Sep-26",
    owner: "Sara",
    teamSize: 4,
    progress: 15,
    status: "On Hold",
  },
  {
    projectId: "PRJ-012",
    vendor: "Google",
    projectName: "Gemini Assistant",
    quarter: "Q4",
    projectValue: 28000,
    startDate: "10-Oct-26",
    expectedEndDate: "20-Dec-26",
    owner: "Sara",
    teamSize: 5,
    progress: 0,
    status: "Pending",
  },
];

const STATUS_COLORS = {
  Pending: {
    color: "#854F0B",
    background: "#FAEEDA",
  },
  Running: {
    color: "#0C447C",
    background: "#E6F1FB",
  },
  Completed: {
    color: "#0F6E56",
    background: "#E1F5EE",
  },
  "On Hold": {
    color: "#993556",
    background: "#FBEAF0",
  },
};

const cardSx = {
  p: { xs: 2, md: 2.5 },
  minWidth: 0,
  borderRadius: "16px",
  borderColor: "#E4E7EC",
  bgcolor: "#FFFFFF",
};

const headerCellSx = {
  py: 1.5,
  bgcolor: "#F8FAFC",
  color: "#475467",
  fontSize: 12,
  fontWeight: 700,
  whiteSpace: "nowrap",
};

const bodyCellSx = {
  py: 1.5,
  color: "#344054",
  fontSize: 13,
  whiteSpace: "nowrap",
  fontVariantNumeric: "tabular-nums",
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value) || 0);
}

function createSummary(projects, quarter) {
  const records = projects.filter(
    (project) => project.quarter === quarter
  );

  return {
    quarter,
    total: records.length,
    pending: records.filter(
      (project) => project.status === "Pending"
    ).length,
    running: records.filter(
      (project) => project.status === "Running"
    ).length,
    completed: records.filter(
      (project) => project.status === "Completed"
    ).length,
    onHold: records.filter(
      (project) => project.status === "On Hold"
    ).length,
  };
}

function getTotalRow(rows) {
  return rows.reduce(
    (total, row) => ({
      quarter: "Total",
      total: total.total + row.total,
      pending: total.pending + row.pending,
      running: total.running + row.running,
      completed: total.completed + row.completed,
      onHold: total.onHold + row.onHold,
    }),
    {
      quarter: "Total",
      total: 0,
      pending: 0,
      running: 0,
      completed: 0,
      onHold: 0,
    }
  );
}

export default function PipelineBreakDown() {
  const [quarterFilter, setQuarterFilter] =
    useState("All");

  const activeQuarters =
    quarterFilter === "All"
      ? QUARTERS
      : [quarterFilter];

  const filteredProjects = useMemo(() => {
    if (quarterFilter === "All") {
      return PROJECTS;
    }

    return PROJECTS.filter(
      (project) => project.quarter === quarterFilter
    );
  }, [quarterFilter]);

  const quarterlySummary = useMemo(() => {
    const rows = activeQuarters.map((quarter) =>
      createSummary(PROJECTS, quarter)
    );

    return [...rows, getTotalRow(rows)];
  }, [quarterFilter]);

  const statusSummary = useMemo(
    () =>
      STATUS_ORDER.map((status) => {
        const projects = filteredProjects.filter(
          (project) => project.status === status
        );

        return {
          status,
          numberOfProjects: projects.length,
          totalProjectValue: projects.reduce(
            (total, project) =>
              total + project.projectValue,
            0
          ),
        };
      }),
    [filteredProjects]
  );

  return (
    <Box>
      {/* Quarter filter */}
      <ToggleButtonGroup
        size="small"
        value={quarterFilter}
        exclusive
        onChange={(_, value) => {
          if (value) {
            setQuarterFilter(value);
          }
        }}
        aria-label="Select project quarter"
        sx={{
          mb: 2.5,
          p: 0.5,
          maxWidth: "100%",
          overflowX: "auto",
          bgcolor: "#EFEEE9",
          borderRadius: "10px",
        }}
      >
        {FILTERS.map((filter) => (
          <ToggleButton
            key={filter}
            value={filter}
            aria-label={`Show ${filter} projects`}
            sx={{
              px: 2,
              border: "none",
              borderRadius: "8px !important",
              textTransform: "none",
              fontSize: 12,
              fontWeight: 600,

              "&.Mui-selected": {
                bgcolor: "#FFFFFF !important",
                color: "#0C447C",
                boxShadow: "0 0 0 1px #D0D5DD",
              },
            }}
          >
            {filter}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1.2fr 1fr",
          },
          gap: 2,
          alignItems: "start",
        }}
      >
        {/* Table 1 */}
        <Paper
          component="section"
          elevation={0}
          variant="outlined"
          sx={cardSx}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              component="h2"
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: "#101828",
              }}
            >
              Quarterly project summary
            </Typography>

            <Typography
              sx={{
                mt: 0.35,
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              Project count by quarter and status
            </Typography>
          </Box>

          <TableContainer>
            <Table
              size="small"
              aria-label="Quarterly project summary"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={headerCellSx}>
                    Quarter
                  </TableCell>

                  <TableCell align="center" sx={headerCellSx}>
                    Total
                  </TableCell>

                  <TableCell align="center" sx={headerCellSx}>
                    Pending
                  </TableCell>

                  <TableCell align="center" sx={headerCellSx}>
                    Running
                  </TableCell>

                  <TableCell align="center" sx={headerCellSx}>
                    Completed
                  </TableCell>

                  <TableCell align="center" sx={headerCellSx}>
                    On Hold
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {quarterlySummary.map((row) => {
                  const isTotal = row.quarter === "Total";

                  return (
                    <TableRow
                      key={row.quarter}
                      sx={{
                        bgcolor: isTotal
                          ? "#F8FAFC"
                          : "transparent",

                        "&:last-child td": {
                          borderBottom: 0,
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          ...bodyCellSx,
                          fontWeight: isTotal ? 700 : 600,
                        }}
                      >
                        {row.quarter}
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          ...bodyCellSx,
                          fontWeight: 700,
                        }}
                      >
                        {row.total}
                      </TableCell>

                      <TableCell align="center" sx={bodyCellSx}>
                        {row.pending}
                      </TableCell>

                      <TableCell align="center" sx={bodyCellSx}>
                        {row.running}
                      </TableCell>

                      <TableCell align="center" sx={bodyCellSx}>
                        {row.completed}
                      </TableCell>

                      <TableCell align="center" sx={bodyCellSx}>
                        {row.onHold}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Table 2 */}
        <Paper
          component="section"
          elevation={0}
          variant="outlined"
          sx={cardSx}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              component="h2"
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: "#101828",
              }}
            >
              Project status summary
            </Typography>

            <Typography
              sx={{
                mt: 0.35,
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              {quarterFilter === "All"
                ? "All quarters"
                : `${quarterFilter} projects`}
            </Typography>
          </Box>

          <TableContainer>
            <Table
              size="small"
              aria-label="Project status summary"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={headerCellSx}>
                    Status
                  </TableCell>

                  <TableCell align="center" sx={headerCellSx}>
                    Projects
                  </TableCell>

                  <TableCell align="right" sx={headerCellSx}>
                    Project Value
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {statusSummary.map((row) => {
                  const statusColor =
                    STATUS_COLORS[row.status];

                  return (
                    <TableRow
                      key={row.status}
                      sx={{
                        "&:last-child td": {
                          borderBottom: 0,
                        },
                      }}
                    >
                      <TableCell sx={bodyCellSx}>
                        <Chip
                          size="small"
                          label={row.status}
                          sx={{
                            minWidth: 88,
                            justifyContent: "flex-start",
                            bgcolor:
                              statusColor.background,
                            color: statusColor.color,
                            fontWeight: 700,
                          }}
                        />
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          ...bodyCellSx,
                          fontWeight: 700,
                        }}
                      >
                        {row.numberOfProjects}
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{
                          ...bodyCellSx,
                          fontWeight: 700,
                        }}
                      >
                        {formatCurrency(
                          row.totalProjectValue
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}

                <TableRow sx={{ bgcolor: "#F8FAFC" }}>
                  <TableCell
                    sx={{
                      ...bodyCellSx,
                      fontWeight: 700,
                      borderBottom: 0,
                    }}
                  >
                    Total
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      ...bodyCellSx,
                      fontWeight: 700,
                      borderBottom: 0,
                    }}
                  >
                    {filteredProjects.length}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      ...bodyCellSx,
                      fontWeight: 700,
                      borderBottom: 0,
                    }}
                  >
                    {formatCurrency(
                      filteredProjects.reduce(
                        (total, project) =>
                          total + project.projectValue,
                        0
                      )
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
}