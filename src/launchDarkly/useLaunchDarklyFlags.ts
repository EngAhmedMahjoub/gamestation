import { useContext } from "react";
import { useFlags } from "launchdarkly-react-client-sdk";

export const useLaunchDarklyFlags = () => {
  const flags = useFlags();

  return {
    showScreenshots: (flags.showScreenshots as boolean) || false,
    showTrailer: (flags.showTrailer as boolean) || false,
    showGameDetails: (flags.showGameDetails as boolean) || false,
  };
};
