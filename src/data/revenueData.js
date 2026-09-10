// // Static vendor performance data, quarter by quarter.
// export const VENDOR_QUARTER_DATA = [
//   { vendor: "Amazon", quarter: "Q1", revenue: 544663, revenueTarget: 600000, pipeline: 150000, billableUtil: 85, nonBillableUtil: 15, headcountOnshore: 10, headcountOffshore: 25, aiAdoption: 65, manualHoursSaved: 120, solution: "AI Research Tool", competitor: "Microsoft" },
//   { vendor: "Amazon", quarter: "Q2", revenue: 624571, revenueTarget: 650000, pipeline: 180000, billableUtil: 90, nonBillableUtil: 10, headcountOnshore: 11, headcountOffshore: 27, aiAdoption: 72, manualHoursSaved: 150, solution: "Synthetic Data", competitor: "Google" },
//   { vendor: "Amazon", quarter: "Q3", revenue: 530749, revenueTarget: 620000, pipeline: 210000, billableUtil: 87, nonBillableUtil: 13, headcountOnshore: 12, headcountOffshore: 28, aiAdoption: 78, manualHoursSaved: 185, solution: "QuickSuite", competitor: "Microsoft" },
//   { vendor: "Amazon", quarter: "Q4", revenue: 211292, revenueTarget: 400000, pipeline: 240000, billableUtil: 82, nonBillableUtil: 18, headcountOnshore: 12, headcountOffshore: 30, aiAdoption: 81, manualHoursSaved: 220, solution: "AI Analyst", competitor: "Google" },

//   { vendor: "Microsoft", quarter: "Q1", revenue: 1681731, revenueTarget: 1700000, pipeline: 350000, billableUtil: 84.58, nonBillableUtil: 15.42, headcountOnshore: 8, headcountOffshore: 35, aiAdoption: 78, manualHoursSaved: 210, solution: "AI Copilot", competitor: "Amazon" },
//   { vendor: "Microsoft", quarter: "Q2", revenue: 1234864, revenueTarget: 1400000, pipeline: 420000, billableUtil: 91.65, nonBillableUtil: 8.35, headcountOnshore: 8, headcountOffshore: 33, aiAdoption: 82, manualHoursSaved: 250, solution: "Azure AI Search", competitor: "Google" },
//   { vendor: "Microsoft", quarter: "Q3", revenue: 1143260, revenueTarget: 1300000, pipeline: 390000, billableUtil: 88.2, nonBillableUtil: 11.8, headcountOnshore: 9, headcountOffshore: 34, aiAdoption: 86, manualHoursSaved: 290, solution: "Copilot Studio", competitor: "Amazon" },
//   { vendor: "Microsoft", quarter: "Q4", revenue: 1098260, revenueTarget: 1250000, pipeline: 460000, billableUtil: 89.5, nonBillableUtil: 10.5, headcountOnshore: 10, headcountOffshore: 36, aiAdoption: 90, manualHoursSaved: 340, solution: "AI Foundry", competitor: "Google" },

//   { vendor: "Google", quarter: "Q1", revenue: 21750, revenueTarget: 30000, pipeline: 15000, billableUtil: 75, nonBillableUtil: 25, headcountOnshore: 3, headcountOffshore: 12, aiAdoption: 55, manualHoursSaved: 45, solution: "AI Analyst", competitor: "Microsoft" },
//   { vendor: "Google", quarter: "Q2", revenue: 31776, revenueTarget: 35000, pipeline: 18000, billableUtil: 80, nonBillableUtil: 20, headcountOnshore: 4, headcountOffshore: 12, aiAdoption: 62, manualHoursSaved: 60, solution: "Gemini Research", competitor: "Amazon" },
//   { vendor: "Google", quarter: "Q3", revenue: 1475, revenueTarget: 25000, pipeline: 22000, billableUtil: 68, nonBillableUtil: 32, headcountOnshore: 4, headcountOffshore: 13, aiAdoption: 70, manualHoursSaved: 75, solution: "Foresight", competitor: "Microsoft" },
//   { vendor: "Google", quarter: "Q4", revenue: 0, revenueTarget: 20000, pipeline: 28000, billableUtil: 65, nonBillableUtil: 35, headcountOnshore: 5, headcountOffshore: 14, aiAdoption: 75, manualHoursSaved: 90, solution: "Gemini Assistant", competitor: "Amazon" },
// ];

