import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home-page',
        component: () => import('../views/ProductsPage.vue'),
    },
    {
        path: '/about',
        name: 'about-page',
        component: () => import('../views/About.vue')
    },
    {
        path: '/login',
        name: 'login-page',
        component: () => import('../views/LoginPage.vue')
    },
    {
        path: '/register',
        name: 'register-page',
        component: () => import('../views/RegisterPage.vue')
    },
    {
        path: '/contact',
        name: 'contact-page',
        component: () => import('../views/ContactPage.vue')
    },
    {
        path: '/products/:id',
        name: 'product-page',
        component: () => import('../views/ProductPage.vue')
    },
    {
        path: '/profile',
        component: () => import('../views/ProfilePage.vue'),
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore()
            if (!authStore.user?._id) next('login')
            next()
        },
        children: [
            {
                path: '',
                name: 'profile-page',
                component: () => import('../components/profile/MainProfile.vue')
            },
            {
                path: ':id',
                name: 'editProfile-page',
                component: () => import('../components/profile/EditProfile.vue')
            }
        ]
    },
    {
        path: '/admin/user-manager',
        component: () => import('../views/UserManagerPage.vue'),
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore()
            if (!authStore.user?._id) {
                next('login')
            } else {
                if (authStore.user.role !== 0) {
                    next('home')
                }
                next()
            }
        },
        children: [
            {
                path: '',
                name: 'user-manager',
                component: () => import('../components/user_manager/UserManager.vue')
            },
            {
                path: 'edit/:id',
                name: 'edit-user',
                component: () => import('../components/user_manager/EditUser.vue')
            },
            {
                path: 'add',
                name: 'add-user',
                component: () => import('../components/user_manager/AddUser.vue')
            }
        ]
    },
    {
        path: '/admin/product-manager',
        component: () => import('../views/ProductsManagerPage.vue'),
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore()
            if (!authStore.user?._id) {
                next('login')
            } else {
                if (authStore.user.role !== 0) {
                    next('home')
                }
                next()
            }
        },
        children: [
            {
                path: '',
                name: 'product-manager',
                component: () => import('../components/product_manager/ProductManager.vue')
            },
            {
                path: 'add',
                name: 'add-product',
                component: () => import('../components/product_manager/AddProduct.vue')
            },
            {
                path: 'edit/:id',
                name: 'edit-product',
                component: () => import('../components/product_manager/EditProduct.vue')
            }
        ]
    },
    {
        path: '/cart',
        name: 'cart-page',
        component: () => import('../views/CartPage.vue'),
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore()
            if (!authStore.user?._id) next('login')
            next()
        },
    },
    {
        path: '/admin/bill-manager',
        component: () => import('../views/BillsManager.vue'),
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore()
            if (!authStore.user?._id) {
                next('login')
            } else {
                if (authStore.user.role !== 0) {
                    next('home')
                }
                next()
            }
        },
        children: [
            {
                path: '',
                name: 'bill-manager',
                component: () => import('../components/bill_manager/BillsManager.vue')
            },
            {
                path: ':id',
                name: 'bill-approval',
                component: () => import('../components/bill_manager/BillApproval.vue')
            }
        ]
    },
    {
        path: '/bills',
        name: 'bills-page',
        component: () => import('../views/BillsPage.vue'),
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore()
            if (!authStore.user?._id) next('login')
            next()
        }
    },
    {
        path: '/bills/:id',
        name: 'bill-list',
        component: () => import('../components/bill_manager/BillList.vue'),
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore()
            if (!authStore.user?._id) next('login')
            next()
        }
    },
    {
        path: "/:pathMatch(.*)",
        name: "notfound",
        component: () => import("../views/NotFound.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
