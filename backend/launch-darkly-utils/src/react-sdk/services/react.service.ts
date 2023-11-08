import { FeatureToggleContext } from "../utils";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";

export class ReactService {
  /**
   * Initializes the Feature Toggle (FT) Provider using LaunchDarkly.
   *
   * @param {FeatureToggleContext} context - The user context for LaunchDarkly, which may include attributes like 'key', 'email', etc.
   * @param {string} clientSideID - The client-side ID for the LaunchDarkly project.
   *
   * @returns {Promise<React.ComponentType>} - Returns a Promise that resolves to the initialized FTProvider component.
   */
  async initializeFTProvider(
    context: FeatureToggleContext,
    clientSideID: string
  ) {
    const FTProvider = await asyncWithLDProvider({
      clientSideID: clientSideID,
      context,
    });
    return FTProvider;
  }
}
