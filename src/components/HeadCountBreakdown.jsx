import { useMemo, useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
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

const ROLE_COLORS = [
  "#2563EB",
  "#7C3AED",
  "#0EA5E9",
  "#F59E0B",
  "#10B981",
  "#EC4899",
  "#6366F1",
  "#14B8A6",
  "#F97316",
];

// Keep these labels unchanged. Only the filtered counts are calculated.
const AI_ROLES = [
  "AI Engineer",
  "Backend Python Developer",
  "Data Engineer",
  "DevOps Engineer",
  "Front End Developer",
  "Full Stack AI Systems Engineer",
  "Full Stack Developer",
  "Junior Developer",
  "Senior Data Engineer",
];

const HEADCOUNT_DATA = [
  { vendor: "Amazon", quarter: "Q1", onshore: 10, offshore: 25 },
  { vendor: "Amazon", quarter: "Q2", onshore: 11, offshore: 27 },
  { vendor: "Amazon", quarter: "Q3", onshore: 12, offshore: 28 },
  { vendor: "Amazon", quarter: "Q4", onshore: 12, offshore: 30 },
  { vendor: "Microsoft", quarter: "Q1", onshore: 8, offshore: 35 },
  { vendor: "Microsoft", quarter: "Q2", onshore: 8, offshore: 33 },
  { vendor: "Microsoft", quarter: "Q3", onshore: 9, offshore: 34 },
  { vendor: "Microsoft", quarter: "Q4", onshore: 10, offshore: 36 },
  { vendor: "Google", quarter: "Q1", onshore: 3, offshore: 12 },
  { vendor: "Google", quarter: "Q2", onshore: 4, offshore: 12 },
  { vendor: "Google", quarter: "Q3", onshore: 4, offshore: 13 },
  { vendor: "Google", quarter: "Q4", onshore: 5, offshore: 14 },
];

// Q1 totals across all vendors match the supplied values: 3,1,1,1,2,1,1,1,1.
// Replace these sample records with API data when the backend field is ready.
const AI_UTILIZATION_DATA = [
  { vendor: "Amazon", quarter: "Q1", counts: [1, 1, 0, 0, 1, 1, 0, 0, 0] },
  { vendor: "Microsoft", quarter: "Q1", counts: [1, 0, 1, 1, 1, 0, 1, 0, 1] },
  { vendor: "Google", quarter: "Q1", counts: [1, 0, 0, 0, 0, 0, 0, 1, 0] },
  { vendor: "Amazon", quarter: "Q2", counts: [2, 1, 1, 0, 1, 1, 1, 0, 0] },
  { vendor: "Microsoft", quarter: "Q2", counts: [1, 0, 1, 1, 1, 1, 1, 0, 1] },
  { vendor: "Google", quarter: "Q2", counts: [1, 0, 0, 0, 1, 0, 0, 1, 0] },
  { vendor: "Amazon", quarter: "Q3", counts: [2, 1, 1, 1, 1, 1, 1, 1, 0] },
  { vendor: "Microsoft", quarter: "Q3", counts: [2, 1, 1, 1, 1, 1, 1, 0, 1] },
  { vendor: "Google", quarter: "Q3", counts: [1, 0, 1, 0, 1, 0, 0, 1, 0] },
  { vendor: "Amazon", quarter: "Q4", counts: [3, 1, 1, 1, 2, 1, 1, 1, 1] },
  { vendor: "Microsoft", quarter: "Q4", counts: [2, 1, 2, 1, 1, 1, 1, 1, 1] },
  { vendor: "Google", quarter: "Q4", counts: [1, 0, 1, 0, 1, 0, 1, 1, 0] },
];

const chartCardSx = {
  p: { xs: 2, md: 2.5 },
  minWidth: 0,
  borderRadius: "16px",
  borderColor: "#E4E7EC",
  bgcolor: "#FFFFFF",
};

const sumField = (records, field) =>
  records.reduce((total, item) => total + (Number(item[field]) || 0), 0);

function createBarSeries({ name, data, color }) {
  return {
    name,
    type: "bar",
    data,
    barMaxWidth: 44,
    itemStyle: { color, borderRadius: [5, 5, 0, 0] },
    emphasis: { focus: "series" },
    label: {
      show: true,
      position: "top",
      color: "#344054",
      fontSize: 10,
      fontWeight: 700,
      formatter: ({ value }) => (value ? value : ""),
    },
  };
}

const commonLegend = {
  show: true,
  type: "scroll",
  orient: "horizontal",
  top: 0,
  left: "center",
  icon: "roundRect",
  itemWidth: 12,
  itemHeight: 8,
  itemGap: 18,
  textStyle: { color: "#667085", fontSize: 11 },
};

const commonGrid = {
  top: 55,
  left: 20,
  right: 20,
  bottom: 15,
  containLabel: true,
};

export default function HeadCountBreakdown() {
  const allVendors = useMemo(
    () => [...new Set(HEADCOUNT_DATA.map((item) => item.vendor))],
    []
  );
  const [quarterFilter, setQuarterFilter] = useState("All");
  // An empty selection means "All vendors". This lets the initial screen
  // show all data without checking every vendor in the dropdown.
  const [selectedVendors, setSelectedVendors] = useState([]);

  const effectiveVendors =
    selectedVendors.length > 0 ? selectedVendors : allVendors;

  const activeQuarters = quarterFilter === "All" ? QUARTERS : [quarterFilter];

  const filteredData = useMemo(
    () =>
      HEADCOUNT_DATA.filter(
        (item) =>
          activeQuarters.includes(item.quarter) &&
          effectiveVendors.includes(item.vendor)
      ),
    [activeQuarters, effectiveVendors]
  );

  const aiRoleTotals = useMemo(() => {
    const totals = Array(AI_ROLES.length).fill(0);
    AI_UTILIZATION_DATA.filter(
      (item) =>
        activeQuarters.includes(item.quarter) &&
        effectiveVendors.includes(item.vendor)
    ).forEach((item) => {
      item.counts.forEach((count, index) => {
        totals[index] += Number(count) || 0;
      });
    });
    return totals;
  }, [activeQuarters, effectiveVendors]);

  const summary = useMemo(() => {
    const onshore = sumField(filteredData, "onshore");
    const offshore = sumField(filteredData, "offshore");
    const total = onshore + offshore;
    return {
      onshore,
      offshore,
      total,
      aiUtilized: aiRoleTotals.reduce((sum, count) => sum + count, 0),
      onshorePercentage: total ? Number(((onshore / total) * 100).toFixed(1)) : 0,
      offshorePercentage: total ? Number(((offshore / total) * 100).toFixed(1)) : 0,
    };
  }, [filteredData, aiRoleTotals]);

  const getQuarterTotal = (quarter, field) =>
    sumField(filteredData.filter((item) => item.quarter === quarter), field);

  const getVendorTotal = (vendor, quarter) => {
    const record = filteredData.find(
      (item) => item.vendor === vendor && item.quarter === quarter
    );
    return record ? record.onshore + record.offshore : 0;
  };

  const quarterlyOption = useMemo(
    () => ({
      animationDuration: 400,
      aria: { enabled: true },
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      legend: commonLegend,
      grid: commonGrid,
      xAxis: {
        type: "category",
        data: activeQuarters,
        axisTick: { show: false },
        axisLine: { lineStyle: { color: "#D9DEE7" } },
        axisLabel: { color: "#667085", fontWeight: 600 },
      },
      yAxis: {
        type: "value",
        name: "Headcount",
        minInterval: 1,
        axisLabel: { color: "#667085" },
        splitLine: { lineStyle: { color: "#E9EDF3", type: "dashed" } },
      },
      series: [
        createBarSeries({
          name: "Onshore",
          data: activeQuarters.map((quarter) => getQuarterTotal(quarter, "onshore")),
          color: "#9481DF",
        }),
        createBarSeries({
          name: "Offshore",
          data: activeQuarters.map((quarter) => getQuarterTotal(quarter, "offshore")),
          color: "#DB7093",
        }),
      ],
    }),
    [activeQuarters, filteredData]
  );

  const vendorOption = useMemo(
    () => ({
      animationDuration: 400,
      aria: { enabled: true },
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      legend: commonLegend,
      grid: commonGrid,
      xAxis: {
        type: "category",
        data: activeQuarters,
        axisTick: { show: false },
        axisLine: { lineStyle: { color: "#D9DEE7" } },
        axisLabel: { color: "#667085", fontWeight: 600 },
      },
      yAxis: {
        type: "value",
        name: "Total headcount",
        minInterval: 1,
        axisLabel: { color: "#667085" },
        splitLine: { lineStyle: { color: "#E9EDF3", type: "dashed" } },
      },
      series: effectiveVendors.map((vendor) =>
        createBarSeries({
          name: vendor,
          data: activeQuarters.map((quarter) => getVendorTotal(vendor, quarter)),
          color: VENDOR_COLORS[vendor] || "#667085",
        })
      ),
    }),
    [activeQuarters, filteredData, effectiveVendors]
  );

  const distributionOption = useMemo(
    () => ({
      animationDuration: 400,
      aria: { enabled: true },
      tooltip: {
        trigger: "item",
        formatter: ({ marker, name, value, percent }) =>
          `${marker}${name}<br/>Headcount: ${value}<br/>Share: ${percent}%`,
      },
      legend: { ...commonLegend, icon: "circle" },
      series: [
        {
          name: "Workforce distribution",
          type: "pie",
          radius: ["45%", "70%"],
          center: ["50%", "58%"],
          itemStyle: { borderColor: "#FFFFFF", borderWidth: 3, borderRadius: 5 },
          label: {
            show: true,
            color: "#344054",
            fontSize: 11,
            fontWeight: 700,
            formatter: ({ name, value, percent }) => `${name}\n${value} (${percent}%)`,
          },
          data: [
            { name: "Onshore", value: summary.onshore, itemStyle: { color: "#9481DF" } },
            { name: "Offshore", value: summary.offshore, itemStyle: { color: "#DB7093" } },
          ],
        },
      ],
    }),
    [summary]
  );

  const aiUtilizationOption = useMemo(
    () => ({
      animationDuration: 400,
      aria: { enabled: true },
      tooltip: {
        trigger: "item",
        formatter: ({ marker, name, value, percent }) =>
          `${marker}${name}<br/>Headcount: ${value}<br/>Share: ${percent}%`,
      },
      legend: {
        type: "scroll",
        orient: "horizontal",
        top: 0,
        left: "center",
        icon: "circle",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { color: "#667085", fontSize: 10 },
      },
      series: [
        {
          name: "AI utilization",
          type: "pie",
          radius: ["42%", "68%"],
          center: ["50%", "60%"],
          minAngle: 3,
          itemStyle: { borderColor: "#FFFFFF", borderWidth: 2, borderRadius: 4 },
          label: {
            show: true,
            color: "#344054",
            fontSize: 10,
            fontWeight: 600,
            formatter: ({ value }) => (value ? value : ""),
          },
          data: AI_ROLES.map((name, index) => ({
            name,
            value: aiRoleTotals[index],
            itemStyle: { color: ROLE_COLORS[index] },
          })).filter((item) => item.value > 0),
        },
      ],
      graphic:
        summary.aiUtilized === 0
          ? [{ type: "text", left: "center", top: "middle", style: { text: "No data", fill: "#667085", fontSize: 13 } }]
          : [],
    }),
    [aiRoleTotals, summary.aiUtilized]
  );

  const handleVendorChange = (event) => {
    const value =
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value;

    if (value.includes("all")) {
      setSelectedVendors([]);
      return;
    }

    setSelectedVendors(value);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
          mb: 2.5,
        }}
      >
        <ToggleButtonGroup
          size="small"
          value={quarterFilter}
          exclusive
          onChange={(_, value) => value && setQuarterFilter(value)}
          aria-label="Select headcount quarter"
          sx={{ p: 0.5, overflowX: "auto", bgcolor: "#EFEEE9", borderRadius: "10px" }}
        >
          {FILTERS.map((filter) => (
            <ToggleButton
              key={filter}
              value={filter}
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

        <FormControl size="small" sx={{ width: { xs: "100%", sm: 280 } }}>
          <InputLabel id="vendor-filter-label">Vendors</InputLabel>
          <Select
            labelId="vendor-filter-label"
            multiple
            displayEmpty
            value={selectedVendors}
            onChange={handleVendorChange}
            input={<OutlinedInput label="Vendors" />}
            renderValue={(selected) =>
              selected.length === 0
                ? `All vendors (${allVendors.length})`
                : selected.length === 1
                  ? selected[0]
                  : `${selected.length} vendors selected`
            }
          >
            <MenuItem value="all">
              <Checkbox checked={selectedVendors.length === 0} />
              <ListItemText
                primary="All vendors"
                secondary="Show combined data"
              />
            </MenuItem>
            {allVendors.map((vendor) => (
              <MenuItem key={vendor} value={vendor}>
                <Checkbox checked={selectedVendors.includes(vendor)} />
                <ListItemText primary={vendor} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(5, minmax(0, 1fr))" }, gap: 1.5, mb: 2 }}>
        <SummaryCard label={quarterFilter === "All" ? "Quarterly Headcount Sum" : "Total Headcount"} value={summary.total} color="#315A85" background="#E2EFFA" />
        <SummaryCard label="Onshore" value={summary.onshore} sub={`${summary.onshorePercentage}% of total`} color="#493A80" background="#EAE7FA" />
        <SummaryCard label="Offshore" value={summary.offshore} sub={`${summary.offshorePercentage}% of total`} color="#8B2E4F" background="#F9E5EC" />
        <SummaryCard label="AI-utilized" value={summary.aiUtilized} sub="Across selected scope" color="#1D4ED8" background="#E8F0FE" />
        <SummaryCard label="Vendors" value={effectiveVendors.length} sub={selectedVendors.length === 0 ? "All vendors" : quarterFilter === "All" ? "Q1–Q4" : quarterFilter} color="#0F6E56" background="#E1F5EE" />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(2, minmax(0, 1fr))" }, gap: 2 }}>
        <ChartCard title="Headcount by quarter" subtitle="Onshore vs offshore workforce" option={quarterlyOption} />
        <ChartCard title="Headcount by vendor" subtitle="Total onshore and offshore workforce" option={vendorOption} />
        <ChartCard title="Workforce distribution" subtitle="Onshore and offshore headcount share" option={distributionOption} />
        <ChartCard title="Headcount by AI Utilization" subtitle="Role distribution for the selected quarter and vendors" option={aiUtilizationOption} />
      </Box>
    </Box>
  );
}

function SummaryCard({ label, value, sub, color, background }) {
  return (
    <Paper elevation={0} sx={{ p: 2, minWidth: 0, borderRadius: "14px", bgcolor: background, color }}>
      <Typography sx={{ fontSize: 12, fontWeight: 600, opacity: 0.8 }}>{label}</Typography>
      <Typography sx={{ mt: 0.5, fontSize: { xs: 20, md: 24 }, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{value ?? "--"}</Typography>
      {sub && <Typography sx={{ mt: 0.25, fontSize: 11, opacity: 0.75 }}>{sub}</Typography>}
    </Paper>
  );
}

function ChartCard({ title, subtitle, option }) {
  return (
    <Paper component="section" elevation={0} variant="outlined" sx={chartCardSx}>
      <Typography component="h2" sx={{ fontSize: 14, fontWeight: 700, color: "#101828" }}>{title}</Typography>
      <Typography sx={{ mt: 0.35, mb: 1, fontSize: 12, color: "text.secondary" }}>{subtitle}</Typography>
      <ReactECharts option={option} notMerge lazyUpdate style={{ width: "100%", height: 340 }} />
    </Paper>
  );
}
