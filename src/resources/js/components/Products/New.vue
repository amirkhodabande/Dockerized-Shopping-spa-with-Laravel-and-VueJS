<template>

    <div class="w-full">
        <div class="lg:w-1/2 w-full mx-auto mt-8 overflow-auto">

            <div class="lg:w-2/3 w-full mx-auto mt-8">
                <div class="flex flex-wrap -mx-2 mt-8">

                    <!-- Start getting user information-->
                    <form @submit.prevent="createProduct">
                        <div class="p-2 w-full">
                            <div class="relative">
                                <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    v-model="form.name"
                                    :disabled="loading"
                                >
                            </div>
                        </div>

                        <div class="p-2 w-full">
                            <div class="relative">
                                <label for="description" class="leading-7 text-sm text-gray-600">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    v-model="form.description"
                                    :disabled="loading"
                                >
                            </div>
                        </div>

                        <div class="p-2 w-full">
                            <div class="relative">
                                <label for="price" class="leading-7 text-sm text-gray-600">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    v-model="form.price"
                                    :disabled="loading"
                                >
                            </div>
                        </div>


                        <div class="p-2 w-full">
                            <button
                                type="submit"
                                class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                :disabled="this.loading"
                                v-text="this.loading ? 'Loading...' : 'Create'"
                            ></button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
import validate from 'validate.js';

export default {
    name: "register",
    data() {
        return {
            loading: false,
            form: {
                name: '',
                description: '',
                price: '',
            },
            errors: ''
        }
    },

    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        },
    },
    methods: {
        createProduct() {
            this.errors = null;

            const constraints = this.getConstraints();

            const errors = validate(this.$data.form, constraints)

            if (errors) {
                this.errors = errors;
                this.$toaster.error(errors);
                return;
            }

            axios.post('/api/products', this.$data.form)
                .then((response) => {
                    this.$toaster.success(
                        `Product: ${this.$data.form.name}, Created successfully.`
                    );
                    this.$router.push('/')
                });

        },
        getConstraints() {
            return {
                name: {
                    presence: true,
                    length: {
                        minimum: 3,
                        message: 'Must be at least 3 characters long'
                    }
                },
                description: {
                    presence: true,
                    length: {
                        minimum: 15,
                        message: 'Must be at least 15 characters long'
                    }
                },
                price: {
                    presence: true,
                    numericality: true,
                },
            }
        },
    }

}
</script>

<style scoped>

</style>
