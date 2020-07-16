<template>
  <div class="board-list">
      <h2>BoardList</h2>
      <board-preview v-for="board in boards" :board="board" :key="board._id"/>
  </div>
</template>

<script>
import BoardPreview from "@/components/BoardPreview.vue"
export default {
    name:"BoardList",
    props:{
      boards:{
        type:Array,
        require:true
      }
    },
    components:{
      BoardPreview
    },
    created(){
      console.log(this.boards)
    }

}
</script>

<style>

</style>