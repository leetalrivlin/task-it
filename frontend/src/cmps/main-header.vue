<template>
  <header class="header-layout main-header">
    <span class="flex justify-center align-center logo" role="img" aria-label="logo">Task-it</span>
    <nav class="flex align-center justify-end">
      <router-link to="/"> </router-link>
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
      return this.$store.getters.loggedinUser;
    },
  },
};
</script>