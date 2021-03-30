<template>
  <section class="task-cover flex justify-center" :style="coverColor">
    <button
      class="flex align-center el-btn-details fa-nav-icon cover-btn"
      @click="isEditCover = !isEditCover"
    >
      <img src="~@/assets/trello-icon-pack/cover-top.svg" class="cover-icon" />
      <p class="cover-btn-txt">Cover</p>
      <popup v-if="isEditCover" @closePopup="isEditCover = false">
        <template v-slot:title>
          <p>Cover</p>
        </template>
        <cover-popup @changeColor="editColor" @uploadImg="saveImg" />
      </popup>
    </button>
    <img
      v-if="task.cover.img && !task.cover.backgroundColor"
      :src="task.cover.img.url"
      class="cover-img"
    />
  </section>
</template>
<script>
import CoverPopup from '../task-details/details-popup/cover-popup.vue';
import popup from '../../popup.vue';

export default {
  name: 'task-cover',
  components: { popup, CoverPopup },
  props: {
    task: {
      type: Object,
    },
  },
  data() {
    return {
      isEditCover: false,
    };
  },
  methods: {
    editColor(pickedColor) {
      delete this.task.cover.img;
      this.task.cover.backgroundColor = pickedColor;
      this.$emit('saveColor', this.task);
    },
    saveImg(img) {
      delete this.task.cover.backgroundColor;
      this.task.cover.img = img;
      if (!this.task.attachments) this.task.attachments = [];
      this.task.attachments.push(img);
      console.log('this.task.attachments');
      this.$emit('saveImg', this.task);
    },
  },
  computed: {
    coverColor() {
      return this.task.cover.backgroundColor
        ? { backgroundColor: this.task.cover.backgroundColor }
        : { backgroundColor: '#c2c3ca' };
    },
  },
};
</script>
