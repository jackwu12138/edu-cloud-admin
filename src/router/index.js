import Vue from "vue";
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

const routes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [{
      path: "dashboard",
      name: "首页",
      component: () => import("@/views/home/Home"),
      meta: {title: "首页", icon: "fa-th-large"},
    }],
  },

  {
    path: "/course",
    component: Layout,
    name: "课程管理",
    redirect: 'noRedirect',
    meta: {
      title: "课程管理",
      icon: "fa-book",
    },
    children: [
      {
        path: "article",
        name: "文章",
        // component: () => import("@/views/course/article/Article"),
        redirect: 'index',
        component: {render: c => c('router-view')},
        meta: {title: "文章", icon: "fa-paste"},
        children: [
          {
            path: "index",
            name: "文章",
            component: () => import("@/views/course/article/Article"),
            meta: {title: "文章", breadcrumb: false},
          },
          {
            hidden: true,
            path: "type",
            name: "文章类型",
            component: () => import("@/views/course/article/ArticleType"),
            meta: {title: "文章类型", activeMenu: '/course/article/index'},
          },
          {
            hidden: true,
            path: 'create',
            name: "新建文章",
            component: () => import("@/views/course/article/EditArticle"),
            meta: {title: "新建文章", activeMenu: '/course/article/index'},
          },
          {
            hidden: true,
            path: 'edit',
            name: "编辑文章",
            component: () => import("@/views/course/article/EditArticle"),
            meta: {title: "编辑文章", activeMenu: '/course/article/index'},
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


const createRouter = () => new Router({
  base: process.env.VUE_APP_APP_NAME ? process.env.VUE_APP_APP_NAME : "/",
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: routes,
})

const router = createRouter()

export function resetRouter() {
  let newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}


export default router;


