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
        <menu-bgc-photos @photoPicked="photoPicked" />
      </div>
    </div>
  </section>
</template>

<script>
import menuBgcPalette from './menuBgcPalette';
import menuBgcPhotos from './menuBgcPhotos';
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
    colorPicked(style) {
      this.$emit('colorPicked', style);
    },
    photoPicked(style) {
      this.$emit('photoPicked', style);
    },
  },
  components: {
    menuBgcPalette,
    menuBgcPhotos
  },
};
</script>

