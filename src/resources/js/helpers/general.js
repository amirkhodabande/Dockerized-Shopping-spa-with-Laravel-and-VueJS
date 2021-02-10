export function initialize(store, router) {
    //Auth check
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = store.state.currentUser;


        if (requiresAuth && !currentUser) {
            next('/login');
        } else if (to.path === '/login' || to.path === '/register') {
            if (currentUser)
                next('/');
            next();
        } else {
            next();
        }
    });

    //Errors
    axios.interceptors.response.use(null, (error) => {
        if (error.response.status === 401) {
            store.commit('logout');
            router.push('/login');
        }

        return Promise.reject(error);
    });

    //Add default header to all axios requests
    if (store.getters.currentUser) {
        setAuthorization(store.getters.currentUser.token);
    }

}

export function setAuthorization(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export function getLocalCart() {
    const cartStr = localStorage.getItem('cart');

    if (!cartStr)
        return []

    return JSON.parse(cartStr);
}
