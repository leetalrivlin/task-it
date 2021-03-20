<template>
  <section class="cover-controller">
    <header class="flex align-center justify-center">
      <p>Cover</p>
      <i class="el-icon-close close-cntrl" @click="closeController"></i>
    </header>
    <hr class="board-menu-header-divider" />
    <main>
      <cover-color-palettte @colorPicked="changeColor" />
    </main>
  </section>
</template>

<script>
import coverColorPalettte from './cover-colorPalettte.vue';

export default {
  name: 'coverControllers',
  methods: {
    closeController() {
      this.$emit('closeCntrl');
    },
    changeColor(color) {
      this.$emit('changeColor', color);
    },
  },
  components: {
    coverColorPalettte,
  },
};
</script>