// export const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
// export const VENDORS = ["Amazon", "Microsoft", "Google"];

// // A single cohesive palette for all charts on this page — distinct from
// // the KPI tile background colors so charts read cleanly on a white card.
// export const CHART_COLORS = {
//   Amazon: "#E8985B",     // warm amber
//   Microsoft: "#3E7CB1",  // slate blue
//   Google: "#4FA97F",     // muted green
//   actual: "#2F6F5E",     // deep teal
//   target: "#C7C2B8",     // warm gray
//   onshore: "#3E7CB1",    // slate blue
//   offshore: "#B7594B",   // brick red
//   hours: "#7C6FB0",      // muted purple
// };

// const COMPETITOR_PALETTE = ["#E8985B", "#3E7CB1", "#4FA97F", "#B7594B", "#7C6FB0"];

// function rowsForQuarters(quarters) {
//   return VENDOR_QUARTER_DATA.filter((r) => quarters.includes(r.quarter));
// }

// // Revenue by quarter, one series per vendor.
// export function getRevenueByQuarter(quarters = QUARTERS) {
//   return VENDORS.map((vendor) => ({
//     vendor,
//     color: CHART_COLORS[vendor],
//     data: quarters.map(
//       (q) => VENDOR_QUARTER_DATA.find((r) => r.vendor === vendor && r.quarter === q)?.revenue ?? 0
//     ),
//   }));
// }

// // Revenue vs target, summed across all vendors per quarter.
// export function getRevenueVsTarget(quarters = QUARTERS) {
//   const actual = quarters.map((q) =>
//     VENDOR_QUARTER_DATA.filter((r) => r.quarter === q).reduce((sum, r) => sum + r.revenue, 0)
//   );
//   const target = quarters.map((q) =>
//     VENDOR_QUARTER_DATA.filter((r) => r.quarter === q).reduce((sum, r) => sum + r.revenueTarget, 0)
//   );
//   return { actual, target };
// }

// // Headcount onshore vs offshore, summed across all vendors per quarter.
// export function getHeadcountByQuarter(quarters = QUARTERS) {
//   const onshore = quarters.map((q) =>
//     VENDOR_QUARTER_DATA.filter((r) => r.quarter === q).reduce((sum, r) => sum + r.headcountOnshore, 0)
//   );
//   const offshore = quarters.map((q) =>
//     VENDOR_QUARTER_DATA.filter((r) => r.quarter === q).reduce((sum, r) => sum + r.headcountOffshore, 0)
//   );
//   return { onshore, offshore };
// }

// // Manual hours saved, summed across all vendors per quarter.
// export function getManualHoursByQuarter(quarters = QUARTERS) {
//   return quarters.map((q) =>
//     VENDOR_QUARTER_DATA.filter((r) => r.quarter === q).reduce((sum, r) => sum + r.manualHoursSaved, 0)
//   );
// }

// // Competitor mention counts within the selected quarter(s).
// export function getCompetitorPresence(quarters = QUARTERS) {
//   const rows = rowsForQuarters(quarters);
//   const counts = {};
//   rows.forEach((r) => {
//     counts[r.competitor] = (counts[r.competitor] || 0) + 1;
//   });
//   const labels = Object.keys(counts);
//   return {
//     labels,
//     values: labels.map((l) => counts[l]),
//     colors: labels.map((_, i) => COMPETITOR_PALETTE[i % COMPETITOR_PALETTE.length]),
//   };
// }


