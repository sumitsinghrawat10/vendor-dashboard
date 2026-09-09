// import { useState } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   InputAdornment,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";

// import EmailAccessDialog from "./EmailAccessPage.jsx";
// import AccountBalanceWalletOutlined from
//   "@mui/icons-material/AccountBalanceWalletOutlined";
// import AccountTreeOutlined from
//   "@mui/icons-material/AccountTreeOutlined";
// import TrendingUpOutlined from
//   "@mui/icons-material/TrendingUpOutlined";
// import GroupsOutlined from
//   "@mui/icons-material/GroupsOutlined";
// import SentimentSatisfiedAltOutlined from
//   "@mui/icons-material/SentimentSatisfiedAltOutlined";
// import EmailOutlined from
//   "@mui/icons-material/EmailOutlined";
// import ArrowForward from
//   "@mui/icons-material/ArrowForward";
// import Close from
//   "@mui/icons-material/Close";

// const EMAIL_STORAGE_KEY = "vendorDashboardEmail";

// const KPI_ICONS = {
//   revenue: AccountBalanceWalletOutlined,
//   pipeline: AccountTreeOutlined,
//   g2m: TrendingUpOutlined,
//   headCount: GroupsOutlined,
//   csat: SentimentSatisfiedAltOutlined,
// };

// function isValidEmail(value) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
// }

// export default function KpiCard({
//   kpi,
//   onNavigate,
// }) {
//   const Icon = KPI_ICONS[kpi.key];
// const [emailModalOpen, setEmailModalOpen] =
//   useState(false);
//   const [open, setOpen] = useState(false);
//   const [email, setEmail] = useState(
//     () => sessionStorage.getItem(EMAIL_STORAGE_KEY) || ""
//   );
//   const [emailError, setEmailError] = useState("");

//   const navigateToKpi = () => {
//     if (typeof onNavigate === "function") {
//       onNavigate(kpi.key);
//       return;
//     }

//     // if (kpi.to) {
//     //   window.location.href = kpi.to;
//     // }
//   };

//   // Open the modal instead of navigating immediately.
//   const handleArrowClick = () => {
//   setEmailModalOpen(true);
// };

// const navigateToDetails = () => {
//   if (typeof onNavigate === "function") {
//     onNavigate(kpi.key);
//     return;
//   }

//   if (kpi.to) {
//     window.location.href = kpi.to;
//   }
// };


//   // const handleArrowClick = (event) => {
//   //   event?.stopPropagation();

//   //   const savedEmail =
//   //     sessionStorage.getItem(EMAIL_STORAGE_KEY);

//   //   if (savedEmail) {
//   //     setEmail(savedEmail);
//   //   }

//   //   setEmailError("");
//   //   setOpen(true);
//   // };

//   const handleClose = () => {
//     setOpen(false);
//     setEmailError("");
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);

//     if (emailError) {
//       setEmailError("");
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const normalizedEmail = email.trim().toLowerCase();

//     if (!normalizedEmail) {
//       setEmailError("Please enter your email address.");
//       return;
//     }

//     if (!isValidEmail(normalizedEmail)) {
//       setEmailError("Please enter a valid email address.");
//       return;
//     }

//     sessionStorage.setItem(
//       EMAIL_STORAGE_KEY,
//       normalizedEmail
//     );

//     setEmail(normalizedEmail);
//     setOpen(false);

//     navigateToKpi();
//   };

//   return (
//     <>
//       <Paper
//         component="article"
//         elevation={0}
//         sx={{
//           p: 2.5,
//           borderRadius: "14px",
//           borderLeft: `4px solid ${kpi.color}`,
//           bgcolor: kpi.bg,
//         }}
//       >
//         {/* KPI icon */}
//         <Box
//           sx={{
//             width: 36,
//             height: 36,
//             borderRadius: "10px",
//             bgcolor: "rgba(255,255,255,0.55)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             mb: 1.5,
//             fontWeight: 700,
//             color: kpi.color,
//           }}
//         >
//           {Icon && (
//             <Icon
//               aria-hidden="true"
//               sx={{
//                 fontSize: 21,
//                 color: kpi.color,
//               }}
//             />
//           )}
//         </Box>
// <EmailAccessDialog
//   open={emailModalOpen}
//   kpiLabel={kpi.label}
//   onClose={() => setEmailModalOpen(false)}
//   onContinue={(email) => {
//     console.log("Stored email:", email);

