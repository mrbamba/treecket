<template>
    <div id="app" :style="{ background }">
        <router-view />
        <div :class="{ overlay }" @click.self="hideOverlay"></div>
    </div>
</template>

<style lang="scss">
#app {
    height: 100vh;
}

nav {
    padding: 5px;

    a {
        font-weight: bold;
        // color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
<script>
import MainHeader from '@/components/MainHeader.vue'
export default {

    computed: {
        overlay() {
            // return true; // Testing - TO DELETE
            return this.$store.getters.overlay;
        },
        background() {
          if (this.$route.params.boardId) {
            const board = this.$store.getters.currBoard;
                if (board) {
                    return board.background + ((board.background.includes('url')) ? 'center / cover' : '');
                }
                return '';
            }
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