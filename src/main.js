import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import { projectAuth } from "./firebase/config";
let app;

//not render app until auth state first changes- connection with db is made
projectAuth.onAuthStateChanged(() => {
  // ex do not rerun app if user loggs out
  if (!app) {
    app = createApp(App)
      .use(router)
      .mount("#app");
  }
});
