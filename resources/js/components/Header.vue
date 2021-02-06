<template>
    <header class="text-gray-700 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round"
                     stroke-linejoin="round" stroke-width="2"
                     class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span class="ml-3 text-xl">Shopping Cart</span>
            </a>
            <nav
                class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                <router-link
                    class="mr-5 hover:text-gray-900"
                    :to="{name: 'products.index'}"
                >
                    Products
                </router-link>

                <template v-if="!currentUser">
                    <router-link
                        class="mr-5 hover:text-gray-900"
                        :to="{name: 'auth.login'}"
                    >
                        Login
                    </router-link>
                    <router-link
                        class="mr-5 hover:text-gray-900"
                        :to="{name: 'auth.register'}"
                    >
                        Register
                    </router-link>
                </template>

                <template v-else>
                    <router-link
                        class="mr-5 hover:text-gray-900"
                        :to="{name: 'products.create'}"
                    >
                        Create Product
                    </router-link>

                    <small class="mr-5 py-2 bg-indigo-100 rounded shadow-sm leading-7 text-sm text-gray-400">Welcome dear {{currentUser.name}}</small>
                    <a href="#" @click.prevent="logout" class="mr-5 hover:text-gray-900">Logout</a>
                </template>

            </nav>
            <router-link
                v-if="currentUser"
                class="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
                :to="{name: 'order.checkout'}"
            >
                Checkout<span class="inline-block ml-1" v-text="'(' + $store.state.cart.length + ' items)'"></span>
            </router-link>
            <router-link
                v-else
                class="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
                :to="{name: 'auth.login'}"
            >
                Checkout<small class="inline-block ml-1">(Login)</small>
            </router-link>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",

    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        },
    },

    methods: {
        logout() {
            this.$store.commit('logout');
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>

</style>
