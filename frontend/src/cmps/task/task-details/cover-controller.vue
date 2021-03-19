<template>
  <section class="cover-controller">
    <header class="flex align-center justify-center">
      <p>Cover</p>
      <i class="el-icon-close close-cntrl" @click="closeController"></i>
    </header>
    <hr class="board-menu-header-divider" />
  </section>
</template>

<script>
export default {
  name: 'coverControllers',
  methods: {
    closeController() {
      this.$emit('closeCntrl');
    },
  },
};
</script>

