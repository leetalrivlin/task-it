<template>
  <section class="task-cover flex justify-center" :style="coverColor">
    <el-button
      icon="el-icon-set-up"
      class="el-btn-details fa-nav-icon cover-btn"
      @click="isEditCover = !isEditCover"
      >Cover
      <cover-controller
        v-if="isEditCover"
        @closeCntrl="isEditCover = false"
        @changeColor="editColor"
      />
    </el-button>
    <img v-if="task.cover.img" :src="task.cover.img" class="cover-img" />
  </section>
</template>
<script>
import coverController from './cover-controller.vue';

export default {
  name: 'task-cover',
  components: { coverController },
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
      this.task.cover.backgroundColor = pickedColor;
      this.$emit('saveColor', this.task);
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
