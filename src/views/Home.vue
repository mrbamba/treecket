<template>
    <div class="home-container">
        <header>
            <div class="logo">
                <img src="@/assets/logo.png" />
                <h1>Treecket</h1>
            </div>
            <nav>
                <router-link to="/">Home</router-link>
|
                <router-link to="/login">Log in</router-link>
                <!-- <router-link to="/about">About</router-link> -->
            </nav>
        </header>
        <br>
        <router-link to="/board" class="save-button">Try it free</router-link>
    </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Home",
    components: {
        // HelloWorld
    }
};
</script>