//     setEmailModalOpen(false);
//     navigateToDetails();
//   }}
// />
//         {/* KPI label and value */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "baseline",
//             justifyContent: "space-between",
//             gap: 1,
//           }}
//         >
//           <Typography
//             component="h2"
//             sx={{
//               fontSize: 14,
//               fontWeight: 600,
//               color: kpi.color,
//             }}
//           >
//             {kpi.label}
//           </Typography>

//           <Typography
//             component="p"
//             sx={{
//               fontSize: "2rem",
//               fontWeight: 700,
//               textAlign: "right",
//               color: kpi.color,
//               fontVariantNumeric: "tabular-nums",
//             }}
//           >
//             {kpi.value ?? "--"}
//           </Typography>
//         </Box>

//         {/* Gross Margin status dots */}
//         {Array.isArray(kpi.dots) && (
//           <Stack
//             direction="row"
//             spacing={0.75}
//           >
//             {kpi.dots.map((dot, index) => {
//               const dotColor =
//                 typeof dot === "object"
//                   ? dot.color
//                   : dot;

//               const dotLabel =
//                 typeof dot === "object"
//                   ? dot.label
//                   : `Status ${index + 1}`;

//               return (
//                 <Box
//                   key={`${dotLabel}-${index}`}
//                   title={dotLabel}
//                   sx={{
//                     width: 10,
//                     height: 10,
//                     borderRadius: "50%",
//                     bgcolor: dotColor,
//                   }}
//                 />
//               );
//             })}
//           </Stack>
//         )}

//         {/* Description and arrow */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-end",
//             mt: 0.5,
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: 14,
//               color: kpi.color,
//               opacity: 0.75,
//             }}
//           >
//             {kpi.sub}
//           </Typography>

//           <IconButton
//             onClick={handleArrowClick}
//             size="small"
//             aria-label={`View details for ${kpi.label}`}
//             sx={{
//               width: 28,
//               height: 28,
//               bgcolor: "rgba(255,255,255,0.55)",
//               color: kpi.color,

//               "&:hover": {
//                 bgcolor: "rgba(255,255,255,0.85)",
//               },
//             }}
//           >
//             <ArrowForward sx={{ fontSize: 17 }} />
//           </IconButton>
//         </Box>
//       </Paper>

//       {/* Email modal */}
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         fullWidth
//         maxWidth="xs"
//         aria-labelledby={`email-dialog-title-${kpi.key}`}
//         PaperProps={{
//           sx: {
//             borderRadius: "18px",
//             overflow: "hidden",
//           },
//         }}
//       >
//         <Box
//           component="form"
//           noValidate
//           onSubmit={handleSubmit}
//         >
//           <DialogTitle
//             id={`email-dialog-title-${kpi.key}`}
//             sx={{
//               pr: 6,
//               pb: 1,
//               fontSize: 21,
//               fontWeight: 700,
//             }}
//           >
//             Enter your email
//           </DialogTitle>

//           <IconButton
//             aria-label="Close"
//             onClick={handleClose}
//             sx={{
//               position: "absolute",
//               top: 12,
//               right: 12,
//               color: "text.secondary",
//             }}
//           >
//             <Close />
//           </IconButton>

//           <DialogContent>
//             <Box
//               sx={{
//                 width: 44,
//                 height: 44,
//                 display: "grid",
//                 placeItems: "center",
//                 mb: 2,
//                 borderRadius: "12px",
//                 bgcolor: kpi.bg,
//                 color: kpi.color,
//               }}
//             >
//               {Icon && <Icon />}
//             </Box>

//             <Typography
//               color="text.secondary"
//               sx={{
//                 mb: 2.5,
//                 fontSize: 13,
//                 lineHeight: 1.6,
//               }}
//             >
//               Enter your company email address to continue to the{" "}
//               <strong>{kpi.label}</strong> details.
//             </Typography>

//             <TextField
//               fullWidth
//               autoFocus
//               required
//               type="email"
//               label="Email address"
//               placeholder="name@company.com"
//               value={email}
//               error={Boolean(emailError)}
//               helperText={
//                 emailError ||
//                 "Your email will be stored for this browser session."
//               }
//               autoComplete="email"
//               onChange={handleEmailChange}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailOutlined
//                       sx={{
//                         fontSize: 20,
//                         color: "text.secondary",
//                       }}
//                     />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </DialogContent>

