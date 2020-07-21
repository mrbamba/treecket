<template>
    <router-link :to="'board/' + board._id" class="board-preview" :style="{ background: board.background }">
        <div>{{ board.title }}</div>
    </router-link>
</template>

<script>
export default {
    name: "BoardPreview",
    props: {
        board: {
            type: Object,
            require: true
        }
    },
    // computed: {
    //     background() {
    //         // return this.board.background + ((this.board.background.includes('url')) ? 'center / cover' : '');
    //     }
    // }
}
</script>