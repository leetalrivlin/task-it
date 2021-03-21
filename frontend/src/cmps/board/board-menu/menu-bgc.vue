<template>
  <div v-if="isBgc" class="flex justify-center">
    <div class="select">
      <div class="select-photo" @click="showPhotos">Photos</div>
      <div class="select-color" @click="showPallete">Colors</div>
    </div>
  </div>
  <div v-else>
    <div v-if="isColors" class="div">
      <cover-color-palettte @colorPicked="updateBoard" />
       <!-- <ul class="clean-list">
      <li
        v-for="(color, idx) in colors"
        :key="idx"
        class="color-item"
        :style="{
          backgroundColor: color,
        }"
        @click="updateBoard(color)"
      ></li>
    </ul> -->
    </div>
    <div v-if="isPhotos" class="div">
      <h2>photos</h2>
      <!-- <cover-color-palettte @colorPicked="changeColor" /> -->
    </div>
  </div>
</template>

<script>
import coverColorPalettte from '../../task/task-details/cover-colorPalettte';
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
    updateBoard(){
      console.log('color');
    }
  },
    components: {
      coverColorPalettte,
    },
};
</script>

