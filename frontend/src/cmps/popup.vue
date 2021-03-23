<template>
  <section class="popup" @click.stop>
    <section class="header flex align-center justify-center">
      <slot name="title"></slot>
      <i class="el-icon-close close-cntrl" @click.stop="closePopup"></i>
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
    closePopup() {
      this.$emit('closePopup');
    },
  },
  components: {
 
  },
};
</script>