// // Static vendor performance data, quarter by quarter.
// export const VENDOR_QUARTER_DATA = [
//   { vendor: "Amazon", quarter: "Q1", revenue: 544663, revenueTarget: 600000, pipeline: 150000, billableUtil: 85, nonBillableUtil: 15, headcountOnshore: 10, headcountOffshore: 25, aiAdoption: 65, manualHoursSaved: 120, solution: "AI Research Tool", competitor: "Microsoft" },
//   { vendor: "Amazon", quarter: "Q2", revenue: 624571, revenueTarget: 650000, pipeline: 180000, billableUtil: 90, nonBillableUtil: 10, headcountOnshore: 11, headcountOffshore: 27, aiAdoption: 72, manualHoursSaved: 150, solution: "Synthetic Data", competitor: "Google" },
//   { vendor: "Amazon", quarter: "Q3", revenue: 530749, revenueTarget: 620000, pipeline: 210000, billableUtil: 87, nonBillableUtil: 13, headcountOnshore: 12, headcountOffshore: 28, aiAdoption: 78, manualHoursSaved: 185, solution: "QuickSuite", competitor: "Microsoft" },
//   { vendor: "Amazon", quarter: "Q4", revenue: 211292, revenueTarget: 400000, pipeline: 240000, billableUtil: 82, nonBillableUtil: 18, headcountOnshore: 12, headcountOffshore: 30, aiAdoption: 81, manualHoursSaved: 220, solution: "AI Analyst", competitor: "Google" },

//   { vendor: "Microsoft", quarter: "Q1", revenue: 1681731, revenueTarget: 1700000, pipeline: 350000, billableUtil: 84.58, nonBillableUtil: 15.42, headcountOnshore: 8, headcountOffshore: 35, aiAdoption: 78, manualHoursSaved: 210, solution: "AI Copilot", competitor: "Amazon" },
//   { vendor: "Microsoft", quarter: "Q2", revenue: 1234864, revenueTarget: 1400000, pipeline: 420000, billableUtil: 91.65, nonBillableUtil: 8.35, headcountOnshore: 8, headcountOffshore: 33, aiAdoption: 82, manualHoursSaved: 250, solution: "Azure AI Search", competitor: "Google" },
//   { vendor: "Microsoft", quarter: "Q3", revenue: 1143260, revenueTarget: 1300000, pipeline: 390000, billableUtil: 88.2, nonBillableUtil: 11.8, headcountOnshore: 9, headcountOffshore: 34, aiAdoption: 86, manualHoursSaved: 290, solution: "Copilot Studio", competitor: "Amazon" },
//   { vendor: "Microsoft", quarter: "Q4", revenue: 1098260, revenueTarget: 1250000, pipeline: 460000, billableUtil: 89.5, nonBillableUtil: 10.5, headcountOnshore: 10, headcountOffshore: 36, aiAdoption: 90, manualHoursSaved: 340, solution: "AI Foundry", competitor: "Google" },

//   { vendor: "Google", quarter: "Q1", revenue: 21750, revenueTarget: 30000, pipeline: 15000, billableUtil: 75, nonBillableUtil: 25, headcountOnshore: 3, headcountOffshore: 12, aiAdoption: 55, manualHoursSaved: 45, solution: "AI Analyst", competitor: "Microsoft" },
//   { vendor: "Google", quarter: "Q2", revenue: 31776, revenueTarget: 35000, pipeline: 18000, billableUtil: 80, nonBillableUtil: 20, headcountOnshore: 4, headcountOffshore: 12, aiAdoption: 62, manualHoursSaved: 60, solution: "Gemini Research", competitor: "Amazon" },
//   { vendor: "Google", quarter: "Q3", revenue: 1475, revenueTarget: 25000, pipeline: 22000, billableUtil: 68, nonBillableUtil: 32, headcountOnshore: 4, headcountOffshore: 13, aiAdoption: 70, manualHoursSaved: 75, solution: "Foresight", competitor: "Microsoft" },
//   { vendor: "Google", quarter: "Q4", revenue: 0, revenueTarget: 20000, pipeline: 28000, billableUtil: 65, nonBillableUtil: 35, headcountOnshore: 5, headcountOffshore: 14, aiAdoption: 75, manualHoursSaved: 90, solution: "Gemini Assistant", competitor: "Amazon" },
// ];

