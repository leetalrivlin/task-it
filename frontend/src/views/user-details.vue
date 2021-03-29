<template>
  <section class="flex column align-center" v-if="user">
    <div class="flex user-header">
      <avatar
        class="member"
        :username="user.fullname"
        :src="user.imgUrl"
        color="white"
        :size="40"
      >
      </avatar>
      <h1>User Details - {{ user.fullname }}</h1>
    </div>

    <!-- <details>
      <summary>Full JSON</summary>
      <pre>{{ user }}</pre>
    </details> -->
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