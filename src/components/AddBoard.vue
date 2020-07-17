<template>
    <div class="add-board">
        <input @keyup.enter="addBoard" v-model="boardPrefs.title" type="text" placeholder="Add board title" />
    </div>
</template>

<script>
import { boardService } from "../services/board.service.js";
export default {
    name: "AddBoard",
    data() {
        return {
            boardPrefs: {
                title: '',
                background: '#eeeeee'
            }
        }
    },
    methods: {
        addBoard() {
            const newBoard = boardService.getNewBoard(this.boardPrefs);
            this.$store.dispatch('addBoard', newBoard);
        }
    }
}
</script>

<style>
</style>