// export const ALL_QUARTERS_LABEL = "All Quarters";
// export const ALL_VENDORS_LABEL = "All Vendors";
// export const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
// export const QUARTER_FILTER_OPTIONS = [ALL_QUARTERS_LABEL, ...QUARTERS];
// export const VENDORS = ["Amazon", "Microsoft", "Google"];

// // A single cohesive palette for all charts on this page — distinct from
// // the KPI tile background colors so charts read cleanly on a white card.
// export const CHART_COLORS = {
//   Amazon: "#E8985B",     // warm amber
//   Microsoft: "#3E7CB1",  // slate blue
//   Google: "#4FA97F",     // muted green
//   actual: "#2F6F5E",     // deep teal
//   target: "#C7C2B8",     // warm gray
//   onshore: "#3E7CB1",    // slate blue
//   offshore: "#B7594B",   // brick red
//   hours: "#7C6FB0",      // muted purple
// };

// const COMPETITOR_PALETTE = ["#E8985B", "#3E7CB1", "#4FA97F", "#B7594B", "#7C6FB0"];

// function rowsForQuarters(quarters) {
//   return VENDOR_QUARTER_DATA.filter((r) => quarters.includes(r.quarter));
// }

// function rowsFor(quarter, vendor) {
//   return VENDOR_QUARTER_DATA.filter(
//     (r) =>
//       (quarter === ALL_QUARTERS_LABEL || r.quarter === quarter) &&
//       (vendor === ALL_VENDORS_LABEL || r.vendor === vendor)
//   );
// }

// // Aggregate KPI summary for the top 4 tiles, filtered by quarter + vendor.
// // quarter: "All Quarters" | "Q1" | "Q2" | "Q3" | "Q4"
// // vendor: "All Vendors" | "Amazon" | "Microsoft" | "Google" | ...
// export function getKpiSummary(quarter = ALL_QUARTERS_LABEL, vendor = ALL_VENDORS_LABEL) {
//   const rows = rowsFor(quarter, vendor);

//   const totalRevenue = rows.reduce((sum, r) => sum + r.revenue, 0);
//   const totalTarget = rows.reduce((sum, r) => sum + r.revenueTarget, 0);
//   const revenuePct = totalTarget ? Math.round((totalRevenue / totalTarget) * 100) : 0;

//   const totalPipeline = rows.reduce((sum, r) => sum + r.pipeline, 0);

//   const headcountOnshore = rows.reduce((sum, r) => sum + r.headcountOnshore, 0);
//   const headcountOffshore = rows.reduce((sum, r) => sum + r.headcountOffshore, 0);

//   const avgAiAdoption = rows.length
//     ? Math.round(rows.reduce((sum, r) => sum + r.aiAdoption, 0) / rows.length)
//     : 0;
//   const totalManualHoursSaved = rows.reduce((sum, r) => sum + r.manualHoursSaved, 0);

//   return {
//     rowCount: rows.length,
//     totalRevenue,
//     totalTarget,
//     revenuePct,
//     totalPipeline,
//     headcountOnshore,
//     headcountOffshore,
//     headcountTotal: headcountOnshore + headcountOffshore,
//     avgAiAdoption,
//     totalManualHoursSaved,
//   };
// }

// // Revenue by quarter, one series per vendor.
// export function getRevenueByQuarter(quarters = QUARTERS) {
//   return VENDORS.map((vendor) => ({
//     vendor,
//     color: CHART_COLORS[vendor],
//     data: quarters.map(
//       (q) => VENDOR_QUARTER_DATA.find((r) => r.vendor === vendor && r.quarter === q)?.revenue ?? 0
//     ),
//   }));
// }

// // Revenue vs target, summed across all vendors per quarter.
// export function getRevenueVsTarget(quarters = QUARTERS) {
//   const actual = quarters.map((q) =>
//     VENDOR_QUARTER_DATA.filter((r) => r.quarter === q).reduce((sum, r) => sum + r.revenue, 0)
//   );
//   const target = quarters.map((q) =>
//     VENDOR_QUARTER_DATA.filter((r) => r.quarter === q).reduce((sum, r) => sum + r.revenueTarget, 0)
//   );
//   return { actual, target };
// }

