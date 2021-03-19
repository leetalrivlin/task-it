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
      </div>
    </div>
  </section>
</template>

<script>
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

