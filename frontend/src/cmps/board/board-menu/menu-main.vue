<template>
  <section class="menu-main">
    <a class="menu-main-item flex align-center" @click="toggleAbout">
      <i class="el-icon-info icon"></i>
      <span class="menu-title">About this board </span>
    </a>
    <a class="menu-main-item flex align-center" @click="toggleBgc">
      <font-awesome-icon icon="square" class="icon square" />
      <span class="menu-title">Change background </span>
    </a>
    <a class="menu-main-item flex align-center" @click="toggleSearch">
      <i class="el-icon-search icon"></i>
      <span class="menu-title">Search cards </span>
    </a>
    <a @click="deleteBoard" class="flex align-center menu-main-item">
      <i class="el-icon-delete-solid icon"></i>
      <span class="menu-title">Delete board</span>
    </a>
    <hr>
    <a class="flex align-center menu-main-item">
      <i class="el-icon-s-fold icon"></i>
      <p class="menu-title activity-title">Activity</p>
    </a>
    <ul v-for="activity in activities" :key="activity.id" class="clean-list">
      <menu-activity :activity="activity" />
    </ul>
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
