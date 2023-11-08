import { LDContext } from "launchdarkly-react-client-sdk";

export type FeatureToggleContext = LDContext;

export const extractCurrentFlags = (flagsWithHistory: {
  [key: string]: { current: any; previous: any };
}) => {
  const currentFlags: { [key: string]: any } = {};
  for (const [key, { current }] of Object.entries(flagsWithHistory)) {
    currentFlags[key] = current;
  }
  return currentFlags;
};
