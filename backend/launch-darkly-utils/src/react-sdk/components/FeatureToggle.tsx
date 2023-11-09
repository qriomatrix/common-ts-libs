import React, { ReactNode, useEffect, useState } from "react";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";

import { extractCurrentFlags, FeatureToggleContext } from "../utils";

interface FeatureToggleProps {
  flagKey: string;
  context?: FeatureToggleContext;
  fallback?: ReactNode;
  children?: ReactNode;
  onFlagChange?: (flagValue: boolean) => void;
}

/**
 * FeatureToggle Component
 *
 * This component toggles the display of its children based on the state of a feature flag.
 *
 * @param {FeatureToggleProps} props - The properties for the FeatureToggle component.
 * @param {string} props.flagKey - The key for the feature flag that controls the toggle.
 * @param {FeatureToggleContext} [props.context] - Optional. The user context for LaunchDarkly, which may include attributes like 'key', 'email', etc.
 * @param {ReactNode} [props.fallback] - Optional. The content to display when the feature flag is off.
 * @param {ReactNode} [props.children] - Optional. The content to display when the feature flag is on.
 * * @param {(flagValue: boolean) => void} [props.onFlagChange] - Optional. A callback function that is invoked whenever the flag value changes. The function receives the new flag value as its argument.
 * @returns {ReactNode} - Returns the children if the feature flag is on, otherwise returns the fallback.
 */

const FeatureToggle: React.FC<FeatureToggleProps> = ({
  flagKey,
  context,
  fallback,
  children,
  onFlagChange,
}) => {
  const initialFlags = useFlags();
  const [flags, setFlags] = useState(initialFlags);
  const client = useLDClient();

  useEffect(() => {
    const handleFlagChange = (newFlags: {
      [key: string]: { current: any; previous: any };
    }) => {
      const currentFlags = extractCurrentFlags(newFlags);
      setFlags(currentFlags);
      // Notify the parent component of the flag change
      if (onFlagChange) {
        onFlagChange(!!currentFlags[flagKey]);
      }
    };
    if (client && context) {
      client.identify(context).then(() => {
        const updatedFlags = client.allFlags();
        setFlags(updatedFlags);
      });
      // Subscribe to flag changes
      client.on("change", handleFlagChange);
    }
  }, [client, context, flagKey, onFlagChange]); // Add onFlagChange to dependency array
  return <>{flags[flagKey] ? children : fallback}</>;
};
export { FeatureToggle};
