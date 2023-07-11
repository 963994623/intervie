import { RouterHistory, createRouter, createWebHistory, RouteRecordRaw, Router } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: "/Login",
        component: () => import(/* webpackChunkName: "login" */ '../views/Login/index.vue')
        , children: []
    },
    {
        path: "/Search",
        name: "Search",
        component: () => import(/* webpackChunkName: "login" */ '../views/Search/index.vue')
    }
    // 其他路由配置...
]

const router: Router = createRouter({
    history: createWebHistory() as RouterHistory,
    routes
})


export default router