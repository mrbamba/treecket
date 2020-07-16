<template>
  <div class="treecket-app">
    <board-list :boards="boards" />
  </div>
</template>

<script>
import BoardList from '@/components/BoardList.vue' 
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
        BoardList,
    }
}
</script>

<style>
</style>