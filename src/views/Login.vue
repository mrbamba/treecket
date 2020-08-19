<template>
    <div class="login">
        <!-- <fixed-header /> -->


        <div v-if="loggedInUser" >
            <section>
                <img :src="loggedInUser.imgSrc" alt="">
                <h2>{{ loggedInUser.fullName }}</h2>    
            </section>
            <section>
                <h3>About</h3>
                <form @submit.prevent="updateUser">
                    <label for="">Full Name</label>
                    <input type="text" v-model="loggedInUser.fullName">
                    <label for="">Email</label>
                    <input type="email" v-model="loggedInUser.email">
                    <label for="upload-input" class="upload-btn">
                        Change your image profile
                    </label>
                    <input type="file" id="upload-input" @change="onUploadImg" style="display:none" position />
                    <label for="">Password</label>
                    <input type="password" v-model="userToEdit.password">
                    <button>Save changes</button>
                </form>
            </section>
            <h3>
                Logged in user: {{ loggedInUser.fullName }}
                <form @submit.prevent="updateUser">
                    <input type="text" v-model="userToEdit.fullName" />
                </form>
                <button @click="doLogout">Log out</button>
            </h3>
        </div>
        <div v-else class="form-container">
            <form @submit.prevent="doLogin" v-if="route === 'Login'" class="login-page">
                <h2>Log in to your account</h2>
                <h2>{{ msg }}</h2>
                <input type="text" v-model="loginCred.email" placeholder="Email" class="minimal-input"/>
                <input type="password" v-model="loginCred.password" placeholder="Password"  class="minimal-input"/>
                <button type="submit">Continue</button>
                <div class="social-login">
                    <span>or</span>
                </div>
                <router-link to="/signup" class="signup-link">Sign up for an account</router-link>
            </form>
            <form @submit.prevent="doSignup" v-else class="signup-page">
                <h2>Sign up for your account</h2>
                <input type="text" v-model="signupCred.email" placeholder="Email"  class="minimal-input"/>
                <input type="password" v-model="signupCred.password" placeholder="Password" class="minimal-input"/>
                <input type="text" v-model="signupCred.fullName" placeholder="Full name" class="minimal-input"/>
                <label for="upload-input" class="upload-btn">
                    Upload your image profile
                </label>
                <input type="file" id="upload-input" @change="onUploadImg" style="display:none" position />
                <!-- <button @click="openUploadImg"></button> -->
                <img v-if="signupCred.imgSrc" :src="signupCred.imgSrc" alt="">
                <img v-if="!loggedInUser && isInUploadImg" src="@/assets/logo/logo-white-bouncing.gif" alt="">
                <button>Sign up</button>
                <div class="social-login">
                    <span>or</span>
                </div>
                <router-link to="/login" class="login-link">Already have a Treecket account? Log in</router-link>
            </form>
        </div>
        <!-- <button @click="getAllUsers">Get All Users</button>
    <ul>
      <li v-for="user in users" :key="user._id">
        <pre>{{ user }}</pre>
        <button @click="removeUser(user._id)">x</button>
      </li>
        </ul>-->
    </div>
</template>

<script>
import { uploadImg } from '@/services/img-upload.service.js';
import FixedHeader from '@/components/FixedHeader.vue';
import cloneDeep from 'lodash/cloneDeep';
export default {
    name: "test",
    data() {
        return {
            route: null,
            loginCred: {},
            signupCred: {},
            msg: "",
            userToEdit: {},
            isInUploadImg: false,
        };
    },
    computed: {
        users() {
            return this.$store.getters.users;
        },
        loggedInUser() {
            return cloneDeep(this.$store.getters.loggedInUser);
        }
    },
    created() {
        // console.log("this.loggedInUser", this.loggedInUser);
        // console.log('Route name',this.$route.name)
        this.setPage();
    },
    methods: {
        async doLogin() {
            const cred = this.loginCred;
            if (!cred.email || !cred.password)
                return (this.msg = "Please enter user/password");
            try {
                await this.$store.dispatch({ type: "login", userCred: cred });
                this.loginCred = {};
                this.$router.push('/board');
            } catch (err) {
                throw err;
                console.log('Had login issues')
            }

        },
        doLogout() {
            this.$store.dispatch({ type: "logout" });
        },
        doSignup() {
            if (this.isInUploadImg) return
            const cred = this.signupCred;
            if (!cred.email || !cred.password || !cred.fullName)
                return (this.msg = "Please fill up the form");
            this.signupCred.type = 'user';
            this.$store.dispatch({ type: "signup", userCred: cred });
            this.$router.push('/board');

        },
        getAllUsers() {
            this.$store.dispatch({ type: "loadUsers" });
        },
        removeUser(userId) {
            this.$store.dispatch({ type: "removeUser", userId });
        },
        updateUser() {
            this.$store.dispatch({ type: "updateUser", updatedUser: this.loggedInUser, newPassword: this.userToEdit.password});
        },
        setPage() {
            this.route = this.$route.name;
        },
        async onUploadImg(ev) {
            this.isInUploadImg = true;
            let img = await uploadImg(ev);
            // console.log(img.url);
            this.signupCred.imgSrc = img.url;
            this.isInUploadImg = false;
        }
    },
    watch: {
        loggedInUser() {
            this.userToEdit = { ...this.loggedInUser };
        },
        $route(to, from) {
            this.setPage();
        }
    },
    components: {
        FixedHeader,
    }
};
</script>