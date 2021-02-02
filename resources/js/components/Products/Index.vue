<template>

    <section class="text-gray-700 body-font">
        <div class="container px-5 py-24 mx-auto">

            <div class="flex flex-wrap -m-4" v-if="!products.length">
                <div class="lg:w-1/4 md:w-1/2 p-4 w-full mb-4">

                    <a class="block relative h-48 rounded overflow-hidden">
                        <img src="http://shop-laravel_vue.com/images/test-products/palm_treo_pro_1-270x405.jpg" height="420" width="260" alt=""
                             class="object-cover object-center w-full h-full block">
                    </a>

                    <div class="mt-4">
                        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase inline-block mr-2">
                            N/A
                        </h3>

                        <h2 class="text-gray-900 title-font text-lg font-medium">Loading</h2>

                        <p class="mt-1">$0.00</p>
                    </div>

                </div>
            </div>
            <div class="flex flex-wrap -m-4" v-else>
                <div class="lg:w-1/4 md:w-1/2 p-4 w-full mb-4"
                     v-for="product in products"
                     :key="product.id"
                >
                    <router-link :to="{name: 'products.show', params: {slug: product.slug}}"
                                 class="block relative h-48 rounded overflow-hidden">
                        <img src="http://shop-laravel_vue.com/images/test-products/ipod_classic_1-270x405.jpg" height="420" width="260" alt=""
                             class="object-cover object-center w-full h-full block">
                    </router-link>

                    <div class="mt-4">
                        <h3
                            class="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase inline-block mr-2"
                            v-for="category in product.categories"
                            v-text="category.name"
                        ></h3>

                        <h2
                            class="text-gray-900 title-font text-lg font-medium"
                            v-text="product.name"
                        ></h2>

                        <p class="mt-1" v-text="formatCurrency(product.price)"></p>
                    </div>

                </div>
            </div>
        </div>
    </section>

</template>

<script>
export default {
    name: "Index",

    computed: {
        products() {
            return this.$store.state.products;
        }
    },

    methods: {
        formatCurrency(price) {
            price = (price / 100);
            return price.toLocaleString('en-US', { style: 'currency', currency: 'USD'});
        }
    }
}
</script>

<style scoped>

</style>
