<template>
    <div class="boards-list">
        <main-header />
        <div class="boards-list-header">
            <h2>Boards</h2>
            <button @click="toggleAddBoard" class="add-board-btn">Create board</button>
        </div>
        <add-board v-if="showAddBoard" @toggleAddBoard="toggleAddBoard" />
        <section v-if="boards">
            <board-preview v-for="board in boards" :board="board" :key="board._id" />
        </section>
    </div>
</template>

<script>
import BoardPreview from '@/components/BoardPreview.vue';
import AddBoard from '@/components/AddBoard.vue';
import MainHeader from '@/components/MainHeader.vue';
export default {
    name: "BoardList",
    data() {
        return {
            showAddBoard: false
        }
    },
    created() {
        this.$store.dispatch('loadBoards');
    },
    computed: {
        boards() {
                return this.$store.getters.boards;
        }
    },
    methods: {
        toggleAddBoard() {
            this.showAddBoard = !this.showAddBoard;
        },
    },
    components: {
        BoardPreview,
        AddBoard,
        MainHeader
    }
}
</script>

