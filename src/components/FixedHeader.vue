<template>
    <header class="fixed-header" ref="fixedHeader">
        <div class="logo" ref="fixedHeaderLogo">
            <img src="@/assets/logo/logo.png" />
            <h1>Treecket</h1>
        </div>
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/board">Boards</router-link>
            <!-- <a href="https://www.urbandictionary.com/define.php?term=FAQ" target="_blank">FAQ</a>
            <a href="https://www.google.com/covid19/" target="_blank">COVID-19</a> -->
        </nav>
        <div class="user-action">
            <div class="logged-in-user-options" v-if="loggedInUser">
                <router-link to="/login">
                    <span>My Account</span>
                    <avatar
                        class="user-avatar"
                        :username="loggedInUser.fullName"
                        :src="loggedInUser.imgSrc"
                        :size="35"
                        color="#fff"
                    />
                </router-link>
            </div>
            <div v-else class="user-options">
                <router-link to="/login">Login</router-link>
                <!-- <router-link to="/signup" class="add-button">Signup</router-link> -->
            </div>
            <transition name="fall">
                <router-link to="/board" v-if="hiddenTrial" class="trial-secondary">Try it free</router-link>
            </transition>
        </div>
    </header>
</template>

<script>
import Avatar from 'vue-avatar';
export default {
    name: "BoardPreview",
    data() {
        return {
            loggedInUser: this.$store.getters.loggedInUser,
            hiddenTrial: false
        }
    },
    mounted() {
        this.onScroll();
        window.addEventListener('scroll', this.onScroll)
    },
    destroyed() {
        window.removeEventListener('scroll', this.onScroll, false)
    },
    methods: {
        onScroll() {
            // move styling into css class
            if (document.body.scrollTop > 88 || document.documentElement.scrollTop > 88) {
                this.$refs.fixedHeader.style.height = "70px";
                this.$refs.fixedHeader.style.boxShadow = "0 2px 7px rgba(9, 33, 66, 0.08)";
                this.$refs.fixedHeaderLogo.style.transform = 'translateX(-50%) scale(1)';
                this.$refs.fixedHeaderLogo.style.marginBottom = '17.5px';
                this.$refs.fixedHeaderLogo.style.bottom = "0";
                if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
                    this.hiddenTrial = true;
                } else {
                    this.hiddenTrial = false;
                }
            } else {
                this.hiddenTrial = false;
                this.$refs.fixedHeader.style.height = "120px";
                this.$refs.fixedHeader.style.boxShadow = "none";
                this.$refs.fixedHeaderLogo.style.transform = 'translateX(-50%) scale(1.3)';
            }
        }
    },
    components: {
        Avatar,
    }
}
</script>