// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Breadcrumbs,
//   FormControl,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";

// import TopBar from "./TopBar.jsx";
// import KpiRow from "./KpiRow.jsx";
// import SolutionsBreakdown from "./SolutionsBreakdown.jsx";
// import AiBenchCard from "./AiBenchCard.jsx";
// import VendorDetail from "./VendorDetail.jsx";

// const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];

// const VENDORS = [
//   "All Vendors",
//   "Amazon",
//   "Microsoft",
//   "LinkedIn",
//   "Google",
//   "T-Mobile",
//   "Zebra Technologies",
// ];

// const selectStyles = {
//   minWidth: 120,
//   height: 40,
//   borderRadius: "10px",
//   bgcolor: "background.paper",
//   fontWeight: 700,

//   "& .MuiSelect-select": {
//     py: 1,
//   },
// };

// export default function Dashboard() {
//   const [view, setView] = useState("public");
//   const [filter, setFilter] = useState("Actual");
//   const [selectedQuarter, setSelectedQuarter] = useState("Q1");
//   const [selectedVendor, setSelectedVendor] =
//     useState("All Vendors");

//   const navigate = useNavigate();

//   const handleKpiNavigate = (kpiKey) => {
//     navigate(`/kpi/${kpiKey}`, {
//       state: {
//         quarter: selectedQuarter,
//         vendor: selectedVendor,
//       },
//     });
//   };

//   return (
//     <Box
//       sx={{
//         mx: "auto",
//         p: { xs: 2, md: 3 },
//         bgcolor: "#f7f7f5",
//         minHeight: "100vh",
//       }}
//     >
//       <Box
//         component="header"
//         sx={{
//           mb: 2,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: 2,
//         }}
//       >
//         <Breadcrumbs>
//           <Typography
//             component="h1"
//             sx={{
//               color: "#2F80C9",
//               fontSize: {
//                 xs: "1.25rem",
//                 sm: "1.5rem",
//               },
//               fontWeight: 700,
//             }}
//           >
//             Vendor Dashboard
//           </Typography>
//         </Breadcrumbs>

//         {/* Quarter and vendor filters */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             flexWrap: "wrap",
//             gap: 2,
//           }}
//         >
//           {/* Quarter filter */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <Typography
//               component="label"
//               htmlFor="quarter-select"
//               sx={{
//                 color: "#2F80C9",
//                 fontSize: 15,
//                 fontWeight: 600,
//               }}
//             >
//               Quarter
//             </Typography>

//             <FormControl size="small">
//               <Select
//                 id="quarter-select"
//                 value={selectedQuarter}
//                 onChange={(event) =>
//                   setSelectedQuarter(event.target.value)
//                 }
//                 inputProps={{
//                   "aria-label": "Select quarter",
//                 }}
//                 sx={selectStyles}
//               >
//                 {QUARTERS.map((quarter) => (
//                   <MenuItem key={quarter} value={quarter}>
//                     {quarter}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>

//           {/* Vendor filter */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <Typography
//               component="label"
//               htmlFor="vendor-select"
//               sx={{
//                 color: "#2F80C9",
//                 fontSize: 15,
//                 fontWeight: 600,
//               }}
//             >
//               Vendor
//             </Typography>

//             <FormControl size="small">
//               <Select
//                 id="vendor-select"
//                 value={selectedVendor}
//                 onChange={(event) =>
//                   setSelectedVendor(event.target.value)
//                 }
//                 inputProps={{
//                   "aria-label": "Select vendor",
//                 }}
//                 sx={{
//                   ...selectStyles,
//                   minWidth: 170,
//                 }}
//               >
//                 {VENDORS.map((vendor) => (
//                   <MenuItem key={vendor} value={vendor}>
//                     {vendor}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//         </Box>
//       </Box>

//       <TopBar
//         view={view}
//         onViewChange={setView}
//         filter={filter}
//         onFilterChange={setFilter}
//       />

