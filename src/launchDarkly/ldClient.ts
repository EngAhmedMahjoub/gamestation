import * as LDClient from "launchdarkly-react-client-sdk";

// Initialize LaunchDarkly client
// You need to set your LaunchDarkly client-side ID as an environment variable
const clientSideId = import.meta.env.VITE_LD_CLIENT_ID || "YOUR_LD_CLIENT_ID";

const user = {
  key: "user-" + Math.random().toString(36).substr(2, 9),
  anonymous: true,
};

export const ldClient = LDClient.initialize(clientSideId, user);
