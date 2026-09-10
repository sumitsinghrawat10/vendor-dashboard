
export const KPIS = [
  {
    key: "revenue",
      label: "Total Revenue Achieved (FY27) ",
    value: "30%",
    sub: "Across all selected vendors",
    change: "+12.5% vs previous quarter",
    color: "#08634F",
    bg: "#DDF4EC",
  },
  {
    key: "pipeline",
    label: "Pipeline",
    value: "12",
    sub: "Total projects",
    change: "5 running · 4 pending · 3 completed",
    color: "#3F3A8A",
    bg: "#E9E7FA",
  },
  // {
  //   key: "g2m",
  //   label: "Gross Margin",
  //   value: "34.6%",
  //   sub: "Overall weighted margin",
  //   change: "+2.4% vs previous quarter",
  //   color: "#854F0B",
  //   bg: "#FAEEDA",
  //   status: "Good",
  //   dots: [
  //     {
  //       label: "Good",
  //       color: "#16803C",
  //     },
  //     {
  //       label: "Warning",
  //       color: "#E89A00",
  //     },
  //     {
  //       label: "Critical",
  //       color: "#C93C3C",
  //     },
  //   ],
  // },
  {
    key: "headCount",
    label: "Head Count",
    value: "126",
    sub: "Total active resources",
    change: "34 onshore · 92 offshore",
    color: "#315A85",
    bg: "#E2EFFA",
  },
  {
    key: "csat",
    label: "CSAT/NPS",
    value: "4.5 / 87%",
    sub: "Overall customer satisfaction",
    change: "1,260 customer responses",
    color: "#8B2E4F",
    bg: "#F9E5EC",
  },
];
//   {
//     key: "revenue",
//     label: "Total Revenue",
//     value: "$3M",
//     sub: "To market · 30% to IP",
//     color: "#08634F",
//     bg: "#DDF4EC",
//   },
//   {
//     key: "pipeline",
//     label: "Pipeline",
//     value: "30%",
//     sub: "100 + 140 + 30 · ~10% close rate",
//     color: "#3F3A8A",
//     bg: "#E9E7FA",
//   },
//   {
//     key: "g2m",
//     label: "Gross Margin",
//     value: "--",
//     sub: "Green / orange / red split",
//     color: "#854F0B",
//     bg: "#FAEEDA",
//     dots: ["#16803C", "#E89A00", "#C93C3C"],
//   },
//   {
//     key: "headCount",
//     label: "Head Count",
//     value: 89,
//     sub: "Total active resources",
//     color: "#315A85",
//     bg: "#E2EFFA",
//   },
//   {
//     key: "csat",
//     label: "NPS / CSAT",
//     value: "--",
//     sub: "Actual score pending",
//     color: "#8B2E4F",
//     bg: "#F9E5EC",
//   },
// ];

export const PIPELINE_STAGES = ["New", "Mining", "Closing"];
export const PIPELINE_VALUES = [1.0, 1.4, 0.3];

export const REVENUE_QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
export const REVENUE_VALUES = [2.1, 2.6, 3.1, 3.6];

export const SOLUTION_STAGES = [
  { name: "New", pct: 70, count: 7, color: "#7F77DD" },
  { name: "Older", pct: 40, count: 4, color: "#B4B2A9" },
  { name: "Prototype", pct: 55, count: 5, color: "#5DCAA5" },
  { name: "MVP / beta", pct: 30, count: 3, color: "#F0997B" },
  { name: "Experimental", pct: 20, count: 2, color: "#ED93B1" },
];

export const VENDOR_DETAIL = {
  name: "Vendor A",
  revenue: "$3.2M",
  pipelineStage: "Mining",
  g2m: "Green",
  csat: "-- (pending)",
  solutionStage: "MVP / beta",
};

export const FILTERS = ["Actual", "New", "Mining"];
