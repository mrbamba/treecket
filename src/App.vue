<template>
    <div id="app" :style="{ background }">
        <main-header />
        <router-view />
        <div :class="{ overlay }"></div>
    </div>
</template>

<style lang="scss">
#app {
    // text-align: center;
    height: 100vh;
    // position: relative;
}

#nav {
    padding: 10px;

    a {
        font-weight: bold;
        color: #2c3e50;

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

    components: {
        MainHeader,
    }
}
</script>