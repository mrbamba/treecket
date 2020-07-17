<template>
  <div class="about">
    <h2>{{ msg }}</h2>

    <div v-if="loggedInUser">
      <h3>
        Loggedin User:
        {{ loggedInUser.username }}
        <form @submit.prevent="updateUser">
          <input type="text" v-model="userToEdit.username" />
        </form>
        <button @click="doLogout">Logout</button>
      </h3>
    </div>
    <div v-else>
      <form @submit.prevent="doLogin" v-if="login==='login'">
          <h2>Login to TREECKET</h2>
        <input type="text" v-model="loginCred.email" placeholder="Email" />
        <br />
        <input
          type="text"
          v-model="loginCred.password"
          placeholder="Password"
        />
        <br />
        <button>Login</button>
      </form>
      <form @submit.prevent="doSignup" v-else>
          <h2>Sign up to TREECKET</h2>
        <input type="text" v-model="signupCred.email" placeholder="Email" />
        <br />
        <input
          type="text"
          v-model="signupCred.password"
          placeholder="Password"
        />
        <br />
        <input
          type="text"
          v-model="signupCred.username"
          placeholder="Username"
        />
        <br />
        <button>Signup</button>
      </form>
    </div>
    <hr />
    <!-- <button @click="getAllUsers">Get All Users</button>
    <ul>
      <li v-for="user in users" :key="user._id">
        <pre>{{ user }}</pre>
        <button @click="removeUser(user._id)">x</button>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      login: null,
      loginCred: {},
      signupCred: {},
      msg: "",
      userToEdit: {}
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  created() {
    console.log("this.loggedInUser", this.loggedInUser);
    // console.log('Route name',this.$route.name)
    this.setPage()
  },
  methods: {
    async doLogin() {
      const cred = this.loginCred;
      if (!cred.email || !cred.password)
        return (this.msg = "Please enter user/password");
      await this.$store.dispatch({ type: "login", userCred: cred });
      this.loginCred = {};
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
    doSignup() {
      const cred = this.signupCred;
      if (!cred.email || !cred.password || !cred.username)
        return (this.msg = "Please fill up the form");
      this.$store.dispatch({ type: "signup", userCred: cred });
    },
    getAllUsers() {
      this.$store.dispatch({ type: "loadUsers" });
    },
    removeUser(userId) {
      this.$store.dispatch({ type: "removeUser", userId });
    },
    updateUser() {
      this.$store.dispatch({ type: "updateUser", user: this.userToEdit });
    },
    setPage(){
            this.login = this.$route.name;
    }
  },
  watch: {
    loggedInUser() {
      this.userToEdit = { ...this.loggedInUser };
    },
    '$route'(to, from) {
        this.setPage()
        }
  }
};
</script>