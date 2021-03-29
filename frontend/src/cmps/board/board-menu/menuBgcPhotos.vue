<template>
  <section class="photos-container">
    <ul class="clean-list">
      <li
        v-for="(photo, idx) in photos"
        :key="idx"
        :style="{
          background: photo,
        }"
      >
        <img :src="photo" @click="changePhoto(photo)" class="photo-pick" />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'menuBgcPhotos',
  data() {
    return {
      photos: [
        require('../../../assets/imgs/bgc-1.jpg'),
        require('../../../assets/imgs/bgc-2.jpg'),
        require('../../../assets/imgs/bgc-3.jpg'),
        require('../../../assets/imgs/bgc-4.jpg'),
        require('../../../assets/imgs/bgc-5.jpg'),
        require('../../../assets/imgs/bgc-6.jpg'),
        require('../../../assets/imgs/bgc-7.jpg'),
        require('../../../assets/imgs/bgc-8.jpg'),
        require('../../../assets/imgs/bgc-9.jpg'),
        require('../../../assets/imgs/bgc-10.jpg'),
      ],
    };
  },
  methods: {
    changePhoto(photo) {
      this.$emit('photoPicked', {background:`url(${photo})`})
    },
  },
};
</script>
