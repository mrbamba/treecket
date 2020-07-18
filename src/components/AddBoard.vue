<template>
    <div class="add-board">
        <input
            @keyup.enter="addBoard"
            v-model="boardPrefs.title"
            type="text"
            placeholder="Add board title"
            maxlength="32"
        />
    </div>
</template>

<script>
import { boardService } from "../services/board.service.js";
export default {
    name: "AddBoard",
    props: ['board'],
    data() {
        return {
            boardPrefs: {
                title: '',
                background: '#72eedd'
            }
        }
    },
    methods: {
        addBoard() {
            const newBoard = boardService.getNewBoard(this.boardPrefs);
            this.$store.dispatch('addBoard', newBoard);
            this.$emit('toggleAddBoard');
        }
    }
}
</script>