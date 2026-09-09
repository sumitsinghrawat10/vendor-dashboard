// export const msalConfig = {
//   auth: {
//     clientId: "8a6c1ab7-1fdd-42ec-b851-891b4ac64905",

//     authority:
//       "https://login.microsoftonline.com/15b9be72-32a2-43aa-bfa9-111b62ef53ea",

//     redirectUri: "http://localhost:5175/auth",

//     postLogoutRedirectUri: "http://localhost:5175/auth",

//     navigateToLoginRequestUrl: true,
//   },

//   cache: {
//     cacheLocation: "sessionStorage",
//     storeAuthStateInCookie: false,
//   },
// };

// export const loginRequest = {
//   scopes: ["User.Read"],
// };

export const msalConfig = {
  auth: {
    clientId: "e88d0495-24b9-422b-b325-ff4cdc386287",

    authority:
      "https://login.microsoftonline.com/15b9be72-32a2-43aa-bfa9-111b62ef53ea",

    redirectUri: "https://vendor-dashboards.netlify.app/auth",

    postLogoutRedirectUri: "https://vendor-dashboards.netlify.app/auth",

    navigateToLoginRequestUrl: true,
  },

  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};