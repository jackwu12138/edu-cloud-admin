import Vue from "vue";
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

const routes = [

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [{
      path: "dashboard",
      name: "首页",
      component: () => import("@/views/home/Home"),
      meta: {title: "首页", icon: "el-icon-menu"},
    }],
  },

  {
    path: "/course",
    component: Layout,
    name: "课程管理",
    redirect: 'noRedirect',
    meta: {
      title: "课程管理",
      icon: "el-icon-s-tools",
    },
    children: [
      {
        path: "article",
        name: "文章",
        // component: () => import("@/views/course/article/Article"),
        redirect: 'index',
        component: {render: c => c('router-view')},
        meta: {title: "文章", icon: "el-icon-s-tools"},
        children: [
          {
            hidden: true,
            path: "type",
            name: "文章类型",
            component: () => import("@/views/course/article/ArticleType"),
            meta: {title: "文章类型", activeMenu: '/course/article'},
          },
          {
            path: "index",
            name: "文章",
            component: () => import("@/views/course/article/Article"),
            meta: {title: "文章", breadcrumb: false},
          },
        ],
      },

    ],
  },
];


let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}

const router = new Router({
  base: process.env.VUE_APP_APP_NAME ? process.env.VUE_APP_APP_NAME : "/",
  mode: 'history',
  routes: routes,
});

export default router;
