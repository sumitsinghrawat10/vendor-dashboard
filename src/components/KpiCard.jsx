// import {
//   Box,
//   IconButton,
//   Paper,
//   Stack,
//   Typography,
// } from "@mui/material";

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

// const KPI_ICONS = {
//   revenue: AccountBalanceWalletOutlined,
//   pipeline: AccountTreeOutlined,
//   g2m: TrendingUpOutlined,
//   headCount: GroupsOutlined,
//   csat: SentimentSatisfiedAltOutlined,
// };

// export default function KpiCard({ kpi, onNavigate }) {
//   const Icon = KPI_ICONS[kpi.key];

//   const handleArrowClick = () => {
//     if (onNavigate) {
//       onNavigate(kpi.key);
//     } else if (kpi.to) {
//       window.location.href = kpi.to;
//     }
//   };

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: 2.5,
//         borderRadius: "14px",
//         borderLeft: `4px solid ${kpi.color}`,
//         bgcolor: kpi.bg,
//       }}
//     >
//       <Box
//         sx={{
//           width: 36,
//           height: 36,
//           borderRadius: "10px",
//           bgcolor: "rgba(255,255,255,0.55)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           mb: 1.5,
//           fontWeight: 700,
//           color: kpi.color,
//         }}
//       >
//         {Icon && (
//           <Icon
//             sx={{
//               fontSize: 21,
//               color: kpi.color,
//             }}
//           />
//         )}
//       </Box>

//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "baseline",
//           justifyContent: "space-between",
//           gap: 1,
//         }}
//       >
//         <Typography
//           sx={{
//             fontSize: 14,
//             fontWeight: 600,
//             color: kpi.color,
//           }}
//         >
//           {kpi.label}
//         </Typography>

//         {/* Always show the value */}
//         <Typography
//           sx={{
//             fontSize: "2rem",
//             fontWeight: 700,
//             textAlign: "right",
//             color: kpi.color,
//           }}
//         >
//           {kpi.value ?? "--"}
//         </Typography>
//       </Box>

//       {/* Gross Margin dots */}
//       {Array.isArray(kpi.dots) && (
//         <Stack
//           direction="row"
//           spacing={0.75}
//         >
//           {kpi.dots.map((dot, index) => (
//             <Box
//               key={
//                 typeof dot === "object"
//                   ? dot.label
//                   : index
//               }
//               title={
//                 typeof dot === "object"
//                   ? dot.label
//                   : undefined
//               }
//               sx={{
//                 width: 10,
//                 height: 10,
//                 borderRadius: "50%",
//                 bgcolor:
//                   typeof dot === "object"
//                     ? dot.color
//                     : dot,
//               }}
//             />
//           ))}
//         </Stack>
//       )}

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "flex-end",
//           mt: 0.5,
//         }}
//       >
//         <Typography
//           sx={{
//             fontSize: 14,
//             color: kpi.color,
//             opacity: 0.75,
//           }}
//         >
//           {kpi.sub}
//         </Typography>

//         <IconButton
//           onClick={handleArrowClick}
//           size="small"
//           aria-label={`View details for ${kpi.label}`}
//           sx={{
//             width: 28,
//             height: 28,
//             bgcolor: "rgba(255,255,255,0.55)",
//             color: kpi.color,

//             "&:hover": {
//               bgcolor: "rgba(255,255,255,0.85)",
//             },
//           }}
//         >
//           <Box
//             component="span"
//             sx={{
//               fontSize: 16,
//               fontWeight: 700,
//               lineHeight: 1,
//             }}
//           >
//             →
//           </Box>
//         </IconButton>
//       </Box>
//     </Paper>
//   );
// }


import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Paper,
  Stack,
  TextField,
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

const EMAIL_STORAGE_KEY = "vendorDashboardEmail";

const KPI_ICONS = {
  revenue: AccountBalanceWalletOutlined,
  pipeline: AccountTreeOutlined,
  g2m: TrendingUpOutlined,
  headCount: GroupsOutlined,
  csat: SentimentSatisfiedAltOutlined,
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function MicrosoftLogo() {
  const colors = [
    "#F25022",
    "#7FBA00",
    "#00A4EF",
    "#FFB900",
  ];

  return (
    <Box
      aria-hidden="true"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 12px)",
        gridTemplateRows: "repeat(2, 12px)",
        gap: "2px",
      }}
    >
      {colors.map((color) => (
        <Box
          key={color}
          sx={{
            width: 12,
            height: 12,
            bgcolor: color,
          }}
        />
      ))}
    </Box>
  );
}

