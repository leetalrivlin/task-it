<template>
  <header class="flex align-center space-between board-header">
    <a class="el-btn board-title">{{ board.title }}</a>
    <a class="el-btn board-menu-btn" @click="isMenuOpen = true">Menu</a>
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
