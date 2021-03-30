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
      <div
        class="square icon"
        :style="background"
      ></div>
      <span class="menu-title">Change background </span>
    </a>
    <a class="flex align-center menu-main-item" @click="toggleSearch">
      <img
        src="~@/assets/trello-icon-pack/search-slate-blue.svg"
        class="icon"
      />
      <span class="menu-title">Search cards </span>
    </a>
    <a @click="isDeletePopup = true" class="flex align-center menu-main-item">
      <i class="el-icon-delete-solid icon delete-icon"></i>
      <span class="menu-title">Delete board</span>
      <popup v-if="isDeletePopup" @closePopup="isDeletePopup = false">
        <template v-slot:title>
          <p>Delete board?</p>
        </template>
        <delete-board-popup @deleteBoard="deleteBoard" />
      </popup>
    </a>
    <hr />
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
</template>

<script>
import menuActivity from './menu-activity.vue';
import popup from '../../popup.vue';
import deleteBoardPopup from '../delete-board-popup.vue';
export default {
  name: 'menu-main',
  props: {
    activities: {
      type: Array,
    },
    boardBgc: {
      type: String,
    },
  },
  data() {
    return {
      isDeletePopup: false,
    };
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
    },
  },
  computed: {
    background() {
      return { background: this.boardBgc, backgroundSize: 'cover' };
    },
  },
  components: {
    menuActivity,
    deleteBoardPopup,
    popup,
  },
};
</script>
