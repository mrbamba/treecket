<template>
    <div class="add-board">
        <input @keyup.enter="addBoard" v-model="boardSettings.title" type="text" placeholder="Add board title" />
    </div>
</template>

<script>
import { boardService } from "../services/board.service.js";
export default {
    name: "AddBoard",
    data() {
        return {
            boardSettings: {
                title: '',
                background: '#eee'
            }
        }
    },
    methods: {
        addBoard() {
            const newBoard = boardService.getNewBoard(this.boardSettings);
            this.$store.dispatch('addBoard', newBoard);
        }
    }
}
</script>

<style>
</style>