<template>
    <header class="fixed-header" ref="fixedHeader">
        <div class="logo" ref="fixedHeaderLogo">
            <img src="@/assets/logo/logo.png" />
            <h1>Treecket</h1>
        </div>
        <div></div>
        <div class="user-options">
            <router-link to="/login" class="cancel-button">Login</router-link>
            <router-link to="/signup" class="add-button">Signup</router-link>
        </div>
    </header>
</template>

<script>
export default {
    name: "BoardPreview",
    mounted() {
        this.onScroll();
        window.addEventListener('scroll', this.onScroll)
    },
    destroyed() {
        window.removeEventListener('scroll', this.onScroll, false)
    },
    methods: {
        onScroll() {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                this.$refs.fixedHeader.style.height = "70px";
                this.$refs.fixedHeader.style.boxShadow = "0 2px 7px rgba(9, 33, 66, 0.08)";
                this.$refs.fixedHeaderLogo.style.transform = 'translateX(-50%) scale(1)';
                this.$refs.fixedHeaderLogo.style.marginBottom = '17.5px';
            } else {
                this.$refs.fixedHeader.style.height = "100px";
                this.$refs.fixedHeader.style.boxShadow = "none";
                this.$refs.fixedHeaderLogo.style.transform = 'translateX(-50%) scale(1.25)';
            }
        }
    }
}
</script>