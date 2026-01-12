import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import theme from "./theme";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ldClient } from "./launchDarkly/ldClient";
import { withLDProvider } from "launchdarkly-react-client-sdk";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);

const AppWithLD = withLDProvider({
  clientSideID: import.meta.env.VITE_LD_CLIENT_ID || "YOUR_LD_CLIENT_ID",
  user: {
    key: "user-" + Math.random().toString(36).substr(2, 9),
    anonymous: true,
  },
  options: {
    baseUrl: "https://app.launchdarkly.com",
  },
})(App);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AppWithLD />
);
