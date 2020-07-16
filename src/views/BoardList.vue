<template>
  <div class="boards-list">
    <h2>BoardList</h2>
      <board-preview v-for="board in boards" :board="board" :key="board._id"/>
  </div>
</template>

<script>
import BoardList from '@/components/BoardList.vue'
import BoardPreview from '@/components/BoardPreview.vue'
export default {
    name:"TreecketApp",
    data(){
      return{
        boards:[
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
    }
}
</script>

<style>
</style>

