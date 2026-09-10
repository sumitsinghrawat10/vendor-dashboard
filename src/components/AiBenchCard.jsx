import {
  Box,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

const SAMPLE_DATA = {
  adoption: {
    manualWorkSaved: 320,
    adoptionPercentage: 65,
    status: "Active",
    skills: [
      {
        level: "Beginner",
        shortName: "B",
        count: 62,
        color: "#0C447C",
        background: "#E6F1FB",
      },
      {
        level: "Intermediate",
        shortName: "I",
        count: 38,
        color: "#493A80",
        background: "#EAE7FA",
      },
      {
        level: "Advanced",
        shortName: "A",
        count: 15,
        color: "#176B3A",
        background: "#E4F4EA",
      },
    ],
  },

  bench: {
    totalHeadcount: 12,
    aiReadyResources: 53,
    allocatedResources: 31,
    planningStatus: "In progress",
  },
};

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    minHeight: 52,
    py: 1.25,
    borderBottom: "1px solid",
    borderColor: "divider",

    "&:last-child": {
      borderBottom: 0,
    },
  },

  label: {
    fontSize: 13,
    color: "text.secondary",
  },

  value: {
    fontSize: 14,
    fontWeight: 700,
    color: "text.primary",
    textAlign: "right",
    fontVariantNumeric: "tabular-nums",
  },
};

function SectionHeader({
  title,
  subtitle,
  color,
  accentColor,
}) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            width: 5,
            height: 30,
            flexShrink: 0,
            borderRadius: 4,
            bgcolor: accentColor,
          }}
        />

        <Box>
          <Typography
            component="h2"
            sx={{
              fontSize: 17,
              lineHeight: 1.3,
              fontWeight: 700,
              color,
            }}
          >
            {title}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 0.25,
              fontSize: 12,
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function MetricRow({ label, value, children }) {
  return (
    <Box sx={styles.row}>
      <Typography sx={styles.label}>{label}</Typography>

      {children ?? (
        <Typography sx={styles.value}>
          {value ?? "Data not available"}
        </Typography>
      )}
    </Box>
  );
}

function ProgressMetric({
  label,
  value,
  color,
  trackColor,
}) {
  const validValue = Math.min(
    100,
    Math.max(0, Number(value) || 0)
  );

  return (
    <Box
      sx={{
        py: 1.5,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          mb: 1,
        }}
      >
        <Typography sx={styles.label}>{label}</Typography>

        <Typography sx={styles.value}>
          {validValue}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={validValue}
        aria-label={`${label}: ${validValue}%`}
        sx={{
          height: 8,
          borderRadius: 10,
          bgcolor: trackColor,

          "& .MuiLinearProgress-bar": {
            borderRadius: 10,
            bgcolor: color,
          },
        }}
      />
    </Box>
  );
}

function DashboardCard({
  children,
  title,
  subtitle,
  headerColor,
  accentColor,
  borderColor,
  background,
}) {
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
    borderColor,
    bgcolor: background,
    transition:
      "transform 180ms ease, box-shadow 180ms ease",

    // Scrollbar styling
    scrollbarWidth: "thin",
    scrollbarColor: `${borderColor} transparent`,

    "&::-webkit-scrollbar": {
      width: "6px",
    },

    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: borderColor,
      borderRadius: "10px",
    },

    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#C89A32",
    },

    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 28px rgba(15, 23, 42, 0.08)",
    },
  }}
>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        color={headerColor}
        accentColor={accentColor}
      />

      {children}
    </Paper>
  );
}