//           <DialogActions
//             sx={{
//               px: 3,
//               pb: 3,
//               pt: 1,
//             }}
//           >
//             <Button
//               type="button"
//               color="inherit"
//               onClick={handleClose}
//               sx={{
//                 textTransform: "none",
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               type="submit"
//               variant="contained"
//               endIcon={<ArrowForward />}
//               sx={{
//                 px: 2.5,
//                 textTransform: "none",
//                 borderRadius: "9px",
//                 fontWeight: 700,
//               }}
//             >
//               Continue
//             </Button>
//           </DialogActions>
//         </Box>
//       </Dialog>
//     </>
//   );
// }

import { useState } from "react";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import AccountBalanceWalletOutlined from
  "@mui/icons-material/AccountBalanceWalletOutlined";
import AccountTreeOutlined from
  "@mui/icons-material/AccountTreeOutlined";
import TrendingUpOutlined from
  "@mui/icons-material/TrendingUpOutlined";
import GroupsOutlined from
  "@mui/icons-material/GroupsOutlined";
import SentimentSatisfiedAltOutlined from
  "@mui/icons-material/SentimentSatisfiedAltOutlined";
import ArrowForward from
  "@mui/icons-material/ArrowForward";

// import EmailAccessDialog from "./EmailAccessDialog.jsx";
import EmailAccessDialog from "./EmailAccessPage.jsx";

const EMAIL_STORAGE_KEY = "vendorDashboardEmail";

const KPI_ICONS = {
  revenue: AccountBalanceWalletOutlined,
  pipeline: AccountTreeOutlined,
  g2m: TrendingUpOutlined,
  headCount: GroupsOutlined,
  csat: SentimentSatisfiedAltOutlined,
};

export default function KpiCard({
  kpi,
  onNavigate,
}) {
  const Icon = KPI_ICONS[kpi.key];

  const [emailModalOpen, setEmailModalOpen] =
    useState(false);

  const handleArrowClick = (event) => {
    event.stopPropagation();
    setEmailModalOpen(true);
  };

  const navigateToKpi = () => {
    if (typeof onNavigate === "function") {
      onNavigate(kpi.key);
      return;
    }

    if (kpi.to) {
      window.location.href = kpi.to;
    }
  };

  const handleContinue = (email) => {
    const normalizedEmail = email
      .trim()
      .toLowerCase();

    sessionStorage.setItem(
      EMAIL_STORAGE_KEY,
      normalizedEmail
    );

    sessionStorage.setItem(
      "selectedKpiKey",
      kpi.key
    );

    setEmailModalOpen(false);

    // Directly open KPI page. No SSO login.
    navigateToKpi();
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: "14px",
          borderLeft: `4px solid ${kpi.color}`,
          bgcolor: kpi.bg,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            bgcolor: "rgba(255,255,255,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1.5,
            fontWeight: 700,
            color: kpi.color,
          }}
        >
          {Icon && (
            <Icon
              aria-hidden="true"
              sx={{
                fontSize: 21,
                color: kpi.color,
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: kpi.color,
            }}
          >
            {kpi.label}
          </Typography>

          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 700,
              textAlign: "right",
              color: kpi.color,
            }}
          >
            {kpi.value ?? "--"}
          </Typography>
        </Box>

        {Array.isArray(kpi.dots) && (
          <Stack direction="row" spacing={0.75}>
            {kpi.dots.map((dot, index) => {
              const color =
                typeof dot === "object"
                  ? dot.color
                  : dot;

              const label =
                typeof dot === "object"
                  ? dot.label
                  : `Status ${index + 1}`;

              return (
                <Box
                  key={`${label}-${index}`}
                  title={label}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: color,
                  }}
                />
              );
            })}
          </Stack>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mt: 0.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: kpi.color,
              opacity: 0.75,
            }}
          >
            {kpi.sub}
          </Typography>

          <IconButton
            onClick={handleArrowClick}
            size="small"
            aria-label={`View details for ${kpi.label}`}
            sx={{
              width: 28,
              height: 28,
              bgcolor: "rgba(255,255,255,0.55)",
              color: kpi.color,

              "&:hover": {
                bgcolor: "rgba(255,255,255,0.85)",
              },
            }}
          >
            <ArrowForward sx={{ fontSize: 17 }} />
          </IconButton>
        </Box>
      </Paper>

      <EmailAccessDialog
        open={emailModalOpen}
        kpiLabel={kpi.label}
        onClose={() => setEmailModalOpen(false)}
        onContinue={handleContinue}
      />
    </>
  );
}