// // Headcount onshore vs offshore, summed across all vendors per quarter.
// export function getHeadcountByQuarter(quarters = QUARTERS) {
//   const onshore = quarters.map((q) =>
//     VENDOR_QUARTER_DATA.filter((r) => r.quarter === q).reduce((sum, r) => sum + r.headcountOnshore, 0)
//   );
//   const offshore = quarters.map((q) =>
//     VENDOR_QUARTER_DATA.filter((r) => r.quarter === q).reduce((sum, r) => sum + r.headcountOffshore, 0)
//   );
//   return { onshore, offshore };
// }

// // Manual hours saved, summed across all vendors per quarter.
// export function getManualHoursByQuarter(quarters = QUARTERS) {
//   return quarters.map((q) =>
//     VENDOR_QUARTER_DATA.filter((r) => r.quarter === q).reduce((sum, r) => sum + r.manualHoursSaved, 0)
//   );
// }

// // Competitor mention counts within the selected quarter(s).
// export function getCompetitorPresence(quarters = QUARTERS) {
//   const rows = rowsForQuarters(quarters);
//   const counts = {};
//   rows.forEach((r) => {
//     counts[r.competitor] = (counts[r.competitor] || 0) + 1;
//   });
//   const labels = Object.keys(counts);
//   return {
//     labels,
//     values: labels.map((l) => counts[l]),
//     colors: labels.map((_, i) => COMPETITOR_PALETTE[i % COMPETITOR_PALETTE.length]),
//   };
// }



// Static vendor performance data, quarter by quarter.
export const VENDOR_QUARTER_DATA = [
  { vendor: "Amazon", quarter: "Q1", revenue: 544663, revenueTarget: 600000, pipeline: 150000, billableUtil: 85, nonBillableUtil: 15, headcountOnshore: 10, headcountOffshore: 25, aiAdoption: 65, manualHoursSaved: 120, solution: "AI Research Tool", competitor: "Microsoft" },
  { vendor: "Amazon", quarter: "Q2", revenue: 624571, revenueTarget: 650000, pipeline: 180000, billableUtil: 90, nonBillableUtil: 10, headcountOnshore: 11, headcountOffshore: 27, aiAdoption: 72, manualHoursSaved: 150, solution: "Synthetic Data", competitor: "Google" },
  { vendor: "Amazon", quarter: "Q3", revenue: 530749, revenueTarget: 620000, pipeline: 210000, billableUtil: 87, nonBillableUtil: 13, headcountOnshore: 12, headcountOffshore: 28, aiAdoption: 78, manualHoursSaved: 185, solution: "QuickSuite", competitor: "Microsoft" },
  { vendor: "Amazon", quarter: "Q4", revenue: 211292, revenueTarget: 400000, pipeline: 240000, billableUtil: 82, nonBillableUtil: 18, headcountOnshore: 12, headcountOffshore: 30, aiAdoption: 81, manualHoursSaved: 220, solution: "AI Analyst", competitor: "Google" },

  { vendor: "Microsoft", quarter: "Q1", revenue: 1681731, revenueTarget: 1700000, pipeline: 350000, billableUtil: 84.58, nonBillableUtil: 15.42, headcountOnshore: 8, headcountOffshore: 35, aiAdoption: 78, manualHoursSaved: 210, solution: "AI Copilot", competitor: "Amazon" },
  { vendor: "Microsoft", quarter: "Q2", revenue: 1234864, revenueTarget: 1400000, pipeline: 420000, billableUtil: 91.65, nonBillableUtil: 8.35, headcountOnshore: 8, headcountOffshore: 33, aiAdoption: 82, manualHoursSaved: 250, solution: "Azure AI Search", competitor: "Google" },
  { vendor: "Microsoft", quarter: "Q3", revenue: 1143260, revenueTarget: 1300000, pipeline: 390000, billableUtil: 88.2, nonBillableUtil: 11.8, headcountOnshore: 9, headcountOffshore: 34, aiAdoption: 86, manualHoursSaved: 290, solution: "Copilot Studio", competitor: "Amazon" },
  { vendor: "Microsoft", quarter: "Q4", revenue: 1098260, revenueTarget: 1250000, pipeline: 460000, billableUtil: 89.5, nonBillableUtil: 10.5, headcountOnshore: 10, headcountOffshore: 36, aiAdoption: 90, manualHoursSaved: 340, solution: "AI Foundry", competitor: "Google" },

  { vendor: "Google", quarter: "Q1", revenue: 21750, revenueTarget: 30000, pipeline: 15000, billableUtil: 75, nonBillableUtil: 25, headcountOnshore: 3, headcountOffshore: 12, aiAdoption: 55, manualHoursSaved: 45, solution: "AI Analyst", competitor: "Microsoft" },
  { vendor: "Google", quarter: "Q2", revenue: 31776, revenueTarget: 35000, pipeline: 18000, billableUtil: 80, nonBillableUtil: 20, headcountOnshore: 4, headcountOffshore: 12, aiAdoption: 62, manualHoursSaved: 60, solution: "Gemini Research", competitor: "Amazon" },
  { vendor: "Google", quarter: "Q3", revenue: 1475, revenueTarget: 25000, pipeline: 22000, billableUtil: 68, nonBillableUtil: 32, headcountOnshore: 4, headcountOffshore: 13, aiAdoption: 70, manualHoursSaved: 75, solution: "Foresight", competitor: "Microsoft" },
  { vendor: "Google", quarter: "Q4", revenue: 0, revenueTarget: 20000, pipeline: 28000, billableUtil: 65, nonBillableUtil: 35, headcountOnshore: 5, headcountOffshore: 14, aiAdoption: 75, manualHoursSaved: 90, solution: "Gemini Assistant", competitor: "Amazon" },
];

