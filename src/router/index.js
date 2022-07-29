import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        name: 'home',
        component: HomeView,
        redirect: '/welcome',
        children: [{ //用户页面
            path: '/users',
            name: 'users',
            component: () => import('../views/User/index.vue')
        }, { //欢迎页面
            path: '/welcome',
            name: 'welcome',
            component: () => import('../views/WelcomeView.vue')
        }, { //角色列表
            path: '/roles',
            name: 'roles',
            component: () => import('../views/Jurisdictions/RolesList.vue')
        }, { //权限列表
            path: '/rights',
            name: 'rights',
            component: () => import('../views/Jurisdictions/JurisdictionList.vue')
        }, { //商品列表
            path: '/goods',
            name: 'goods',
            component: () => import('../views/Goods/GoodsList.vue')
        }, { //添加商品
            path: '/addgoods',
            name: 'addgoods',
            component: () => import('../views/Goods/AddGoods.vue')
        }, { //categories商品分类
            path: '/categories',
            name: 'categories',
            component: () => import('../views/Goods/GoodsCate.vue')
        }, { //商品动态参数页面
            path: '/params',
            name: 'params',
            component: () => import('../views/Goods/ParamsView.vue')
        }, { //订单管理页面
            path: '/orders',
            name: 'orders',
            component: () => import('../views/Orders/OrdersList.vue')
        }, { //数据报表
            path: '/reports',
            name: 'reports',
            component: () => import('../views/Report/ReportsView.vue')
        }]
    },
    {
        path: '/about',
        name: 'about',
        component: () => import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/',
        name: 'login',
        component: () => import('../views/LoginView.vue')
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('token')
    if (to.path == '/' && token) {
        next('/home')
    }
    if (to.path == '/') {
        next()
    } else {
        if (token) {
            next()
        } else {
            next('/')
        }
    }
})
export default router