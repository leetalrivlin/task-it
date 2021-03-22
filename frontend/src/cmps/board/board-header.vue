<template>
  <header class="flex align-center space-between header-layout board-header">
    <el-button class="el-btn board-title">{{ board.title }}</el-button>
    <div class="members flex">
      <avatar
        class="member"
        :username="board.createdBy.fullname"
        :src="board.createdBy.imgUrl"
        color="white"
        :size="30"
      ></avatar>

      <div v-for="member in membersBoard" :key="member._id">
        <avatar
          class="member"
          :username="member.fullname"
          :src="member.imgUrl"
          color="white"
          :size="30"
        ></avatar>
      </div>
    </div>

    <el-button
      class="el-btn board-menu-btn"
      icon="el-icon-more icon"
      @click="isMenuOpen = true"
      >Show Menu</el-button
    >
    <transition name="slide">
      <board-menu
        v-if="isMenuOpen"
        @closeMenu="isMenuOpen = false"
        @colorPicked="updateBoard"
        @photoPicked="updateBoard"
      />
    </transition>
  </header>
</template>

<script>
import boardMenu from './board-menu.vue';
import Avatar from 'vue-avatar';
export default {
  components: {
    boardMenu,
    Avatar,
  },
  name: 'boardHeader',
  props: {
    board: {
      type: Object,
    },
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    updateBoard(style) {
      this.board.style = style;
      this.$store.dispatch({ type: 'updateBoard', board: this.board });
    },
  },
  computed: {
    membersBoard() {
      return this.board.members;
    },
  },
};
</script>