export const ALL_QUARTERS_LABEL = "All Quarters";
export const ALL_VENDORS_LABEL = "All Vendors";
export const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
export const QUARTER_FILTER_OPTIONS = [ALL_QUARTERS_LABEL, ...QUARTERS];

function rowsFor(quarter, vendor) {
  return VENDOR_QUARTER_DATA.filter(
    (r) =>
      (quarter === ALL_QUARTERS_LABEL || r.quarter === quarter) &&
      (vendor === ALL_VENDORS_LABEL || r.vendor === vendor)
  );
}

// Aggregate KPI summary for the top 4 tiles, filtered by quarter + vendor.
// The sample table's row-level targets sum to ~$8M, but that's just the
// targets for these specific vendor/quarter rows — not the actual FY27
// company-wide revenue target, which is a separate, much larger number.
// Set this to your real FY27 target when you have it.
const FY27_REVENUE_TARGET = 24000000;

const GRAND_TOTAL_TARGET = VENDOR_QUARTER_DATA.reduce((sum, r) => sum + r.revenueTarget, 0);

export function getKpiSummary(quarter = ALL_QUARTERS_LABEL, vendor = ALL_VENDORS_LABEL) {
  const rows = rowsFor(quarter, vendor);

  const totalRevenue = rows.reduce((sum, r) => sum + r.revenue, 0);
  const totalTarget = rows.reduce((sum, r) => sum + r.revenueTarget, 0);

  // Scale the FY27 target down proportionally to whatever slice of the
  // sample data is currently selected (e.g. one vendor's targets are
  // some fraction of the whole table's targets), then measure revenue
  // achieved against that slice of the real FY27 target.
  const fy27Target = GRAND_TOTAL_TARGET
    ? Math.round(FY27_REVENUE_TARGET * (totalTarget / GRAND_TOTAL_TARGET))
    : 0;
  const revenuePct = fy27Target ? Math.round((totalRevenue / fy27Target) * 100) : 0;

  const totalPipeline = rows.reduce((sum, r) => sum + r.pipeline, 0);

  const headcountOnshore = rows.reduce((sum, r) => sum + r.headcountOnshore, 0);
  const headcountOffshore = rows.reduce((sum, r) => sum + r.headcountOffshore, 0);

  const avgAiAdoption = rows.length
    ? Math.round(rows.reduce((sum, r) => sum + r.aiAdoption, 0) / rows.length)
    : 0;
  const totalManualHoursSaved = rows.reduce((sum, r) => sum + r.manualHoursSaved, 0);

  return {
    rowCount: rows.length,
    totalRevenue,
    totalTarget,
    fy27Target,
    revenuePct,
    totalPipeline,
    headcountOnshore,
    headcountOffshore,
    headcountTotal: headcountOnshore + headcountOffshore,
    avgAiAdoption,
    totalManualHoursSaved,
  };
}

