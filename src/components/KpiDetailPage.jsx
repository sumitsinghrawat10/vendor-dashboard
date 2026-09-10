import { useNavigate, useParams } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";

import { KPIS } from "../data/dashboardData.js";
import RevenueBreakdown from "./RevenueBreakdown.jsx";
import PipelineBreakDown from "./PipelineBreakDown.jsx";
import GMBreakdown from "./GMBreakdown.jsx";
import NPSBreakdown from "./NPSBreakdown.jsx";
import HeadCountBreakdown from "./HeadCountBreakdown.jsx";

const KPI_COMPONENTS = {
  revenue: RevenueBreakdown,
  pipeline: PipelineBreakDown,
  g2m: GMBreakdown,
  headCount: HeadCountBreakdown,
  csat: NPSBreakdown,
};

export default function KpiDetailPage() {
  const { kpiKey } = useParams();
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();

  const account =
    instance.getActiveAccount() ||
    accounts[0] ||
    null;

  const kpi = KPIS.find(
    (item) => item.key === kpiKey
  );

  const BreakdownComponent =
    KPI_COMPONENTS[kpiKey];

  // const userName =
  //   account?.name ||
  //   account?.username ||
  //   "Signed-in user";

  const userEmail = account?.username || "";

  // const initials = userName
  //   .split(" ")
  //   .filter(Boolean)
  //   .slice(0, 2)
  //   .map((word) => word[0]?.toUpperCase())
  //   .join("");

  const handleKpiChange = (_, selectedKpiKey) => {
    if (selectedKpiKey !== kpiKey) {
      navigate(`/kpi/${selectedKpiKey}`);
    }
  };

  const storedEmail =
  sessionStorage.getItem("vendorDashboardEmail") || "";

const userName = storedEmail
  ? storedEmail
      .split("@")[0]
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase())
  : "Signed-in user";

const initials = userName
  .split(" ")
  .filter(Boolean)
  .slice(0, 2)
  .map((word) => word[0]?.toUpperCase())
  .join("");

