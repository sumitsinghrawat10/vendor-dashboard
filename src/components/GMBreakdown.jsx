import { useMemo, useState } from "react";
import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ReactECharts from "echarts-for-react";

const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
const FILTERS = ["All", ...QUARTERS];

const VENDOR_COLORS = {
  Amazon: "#20B89A",
  Microsoft: "#4299EF",
  Google: "#9481DF",
};

/*
  Replace these sample Revenue and Delivery Cost values
  with values received from Excel/API.
*/
const PROJECT_GM_DATA = [
  {
    projectId: "PRJ-001",
    vendor: "Amazon",
    projectName: "QuickSuite Expansion",
    quarter: "Q1",
    revenue: 150000,
    deliveryCost: 105000,
  },
  {
    projectId: "PRJ-002",
    vendor: "Amazon",
    projectName: "Synthetic Data Platform",
    quarter: "Q2",
    revenue: 180000,
    deliveryCost: 117000,
  },
  {
    projectId: "PRJ-003",
    vendor: "Amazon",
    projectName: "AI Reporting Solution",
    quarter: "Q3",
    revenue: 210000,
    deliveryCost: 134400,
  },
  {
    projectId: "PRJ-004",
    vendor: "Amazon",
    projectName: "Customer Analytics Suite",
    quarter: "Q4",
    revenue: 240000,
    deliveryCost: 158400,
  },
  {
    projectId: "PRJ-005",
    vendor: "Microsoft",
    projectName: "Copilot Analytics",
    quarter: "Q1",
    revenue: 350000,
    deliveryCost: 245000,
  },
  {
    projectId: "PRJ-006",
    vendor: "Microsoft",
    projectName: "Azure AI Search",
    quarter: "Q2",
    revenue: 420000,
    deliveryCost: 281400,
  },
  {
    projectId: "PRJ-007",
    vendor: "Microsoft",
    projectName: "Copilot Studio",
    quarter: "Q3",
    revenue: 390000,
    deliveryCost: 249600,
  },
  {
    projectId: "PRJ-008",
    vendor: "Microsoft",
    projectName: "AI Foundry Implementation",
    quarter: "Q4",
    revenue: 460000,
    deliveryCost: 289800,
  },
  {
    projectId: "PRJ-009",
    vendor: "Google",
    projectName: "AI Analyst",
    quarter: "Q1",
    revenue: 15000,
    deliveryCost: 11250,
  },
  {
    projectId: "PRJ-010",
    vendor: "Google",
    projectName: "Gemini Research",
    quarter: "Q2",
    revenue: 18000,
    deliveryCost: 12780,
  },
  {
    projectId: "PRJ-011",
    vendor: "Google",
    projectName: "Foresight Expansion",
    quarter: "Q3",
    revenue: 22000,
    deliveryCost: 15620,
  },
  {
    projectId: "PRJ-012",
    vendor: "Google",
    projectName: "Gemini Assistant",
    quarter: "Q4",
    revenue: 28000,
    deliveryCost: 19320,
  },
];

function calculateGrossMargin(revenue, deliveryCost) {
  if (!revenue) {
    return 0;
  }

  const grossProfit = revenue - deliveryCost;

  return Number(
    ((grossProfit / revenue) * 100).toFixed(2)
  );
}

function calculateVendorMargin(records, vendor, quarter) {
  const projects = records.filter(
    (project) =>
      project.vendor === vendor &&
      project.quarter === quarter
  );

  const totalRevenue = projects.reduce(
    (total, project) => total + project.revenue,
    0
  );

  const totalDeliveryCost = projects.reduce(
    (total, project) =>
      total + project.deliveryCost,
    0
  );

  if (!totalRevenue) {
    return null;
  }

  return calculateGrossMargin(
    totalRevenue,
    totalDeliveryCost
  );
}

