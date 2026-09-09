import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
} from "@mui/material";

const EMAIL_STORAGE_KEY = "userEmail";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
        gridTemplateColumns: "repeat(2, 13px)",
        gridTemplateRows: "repeat(2, 13px)",
        gap: "2px",
      }}
    >
      {colors.map((color) => (
        <Box
          key={color}
          sx={{
            width: 13,
            height: 13,
            bgcolor: color,
          }}
        />
      ))}
    </Box>
  );
}

export default function EmailAccessDialog({
  open,
  kpiLabel,
  onClose,
  onContinue,
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    const savedEmail =
      sessionStorage.getItem(EMAIL_STORAGE_KEY) || "";

    setEmail(savedEmail);
    setError("");
  }, [open]);

 const handleSubmit = (event) => {
  event.preventDefault();

  const normalizedEmail = email
    .trim()
    .toLowerCase();

  if (!normalizedEmail) {
    setError("Enter your email address.");
    return;
  }

  if (!isValidEmail(normalizedEmail)) {
    setError("Enter a valid email address.");
    return;
  }

  onContinue(normalizedEmail);
};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="email-access-title"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 550,
          minHeight: 390,
          m: 2,
          borderRadius: 0,
          boxShadow:
            "0 4px 18px rgba(0, 0, 0, 0.24)",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(232, 239, 248, 0.78)",
            backdropFilter: "blur(2px)",
          },
        },
      }}
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: 390,
          px: {
            xs: 3,
            sm: 7,
          },
          pt: {
            xs: 4,
            sm: 5.5,
          },
          pb: 4,
        }}
      >
        {/* Microsoft logo */}
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
              fontSize: 24,
              lineHeight: 1,
              fontWeight: 600,
            }}
          >
            Microsoft
          </Typography>
        </Box>

        <Typography
          id="email-access-title"
          component="h2"
          sx={{
            mb: 1,
            color: "#1B1B1B",
            fontSize: {
              xs: 25,
              sm: 29,
            },
            lineHeight: 1.3,
            fontWeight: 600,
          }}
        >
          Enter your account
        </Typography>

        <Typography
          sx={{
            mb: 3,
            color: "#444444",
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          Enter your email address to continue to{" "}
          <strong>{kpiLabel}</strong>.
        </Typography>

        <TextField
          fullWidth
          autoFocus
          variant="standard"
          type="email"
          value={email}
          error={Boolean(error)}
          helperText={error}
          placeholder="Email, phone, or Skype"
          autoComplete="email"
          onChange={(event) => {
            setEmail(event.target.value);

            if (error) {
              setError("");
            }
          }}
          inputProps={{
            "aria-label": "Email address",
          }}
          sx={{
            mb: 2.5,

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
              cursor: "default",
            }}
          >
            Contact your administrator
          </Box>
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            mt: "auto",
            pt: 4,
          }}
        >
          <Button
            type="button"
            onClick={onClose}
            sx={{
              minWidth: 108,
              minHeight: 34,
              borderRadius: 0,
              bgcolor: "#CCCCCC",
              color: "#1B1B1B",
              textTransform: "none",

              "&:hover": {
                bgcolor: "#BBBBBB",
              },
            }}
          >
            Back
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{
              minWidth: 108,
              minHeight: 34,
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
  );
}