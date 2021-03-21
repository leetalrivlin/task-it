<template>
  <section class="flex align-center change-bgc">
    <div v-if="isBgc">
      <div class="change-container flex">
        <div class="flex column justify-center" @click="showPhotos">
          <div class="change photo"></div>
          <p>Photos</p>
        </div>

        <div class="flex column justify-center" @click="showPallete">
          <div class="change color"></div>
          <p>Colors</p>
        </div>
      </div>
    </div>

    <div v-else>
      <div v-if="isColors">
        <menu-bgc-palette @colorPicked="colorPicked" />
     
      </div>
      <div v-if="isPhotos">
        <h2>photos</h2>
        <!-- <cover-color-palettte @colorPicked="changeColor" /> -->
      </div>
    </div>
  </section>
</template>

<script>
import menuBgcPalette from './menuBgcPalette';
export default {
  data() {
    return {
      isBgc: true,
      isColors: false,
      isPhotos: false,
    };
  },
  methods: {
    showPallete() {
      this.isColors = true;
      this.isBgc = false;
    },
    showPhotos() {
      this.isPhotos = true;
      this.isBgc = false;
    },
    colorPicked(color) {
      console.log(color);
      this.$emit('colorPicked', color);
    },
  },
  components: {
    menuBgcPalette,
  },
};
</script>

