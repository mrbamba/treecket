<template>
    <header class="main-header">
        <nav>
            <router-link to="/">
                <i class="fas fa-home"></i>
            </router-link>
            <router-link to="/board">
                <i class="fas fa-th-large" />
                <span>Boards</span>
            </router-link>
            <div class="ticket-search">
                <input type="text" @blur="clearInput" ref="ticketSearch" />
                <button>
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </nav>

        <router-link to="/" class="main-header-logo">
            <img :src="logoSrc" alt ref="logo" />
            <h1>Treecket</h1>
        </router-link>
        <!-- <router-link to="/login">Log in</router-link> -->
        <!-- <avatar :username="user.fullName" :src="user.imgSrc" :size="32" /> -->

        <!-- <router-link to="/about">About</router-link> -->
    </header>
</template>

<script>
export default {
    name: "MainHeader",
    props: ['user'],
    data() {
        return {
            logoSrc: require('@/assets/logo-white.png'),
        }
    },
    created() {
        this.logoSrc = require('@/assets/logo-white-bouncing-fast.gif');
        this.logoTimeout = setTimeout(() =>
            this.logoSrc = require('@/assets/logo-white.png'), this.gifRepeats(3));
    },
    methods: {
        gifRepeats(count, frames = 11) {
            // 11 frames (1100ms) + 1st frame at end of cycle
            return frames * count * 100 + 75;
        },
        clearInput() {
            this.$refs.ticketSearch.value = '';
        }
    },
    watch: {
        $route(to, from) {
            // Loading gif
            this.logoSrc = require('@/assets/logo-white-bouncing-fast.gif'); // 11 frames (1100ms - 1 bounce)
            this.logoTimeout = setTimeout(() =>
                this.logoSrc = require('@/assets/logo-white.png'), this.gifRepeats(1));
        }
    }
};
</script>

<style>
</style>