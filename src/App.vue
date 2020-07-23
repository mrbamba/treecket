<template>
    <div id="app" class="wrapper" :style="{ background }">
        <!-- <main-header v-if="showMainHeader" /> -->
        <router-view />
        <div :class="{ overlay }" @click.self="hideOverlay"></div>
    </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
export default {

    computed: {
        mainHeader() {

        },
        background() {
            if (this.$route.params.boardId) {
                const board = this.$store.getters.currBoard;
                if (board) {
                    return board.background + ((board.background.includes('url')) ? ' fixed' : '');
                }
                return '';
            }
        },
        overlay() {
            // return true; // Testing - TO DELETE
            return this.$store.getters.overlay;
        },
        showMainHeader() {
            return this.$route.path.includes('board') ? true : false;
        }
    },
    methods: {
        hideOverlay() {
            this.$store.commit('hideOverlay');
        },
    },
    components: {
        MainHeader,
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