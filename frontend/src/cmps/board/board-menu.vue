<template>
  <section class="board-menu">
    <header class="menu-header flex align-center justify-center">
      <h3>Menu</h3>
      <i class="el-icon-close close-menu" @click="closeMenue"></i>
    </header>
    <hr class="board-menu-header-divider" />
    <ul class="board-settings clean-list flex column">
        <li></li>

    </ul>
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

