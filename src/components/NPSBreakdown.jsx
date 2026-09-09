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

const NPS_DATA = [
  {
    vendor: "Amazon",
    quarter: "Q1",
    npsScore: 42,
    csatScore: 84,
    totalResponses: 100,
    promoters: 60,
    passives: 22,
    detractors: 18,
  },
  {
    vendor: "Amazon",
    quarter: "Q2",
    npsScore: 48,
    csatScore: 88,
    totalResponses: 120,
    promoters: 75,
    passives: 28,
    detractors: 17,
  },
  {
    vendor: "Amazon",
    quarter: "Q3",
    npsScore: 53,
    csatScore: 91,
    totalResponses: 130,
    promoters: 84,
    passives: 31,
    detractors: 15,
  },
  {
    vendor: "Amazon",
    quarter: "Q4",
    npsScore: 56,
    csatScore: 93,
    totalResponses: 140,
    promoters: 93,
    passives: 32,
    detractors: 15,
  },
  {
    vendor: "Microsoft",
    quarter: "Q1",
    npsScore: 38,
    csatScore: 81,
    totalResponses: 90,
    promoters: 50,
    passives: 24,
    detractors: 16,
  },
  {
    vendor: "Microsoft",
    quarter: "Q2",
    npsScore: 44,
    csatScore: 86,
    totalResponses: 110,
    promoters: 65,
    passives: 28,
    detractors: 17,
  },
  {
    vendor: "Microsoft",
    quarter: "Q3",
    npsScore: 49,
    csatScore: 89,
    totalResponses: 125,
    promoters: 77,
    passives: 32,
    detractors: 16,
  },
  {
    vendor: "Microsoft",
    quarter: "Q4",
    npsScore: 54,
    csatScore: 92,
    totalResponses: 135,
    promoters: 87,
    passives: 34,
    detractors: 14,
  },
  {
    vendor: "Google",
    quarter: "Q1",
    npsScore: 35,
    csatScore: 78,
    totalResponses: 60,
    promoters: 31,
    passives: 19,
    detractors: 10,
  },
  {
    vendor: "Google",
    quarter: "Q2",
    npsScore: 41,
    csatScore: 83,
    totalResponses: 75,
    promoters: 43,
    passives: 20,
    detractors: 12,
  },
  {
    vendor: "Google",
    quarter: "Q3",
    npsScore: 46,
    csatScore: 87,
    totalResponses: 80,
    promoters: 49,
    passives: 19,
    detractors: 12,
  },
  {
    vendor: "Google",
    quarter: "Q4",
    npsScore: 51,
    csatScore: 90,
    totalResponses: 95,
    promoters: 61,
    passives: 21,
    detractors: 13,
  },
];

const chartCardSx = {
  p: { xs: 2, md: 2.5 },
  minWidth: 0,
  borderRadius: "16px",
  borderColor: "#E4E7EC",
  bgcolor: "#FFFFFF",
};

const chartTitleSx = {
  fontSize: 16,
  fontWeight: 700,
  color: "#101828",
};

const chartSubtitleSx = {
  mt: 0.35,
  mb: 1,
  fontSize: 12,
  color: "text.secondary",
};

function getVendorValue(vendor, quarter, field) {
  const record = NPS_DATA.find(
    (item) =>
      item.vendor === vendor &&
      item.quarter === quarter
  );

  return record?.[field] ?? null;
}

function getQuarterTotal(quarter, field) {
  return NPS_DATA.filter(
    (item) => item.quarter === quarter
  ).reduce(
    (total, item) => total + (Number(item[field]) || 0),
    0
  );
}

function createVendorOption({
  quarters,
  vendors,
  field,
  suffix = "",
  min = 0,
  max = 100,
  chartType = "bar",
}) {
  return {
    animationDuration: 400,

    aria: {
      enabled: true,
    },

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: chartType === "bar" ? "shadow" : "line",
      },
      valueFormatter: (value) =>
        value == null ? "Not available" : `${value}${suffix}`,
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
      itemGap: 18,
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
      data: quarters,
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
      min,
      max,
      axisLabel: {
        color: "#667085",
        formatter: `{value}${suffix}`,
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
      type: chartType,
      smooth: chartType === "line",
      barMaxWidth: 42,
      symbolSize: 8,

      data: quarters.map((quarter) =>
        getVendorValue(vendor, quarter, field)
      ),

      itemStyle: {
        color: VENDOR_COLORS[vendor] || "#667085",
        borderRadius:
          chartType === "bar" ? [5, 5, 0, 0] : 0,
      },

      lineStyle: {
        width: 3,
        color: VENDOR_COLORS[vendor] || "#667085",
      },

      label: {
        show: true,
        position: "top",
        distance: 7,
        color: "#344054",
        fontSize: 10,
        fontWeight: 700,
        formatter: ({ value }) =>
          value == null ? "" : `${value}${suffix}`,
      },

      emphasis: {
        focus: "series",
      },
    })),
  };
}

