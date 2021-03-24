<template>
  <div class="main-layout main-content flex column align-center signup">
    <p>{{ msg }}</p>
    <!-- <div v-if="loggedinUser">
      <h3>
        Loggedin User:
        {{ loggedinUser.username }}
        <button @click="doLogout">Logout</button>
      </h3>
    </div> -->
    <div >
      <form
        v-if="signUp"
        class="flex column align-center"
        @submit.prevent="doSignup"
      >
        <h2>Signup for your account</h2>
        <input
          type="text"
          v-model="signupCred.fullname"
          placeholder="Full name"
        />
        <input
          type="text"
          v-model="signupCred.password"
          placeholder="Password"
        />
        <input
          type="text"
          v-model="signupCred.username"
          placeholder="Username"
        />
        <button>Signup</button>
        <hr />
        <a
          >Already have an account?
          <span @click="signUp = false">Log in</span></a
        >
      </form>
      <form v-else class="flex column align-center" @submit.prevent="doLogin">
        <h2>Login to Task-it</h2>
        <select v-model="loginCred.username">
          <option value="">Select User</option>
          <option v-for="user in users" :key="user._id" :value="user.username">
            {{ user.fullname }}
          </option>
        </select>
        <!-- <input type="text" v-model="loginCred.username" placeholder="User name" />
        <input
          type="text"
          v-model="loginCred.password"
          placeholder="Password"
        /> -->
        <button>Login</button>
        <hr />
        <a
          >Can't log in? <span @click="signUp = true">Sign up</span> for an
          account</a
        >
      </form>
    </div>
    <!-- <hr /> -->
    <!-- <details>
      <summary>Admin Section</summary>
      <ul>
        <li v-for="user in users" :key="user._id">
          <pre>{{ user }}</pre>
          <button @click="removeUser(user._id)">x</button>
        </li>
      </ul>
    </details> -->
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      signUp: true,
      msg: '',
      loginCred: { username: 'chen', password: '0000' },
      signupCred: { username: '', password: '', fullname: '' },
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  created() {
    this.loadUsers();
  },
  methods: {
    async doLogin() {
      console.log(this.loginCred);
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password';
        return;
      }
      try {
        await this.$store.dispatch({ type: 'login', userCred: this.loginCred });
        this.$router.push('/');
      } catch (err) {
        console.log(err);
        this.msg = 'Failed to login';
      }
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' });
    },
    async doSignup() {
      if (
        !this.signupCred.fullname ||
        !this.signupCred.password ||
        !this.signupCred.username
      ) {
        this.msg = 'Please fill up the form';
        return;
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred });
      this.$router.push('/');
    },
    loadUsers() {
      this.$store.dispatch({ type: 'loadUsers' });
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: 'removeUser', userId });
        this.msg = 'User removed';
      } catch (err) {
        this.msg = 'Failed to remove user';
      }
    },
  },
};
</script>