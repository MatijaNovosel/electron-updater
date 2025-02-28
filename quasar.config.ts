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
      }
    },
    electron: {
      bundler: "builder",
      builder: {
        appId: "com.matija.updater",
        win: {
          target: ["squirrel"]
        }
      }
    }
  };
});
