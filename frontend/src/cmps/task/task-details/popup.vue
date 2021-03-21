<template>
  <section class="popup">
    <section class="header flex align-center justify-center">
      <slot name="title"></slot>
      <i class="el-icon-close close-cntrl" @click.stop="closeController"></i>
    </section>
    <hr class="board-menu-header-divider" />
    <section class="main">
      <slot></slot>
    </section>
  </section>
</template>

<script>

export default {
  name: 'popup',
  methods: {
    closeController() {
      this.$emit('closeCntrl');
    },
  },
  components: {
 
  },
};
</script>