export default function KpiCard({
  kpi,
  onNavigate,
}) {
  const Icon = KPI_ICONS[kpi.key];

  const [modalOpen, setModalOpen] = useState(false);

  const [email, setEmail] = useState(
    () =>
      sessionStorage.getItem(EMAIL_STORAGE_KEY) || ""
  );

  const [emailError, setEmailError] = useState("");

  const navigateToKpi = () => {
    if (typeof onNavigate === "function") {
      onNavigate(kpi.key);
      return;
    }

    if (kpi.to) {
      window.location.href = kpi.to;
    }
  };

  // Open custom email modal.
  const handleArrowClick = (event) => {
    event.stopPropagation();

    const savedEmail =
      sessionStorage.getItem(EMAIL_STORAGE_KEY);

    if (savedEmail) {
      setEmail(savedEmail);
    }

    setEmailError("");
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEmailError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    if (!normalizedEmail) {
      setEmailError("Enter your email address.");
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    // Save email for the current browser tab.
    sessionStorage.setItem(
      EMAIL_STORAGE_KEY,
      normalizedEmail
    );

    sessionStorage.setItem(
      "selectedKpiKey",
      kpi.key
    );

    setEmail(normalizedEmail);
    setModalOpen(false);

    // Navigate directly without opening SSO.
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
        {/* KPI icon */}
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

        {/* KPI label and value */}
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

        {/* Gross Margin dots */}
        {Array.isArray(kpi.dots) && (
          <Stack direction="row" spacing={0.75}>
            {kpi.dots.map((dot, index) => {
              const dotColor =
                typeof dot === "object"
                  ? dot.color
                  : dot;

              const dotLabel =
                typeof dot === "object"
                  ? dot.label
                  : `Status ${index + 1}`;

              return (
                <Box
                  key={`${dotLabel}-${index}`}
                  title={dotLabel}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: dotColor,
                  }}
                />
              );
            })}
          </Stack>
        )}

        {/* Description and arrow */}
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
            <Box
              component="span"
              sx={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              →
            </Box>
          </IconButton>
        </Box>
      </Paper>

      {/* Microsoft-style email modal */}
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        aria-labelledby={`email-modal-${kpi.key}`}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 460,
            minHeight: 350,
            m: 2,
            borderRadius: 0,
            boxShadow:
              "0 4px 18px rgba(0,0,0,0.24)",
          },
        }}
        BackdropProps={{
          sx: {
            bgcolor: "rgba(231,238,248,0.8)",
            backdropFilter: "blur(2px)",
          },
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            minHeight: 350,
            px: {
              xs: 3,
              sm: 5,
            },
            py: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Microsoft branding */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 3,
            }}
          >
            <MicrosoftLogo />

            <Typography
              sx={{
                color: "#666666",
                fontSize: 23,
                fontWeight: 600,
              }}
            >
              Microsoft
            </Typography>
          </Box>

          <Typography
            id={`email-modal-${kpi.key}`}
            component="h2"
            sx={{
              mb: 1,
              color: "#1B1B1B",
              fontSize: 27,
              lineHeight: 1.3,
              fontWeight: 600,
            }}
          >
            Sign in
          </Typography>

          <Typography
            sx={{
              mb: 2.5,
              color: "#444444",
              fontSize: 14,
            }}
          >
            Enter your email to continue to{" "}
            <strong>{kpi.label}</strong>.
          </Typography>

          <TextField
            fullWidth
            autoFocus
            type="email"
            variant="standard"
            placeholder="Email, phone, or Skype"
            value={email}
            error={Boolean(emailError)}
            helperText={emailError}
            autoComplete="email"
            inputProps={{
              "aria-label": "Email address",
            }}
            onChange={(event) => {
              setEmail(event.target.value);

              if (emailError) {
                setEmailError("");
              }
            }}
            sx={{
              mb: 2,

              "& .MuiInputBase-input": {
                py: 1,
                fontSize: 15,
              },

              "& .MuiInput-underline:after": {
                borderBottomColor: "#0067B8",
              },
            }}
          />

          <Typography
            sx={{
              color: "#444444",
              fontSize: 13,
            }}
          >
            No account?{" "}
            <Box
              component="span"
              sx={{
                color: "#0067B8",
              }}
            >
              Contact your administrator
            </Box>
          </Typography>

          <Box
            sx={{
              mt: "auto",
              pt: 4,
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <Button
              type="button"
              onClick={handleClose}
              sx={{
                minWidth: 105,
                borderRadius: 0,
                bgcolor: "#CCCCCC",
                color: "#1B1B1B",
                textTransform: "none",

                "&:hover": {
                  bgcolor: "#BBBBBB",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                minWidth: 105,
                borderRadius: 0,
                bgcolor: "#0067B8",
                textTransform: "none",
                boxShadow: "none",

                "&:hover": {
                  bgcolor: "#005DA6",
                  boxShadow: "none",
                },
              }}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}