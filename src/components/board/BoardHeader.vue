<template>
    <header class="board-header">
        <nav>
            <router-link to="/">
                <i class="fas fa-home"></i>
            </router-link>
            <router-link to="/board">
                <i class="fas fa-th-large" />
                <span class="hidden show-normal">Boards</span>
            </router-link>
            <div class="ticket-search">
                <input type="text" @blur="clearInput" ref="ticketSearch" />
                <button @click.stop="ticketSearchFocus">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </nav>

        <router-link to="/" class="board-header-logo">
            <img :src="logoSrc" alt ref="logo" />
            <h1>Treecket</h1>
        </router-link>
        <avatar
            class="logged-in-user-avatar"
            :username="displayUser.fullName"
            :src="displayUser.imgSrc"
            :size="30"
        />
        <!-- <avatar :username="user.fullName" :src="user.imgSrc" :size="32" /> -->
        <!-- <router-link to="/login">Log in</router-link> -->
    </header>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
    name: "BoardHeader",
    props: ['user'],
    data() {
        return {
            logoSrc: require('@/assets/logo-white.png'),
        }
    },
    created() {
        this.logoSrc = require('@/assets/logo-white-bouncing-fast.gif');
        this.logoTimeout = setTimeout(() => this.logoSrc = require('@/assets/logo-white.png'), this.gifRepeats(3));
    },
    methods: {
        gifRepeats(count, frames = 11) {
            // 11 frames (1100ms) + 1st frame at end of cycle
            return frames * count * 100 + 75;
        },
        clearInput() {
            this.$refs.ticketSearch.value = '';
        },
        ticketSearchFocus() {
            this.$refs.ticketSearch.focus();
        }
    },
    watch: {
        $route(to, from) {
            // Loading gif
            this.logoSrc = require('@/assets/logo-white-bouncing-fast.gif'); // 11 frames (1100ms - 1 bounce)
            this.logoTimeout = setTimeout(() =>
                this.logoSrc = require('@/assets/logo-white.png'), this.gifRepeats(1));
        }
    },
    computed: {
        displayUser() {
            if (this.user) {
                return this.user
            } else {
                return {
                    fullName: 'Guest',
                    imgSrc: 'http://res.cloudinary.com/dkdsymsli/image/upload/v1595713140/dklfuu3fq5kcng4qqpfv.png'
                }

            }
        }
    },
    components: {
        Avatar,
    }
};
</script>

<style>
</style>