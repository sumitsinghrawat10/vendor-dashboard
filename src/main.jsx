// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { PublicClientApplication } from "@azure/msal-browser";
// import { MsalProvider } from "@azure/msal-react";
// import CssBaseline from "@mui/material/CssBaseline";
// import App from "./App.jsx";
// import { msalConfig } from "./authConfig.js";

// const msalInstance = new PublicClientApplication(msalConfig);

// // msal-browser v3 requires initialize() before any other MSAL call,
// // and handleRedirectPromise() must run once on load to complete the
// // sign-in after Microsoft redirects back to this app.
// msalInstance.initialize().then(() => {
//   msalInstance.handleRedirectPromise().catch((error) => {
//     console.error("MSAL redirect error:", error);
//   });

//   createRoot(document.getElementById("root")).render(
//     <StrictMode>
//       <CssBaseline />
//       <MsalProvider instance={msalInstance}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </MsalProvider>
//     </StrictMode>
//   );
// });


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";

import App from "./App.jsx";
import { msalInstance } from "./msalInstance.js";

async function startApplication() {
  await msalInstance.initialize();

  ReactDOM.createRoot(
    document.getElementById("root")
  ).render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MsalProvider>
    </React.StrictMode>
  );
}

startApplication().catch((error) => {
  console.error("Application initialization failed:", error);
});