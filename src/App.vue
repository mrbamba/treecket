<template>
    <div id="app" class="wrapper">
        <router-view />
        <div :class="{ overlay }" @click.self="hideOverlay"></div>
    </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
export default {

    computed: {
        overlay() {
            // return true; // Testing - TO DELETE
            return this.$store.getters.overlay;
        }
    },
    methods: {
        hideOverlay() {
            this.$store.commit('hideOverlay');
        }
    },
    components: {
        MainHeader,
    }
}
</script>

<style lang="scss">
nav {
    padding: 5px;

    a {
        font-weight: bold;
        // color: #2c3e50;
        opacity: 0.85;

        &.router-link-exact-active {
            color: #fff;
            opacity: 1;
        }
    }
}
</style>