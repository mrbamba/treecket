<template>
  <div class="home">
    <h1>Home</h1>
    <router-link to="/boards">Boards List(AKA components inside TreecketApp</router-link> |

    <!-- <img alt="Vue logo" src="@/assets/logo.svg"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
