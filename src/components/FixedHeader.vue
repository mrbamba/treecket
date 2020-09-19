<template>
    <header :class="{scrolled: isSticky}" class="fixed-header" ref="fixedHeader">
        <router-link to="/" class="logo" ref="fixedHeaderLogo">
            <img src="@/assets/logo/logo.png" />
            <h1>Treecket</h1>
        </router-link>

        <button class="nav-menu clean-btn">
            <img class="icon" src="@/assets/icons/hamburger-menu.svg" alt />
        </button>

        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/board">Boards</router-link>
            <!-- <a href="https://www.urbandictionary.com/define.php?term=FAQ" target="_blank">FAQ</a>
            <a href="https://www.google.com/covid19/" target="_blank">COVID-19</a>-->
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
            <nav v-else class="guest-user-options">
                <router-link to="/login">Login</router-link>
                <router-link to="/signup" class>Sign Up</router-link>
            </nav>

            <transition name="fall">
                <router-link to="/board" v-show="hiddenTrial" class="trial-secondary">Try it</router-link>
            </transition>
        </div>
    </header>
</template>

<script>
import Avatar from 'vue-avatar';
export default {
    name: "FixedHeader",
    props: {
        isSticky: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            loggedInUser: this.$store.getters.loggedInUser,
            hiddenTrial: false,
        }
    },
    mounted() {
        if (this.isSticky) return;
        this.onScroll();
        window.addEventListener('scroll', this.onScroll)
    },
    destroyed() {
        if (this.isSticky) return;
        window.removeEventListener('scroll', this.onScroll, false)
    },
    methods: {
        onScroll() {
            if (document.documentElement.scrollTop > 70) {
                this.$refs.fixedHeader.classList.add('scrolled');
                this.hiddenTrial = (document.documentElement.scrollTop > 400 && document.documentElement.clientWidth > 720 ||
                    document.documentElement.scrollTop > 470) ? true : false;
            } else {
                this.$refs.fixedHeader.classList.remove('scrolled');
            }
        }
    },
    components: {
        Avatar,
    }
}
</script>