<template>
  <section class="flex column align-center" v-if="user">
    <div class=" user-header">
      <div class="flex align-center justify-center username">
        <avatar
          class="member"
          :username="user.fullname"
          :src="user.imgUrl"
          color="white"
          :size="50"
        >
        </avatar>
        <h1>{{ user.fullname }}</h1>
      </div>
    </div>
    <div class="profile">
      <p class="header-profile">Profile and visability</p>
    </div>

    <img src="~@/assets/imgs/user-profile.svg" alt="">
  </section>
</template>

<script>
import Avatar from 'vue-avatar';
export default {
  name: 'userDetails',
  components: {
    Avatar,
  },
  data() {
    return {
      // user: null
    };
  },
  async created() {
    // const user = await userService.getById(id);
    // this.user = user
  },
  watch: {
    userId: {
      handler() {
        this.$store.dispatch({ type: 'loadAndWatchUser', userId: this.userId });
      },
      immediate: true,
    },
  },
  computed: {
    user() {
      return this.$store.getters.watchedUser;
    },
    userId() {
      return this.$route.params.id;
    },
  },
};
</script>