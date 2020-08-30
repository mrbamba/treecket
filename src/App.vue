<template>
    <div id="app" class="wrapper">
        <transition name="component-fade" mode="out-in">
            <router-view />
        </transition>
        <div :class="{ overlay }" @click.self="hideOverlay"></div>
    </div>
</template>

<script>
export default {
    created() {
        
    },
    computed: {
        overlay() {
            // return true; // Testing - TO DELETE
            return this.$store.getters.overlay;
        },
    },
    methods: {
        hideOverlay() {
            this.$store.commit('toggleOverlay', false);
        },
    },
    components: {
    }
}
</script>

<style lang="scss">
// nav {
//     padding: 5px;

//     a {
//         font-weight: bold;
//         // color: #2c3e50;
//         opacity: 0.85;

//         &.router-link-exact-active {
//             color: #fff;
//             opacity: 1;
//         }
//     }
// }
</style>