export default function GMBreakdown() {
  const [quarterFilter, setQuarterFilter] =
    useState("All");

  const activeQuarters =
    quarterFilter === "All"
      ? QUARTERS
      : [quarterFilter];

  const vendors = useMemo(
    () => [
      ...new Set(
        PROJECT_GM_DATA.map((project) => project.vendor)
      ),
    ],
    []
  );

  const filteredProjects = useMemo(() => {
    if (quarterFilter === "All") {
      return PROJECT_GM_DATA;
    }

    return PROJECT_GM_DATA.filter(
      (project) => project.quarter === quarterFilter
    );
  }, [quarterFilter]);

  const summary = useMemo(() => {
    const totalRevenue = filteredProjects.reduce(
      (total, project) => total + project.revenue,
      0
    );

    const totalDeliveryCost = filteredProjects.reduce(
      (total, project) =>
        total + project.deliveryCost,
      0
    );

    const totalGrossProfit =
      totalRevenue - totalDeliveryCost;

    return {
      totalRevenue,
      totalDeliveryCost,
      totalGrossProfit,
      grossMargin: calculateGrossMargin(
        totalRevenue,
        totalDeliveryCost
      ),
    };
  }, [filteredProjects]);

  const option = useMemo(
    () => ({
      animationDuration: 400,

      aria: {
        enabled: true,
      },

      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        valueFormatter: (value) =>
          value == null ? "Not available" : `${value}%`,
      },

      legend: {
        show: true,
        type: "scroll",
        orient: "horizontal",
        top: 0,
        left: "center",
        icon: "roundRect",
        itemWidth: 12,
        itemHeight: 8,
        itemGap: 20,
        textStyle: {
          color: "#667085",
          fontSize: 11,
        },
      },

      grid: {
        top: 55,
        left: 20,
        right: 20,
        bottom: 15,
        containLabel: true,
      },

      xAxis: {
        type: "category",
        data: activeQuarters,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#D9DEE7",
          },
        },
        axisLabel: {
          color: "#667085",
          fontSize: 12,
          fontWeight: 600,
        },
      },

      yAxis: {
        type: "value",
        name: "Gross Margin %",
        min: 0,
        max: 50,
        interval: 10,
        nameTextStyle: {
          color: "#667085",
          fontSize: 11,
        },
        axisLabel: {
          color: "#667085",
          formatter: "{value}%",
        },
        splitLine: {
          lineStyle: {
            color: "#E9EDF3",
            type: "dashed",
          },
        },
      },

      series: vendors.map((vendor) => ({
        name: vendor,
        type: "bar",
        barMaxWidth: 44,

        data: activeQuarters.map((quarter) =>
          calculateVendorMargin(
            PROJECT_GM_DATA,
            vendor,
            quarter
          )
        ),

        itemStyle: {
          color: VENDOR_COLORS[vendor] || "#667085",
          borderRadius: [5, 5, 0, 0],
        },

        label: {
          show: true,
          position: "top",
          distance: 6,
          color: "#344054",
          fontSize: 11,
          fontWeight: 700,
          formatter: ({ value }) =>
            value == null ? "" : `${value}%`,
        },

        emphasis: {
          focus: "series",
        },
      })),
    }),
    [activeQuarters, vendors]
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
        aria-label="Select Gross Margin quarter"
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
            aria-label={`Show ${filter} Gross Margin`}
            sx={{
              px: 2,
              border: "none",
              borderRadius: "8px !important",
              textTransform: "none",
              fontSize: 12,
              fontWeight: 600,

              "&.Mui-selected": {
                bgcolor: "#FFFFFF !important",
                color: "#854F0B",
                boxShadow: "0 0 0 1px #D0D5DD",
              },
            }}
          >
            {filter}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Gross Margin summary */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            md: "repeat(4, minmax(0, 1fr))",
          },
          gap: 1.5,
          mb: 2,
        }}
      >
        <SummaryCard
          label="Revenue"
          value={summary.totalRevenue}
          type="currency"
          color="#0F6E56"
          background="#E1F5EE"
        />

        <SummaryCard
          label="Delivery Cost"
          value={summary.totalDeliveryCost}
          type="currency"
          color="#993556"
          background="#FBEAF0"
        />

        <SummaryCard
          label="Gross Profit"
          value={summary.totalGrossProfit}
          type="currency"
          color="#534AB7"
          background="#EEEDFE"
        />

        <SummaryCard
          label="Gross Margin"
          value={summary.grossMargin}
          type="percentage"
          color="#854F0B"
          background="#FAEEDA"
        />
      </Box>

      {/* Gross Margin graph */}
      <Paper
        component="section"
        elevation={0}
        variant="outlined"
        sx={{
          p: { xs: 2, md: 2.5 },
          minWidth: 0,
          borderRadius: "16px",
          borderColor: "#E4E7EC",
          bgcolor: "#FFFFFF",
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "#101828",
          }}
        >
          Gross Margin by quarter
        </Typography>

        <Typography
          sx={{
            mt: 0.35,
            mb: 1,
            fontSize: 12,
            color: "text.secondary",
          }}
        >
          Vendor-wise Gross Margin percentage
        </Typography>

        <ReactECharts
          option={option}
          notMerge
          lazyUpdate
          style={{
            width: "100%",
            height: 340,
          }}
        />
      </Paper>
    </Box>
  );
}

function SummaryCard({
  label,
  value,
  type,
  color,
  background,
}) {
  const formattedValue =
    type === "percentage"
      ? `${Number(value || 0).toFixed(2)}%`
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(Number(value) || 0);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        minWidth: 0,
        borderRadius: "14px",
        bgcolor: background,
        color,
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          opacity: 0.8,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          fontSize: {
            xs: 19,
            md: 22,
          },
          fontWeight: 700,
          fontVariantNumeric: "tabular-nums",
          overflowWrap: "anywhere",
        }}
      >
        {formattedValue}
      </Typography>
    </Paper>
  );
}