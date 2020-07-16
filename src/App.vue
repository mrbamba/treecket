<template>
  <div id="app" :class="{screener: showScreener}">
      <main-header/>
      <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import MainHeader from '@/components/MainHeader.vue'
export default {
  computed: {
    showScreener() {
      // return true; // Testing - TO DELETE
      // return this.$store.getters.showScreener;
    }
  },
  components:{
    MainHeader,
  }
}
</script>