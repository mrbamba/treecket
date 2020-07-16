<template>
  <div class="treecket-app">
<board-list/>
  </div>
</template>

<script>
import BoardList from '@/components/BoardList.vue' 
export default {
    name:"TreecketApp",
    components:{
        BoardList,
    }
}
</script>

<style>

</style>