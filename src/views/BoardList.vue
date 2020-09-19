<template>
    <div class="board-list">
        <fixed-header :isSticky="true" />
        <div class="board-list-header">
            <h2><i class="fas fa-th-large" /> Boards</h2>
        </div>
        <add-board v-if="showAddBoard" @toggleAddBoard="toggleAddBoard" />
        <section v-if="boards">
            <button @click="toggleAddBoard" class="add-board-btn"><i class="fas fa-plus" /> Create Board</button>
            <board-preview v-for="board in boards" :board="board" :key="board._id" />
        </section>
    </div>
</template>

<script>
import FixedHeader from '@/components/FixedHeader.vue';
import BoardPreview from '@/components/BoardPreview.vue';
import AddBoard from '@/components/AddBoard.vue';

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
        FixedHeader,
    }
}
</script>

