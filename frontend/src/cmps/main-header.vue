<template>
  <header class="header-layout main-header">
    <section class="flex align-center space-between main-header-container">
      <div class="container"></div>
      <span
        class="flex justify-center align-center logo">
        <router-link to="/"><div class="flex justify-center align-center"><span class="task-it-logo">Taskit</span><img src="~@/assets/imgs/task-it-logo-clr1-bounce.gif" class="gif-icon"></div></router-link></span
      >
      <section
        class="window-overlay"
        @click="closeNav"
        v-if="ismobile"
      ></section>
      <nav ref="navMenu" class="flex align-center">
        <router-link class="" to="/login">Signin</router-link>
        <router-link class="" to="/board">Boards</router-link>
        <section
          @click="userPopup = !userPopup"
          class="loggedin-user"
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
        <hr class="mobile-separator">
        <user-popup
          class="loggedin-user-mobile"
          :loggedInUser="loggedInUser"
          @closePopup="userPopup = false"
          @logout="doLogout"
        />
      </nav>
    </section>
    <button class="menu-btn el-btn" @click="openNav">☰</button>
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
      ismobile: false,
    };
  },
  methods: {
    doLogout() {
      this.$emit('logout');
    },
    closeNav() {
      this.$refs.navMenu.style.transform = 'translateX(100%)';
      this.ismobile = false;
    },
    openNav() {
      this.$refs.navMenu.style.transform = 'translateX(0)';
      this.ismobile = true;
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