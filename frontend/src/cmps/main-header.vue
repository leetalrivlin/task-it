<template>
  <header class="header-layout flex align-center space-between main-header">
    <div class="container"></div>
    <span
      class="flex justify-center align-center logo"
      role="img"
      aria-label="logo"
    >
      <router-link to="/">Task-it</router-link></span
    >
    <nav class="flex align-center justify-end">
      <!-- <router-link to="/chat">Chat</router-link> -->
      <router-link class="el-btn" to="/login">Signin</router-link>
      <router-link class="el-btn" to="/board">Boards</router-link>
    </nav>
    <section className="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </router-link>
      <span>{{ loggedInUser.score }}</span>
    </section>
  </header>
</template>
<script>
export default {
  computed: {
    loggedInUser() {
      console.log(this.$store.getters.loggedinUser);
      return this.$store.getters.loggedinUser;
    },
  },
};
</script>