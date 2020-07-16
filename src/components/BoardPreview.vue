<template>
  <div class="board-preview">
      <pre>{{board.title}}</pre>
  </div>
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