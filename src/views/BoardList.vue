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
        showAddBoard: false,
        boards: [
          {
            name:"board 1",
            _id:1234
          },
          {
             name:"board 2",
            _id:456
          },
          {
            name:"board 3",
            _id:9876
          }
        ]
      }
    },
    components:{
        BoardPreview,
        AddBoard
    }
}
</script>

<style>
</style>

