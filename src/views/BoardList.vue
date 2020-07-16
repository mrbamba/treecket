<template>
  <div class="boards-list">
    <h2>Boards</h2>
      <button @click="showAddBoard = true">+ Create new board</button>
      <add-board v-if="showAddBoard" />
      <board-preview v-for="board in boards" :board="board" :key="board._id" />
  </div>
</template>

<script>
import BoardPreview from '@/components/BoardPreview.vue';
import AddBoard from '@/components/AddBoard.vue';
export default {
    name:"BoardList",
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
    components: {
        BoardPreview,
        AddBoard
    }
}
</script>

<style>
</style>

