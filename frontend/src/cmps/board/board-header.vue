<template>
  <header class="flex align-center space-between header-layout board-header">
    <el-button class="el-btn board-title">{{ board.title }}</el-button>
    <div class="members flex">
      <avatar
        class="member"
        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Favatar-people-person-business-user-3637425%2F&psig=AOvVaw12ANfkdxljDq3Aq2Rk_3F-&ust=1616497993719000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPi0srjiw-8CFQAAAAAdAAAAABAD"
        :username="board.createdBy.fullname"
        color="white"
        :size="30"
      ></avatar>

        <!-- :src="board.createdBy.imgUrl" -->
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
