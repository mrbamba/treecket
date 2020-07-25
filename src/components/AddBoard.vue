<template>
    <div class="add-board">
        <input
            @keyup.enter="addBoard"
            v-model="boardPrefs.title"
            type="text"
            placeholder="Add board title"
            maxlength="36"
        />
        <button class="save-button" @click="addBoard">Save</button>
        <button class="cancel-button" @click="cancelAddBoard">Cancel</button>
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
                background: '#0079bf'
            }
        }
    },
    methods: {
        addBoard() {
            const newBoard = boardService.getNewBoard(this.boardPrefs);
            this.$store.dispatch('addBoard', newBoard);
            this.$emit('toggleAddBoard');
        },
        cancelAddBoard(){
            this.$emit('toggleAddBoard');
        }
    }
}
</script>