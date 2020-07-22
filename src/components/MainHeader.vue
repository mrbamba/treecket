<template>
    <div class="main-header" :style="{ backgroundColor }">
        <div class="main-header-logo">
            <router-link to="/">
                <img :src="logoSrc" alt ref="logo" />
                <h1>Treecket</h1>
            </router-link>
        </div>
        <nav>
            <!-- <router-link to="/">Home</router-link> | -->

            <router-link to="/board">
                <font-awesome-icon fas icon="th-large" /> 
                Boards
            </router-link>|
            <router-link to="/login">Log in</router-link>
            <!-- <router-link to="/about">About</router-link> -->
        </nav>
    </div>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            logoSrc: require('@/assets/logo-white.png')
        }
    },
    computed: {
        backgroundColor() {
            if (!this.$route.params.boardId) {
                // return '#f2f8ff';
                return '#026aa7';
            }
        },
        // logoSrc() {
        //     return (!this.$route.params.boardId) ? '@/assets/logo.png' : '@/assets/logo-white.png';
        // }
    },
    watch: {
        $route(to, from) {
            // Loading gif
            console.log('START ANIMATION')
            this.logoSrc = require('@/assets/logo-white-bouncing-fast.gif');
            setTimeout(() => this.logoSrc = require('@/assets/logo-white.png'), 3700);
        }
    }
};
</script>

<style>
</style>