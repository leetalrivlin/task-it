<template>
  <section class="popup">
    <section class="header flex align-center justify-center">
      <!-- <slot name="title"></slot> -->
      <p>Cover</p>
      <i class="el-icon-close close-cntrl" @click.stop="closeController"></i>
    </section>
    <hr class="board-menu-header-divider" />
    <section class="main">
      <!-- <slot></slot> -->
      <cover-color-palettte @colorPicked="changeColor" />
      <cover-attachments @imgUploaded="uploadImg" />
    </section>
  </section>
</template>

<script>
import coverAttachments from './cover-attachments.vue';
import coverColorPalettte from './cover-colorPalettte.vue';

export default {
  name: 'popup',
  methods: {
    closeController() {
      this.$emit('closeCntrl');
    },
    changeColor(color) {
      this.$emit('changeColor', color);
    },
    uploadImg(imgUrl) {
      this.$emit('uploadImg', imgUrl);
    },
  },
  components: {
    coverColorPalettte,
    coverAttachments,
  },
};
</script>

