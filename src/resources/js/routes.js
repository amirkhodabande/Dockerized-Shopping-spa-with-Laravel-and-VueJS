export const routes = [
    {
        path: '/',
        name: 'products.index',
        component: () => import('./components/Products/Index')
    },

    {
        path: '/login',
        name: 'auth.login',
        component: () => import('./components/auth/login')
    },

    {
        path: '/register',
        name: 'auth.register',
        component: () => import('./components/auth/register')
    },

    {
        path: '/products/create',
        name: 'products.create',
        component: () => import('./components/Products/New'),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/products/:slug',
        name: 'products.show',
        component: () => import('./components/Products/Show')
    },

    {
        path: '/checkout',
        name: 'order.checkout',
        component: () => import('./components/Order/Checkout')
    },

    {
        path: '/summary',
        name: 'order.summary',
        component: () => import('./components/Order/Summary')
    }
]
