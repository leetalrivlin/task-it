<template>
  <header class="header-layout main-header-board">
    <section
      class="flex align-center space-between main-header-board-container"
    >
      <div class="container"></div>
      <span
        class="flex justify-center align-center logo"
        role="img"
        aria-label="logo"
      >
        <!-- <router-link to="/"><div class="flex justify-center align-center"><span class="task-it-logo">Taskit</span><img src="~@/assets/imgs/task-it-logo-white-bounce.gif" class="gif-icon"></div></router-link></span -->
        <router-link to="/"><div class="flex justify-center align-center"><span class="task-it-logo">Taskit</span><img :src="logoSrc" class="gif-icon" @mouseover="isLogoHover = true" @mouseleave="isLogoHover = false"></div></router-link></span
      >
      <section
        class="window-overlay"
        @click="closeNav"
        v-if="ismobile"
      ></section>
      <nav class="flex align-center" ref="navMenu">
        <router-link class="el-btn" to="/login">Signin</router-link>
        <router-link class="el-btn" to="/board">Boards</router-link>
        <section
          @click="userPopup = !userPopup"
          className="loggedin-user"
          v-if="loggedInUser"
        >
          <div class="avatar-container">
            <avatar
              class="member"
              :username="loggedInUser.fullname"
              :src="loggedInUser.imgUrl"
              color="white"
              :size="30"
            >
            </avatar>
          </div>
          <user-popup
            :loggedInUser="loggedInUser"
            v-if="userPopup"
            @closePopup="userPopup = false"
            @logout="doLogout"
          />
        </section>
      </nav>
    </section>
    <button class="menu-btn el-btn" @click="openNav">☰</button>
  </header>
</template>
<script>
import Avatar from 'vue-avatar';
import userPopup from './user-popup.vue';
export default {
  name: 'mainHeaderBoard',
  components: {
    Avatar,
    userPopup,
  },
  data() {
    return {
      userPopup: false,
      ismobile: false,
      isLogoHover: false,
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
    logoSrc() {
      return (this.isLogoHover) ? require('@/assets/imgs/task-it-logo-white-bounce.gif') : require('@/assets/imgs/task-it-icon-white.png');
    }
  },
};
</script>