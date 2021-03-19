<template>
  <section class="board-menu">
    <header class="menu-header flex align-center justify-center">
      <h4>Menu</h4>
      <i class="el-icon-close close-menu" @click="closeMenue"></i>
    </header>
    <hr class="board-menu-header-divider" />
    <div class="menu-content flex column">
      <div class="board-settings-menu">
        <a class="board-settings-menu-item flex align-center">
          <i class="el-icon-info icon"></i>
          <span>About this board</span>
        </a>
        <a class="board-settings-menu-item flex align-center">
          <font-awesome-icon icon="square" class="icon" />
          <span>Change background </span>
        </a>
        <a class="board-settings-menu-item flex align-center">
          <i class="el-icon-search icon"></i>
          <span>Search cards </span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faSquare);
export default {
  data() {
    return {};
  },
  methods: {
    closeMenue() {
      console.log('closing');
      this.$emit('closeMenu');
    },
  },
};
</script>

