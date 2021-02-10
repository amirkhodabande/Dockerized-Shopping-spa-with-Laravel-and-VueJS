<template>
    <section class="text-gray-700 body-font overflow-hidden" v-if="product">
        <div class="container px-12 py-14 mx-auto">
            <div class="lg:w-3/5 mx-auto flex flex-wrap">

                <img src="http://shop-laravel_vue.com/images/test-products/palm_treo_pro_1-270x405.jpg" alt="ecommerce app" height="640" width="640"
                     class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded">

                <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2
                        class="text-sm title-font text-gray-500 tracking-widest uppercase inline-block mr-0"
                        v-for="category in product.categories"
                        v-text="category.name"
                    ></h2>

                    <h1
                        class="text-gray-900 text-3xl title-font font-medium mb-2"
                        v-text="product.name"
                    ></h1>

                    <p
                        class="leading-relaxed"
                        v-text="product.description"
                    ></p>

                    <div class="flex mt-6 pt-4 border-t-2 border-gray-200">
                        <span
                            class="title-font font-medium text-2xl text-gray-900"
                            v-text="formatCurrency(product.price)"
                        ></span>

                        <button
                            v-if="currentUser"
                            class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                            @click="addToCart(product)"
                        >Add to Cart</button>
                        <router-link
                            :to="{name: 'auth.login'}"
                            v-else
                            class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                        >Login to add product into your cart</router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Show",

    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        },

        products() {
            return this.$store.state.products
        },

        product() {
            return this.products.find(product => product.slug === this.$route.params.slug);
        }
    },

    methods: {
        formatCurrency(price) {
            price = (price / 100);
            return price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
        },

        addToCart(product) {
            this.$store.commit('addToCart', product);
            this.$toaster.info(product.name + " Added to the cart successfully :)");
        }
    },
}
</script>

<style scoped>

</style>
