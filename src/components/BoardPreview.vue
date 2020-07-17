<template>
  <router-link :to="'board/' + board._id" class="board-preview">
      <div>{{board.title}}</div>
  </router-link>
</template>

<script>
export default {
    name:"BoardPreview",
    props:{
        board:{
            type:Object,
            require:true
        }
    }
}
</script>

<style>

</style>