export default function AiBenchCard({
  data = SAMPLE_DATA,
}) {
  const adoption = data?.adoption ?? {};
  const bench = data?.bench ?? {};

  const totalSkilledEmployees = (
    adoption.skills ?? []
  ).reduce(
    (total, skill) => total + (Number(skill.count) || 0),
    0
  );

  const availableResources = Math.max(
    0,
    (Number(bench.totalHeadcount) || 0) -
      (Number(bench.allocatedResources) || 0)
  );

  const allocationPercentage = bench.totalHeadcount
    ? Math.round(
        (bench.allocatedResources / bench.totalHeadcount) * 100
      )
    : 0;

const technicalResources = [
  {
    key: "aiEngineer",
    label: "AI Engineer",
    fallback: 3,
  },
  {
    key: "backendPythonDeveloper",
    label: "Backend Python Developer",
    fallback: 1,
  },
  {
    key: "dataEngineer",
    label: "Data Engineer",
    fallback: 1,
  },
  {
    key: "devOpsEngineer",
    label: "DevOps Engineer",
    fallback: 1,
  },
  {
    key: "frontEndDeveloper",
    label: "Front End Developer",
    fallback: 2,
  },
  {
    key: "fullStackAiSystemsEngineer",
    label: "Full Stack AI Systems Engineer",
    fallback: 1,
  },
  {
    key: "fullStackDeveloper",
    label: "Full Stack Developer",
    fallback: 1,
  },
  {
    key: "juniorDeveloper",
    label: "Junior Developer",
    fallback: 1,
  },
  {
    key: "seniorDataEngineer",
    label: "Senior Data Engineer",
    fallback: 1,
  },
];

  return (
    <Box
     sx={{
      display: {
        xs: "grid",
        lg: "contents",
      },
      gridTemplateColumns: {
        xs: "1fr",
      },
      gap: 2,

      "& > *": {
        minWidth: 0,
        height: "100%",
      },
    }}
    >
      {/* Technical Headcount */}
      <DashboardCard
        title="Technical Headcount"
        subtitle="Overview of available technical resources"
        headerColor="#805B0B"
        accentColor="#FAB219"
        borderColor="#EAD9B5"
        background="#FFFDF8"
      >
      <Stack>
  <MetricRow label="Total technical resources">
    <Typography
      sx={{
        ...styles.value,
        fontSize: 22,
        color: "#805B0B",
      }}
    >
      {bench.totalHeadcount ?? 77}
    </Typography>
  </MetricRow>

  {technicalResources.map((resource) => (
    <MetricRow
      key={resource.key}
      label={resource.label}
      value={bench[resource.key] ?? resource.fallback}
    />
  ))}

  {/* <MetricRow
    label="Allocated resources"
    value={bench.allocatedResources ?? 0}
  />

  <MetricRow
    label="Available resources"
    value={availableResources}
  />

  <ProgressMetric
    label="Resource allocation"
    value={allocationPercentage}
    color="#D99700"
    trackColor="#F9EDCF"
  /> */}

  <MetricRow label="Resource status">
    <Chip
      label={bench.planningStatus ?? "Not available"}
      size="small"
      sx={{
        bgcolor: "#FFF1CC",
        color: "#805B0B",
        fontWeight: 700,
      }}
    />
  </MetricRow>
</Stack>
      </DashboardCard>



      {/* AI Adoption */}
      <DashboardCard
        title="AI Adoption"
        subtitle="AI usage, efficiency and team readiness"
        headerColor="#0C447C"
        accentColor="#2F80C9"
        borderColor="#C9DFEF"
        background="#F7FBFF"
      >
        <Stack>
          <MetricRow
            label="Manual work saved"
            value={`${adoption.manualWorkSaved ?? 0} hrs`}
          />

          <MetricRow
            label="Employees with AI skills"
            value={totalSkilledEmployees}
          />

          <Box
            sx={{
              py: 1.5,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography sx={{ ...styles.label, mb: 1.25 }}>
              Team AI skill levels
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
            >
              {(adoption.skills ?? []).map((skill) => (
                <Tooltip
                  key={skill.level}
                  arrow
                  title={`${skill.shortName} means ${skill.level}`}
                >
                  <Chip
                    label={`${skill.level}: ${skill.count}`}
                    size="small"
                    sx={{
                      bgcolor: skill.background,
                      color: skill.color,
                      fontWeight: 700,
                      border: "1px solid",
                      borderColor: `${skill.color}25`,
                    }}
                  />
                </Tooltip>
              ))}
            </Stack>
          </Box>

          <ProgressMetric
            label="Adoption progress"
            value={adoption.adoptionPercentage}
            color="#2F80C9"
            trackColor="#DDEAF5"
          />

          <MetricRow label="Adoption status">
            <Chip
              label={adoption.status ?? "Not available"}
              size="small"
              sx={{
                bgcolor: "#E4F4EA",
                color: "#176B3A",
                fontWeight: 700,
              }}
            />
          </MetricRow>
        </Stack>
      </DashboardCard>

      
    </Box>
  );
}