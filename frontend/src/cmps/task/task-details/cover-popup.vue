<template>
  <section class="cover-popup">
    <!-- <template v-slot="name">
      <p>Cover</p>
    </template> -->
    <cover-color-palettte @colorPicked="changeColor" />
    <cover-attachments @imgUploaded="uploadImg" />
  </section>
</template>

<script>
import coverAttachments from './cover-attachments.vue';
import coverColorPalettte from './cover-colorPalettte.vue';

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
    uploadImg(imgUrl) {
      this.$emit('uploadImg', imgUrl);
    },
  },
};
</script>

