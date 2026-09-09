import { useMemo, useState } from "react";
import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ReactECharts from "echarts-for-react";

import {
  CHART_COLORS,
  QUARTERS,
  getCompetitorPresence,
  getHeadcountByQuarter,
  getManualHoursByQuarter,
  getRevenueByQuarter,
  getRevenueVsTarget,
} from "../data/revenueData.js";

const FILTERS = ["All", ...QUARTERS];

const cardSx = {
  p: 2.5,
  minWidth: 0,
  borderRadius: "14px",
  border: "1px solid #e5e4df",
  bgcolor: "#fff",
};

const titleSx = {
  mb: 1.5,
  fontSize: 14,
  fontWeight: 700,
  color: "text.secondary",
};

function formatCurrency(value) {
  const number = Number(value) || 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}

function formatFullCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(
    Number(value) || 0
  );
}

function createBarOption({
  quarters,
  series,
  valueType = "number",
  yAxisName,
  hideLegend = false,
}) {
  const formatValue =
    valueType === "currency"
      ? formatCurrency
      : formatNumber;

  const formatTooltip =
    valueType === "currency"
      ? formatFullCurrency
      : formatNumber;

  return {
    animationDuration: 400,

    color: series.map((item) => item.color),

    aria: {
      enabled: true,
    },

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      valueFormatter: (value) =>
        valueType === "currency"
          ? formatFullCurrency(value)
          : `${formatNumber(value)}${
              valueType === "hours" ? " hrs" : ""
            }`,
    },

    legend: {
      show: !hideLegend,
      type: "scroll",
      top: 0,
      right: 0,
      icon: "roundRect",
      itemWidth: 12,
      itemHeight: 8,
      textStyle: {
        color: "#667085",
        fontSize: 11,
      },
    },

    grid: {
      top: hideLegend ? 30 : 55,
      left: 14,
      right: 14,
      bottom: 10,
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
        fontSize: 11,
      },
    },

    yAxis: {
      type: "value",
      name: yAxisName,
      nameLocation: "end",
      nameTextStyle: {
        color: "#667085",
        fontSize: 11,
        padding: [0, 0, 4, 0],
      },
      axisLabel: {
        color: "#667085",
        fontSize: 11,
        formatter: formatValue,
      },
      splitLine: {
        lineStyle: {
          color: "#E9EDF3",
          type: "dashed",
        },
      },
    },

    series: series.map((item) => ({
      name: item.name,
      type: "bar",
      data: item.data,
      barMaxWidth: 44,

      itemStyle: {
        color: item.color,
        borderRadius: [5, 5, 0, 0],
      },

      emphasis: {
        focus: "series",
      },

      label: {
        show: true,
        position: "top",
        distance: 6,
        color: "#344054",
        fontSize: 10,
        fontWeight: 600,

        formatter: ({ value }) => {
          if (value == null) return "";

          if (valueType === "currency") {
            return formatCurrency(value);
          }

          if (valueType === "hours") {
            return `${formatNumber(value)}h`;
          }

          return formatNumber(value);
        },
      },
    })),
  };
}

