<template>
  <section class="menu-main">
    <a class="flex align-center menu-main-item" @click="toggleAbout">
      <img
        src="~@/assets/trello-icon-pack/trello-slate-blue.svg"
        class="icon"
      />
      <span class="menu-title">About this board </span>
    </a>
    <a class="flex align-center menu-main-item" @click="toggleBgc">
      <font-awesome-icon icon="square" class="icon square" />
      <span class="menu-title">Change background </span>
    </a>
    <a class="flex align-center menu-main-item" @click="toggleSearch">
      <img
        src="~@/assets/trello-icon-pack/search-slate-blue.svg"
        class="icon"
      />
      <span class="menu-title">Search cards </span>
    </a>
    <a @click="deleteBoard" class="flex align-center menu-main-item">
      <i class="el-icon-delete-solid icon delete-icon"></i>
      <span class="menu-title">Delete board</span>
    </a>
    <hr />
    <section class="menu-activity-container">
      <a class="flex align-center menu-main-item">
        <img
          src="~@/assets/trello-icon-pack/activities-new-color.svg"
          class="activity-icon icon"
        />
        <p class="menu-title activity-title">Activity</p>
      </a>
      <ul v-for="activity in activities" :key="activity.id" class="clean-list">
        <menu-activity v-if="activity" :activity="activity" />
      </ul>
    </section>
  </section>
</template>

<script>
import menuActivity from './menu-activity.vue';
export default {
  name: 'menu-main',
  props: {
    activities: {
      type: Array
    }
  },
  methods: {
    toggleAbout() {
      this.$emit('openAbout');
    },
    toggleBgc() {
      this.$emit('openBgc');
    },
    toggleSearch() {
      this.$emit('openSearch');
    },
    deleteBoard() {
      this.$emit('deleteBoard');
    }
  },
  components: {
    menuActivity
  }
};
</script>
