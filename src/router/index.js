import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        name: 'home',
        component: HomeView
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