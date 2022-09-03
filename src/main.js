import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
import Cookies from 'js-cookie'
// A modern alternative to CSS resets
import "normalize.css/normalize.css";

// element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// icons
import './icons'

// global css
import "@/styles/index.scss";

// 全局组件
import RightToolbar from '@/components/RightToolbar'
import Pagination from '@/components/Pagination'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
// ========== v-md-editor ========== //
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';
// ==========  全局挂载方法 ========== //
import {parseTime} from '@/utils/common'
import * as modal from '@/utils/element'
import * as cache from '@/utils/cache'

// ========== Element-ui ========== //
Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium',
})

// markdown插件
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
});
Vue.use(VueMarkdownEditor);


Vue.prototype.$parseTime = parseTime
Vue.prototype.$modal = modal
Vue.prototype.$cache = cache

// ==========  全局挂载组件 ========== //
Vue.component("RightToolbar", RightToolbar);
Vue.component("Pagination", Pagination);
Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
