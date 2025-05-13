// viteRegistryManifestPlugin.ts
import path from "path";
import { Plugin } from "vite";
import { generateManifestContent, getRegistrationFiles } from "../";

export interface RegistryManifestPluginOptions {
  /** Directory to scan for registration files (default: src/registrations) */
  dir?: string;
  /** File suffix to match (default: "widgets") */
  suffix?: string;
  /**
   * The virtual module id to expose.
   * In our case we use "model-in/registryManifest" to reflect the library name.
   */
  virtualModuleName?: string;
}

export default function modelIn(
  options?: RegistryManifestPluginOptions
): Plugin {
  const registrationsDir = options?.dir || path.resolve(process.cwd(), "src");
  const suffix = options?.suffix || "widgets";
  const virtualModuleName = options?.virtualModuleName || "model-in/manifest";

  return {
    name: "model-in-manifest-plugin",
    resolveId(id: string) {
      if (id === virtualModuleName) return id;
      return null;
    },
    load(id: string) {
      if (id === virtualModuleName) {
        const files = getRegistrationFiles({ dir: registrationsDir, suffix });
        const content = generateManifestContent(files);
        return content;
      }
      return null;
    },
  };
}
