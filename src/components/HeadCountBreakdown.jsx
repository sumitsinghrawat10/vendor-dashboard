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

const HEADCOUNT_DATA = [
  {
    vendor: "Amazon",
    quarter: "Q1",
    onshore: 10,
    offshore: 25,
  },
  {
    vendor: "Amazon",
    quarter: "Q2",
    onshore: 11,
    offshore: 27,
  },
  {
    vendor: "Amazon",
    quarter: "Q3",
    onshore: 12,
    offshore: 28,
  },
  {
    vendor: "Amazon",
    quarter: "Q4",
    onshore: 12,
    offshore: 30,
  },
  {
    vendor: "Microsoft",
    quarter: "Q1",
    onshore: 8,
    offshore: 35,
  },
  {
    vendor: "Microsoft",
    quarter: "Q2",
    onshore: 8,
    offshore: 33,
  },
  {
    vendor: "Microsoft",
    quarter: "Q3",
    onshore: 9,
    offshore: 34,
  },
  {
    vendor: "Microsoft",
    quarter: "Q4",
    onshore: 10,
    offshore: 36,
  },
  {
    vendor: "Google",
    quarter: "Q1",
    onshore: 3,
    offshore: 12,
  },
  {
    vendor: "Google",
    quarter: "Q2",
    onshore: 4,
    offshore: 12,
  },
  {
    vendor: "Google",
    quarter: "Q3",
    onshore: 4,
    offshore: 13,
  },
  {
    vendor: "Google",
    quarter: "Q4",
    onshore: 5,
    offshore: 14,
  },
];

const chartCardSx = {
  p: { xs: 2, md: 2.5 },
  minWidth: 0,
  borderRadius: "16px",
  borderColor: "#E4E7EC",
  bgcolor: "#FFFFFF",
};

function sumField(records, field) {
  return records.reduce(
    (total, item) => total + (Number(item[field]) || 0),
    0
  );
}

function getQuarterTotal(quarter, field) {
  return sumField(
    HEADCOUNT_DATA.filter(
      (record) => record.quarter === quarter
    ),
    field
  );
}

function getVendorTotal(vendor, quarter) {
  const record = HEADCOUNT_DATA.find(
    (item) =>
      item.vendor === vendor &&
      item.quarter === quarter
  );

  if (!record) {
    return null;
  }

  return record.onshore + record.offshore;
}

function createBarSeries({
  name,
  data,
  color,
  stack,
}) {
  return {
    name,
    type: "bar",
    stack,
    data,
    barMaxWidth: 44,

    itemStyle: {
      color,
      borderRadius: stack ? 0 : [5, 5, 0, 0],
    },

    emphasis: {
      focus: "series",
    },

    label: {
      show: true,
      position: stack ? "inside" : "top",
      distance: 6,
      color: stack ? "#FFFFFF" : "#344054",
      fontSize: 10,
      fontWeight: 700,
      formatter: ({ value }) =>
        value == null || value === 0 ? "" : value,
    },
  };
}

