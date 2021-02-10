<template>

    <div class="w-full">
        <div class="lg:w-1/2 w-full mx-auto mt-8 overflow-auto">

            <div class="lg:w-2/3 w-full mx-auto mt-8">
                <div class="flex flex-wrap -mx-2 mt-8">

                    <!-- Start getting user information-->
                    <form @submit.prevent="register">
                        <div class="p-2 w-full">
                            <div class="relative">
                                <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    v-model="form.name"
                                    :disabled="this.$store.state.loading"
                                >
                            </div>
                        </div>
                        <div class="p-2 w-full">
                            <div class="relative">
                                <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    v-model="form.email"
                                    :disabled="this.$store.state.loading"
                                >
                            </div>
                        </div>
                        <div class="p-2 w-full">
                            <div class="relative">
                                <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    v-model="form.password"
                                    :disabled="this.$store.state.loading"
                                >
                            </div>
                        </div>

                        <div class="p-2 w-full">
                            <button
                                type="submit"
                                class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                :disabled="this.$store.state.loading"
                                v-text="this.$store.state.loading ? 'Loading...' : 'Regsiter'"
                            ></button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
import {register} from '../../helpers/auth'
import {login} from '../../helpers/auth'
import validate from 'validate.js';

export default {
    name: "register",

    data() {
        return {
            form: {
                name: '',
                email: '',
                password: ''
            },
            errors: null,
        };
    },

    computed: {
        authError() {
            return this.$store.getters.authError;
        }
    },

    methods: {
        register() {
            const constraints = this.getConstraints();

            const errors = validate(this.$data.form, constraints)

            if (errors) {
                this.errors = errors;
                this.notifyErrors(this.errors);
                return;
            }

            register(this.$data.form)
                .then((res) => {

                    //login user after registration completed
                    this.$store.dispatch('login');

                    login(this.$data.form)
                        .then((res) => {
                            this.$store.commit("loginSuccess", res);
                            this.$router.push({path: '/'});
                            this.$toaster.info('Registration successfully done, now you are logged in :))')
                        })
                        .catch((error) => {
                            this.$store.commit("loginFailed", {error});
                            this.$toaster.error('Registration failed :((');
                        });

                })
                .catch((error) => {

                    console.log("error error")

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
                email: {
                    presence: true,
                    email: true,
                },
                password: {
                    presence: true,
                    length: {
                        minimum: 8,
                        message: 'Must be at least 8 characters long'
                    }
                }
            }
        },

        notifyErrors(errors) {
                this.$toaster.error(errors);
        },
    },
}
</script>

<style scoped>

</style>