export default function NPSBreakdown() {
  const [quarterFilter, setQuarterFilter] =
    useState("All");

  const activeQuarters =
    quarterFilter === "All"
      ? QUARTERS
      : [quarterFilter];

  const vendors = useMemo(
    () => [
      ...new Set(NPS_DATA.map((item) => item.vendor)),
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (quarterFilter === "All") {
      return NPS_DATA;
    }

    return NPS_DATA.filter(
      (item) => item.quarter === quarterFilter
    );
  }, [quarterFilter]);

  const summary = useMemo(() => {
    const totalResponses = filteredData.reduce(
      (total, item) => total + item.totalResponses,
      0
    );

    const promoters = filteredData.reduce(
      (total, item) => total + item.promoters,
      0
    );

    const passives = filteredData.reduce(
      (total, item) => total + item.passives,
      0
    );

    const detractors = filteredData.reduce(
      (total, item) => total + item.detractors,
      0
    );

    const npsScore = totalResponses
      ? ((promoters - detractors) / totalResponses) *
        100
      : 0;

    // Weighted CSAT because vendors have different
    // numbers of survey responses.
    const weightedCsat = totalResponses
      ? filteredData.reduce(
          (total, item) =>
            total +
            item.csatScore * item.totalResponses,
          0
        ) / totalResponses
      : 0;

    return {
      totalResponses,
      promoters,
      passives,
      detractors,
      npsScore: Number(npsScore.toFixed(1)),
      csatScore: Number(weightedCsat.toFixed(1)),
    };
  }, [filteredData]);

  const npsOption = useMemo(
    () =>
      createVendorOption({
        quarters: activeQuarters,
        vendors,
        field: "npsScore",
        min: 0,
        max: 100,
        chartType: "line",
      }),
    [quarterFilter, vendors]
  );

  const csatOption = useMemo(
    () =>
      createVendorOption({
        quarters: activeQuarters,
        vendors,
        field: "csatScore",
        suffix: "%",
        min: 0,
        max: 100,
        chartType: "bar",
      }),
    [quarterFilter, vendors]
  );

  const responseOption = useMemo(
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
      },

      legend: {
        show: true,
        orient: "horizontal",
        top: 0,
        left: "center",
        icon: "roundRect",
        itemWidth: 12,
        itemHeight: 8,
        itemGap: 18,
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
          fontWeight: 600,
        },
      },

      yAxis: {
        type: "value",
        name: "Responses",
        axisLabel: {
          color: "#667085",
        },
        splitLine: {
          lineStyle: {
            color: "#E9EDF3",
            type: "dashed",
          },
        },
      },

      series: [
        {
          name: "Promoters",
          type: "bar",
          stack: "responses",
          color: "#20B89A",
          data: activeQuarters.map((quarter) =>
            getQuarterTotal(quarter, "promoters")
          ),
        },
        {
          name: "Passives",
          type: "bar",
          stack: "responses",
          color: "#E6A23C",
          data: activeQuarters.map((quarter) =>
            getQuarterTotal(quarter, "passives")
          ),
        },
        {
          name: "Detractors",
          type: "bar",
          stack: "responses",
          color: "#DB7093",
          data: activeQuarters.map((quarter) =>
            getQuarterTotal(quarter, "detractors")
          ),
        },
      ].map((series) => ({
        ...series,

        itemStyle: {
          color: series.color,
          borderRadius:
            series.name === "Detractors"
              ? [4, 4, 0, 0]
              : 0,
        },

        label: {
          show: true,
          position: "inside",
          color: "#FFFFFF",
          fontSize: 10,
          fontWeight: 700,
          formatter: ({ value }) =>
            value > 0 ? value : "",
        },

        emphasis: {
          focus: "series",
        },
      })),
    }),
    [quarterFilter]
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
        aria-label="Select NPS quarter"
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
            aria-label={`Show ${filter} NPS and CSAT`}
            sx={{
              px: 2,
              border: "none",
              borderRadius: "8px !important",
              textTransform: "none",
              fontSize: 12,
              fontWeight: 600,

              "&.Mui-selected": {
                bgcolor: "#FFFFFF !important",
                color: "#993556",
                boxShadow: "0 0 0 1px #D0D5DD",
              },
            }}
          >
            {filter}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Summary cards */}
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
          label="Overall NPS"
          value={summary.npsScore}
          color="#0C447C"
          background="#E6F1FB"
        />

        <SummaryCard
          label="Average CSAT"
          value={`${summary.csatScore}%`}
          color="#534AB7"
          background="#EEEDFE"
        />

        <SummaryCard
          label="Total Responses"
          value={summary.totalResponses}
          color="#0F6E56"
          background="#E1F5EE"
        />

        <SummaryCard
          label="Promoters"
          value={summary.promoters}
          color="#854F0B"
          background="#FAEEDA"
        />
      </Box>

      {/* NPS and CSAT */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "repeat(2, minmax(0, 1fr))",
          },
          gap: 2,
          mb: 2,
        }}
      >
        <ChartCard
          title="NPS by quarter"
          subtitle="Vendor-wise Net Promoter Score"
          option={npsOption}
        />

        <ChartCard
          title="CSAT by quarter"
          subtitle="Vendor-wise customer satisfaction percentage"
          option={csatOption}
        />
      </Box>

      <ChartCard
        title="Customer response distribution"
        subtitle="Promoters, passives and detractors by quarter"
        option={responseOption}
      />
    </Box>
  );
}

function SummaryCard({
  label,
  value,
  color,
  background,
}) {
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
            xs: 20,
            md: 24,
          },
          fontWeight: 700,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value ?? "--"}
      </Typography>
    </Paper>
  );
}

function ChartCard({ title, subtitle, option }) {
  return (
    <Paper
      component="section"
      elevation={0}
      variant="outlined"
      sx={chartCardSx}
    >
      <Typography component="h2" sx={chartTitleSx}>
        {title}
      </Typography>

      <Typography sx={chartSubtitleSx}>
        {subtitle}
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
  );
}