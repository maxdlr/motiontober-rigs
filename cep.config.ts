import { CEP_Config } from "vite-cep-plugin";
import { version } from "./package.json";
import { MTB_RIGS_NAMES } from "./src/jsx/aeft/Rigs/enums/MtbRigsNames";


const config: CEP_Config = {
  version,
  id: `com.${MTB_RIGS_NAMES.EXTENSION_IDENTIFIER}.cep`,
  displayName: MTB_RIGS_NAMES.EXTENSION_NAME,
  symlink: "local",
  port: 3000,
  servePort: 5000,
  startingDebugPort: 8860,
  extensionManifestVersion: 6.0,
  requiredRuntimeVersion: 9.0,
  hosts: [{ name: "AEFT", version: "[0.0,99.9]" }],
  type: "Panel",
  iconDarkNormal: "./src/assets/light-icon.png",
  iconNormal: "./src/assets/dark-icon.png",
  iconDarkNormalRollOver: "./src/assets/light-icon.png",
  iconNormalRollOver: "./src/assets/dark-icon.png",
  parameters: ["--v=0", "--enable-nodejs", "--mixed-context"],
  width: 500,
  height: 550,

  panels: [
    {
      mainPath: "./main/index.html",
      name: "main",
      panelDisplayName: MTB_RIGS_NAMES.EXTENSION_NAME,
      autoVisible: true,
      width: 600,
      height: 650,
    },
  ],
  build: {
    jsxBin: "off",
    sourceMap: true,
  },
  zxp: {
    country: "FR",
    province: "RH",
    org: MTB_RIGS_NAMES.FULL_ORG,
    password: "mypassword",
    tsa: "http://timestamp.digicert.com/",
    sourceMap: false,
    jsxBin: "off",
  },
  installModules: [],
  copyAssets: [],
  copyZipAssets: [],
};
export default config;
