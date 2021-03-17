<template>
  <header class="main-layout flex space-between align-center main-header">
    <span role="img" aria-label="logo">Task-it</span>
    <nav class="flex">
      <router-link to="/"> </router-link>
      <!-- <router-link to="/chat">Chat</router-link> -->
      <router-link to="/login">Login / Signup</router-link>
      <router-link to="/board">Boards</router-link>
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
      return this.$store.getters.loggedinUser;
    },
  },
};
</script>