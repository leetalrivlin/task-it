<template>
  <header class="header-layout main-header">
    <section class="flex align-center space-between main-header-container">
      <div class="container flex">
        <router-link to="/"
          ><font-awesome-icon class="el-btn home-icon" icon="home"
        /></router-link>
        <router-link class="el-btn boards" to="/board">
          <img
            class="boards-icon"
            src="../assets/trello-icon-pack/trello-slate-blue.svg"
          />
          <span>Boards</span>
        </router-link>
      </div>
      <span class="flex justify-center align-center logo">
        <router-link to="/"
          ><div class="flex justify-center align-center">
            <span class="task-it-logo">Taskit</span
            ><img
              :src="logoSrc"
              class="gif-icon"
              @mouseover="isLogoHover = true"
              @mouseleave="isLogoHover = false"
            /></div
        ></router-link>
      </span>
      <section
        class="window-overlay"
        @click="closeNav"
        v-if="ismobile"
      ></section>
      <nav ref="navMenu" class="flex align-center">
        <router-link v-if="!loggedInUser" class="el-btn" to="/login"
          >Signin</router-link
        >
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
        <user-popup
          class="loggedin-user-mobile"
          :loggedInUser="loggedInUser"
          @closePopup="userPopup = false"
          @logout="doLogout"
        />
      </nav>
      <button class="el-btn menu-btn" @click="openNav">☰</button>
    </section>
  </header>
</template>
<script>
import Avatar from 'vue-avatar';
import userPopup from './user-popup.vue';
export default {
  name: 'mainHeader',
  components: {
    Avatar,
    userPopup
  },
  data() {
    return {
      userPopup: false,
      ismobile: false,
      isLogoHover: false
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
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    logoSrc() {
      return this.isLogoHover
        ? require('@/assets/imgs/task-it-logo-clr1-bounce.gif')
        : require('@/assets/imgs/task-it-icon-clr1.png');
    }
  }
};
</script>
