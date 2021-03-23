<template>
  <section class="cover-popup">
    <cover-color-palettte @colorPicked="changeColor" />
    <cover-attachments @imgUploaded="uploadImg" />
  </section>
</template>

<script>
import coverAttachments from '../details-popup/cover-attachments.vue';
import coverColorPalettte from '../details-popup/cover-colorPalettte.vue';

export default {
  name: 'cover-popup',
  components: {
    coverColorPalettte,
    coverAttachments,
  },
  methods: {
    changeColor(color) {
      this.$emit('changeColor', color);
    },
    uploadImg(img) {
      this.$emit('uploadImg', img);
    },
  },
};
</script>

