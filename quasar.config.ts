import { configure } from "quasar/wrappers";

export default configure(() => {
  return {
    boot: ["configurations"],
    supportTS: true,
    css: ["app.scss"],
    extras: ["mdi-v7", "roboto-font", "material-icons"],
    build: {
      target: {
        browser: ["es2022", "firefox115", "chrome115", "safari14"],
        node: "node20"
      },
      vueRouterMode: "hash",
      vitePlugins: []
    },
    sourceFiles: {
      router: "src/plugins/router"
    },
    devServer: {
      open: true,
      port: 9000
    },
    framework: {
      cssAddon: true,
      config: {
        ripple: {}
      },
      plugins: ["Loading", "Dialog"]
    },
    animations: [],
    ssr: {
      prodPort: 3000,
      middlewares: ["render"],
      pwa: false
    },
    capacitor: {
      hideSplashscreen: true
    },
    bex: {
      contentScripts: ["my-content-script"]
    },
    electron: {
      bundler: "packager",
      packager: {
        asar: true,
        overwrite: true,
        platform: "win32",
        name: "OBU"
      }
    }
  };
});
