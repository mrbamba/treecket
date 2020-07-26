<template>
    <div class="home-container">
        <div class="spacer"></div>
        <header ref="header">
            <div>
                <div class="logo">
                    <img src="@/assets/logo.png" />
                    <h1>Treecket</h1>
                </div>
            </div>
            <div class="user-options">
                <router-link to="/login" class="cancel-button">Login</router-link>
                <router-link to="/signup" class="add-button">Signup</router-link>
            </div>
        </header>
        <div class="main-home-page">
            <div></div>
            <div></div>
            <div></div>
            <div class="left-of-home"></div>
            <div class="main"></div>
            <div class="right-of-home"></div>
            <div></div>
            <div class="below-main">
                <router-link to="/board" class="save-button">Try it free</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
};
</script>

<style scoped>
.fixed {
    position: fixed;
    top: 0;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.13);
}
</style>