export const VENDORS = ["Amazon", "Microsoft", "Google"];

// A single cohesive palette for all charts on this page — distinct from
// the KPI tile background colors so charts read cleanly on a white card.
export const CHART_COLORS = {
  Amazon: "#E8985B",     // warm amber
  Microsoft: "#3E7CB1",  // slate blue
  Google: "#4FA97F",     // muted green
  actual: "#2F6F5E",     // deep teal
  target: "#C7C2B8",     // warm gray
  onshore: "#3E7CB1",    // slate blue
  offshore: "#B7594B",   // brick red
  hours: "#7C6FB0",      // muted purple
};

const COMPETITOR_PALETTE = ["#E8985B", "#3E7CB1", "#4FA97F", "#B7594B", "#7C6FB0"];

function rowsForQuarters(quarters) {
  return VENDOR_QUARTER_DATA.filter((r) => quarters.includes(r.quarter));
}

// Revenue by quarter, one series per vendor.
export function getRevenueByQuarter(quarters = QUARTERS) {
  return VENDORS.map((vendor) => ({
    vendor,
    color: CHART_COLORS[vendor],
    data: quarters.map(
      (q) => VENDOR_QUARTER_DATA.find((r) => r.vendor === vendor && r.quarter === q)?.revenue ?? 0
    ),
  }));
}

// Revenue vs target, summed across all vendors per quarter.
export function getRevenueVsTarget(quarters = QUARTERS) {
  const actual = quarters.map((q) =>
    VENDOR_QUARTER_DATA.filter((r) => r.quarter === q).reduce((sum, r) => sum + r.revenue, 0)
  );
  const target = quarters.map((q) =>
    VENDOR_QUARTER_DATA.filter((r) => r.quarter === q).reduce((sum, r) => sum + r.revenueTarget, 0)
  );
  return { actual, target };
}

// Headcount onshore vs offshore, summed across all vendors per quarter.
export function getHeadcountByQuarter(quarters = QUARTERS) {
  const onshore = quarters.map((q) =>
    VENDOR_QUARTER_DATA.filter((r) => r.quarter === q).reduce((sum, r) => sum + r.headcountOnshore, 0)
  );
  const offshore = quarters.map((q) =>
    VENDOR_QUARTER_DATA.filter((r) => r.quarter === q).reduce((sum, r) => sum + r.headcountOffshore, 0)
  );
  return { onshore, offshore };
}

// Manual hours saved, summed across all vendors per quarter.
export function getManualHoursByQuarter(quarters = QUARTERS) {
  return quarters.map((q) =>
    VENDOR_QUARTER_DATA.filter((r) => r.quarter === q).reduce((sum, r) => sum + r.manualHoursSaved, 0)
  );
}

// Competitor mention counts within the selected quarter(s).
export function getCompetitorPresence(quarters = QUARTERS) {
  const rows = rowsForQuarters(quarters);
  const counts = {};
  rows.forEach((r) => {
    counts[r.competitor] = (counts[r.competitor] || 0) + 1;
  });
  const labels = Object.keys(counts);
  return {
    labels,
    values: labels.map((l) => counts[l]),
    colors: labels.map((_, i) => COMPETITOR_PALETTE[i % COMPETITOR_PALETTE.length]),
  };
}