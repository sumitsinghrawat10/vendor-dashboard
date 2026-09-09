
// import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";

// export default function KpiCard({ kpi, onNavigate }) {
//   const handleArrowClick = () => {
//     if (onNavigate) {
//       onNavigate(kpi.key);
//     } else if (kpi.to) {
//       // Fallback if you're using react-router: replace with `navigate(kpi.to)`
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
//         {kpi.label[0]}
//       </Box>

//       <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 1 }}>
//         <Typography sx={{ fontSize: 14, fontWeight: 600, color: kpi.color }}>{kpi.label}</Typography>

//         {kpi.dots ? (
//           <Stack direction="row" spacing={0.75}>
//             {kpi.dots.map((d, i) => (
//               <Box key={i} sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: d }} />
//             ))}
//           </Stack>
//         ) : (
//           <Typography sx={{ fontSize: "2rem", fontWeight: 700, textAlign: "right", color: kpi.color }}>
//             {kpi.value}
//           </Typography>
//         )}
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mt: 0.5 }}>
//         <Typography sx={{ fontSize: 14, color: kpi.color, opacity: 0.75 }}>{kpi.sub}</Typography>

//         <IconButton
//           onClick={handleArrowClick}
//           size="small"
//           aria-label={`View details for ${kpi.label}`}
//           sx={{
//             width: 28,
//             height: 28,
//             bgcolor: "rgba(255,255,255,0.55)",
//             color: kpi.color,
//             "&:hover": { bgcolor: "rgba(255,255,255,0.85)" },
//           }}
//         >
//           <Box component="span" sx={{ fontSize: 16, fontWeight: 700, lineHeight: 1 }}>
//             →
//           </Box>
//         </IconButton>
//       </Box>
//     </Paper>
//   );
// }

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

const KPI_ICONS = {
  revenue: AccountBalanceWalletOutlined,
  pipeline: AccountTreeOutlined,
  g2m: TrendingUpOutlined,
  headCount: GroupsOutlined,
  csat: SentimentSatisfiedAltOutlined,
};

export default function KpiCard({ kpi, onNavigate }) {
  const Icon = KPI_ICONS[kpi.key];

  const handleArrowClick = () => {
    if (onNavigate) {
      onNavigate(kpi.key);
    } else if (kpi.to) {
      window.location.href = kpi.to;
    }
  };

  return (
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

        {/* Always show the value */}
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
        <Stack
          direction="row"
          spacing={0.75}
        >
          {kpi.dots.map((dot, index) => (
            <Box
              key={
                typeof dot === "object"
                  ? dot.label
                  : index
              }
              title={
                typeof dot === "object"
                  ? dot.label
                  : undefined
              }
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor:
                  typeof dot === "object"
                    ? dot.color
                    : dot,
              }}
            />
          ))}
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
  );
}