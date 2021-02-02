export const routes = [
    {
        path: '/',
        name: 'products.index',
        component: () => import('./components/Products/Index')
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