export default function RevenueBreakdown() {
  const [quarterFilter, setQuarterFilter] =
    useState("All");

  const activeQuarters =
    quarterFilter === "All"
      ? QUARTERS
      : [quarterFilter];

  const revenueByQuarter = useMemo(
    () => getRevenueByQuarter(activeQuarters),
    [quarterFilter]
  );

  const revenueVsTarget = useMemo(
    () => getRevenueVsTarget(activeQuarters),
    [quarterFilter]
  );

  const headcount = useMemo(
    () => getHeadcountByQuarter(activeQuarters),
    [quarterFilter]
  );

  const manualHours = useMemo(
    () => getManualHoursByQuarter(activeQuarters),
    [quarterFilter]
  );

  const competitors = useMemo(
    () => getCompetitorPresence(activeQuarters),
    [quarterFilter]
  );

  const revenueOption = useMemo(
    () =>
      createBarOption({
        quarters: activeQuarters,
        valueType: "currency",
        yAxisName: "Revenue",
        series: revenueByQuarter.map((vendor) => ({
          name: vendor.vendor,
          data: vendor.data,
          color: vendor.color,
        })),
      }),
    [revenueByQuarter, quarterFilter]
  );

  const revenueTargetOption = useMemo(
    () =>
      createBarOption({
        quarters: activeQuarters,
        valueType: "currency",
        yAxisName: "Amount",
        series: [
          {
            name: "Revenue",
            data: revenueVsTarget.actual,
            color: CHART_COLORS.actual,
          },
          {
            name: "Target",
            data: revenueVsTarget.target,
            color: CHART_COLORS.target,
          },
        ],
      }),
    [revenueVsTarget, quarterFilter]
  );

  const headcountOption = useMemo(
    () =>
      createBarOption({
        quarters: activeQuarters,
        valueType: "number",
        yAxisName: "Employees",
        series: [
          {
            name: "Onshore",
            data: headcount.onshore,
            color: CHART_COLORS.onshore,
          },
          {
            name: "Offshore",
            data: headcount.offshore,
            color: CHART_COLORS.offshore,
          },
        ],
      }),
    [headcount, quarterFilter]
  );

  const manualHoursOption = useMemo(
    () =>
      createBarOption({
        quarters: activeQuarters,
        valueType: "hours",
        yAxisName: "Hours",
        hideLegend: true,
        series: [
          {
            name: "Hours saved",
            data: manualHours,
            color: CHART_COLORS.hours,
          },
        ],
      }),
    [manualHours, quarterFilter]
  );

const competitorOption = useMemo(
  () => ({
    animationDuration: 400,

    aria: {
      enabled: true,
    },

    tooltip: {
      trigger: "item",
      formatter: ({ marker, name, value, percent }) =>
        `${marker}${name}<br/>Presence: ${value}<br/>Share: ${percent}%`,
    },

    legend: {
      show: true,
      type: "scroll",
      orient: "horizontal",

      // Legend position
      top: 5,
      left: "center",
      right: 10,

      icon: "circle",
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 18,

      pageIconSize: 11,
      pageTextStyle: {
        color: "#667085",
        fontSize: 10,
      },

      textStyle: {
        color: "#667085",
        fontSize: 11,
      },
    },

    series: [
      {
        name: "Competitor presence",
        type: "pie",

        // Space added above the pie for the legend.
        radius: ["40%", "65%"],
        center: ["50%", "58%"],

        avoidLabelOverlap: true,
        padAngle: 2,

        itemStyle: {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: 2,
        },

        label: {
          show: true,
          color: "#344054",
          fontSize: 11,
          fontWeight: 600,
          formatter: ({ name, value, percent }) =>
            `${name}\n${value} (${percent}%)`,
        },

        labelLine: {
          show: true,
          length: 10,
          length2: 8,
        },

        emphasis: {
          scale: true,
          scaleSize: 6,

          label: {
            show: true,
            fontWeight: 700,
          },
        },

        data: competitors.labels.map((label, index) => ({
          name: label,
          value: competitors.values[index],

          itemStyle: {
            color: competitors.colors[index],
          },
        })),
      },
    ],
  }),
  [competitors]
);

  const chartProps = {
    notMerge: true,
    lazyUpdate: true,
    opts: {
      renderer: "canvas",
    },
    style: {
      width: "100%",
      height: 280,
    },
  };

  return (
    <Box>
      <ToggleButtonGroup
        size="small"
        value={quarterFilter}
        exclusive
        onChange={(_, value) => {
          if (value) {
            setQuarterFilter(value);
          }
        }}
        aria-label="Select quarter"
        sx={{
          mb: 2.5,
          p: 0.5,
          // maxWidth: "100%",
          overflowX: "auto",
          bgcolor: "#efeee9",
          borderRadius: "10px",
        }}
      >
        {FILTERS.map((filter) => (
          <ToggleButton
            key={filter}
            value={filter}
            aria-label={`Show ${filter} data`}
            sx={{
              px: 2,
              border: "none",
              borderRadius: "8px !important",
              textTransform: "none",
              fontSize: 12,
              fontWeight: 600,

              "&.Mui-selected": {
                bgcolor: "#fff !important",
                boxShadow: "0 0 0 1px #e5e4df",
              },
            }}
          >
            {filter}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Revenue charts */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
          },
          gap: 1.75,
          mb: 1.75,
        }}
      >
        <Paper elevation={0} sx={cardSx}>
          <Typography sx={titleSx}>
            Revenue by quarter
          </Typography>

          <ReactECharts
            option={revenueOption}
            {...chartProps}
          />
        </Paper>

        <Paper elevation={0} sx={cardSx}>
          <Typography sx={titleSx}>
            Revenue vs target
          </Typography>

          <ReactECharts
            option={revenueTargetOption}
            {...chartProps}
          />
        </Paper>
      </Box>

      {/* Headcount and hours */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
          },
          gap: 1.75,
          mb: 1.75,
        }}
      >
        <Paper elevation={0} sx={cardSx}>
          <Typography sx={titleSx}>
            Headcount (onshore vs offshore)
          </Typography>

          <ReactECharts
            option={headcountOption}
            {...chartProps}
          />
        </Paper>

        <Paper elevation={0} sx={cardSx}>
          <Typography sx={titleSx}>
            Manual hours saved
          </Typography>

          <ReactECharts
            option={manualHoursOption}
            {...chartProps}
          />
        </Paper>
      </Box>

      {/* Competitors */}
      <Paper
        elevation={0}
        sx={{
          ...cardSx,
          maxWidth: {
            xs: "100%",
            md: "calc(50% - 7px)",
          },
        }}
      >
        <Typography sx={titleSx}>
          Competitor presence
        </Typography>

        {competitors.labels.length ? (
          <ReactECharts
            option={competitorOption}
            {...chartProps}
          />
        ) : (
          <Box
            sx={{
              height: 260,
              display: "grid",
              placeItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              No competitor data for this quarter.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}