const handleLogout = () => {
  sessionStorage.removeItem("vendorDashboardEmail");
  sessionStorage.removeItem("selectedKpiKey");

  navigate("/", {
    replace: true,
  });
};
  if (!kpi) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          p: 3,
          bgcolor: "#F7F7F5",
        }}
      >
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            width: "100%",
            maxWidth: 520,
            p: 4,
            textAlign: "center",
            borderRadius: "16px",
          }}
        >
          <Typography
            component="h1"
            sx={{
              mb: 1,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            KPI not found
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 3, fontSize: 14 }}
          >
            No dashboard data was found for
            &quot;{kpiKey}&quot;.
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Back to dashboard
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F7F7F5",
      }}
    >
      {/* Main header */}
      <Paper
        component="header"
        square
        elevation={0}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Box
          sx={{
            maxWidth: 1600,
            mx: "auto",
            px: { xs: 2, md: 3 },
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Back and page title */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ minWidth: 0 }}
          >
            <Button
              onClick={() => navigate("/")}
              sx={{
                flexShrink: 0,
                px: 1,
                minWidth: "auto",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              ← Back
            </Button>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                component="h1"
                sx={{
                  fontSize: {
                    xs: 16,
                    md: 18,
                  },
                  fontWeight: 700,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {kpi.label}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                  fontSize: 11,
                }}
              >
                KPI detailed analysis
              </Typography>
            </Box>
          </Stack>

          {/* User information */}
          {/* {account && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={{ xs: 1, sm: 1.5 }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: "#E6F1FB",
                  color: "#0C447C",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {initials || "U"}
              </Avatar>

              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                  },
                  minWidth: 0,
                }}
              >
                <Typography
                  sx={{
                    maxWidth: 200,
                    fontSize: 13,
                    lineHeight: 1.3,
                    fontWeight: 700,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {userName}
                </Typography>

                {userEmail &&
                  userEmail !== userName && (
                    <Typography
                      color="text.secondary"
                      sx={{
                        maxWidth: 200,
                        mt: 0.25,
                        fontSize: 11,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {userEmail}
                    </Typography>
                  )}
              </Box>

              <Chip
                label="Signed in"
                size="small"
                sx={{
                  display: {
                    xs: "none",
                    lg: "flex",
                  },
                  bgcolor: "#E4F4EA",
                  color: "#176B3A",
                  fontWeight: 700,
                }}
              />

              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{
                  minHeight: 36,
                  px: { xs: 1.25, sm: 2 },
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 600,

                  "& .MuiButton-startIcon": {
                    mr: {
                      xs: 0,
                      sm: 1,
                    },
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: {
                      xs: "none",
                      sm: "inline",
                    },
                  }}
                >
                  Logout
                </Box>
              </Button>
            </Stack>
          )} */}
          {storedEmail && (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="flex-end"
    spacing={{ xs: 1, sm: 1.5 }}
    sx={{
      ml: "auto",
      minWidth: 0,
    }}
  >
    <Avatar
      sx={{
        width: 38,
        height: 38,
        flexShrink: 0,
        bgcolor: "#E6F1FB",
        color: "#0C447C",
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {initials || "U"}
    </Avatar>

    <Box
      sx={{
        display: {
          xs: "none",
          sm: "block",
        },
        minWidth: 0,
        textAlign: "right",
      }}
    >
      <Typography
        sx={{
          maxWidth: 240,
          fontSize: 13,
          lineHeight: 1.3,
          fontWeight: 700,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {userName}
      </Typography>

      <Typography
        color="text.secondary"
        title={storedEmail}
        sx={{
          maxWidth: 240,
          mt: 0.25,
          fontSize: 11,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {storedEmail}
      </Typography>
    </Box>

    <Chip
      label="Signed in"
      size="small"
      sx={{
        display: {
          xs: "none",
          lg: "flex",
        },
        bgcolor: "#E4F4EA",
        color: "#176B3A",
        fontWeight: 700,
      }}
    />

    <Button
      variant="outlined"
      color="error"
      size="small"
      startIcon={<Logout />}
      onClick={handleLogout}
      sx={{
        minHeight: 36,
        flexShrink: 0,
        px: { xs: 1.25, sm: 2 },
        textTransform: "none",
        borderRadius: 2,
        fontWeight: 600,

        "& .MuiButton-startIcon": {
          mr: {
            xs: 0,
            sm: 1,
          },
        },
      }}
    >
      <Box
        component="span"
        sx={{
          display: {
            xs: "none",
            sm: "inline",
          },
        }}
      >
        Logout
      </Box>
    </Button>
  </Stack>
)}
        </Box>
      </Paper>

      <Box
        component="main"
        sx={{
          maxWidth: 1600,
          mx: "auto",
          p: { xs: 2, md: 3 },
        }}
      >
        {/* KPI navigation */}
        <Paper
          component="nav"
          elevation={0}
          variant="outlined"
          aria-label="KPI navigation"
          sx={{
            mb: 2.5,
            borderRadius: "14px",
            overflow: "hidden",
            bgcolor: "background.paper",
          }}
        >
          <Tabs
            value={kpiKey}
            onChange={handleKpiChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="Dashboard KPI pages"
            sx={{
              minHeight: 52,

              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: "3px 3px 0 0",
                bgcolor: kpi.color,
              },

              "& .MuiTab-root": {
                minHeight: 52,
                px: { xs: 2, md: 3 },
                textTransform: "none",
                fontSize: 13,
                fontWeight: 600,
                color: "text.secondary",
                transition:
                  "background-color 150ms ease, color 150ms ease",
              },

              "& .Mui-selected": {
                color: `${kpi.color} !important`,
                bgcolor: kpi.bg,
              },
            }}
          >
            {KPIS.map((item) => (
              <Tab
                key={item.key}
                value={item.key}
                label={item.label}
              />
            ))}
          </Tabs>
        </Paper>

        {/* Current KPI information */}
        <Paper
          elevation={0}
          sx={{
            mb: 2.5,
            px: { xs: 2, md: 3 },
            py: 2,
            display: "flex",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: 1.5,
            borderRadius: "14px",
            borderLeft: `4px solid ${kpi.color}`,
            bgcolor: kpi.bg,
            color: kpi.color,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {kpi.label}
            </Typography>

            {kpi.sub && (
              <Typography
                sx={{
                  mt: 0.35,
                  fontSize: 12,
                  opacity: 0.8,
                }}
              >
                {kpi.sub}
              </Typography>
            )}
          </Box>

          <Typography
            sx={{
              fontSize: {
                xs: 26,
                md: 32,
              },
              lineHeight: 1,
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {kpi.value ?? "--"}
          </Typography>
        </Paper>

        {/* Dynamic KPI breakdown */}
        {BreakdownComponent ? (
          <BreakdownComponent />
        ) : (
          <Paper
            elevation={0}
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: "14px",
            }}
          >
            <Typography
              component="h2"
              sx={{
                mb: 1,
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Breakdown unavailable
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                lineHeight: 1.7,
                color: "text.secondary",
              }}
            >
              Detailed information for &quot;{kpi.label}&quot;
              is not available yet.
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}