<template>
    <div class="main-header" :style="{ backgroundColor }">
        <!-- <input class="minimal-input" style="" /> -->
        <router-link to="/" class="main-header-logo">
            <img :src="logoSrc" alt ref="logo" />
            <h1>Treecket</h1>
        </router-link>
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
            logoSrc: require('@/assets/logo-white.png'),
        }
    },
    created() {
        this.logoSrc = require('@/assets/logo-white-bouncing-fast.gif'); // 11 frames (1100ms - 1 bounce +100ms for first frame on last bounce)
        this.logoTimeout = setTimeout(() => this.logoSrc = require('@/assets/logo-white.png'), 1200);
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
            this.logoSrc = require('@/assets/logo-white-bouncing-fast.gif'); // 11 frames (1100ms - 1 bounce)
            setTimeout(() => this.logoSrc = require('@/assets/logo-white.png'), 1200);
        }
    }
};
</script>

<style>
</style>