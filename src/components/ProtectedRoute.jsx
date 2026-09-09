import {
  MsalAuthenticationTemplate,
} from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import {
  Alert,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { loginRequest } from "../authConfig.js";

function LoadingComponent() {
  return (
    <Box
      role="status"
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress size={32} />

        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Signing you in…
        </Typography>
      </Box>
    </Box>
  );
}

function ErrorComponent({ error }) {
  return (
    <Box sx={{ p: 3 }}>
      <Alert severity="error">
        Authentication failed:{" "}
        {error?.message || "Unable to sign in."}
      </Alert>
    </Box>
  );
}

export default function ProtectedRoute({ children }) {
  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={loginRequest}
      loadingComponent={LoadingComponent}
      errorComponent={ErrorComponent}
    >
      {children}
    </MsalAuthenticationTemplate>
  );
}