export default function HeadCountBreakdown() {
  const [quarterFilter, setQuarterFilter] =
    useState("All");

  const activeQuarters =
    quarterFilter === "All"
      ? QUARTERS
      : [quarterFilter];

  const filteredData = useMemo(() => {
    if (quarterFilter === "All") {
      return HEADCOUNT_DATA;
    }

    return HEADCOUNT_DATA.filter(
      (item) => item.quarter === quarterFilter
    );
  }, [quarterFilter]);

  const vendors = useMemo(
    () => [
      ...new Set(
        HEADCOUNT_DATA.map((item) => item.vendor)
      ),
    ],
    []
  );

  const summary = useMemo(() => {
    const onshore = sumField(filteredData, "onshore");
    const offshore = sumField(filteredData, "offshore");
    const total = onshore + offshore;

    return {
      onshore,
      offshore,
      total,
      onshorePercentage: total
        ? Number(((onshore / total) * 100).toFixed(1))
        : 0,
      offshorePercentage: total
        ? Number(((offshore / total) * 100).toFixed(1))
        : 0,
    };
  }, [filteredData]);

  const quarterlyOption = useMemo(
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
          fontWeight: 600,
        },
      },

      yAxis: {
        type: "value",
        name: "Headcount",
        minInterval: 1,
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
        createBarSeries({
          name: "Onshore",
          data: activeQuarters.map((quarter) =>
            getQuarterTotal(quarter, "onshore")
          ),
          color: "#9481DF",
        }),
        createBarSeries({
          name: "Offshore",
          data: activeQuarters.map((quarter) =>
            getQuarterTotal(quarter, "offshore")
          ),
          color: "#DB7093",
        }),
      ],
    }),
    [quarterFilter]
  );

  const vendorOption = useMemo(
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
        name: "Total headcount",
      
        minInterval: 1,
        axisLabel: {
          color: "#667085",
        },
         nameTextStyle: {
    color: "#667085",
    fontSize: 13,
    
    align: "left",
  },
        splitLine: {
          lineStyle: {
            color: "#E9EDF3",
            type: "dashed",
          },
        },
      },

      series: vendors.map((vendor) =>
        createBarSeries({
          name: vendor,
          data: activeQuarters.map((quarter) =>
            getVendorTotal(vendor, quarter)
          ),
          color: VENDOR_COLORS[vendor] || "#667085",
        })
      ),
    }),
    [quarterFilter, vendors]
  );

  const distributionOption = useMemo(
    () => ({
      animationDuration: 400,

      aria: {
        enabled: true,
      },

      tooltip: {
        trigger: "item",
        formatter: ({ marker, name, value, percent }) =>
          `${marker}${name}<br/>Headcount: ${value}<br/>Share: ${percent}%`,
      },

      legend: {
        show: true,
        orient: "horizontal",
        top: 0,
        left: "center",
        icon: "circle",
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 20,
        textStyle: {
          color: "#667085",
          fontSize: 11,
        },
      },

      series: [
        {
          name: "Workforce distribution",
          type: "pie",
          radius: ["45%", "70%"],
          center: ["50%", "58%"],

          itemStyle: {
            borderColor: "#FFFFFF",
            borderWidth: 3,
            borderRadius: 5,
          },

          label: {
            show: true,
            color: "#344054",
            fontSize: 11,
            fontWeight: 700,
            formatter: ({ name, value, percent }) =>
              `${name}\n${value} (${percent}%)`,
          },

          labelLine: {
            length: 12,
            length2: 8,
          },

          data: [
            {
              name: "Onshore",
              value: summary.onshore,
              itemStyle: {
                color: "#9481DF",
              },
            },
            {
              name: "Offshore",
              value: summary.offshore,
              itemStyle: {
                color: "#DB7093",
              },
            },
          ],
        },
      ],
    }),
    [summary]
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
        aria-label="Select headcount quarter"
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
            aria-label={`Show ${filter} headcount`}
            sx={{
              px: 2,
              border: "none",
              borderRadius: "8px !important",
              textTransform: "none",
              fontSize: 12,
              fontWeight: 600,

              "&.Mui-selected": {
                bgcolor: "#FFFFFF !important",
                color: "#315A85",
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
          label={
            quarterFilter === "All"
              ? "Quarterly Headcount Sum"
              : "Total Headcount"
          }
          value={summary.total}
          color="#315A85"
          background="#E2EFFA"
        />

        <SummaryCard
          label="Onshore"
          value={summary.onshore}
          sub={`${summary.onshorePercentage}% of total`}
          color="#493A80"
          background="#EAE7FA"
        />

        <SummaryCard
          label="Offshore"
          value={summary.offshore}
          sub={`${summary.offshorePercentage}% of total`}
          color="#8B2E4F"
          background="#F9E5EC"
        />

        <SummaryCard
          label="Vendors"
          value={vendors.length}
          sub={
            quarterFilter === "All"
              ? "Q1–Q4"
              : quarterFilter
          }
          color="#0F6E56"
          background="#E1F5EE"
        />
      </Box>

      {/* Main graphs */}
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
          title="Headcount by quarter"
          subtitle="Onshore vs offshore workforce"
          option={quarterlyOption}
        />

        <ChartCard
          title="Headcount by vendor"
          subtitle="Total onshore and offshore workforce"
          option={vendorOption}
        />
      </Box>

      <Paper
        component="section"
        elevation={0}
        variant="outlined"
        sx={{
          ...chartCardSx,
          maxWidth: {
            xs: "100%",
            lg: "calc(50% - 8px)",
          },
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
          Workforce distribution
        </Typography>

        <Typography
          sx={{
            mt: 0.35,
            mb: 1,
            fontSize: 12,
            color: "text.secondary",
          }}
        >
          Onshore and offshore headcount share
        </Typography>

        <ReactECharts
          option={distributionOption}
          notMerge
          lazyUpdate
          style={{
            width: "100%",
            height: 320,
          }}
        />
      </Paper>
    </Box>
  );
}

function SummaryCard({
  label,
  value,
  sub,
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

      {sub && (
        <Typography
          sx={{
            mt: 0.25,
            fontSize: 11,
            opacity: 0.75,
          }}
        >
          {sub}
        </Typography>
      )}
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
      <Typography
        component="h2"
        sx={{
          fontSize: 14,
          fontWeight: 700,
          color: "#101828",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          mt: 0.35,
          mb: 1,
          fontSize: 12,
          color: "text.secondary",
        }}
      >
        {subtitle}
      </Typography>

      <ReactECharts
        option={option}
        notMerge
        lazyUpdate
        style={{
          width: "100%",
          height: 320,
        }}
      />
    </Paper>
  );
}