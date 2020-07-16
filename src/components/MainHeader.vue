<template>
  <div class="main-header">
    <div class="main-header-logo">
        <img src="@/assets/logo.png" alt="" />
        <h1>Treecket</h1>
        </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style>
</style>