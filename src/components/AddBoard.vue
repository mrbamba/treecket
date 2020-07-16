<template>
    <div class="add-board">
        <input @keyup.enter="addBoard" type="text" placeholder="Add board title">
    </div>
</template>

<script>
import { boardService } from "../services/board.service.js";
export default {
    name: "AddBoard",
    methods: {
        addBoard() {
            // Get board title and board color
            console.log('Add new board')
        }
    }
}
</script>

<style>
</style>