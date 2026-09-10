import {
  Box,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { SOLUTION_STAGES } from "../data/dashboardData.js";

function normalizePercentage(value) {
  const percentage = Number(value);

  if (!Number.isFinite(percentage)) {
    return 0;
  }

  return Math.min(100, Math.max(0, percentage));
}

export default function SolutionsBreakdown({
  stages = SOLUTION_STAGES,
}) {
  const validStages = Array.isArray(stages) ? stages : [];

  const totalSolutions = validStages.reduce(
    (total, stage) => total + (Number(stage.count) || 0),
    0
  );

  return (
    <Paper
     component="section"
  elevation={0}
  variant="outlined"
  sx={{
    p: { xs: 2, sm: 2.5 },
    minWidth: 0,

    minHeight: 300,
    maxHeight: 500,
    overflowY: "auto",
    overflowX: "hidden",

    borderRadius: "18px",
    borderColor: "#DDDDE5",
    bgcolor: "background.paper",
    transition:
      "transform 180ms ease, box-shadow 180ms ease",

    // Firefox scrollbar
    scrollbarWidth: "thin",
    scrollbarColor: "#C5C5CF transparent",

    // Chrome and Edge scrollbar
    "&::-webkit-scrollbar": {
      width: "6px",
    },

    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#C5C5CF",
      borderRadius: "10px",
    },

    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#9E9EAA",
    },

    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 28px rgba(15, 23, 42, 0.08)",
    },
  }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          mb: 2.5,
        }}
      >
        <Box>
          <Typography
            component="h2"
            sx={{
              fontSize: 17,
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Solutions by stage
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 0.35,
              fontSize: 12,
            }}
          >
            Distribution across the delivery pipeline
          </Typography>
        </Box>

        <Box
          sx={{
            minWidth: 60,
            px: 1.5,
            py: 0.75,
            textAlign: "center",
            borderRadius: 2.5,
            bgcolor: "#F1F5F9",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.8rem",
              lineHeight: 1.1,
              fontWeight: 700,
              color: "#1E3A5F",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {totalSolutions}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 0.25, fontSize: 13 }}
          >
            Total
          </Typography>
        </Box>
      </Box>

      {!validStages.length ? (
        <Box
          sx={{
            minHeight: 150,
            display: "grid",
            placeItems: "center",
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Typography color="text.secondary" sx={{ fontSize: 13 }}>
            No solution data available
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2.25}>
          {validStages.map((stage) => {
            const count = Number(stage.count) || 0;
            const percentage = normalizePercentage(stage.pct);
            const color = stage.color || "#2F80C9";

            return (
              <Box key={stage.name}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    mb: 0.8,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      minWidth: 0,
                    }}
                  >
                    <Box
                      aria-hidden="true"
                      sx={{
                        width: 9,
                        height: 9,
                        flexShrink: 0,
                        borderRadius: "50%",
                        bgcolor: color,
                      }}
                    />

                    <Tooltip title={stage.description || stage.name}>
                      <Typography
                        sx={{
                          minWidth: 0,
                          fontSize: 13,
                          fontWeight: 600,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {stage.name}
                      </Typography>
                    </Tooltip>
                  </Box>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    flexShrink={0}
                  >
                    <Typography
                      color="text.secondary"
                      sx={{
                        fontSize: 12,
                        fontWeight: 600,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {percentage}%
                    </Typography>

                    <Chip
                      size="small"
                      label={count}
                      aria-label={`${count} solutions`}
                      sx={{
                        minWidth: 38,
                        height: 24,
                        bgcolor: `${color}18`,
                        color,
                        fontWeight: 700,
                      }}
                    />
                  </Stack>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  aria-label={`${stage.name}: ${count} solutions, ${percentage}%`}
                  sx={{
                    height: 9,
                    borderRadius: 10,
                    bgcolor: "#ECEFF3",

                    "& .MuiLinearProgress-bar": {
                      bgcolor: color,
                      borderRadius: 10,
                      transition: "transform 400ms ease",
                    },
                  }}
                />
              </Box>
            );
          })}
        </Stack>
      )}
    </Paper>
  );
}