import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
// A modern alternative to CSS resets
import "normalize.css/normalize.css";

// element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// global css
import "@/styles/index.scss";

// 全局组件
import RightToolbar from '@/components/RightToolbar'
import Pagination from '@/components/Pagination'
import SvgIcon from '@/components/SvgIcon'


// ========== Element-ui ========== //
Vue.use(ElementUI);

// ==========  全局挂载方法 ========== //

// ==========  全局挂载组件 ========== //
Vue.component("RightToolbar", RightToolbar);
Vue.component("Pagination", Pagination);
Vue.component("SvgIcon", SvgIcon);

// ==========  自定义插件 ========== //


Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
