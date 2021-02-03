require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {routes} from './routes'
import StoreData from './store'
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'

Vue.use(VueRouter);

Vue.use(Vuex);
const store = new Vuex.Store(StoreData)

Vue.use(Toaster, {timeout: 5000})

const router = new VueRouter({
    routes,
    mode: "history"
});

const app = new Vue({
    router,
    store,
    el: '#app',

    created() {
       store.dispatch('getProducts')
           .then(_ => {})
           .catch((error) => console.error(error));
    },
});
