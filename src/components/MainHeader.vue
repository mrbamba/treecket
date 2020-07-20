<template>
    <div class="main-header">
        <div class="main-header-logo">
            <router-link to="/">
                <img src="@/assets/logo-white.png" alt />
                <h1>Treecket</h1>
            </router-link>
        </div>
        <div id="nav">
            <!-- <router-link to="/">Home</router-link> | -->

            <router-link to="/board">
                <font-awesome-icon fas icon="th-large" />
                Boards
            </router-link>|
            <router-link to="/login">Log in</router-link>
            <!-- <router-link to="/about">About</router-link> -->
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