<template>
    <header class="fixed-header">
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
</template>

<script>
export default {
    name: "BoardPreview",
    props: {
        board: {
            type: Object,
            require: true
        }
    },
    // computed: {
    //     background() {
    //         // return this.board.background + ((this.board.background.includes('url')) ? 'center / cover' : '');
    //     }
    // }
}
</script>