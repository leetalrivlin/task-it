<template>
  <header class="flex align-center space-between header-layout board-header">
      <el-button class="el-btn board-title">{{ board.title }}</el-button>
      <el-button class="el-btn board-menu-btn" icon="el-icon-more icon" @click="isMenuOpen = true">Show Menu</el-button>
    <transition name="slide">
      <board-menu v-if="isMenuOpen" @closeMenu="isMenuOpen = false" />
    </transition>
  </header>
</template>

<script>
import boardMenu from './board-menu.vue';
export default {
  components: {
    boardMenu,
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
  methods: {},
};
</script>
