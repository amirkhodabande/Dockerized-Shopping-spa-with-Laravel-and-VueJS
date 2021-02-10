import {getLocalUser} from "./helpers/auth";
import {getLocalCart} from "./helpers/general";

const user = getLocalUser();
const localCart = getLocalCart();

export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
        products: [],
        cart: localCart,
        order: {}
    },
    getters: {
        isLoading(state) {
            return state.loading;
        },

        isLoggedIn(state) {
            return state.isLoggedIn;
        },

        currentUser(state) {
            return state.currentUser;
        },

        authError(state) {
            return state.auth_error;
        },
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },

        loginSuccess(state, payload) {
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});
            //    Save logged in user information to the local storage....
            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },

        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },

        logout(state) {
            localStorage.removeItem('user');
            localStorage.removeItem('cart');
            state.isLoggedIn = false;
            state.currentUser = null;
        },

        updateProducts(state, products) {
            state.products = products;
        },

        addToCart(state, product) {
            // Check if product exist, increase quantity of the product instead of adding product to product list
            let productInCartIndex = state.cart.findIndex(item => item.slug === product.slug);

            if (productInCartIndex !== -1) {
                state.cart[productInCartIndex].quantity++;
                return;
            }

            product.quantity = 1;
            state.cart.push(product);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        removeFromCart(state, index) {
            state.cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        updateOrder(state, order) {
            state.order = order;
        },

        updateCart(state, cart) {
            state.cart = cart;
            localStorage.setItem("cart", JSON.stringify(state.cart));
        }
    },

    actions: {
        login(context) {
            context.commit("login");
        },

        getProducts({commit}) {
            axios.get('/api/products')
                .then((response) => {
                    commit('updateProducts', response.data);
                })
                .catch((error) => console.error(error));
        },

        clearCart({commit}) {
            commit('updateCart', []);
        }
    },
}
