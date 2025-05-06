import { createApp } from "vue";
import App from "./main.vue";
import { initBolt } from "../lib/utils/bolt";
initBolt();

import "../index.scss";

createApp(App).mount("#root");
