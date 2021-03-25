<template>
  <section v-if="loggedInUser" class="user-popup" @click.stop>
    <section class="flex align-center justify-center header">
      <p>Account</p>
      <i class="el-icon-close close-cntrl" @click.stop="closePopup"></i>
    </section>
    <hr class="web-separator" />
    <section class="main">
      <section class="flex align-center user-info">
        <avatar
          class="member"
          :username="loggedInUser.fullname"
          :src="loggedInUser.imgUrl"
          color="white"
          :size="40"
        >
        </avatar>
        <section class="flex column">
          <p>{{ loggedInUser.fullname }}</p>
          <p class="username">{{ loggedInUser.username }}</p>
        </section>
      </section>
      <hr class="web-separator" />
      <section class="btn-container">
        <router-link :to="`/user/${loggedInUser._id}`">Profile </router-link>
        <button @click="doLogout">Logout</button>
      </section>
    </section>
  </section>
</template>

<script>
import Avatar from 'vue-avatar';

export default {
  name: 'userPopup',
  props: {
    loggedInUser: {
      type: Object,
    },
  },
  methods: {
    closePopup() {
      this.$emit('closePopup');
    },
    doLogout() {
      this.$emit('logout');
    },
  },
  components: {
    Avatar,
  },
};
</script>
