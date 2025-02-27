import { boot } from "quasar/wrappers";
import { i18n } from "src/configurations/i18n";

export default boot(async ({ app }) => {
  app.use(i18n);
});
