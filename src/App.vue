<template>
  <div id="app">
      <main-header />
      <router-view />
      <div :class="{ overlay }"></div>
  </div>
</template>

<style lang="scss">
// #app {
//   text-align: center;
// }

#nav {
  padding: 10px;

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
    overlay() {
      // return true; // Testing - TO DELETE
      return this.$store.getters.overlay;
    }
  },
  components:{
    MainHeader,
  }
}
</script>