//       {view === "public" ? (
//         <>
//           <KpiRow
//             quarter={selectedQuarter}
//             vendor={selectedVendor}
//             onNavigate={handleKpiNavigate}
//           />
//           <Box
//   sx={{
//     display: "grid",
//     gridTemplateColumns: {
//       xs: "1fr",
//       lg: "repeat(3, minmax(0, 1fr))",
//     },
//     alignItems: "stretch",
//     gap: 2,
//     mb: 1.75,

//     "& > *": {
//       minWidth: 0,
//       height: "100%",
//     },
//   }}
// >
//   <AiBenchCard
//     quarter={selectedQuarter}
//     vendor={selectedVendor}
//   />

//   <SolutionsBreakdown
//     quarter={selectedQuarter}
//     vendor={selectedVendor}
//   />
// </Box>

//           {/* <Box
//             sx={{
//               display: "grid",
//               gridTemplateColumns: {
//                 xs: "1fr",
//                 md: "1.4fr 1fr",
//               },
//               gap: 1.75,
//               mb: 1.75,
//             }}
//           >
//             <AiBenchCard
//               quarter={selectedQuarter}
//               vendor={selectedVendor}
//             />

//             <SolutionsBreakdown
//               quarter={selectedQuarter}
//               vendor={selectedVendor}
//             />
//           </Box> */}
//         </>
//       ) : (
//         <VendorDetail
//           quarter={selectedQuarter}
//           vendor={selectedVendor}
//         />
//       )}
//     </Box>
//   );
// }

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
import {
  ALL_QUARTERS_LABEL,
  ALL_VENDORS_LABEL,
  QUARTER_FILTER_OPTIONS,
} from "../data/revenueData.js";

const VENDORS = [
  ALL_VENDORS_LABEL,
  "Amazon",
  "Microsoft",
  "LinkedIn",
  "Google",
  "T-Mobile",
  "Zebra Technologies",
];

const selectStyles = {
  minWidth: 120,
  height: 40,
  borderRadius: "10px",
  bgcolor: "background.paper",
  fontWeight: 700,

  "& .MuiSelect-select": {
    py: 1,
  },
};

export default function Dashboard() {
  const [view, setView] = useState("public");
  const [filter, setFilter] = useState("Actual");
  const [selectedQuarter, setSelectedQuarter] = useState(ALL_QUARTERS_LABEL);
  const [selectedVendor, setSelectedVendor] = useState(ALL_VENDORS_LABEL);

  const navigate = useNavigate();

  const handleKpiNavigate = (kpiKey) => {
    navigate(`/kpi/${kpiKey}`, {
      state: {
        quarter: selectedQuarter,
        vendor: selectedVendor,
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
              color: "#2F80C9",
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

        {/* Quarter and vendor filters */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* Quarter filter */}
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
                color: "#2F80C9",
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
                sx={selectStyles}
              >
                {QUARTER_FILTER_OPTIONS.map((quarter) => (
                  <MenuItem key={quarter} value={quarter}>
                    {quarter}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Vendor filter */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              component="label"
              htmlFor="vendor-select"
              sx={{
                color: "#2F80C9",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Vendor
            </Typography>

            <FormControl size="small">
              <Select
                id="vendor-select"
                value={selectedVendor}
                onChange={(event) =>
                  setSelectedVendor(event.target.value)
                }
                inputProps={{
                  "aria-label": "Select vendor",
                }}
                sx={{
                  ...selectStyles,
                  minWidth: 170,
                }}
              >
                {VENDORS.map((vendor) => (
                  <MenuItem key={vendor} value={vendor}>
                    {vendor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
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
            vendor={selectedVendor}
            onNavigate={handleKpiNavigate}
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "repeat(3, minmax(0, 1fr))",
              },
              alignItems: "stretch",
              gap: 2,
              mb: 1.75,

              "& > *": {
                minWidth: 0,
                height: "100%",
              },
            }}
          >
            <AiBenchCard
              quarter={selectedQuarter}
              vendor={selectedVendor}
            />

            <SolutionsBreakdown
              quarter={selectedQuarter}
              vendor={selectedVendor}
            />
          </Box>
        </>
      ) : (
        <VendorDetail
          quarter={selectedQuarter}
          vendor={selectedVendor}
        />
      )}
    </Box>
  );
}