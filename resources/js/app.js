require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {routes} from './routes'
import StoreData from './store'

Vue.use(VueRouter);

Vue.use(Vuex);
const store = new Vuex.Store(StoreData)

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
