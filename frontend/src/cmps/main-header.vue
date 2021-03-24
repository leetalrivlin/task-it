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
        <router-link class="" to="/login">Signin</router-link>
        <router-link class="" to="/board">Boards</router-link>
        <section
          @click="userPopup = !userPopup"
          className="loggedin-user"
          v-if="loggedInUser"
        >
          <avatar
            class="member"
            :username="loggedInUser.fullname"
            :src="loggedInUser.imgUrl"
            color="white"
            :size="30"
          >
          </avatar>
          <user-popup
            :loggedInUser="loggedInUser"
            v-if="userPopup"
            @closePopup="userPopup = false"
            @logout="doLogout"
          />
        </section>
      </nav>
   
   
  </header>
</template>
<script>
import Avatar from 'vue-avatar';
import userPopup from './user-popup.vue';
export default {
  name: 'mainHeader',
  components: {
    Avatar,
    userPopup,
  },
  data() {
    return {
      userPopup: false,
     
    };
  },
  methods: {
    doLogout() {
      this.$emit('logout');
    },
  },
  computed: {
    loggedInUser() {
      console.log(this.$store.getters.loggedinUser);
      return this.$store.getters.loggedinUser;
    },
  },
};
</script>