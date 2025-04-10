import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./lib/i18n";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "./style.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});

const app = createApp(App);

app.use(VueQueryPlugin);
app.use(i18n);
app.use(router);
app.use(vuetify);

app.mount("#app");
