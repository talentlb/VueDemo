import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

//非菜单项路由 和静态路由
export const noMenuRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: '控制台',
      component: () => import('@/views/dashboard'),
      meta: { title: '控制台', icon: 'el-icon-s-help' }
    }]
  },
  {
    path: '/modifyPassword',
    component: Layout,
    children: [{
      path: '/modifyPassword',
      name: '修改密码',
      component: () => import('@/views/modifyPassword'),
      meta: { title: '修改密码', icon: 'el-icon-s-custom' }
    }]
  }
]

/**
 * 页面路由配置，左侧页面菜单
 */
export const constantRoutes = [
  {
    path: '/demo',
    component: Layout,
    children: [{
      path: '/demo',
      name: '示例菜单',
      component: () => import('@/views/demo'),
      meta: { title: '示例菜单', icon: 'el-icon-user-solid' }
    }]
  },
  {
    path: '/authManage',
    component: Layout,
    name: '系统管理',
    meta: { title: '系统管理', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'member',
        name: '代理帐号',
        component: () => import('@/views/authManage/member'),
        meta: { title: '代理帐号', icon: 'el-icon-s-custom' }
      },
      {
        path: 'roles',
        name: '角色管理',
        component: () => import('@/views/authManage/roles'),
        meta: { title: '角色管理', icon: 'el-icon-user' }
      },
      {
        path: 'auth',
        name: '权限配置',
        component: () => import('@/views/authManage/auth'),
        meta: { title: '权限配置', icon: 'el-icon-view' }
      }
    ]
  },
]

// 未知路由，跳转到404
export const router404 = [
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...noMenuRoutes, ...constantRoutes, ...router404],
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
