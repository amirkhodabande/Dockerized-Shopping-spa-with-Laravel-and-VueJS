<template>

    <div class="wrapper">
        <Header/>
        <router-view></router-view>
    </div>

</template>

<script>
import Header from "./Header";
export default {
    name: "main-app",

    components: {Header},
}
</script>

<style scoped>

</style>
