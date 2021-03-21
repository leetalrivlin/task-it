<template>
  <section
    class="task"
    @mouseover="taskOnFocus = true"
    @mouseleave="taskOnFocus = false"
  >
    <section v-if="task.cover" class="task-cover" :style="coverColor">
      <img
        v-if="task.cover.img && !task.cover.backgroundColor"
        :src="task.cover.img.url"
      />
    </section>
    <section class="task-content">
      <ul v-if="task.labelIds" class="labels-list clean-list flex">
        <li v-for="label in boardLabels" :key="label.id" class="label">
          <span :style="{ backgroundColor: label.color }"></span>
        </li>
      </ul>
      <section class="flex align-center space-between">
        <p class="task-title">
          {{ task.title }}
        </p>
      </section>
    </section>
    <i
      v-if="taskOnFocus"
      class="el-icon-delete delete-task"
      @click.stop="deleteTask"
    >
    </i>
  </section>
</template>



<script>
export default {
  name: 'task',
  props: {
    task: {
      type: Object,
    },
  },
  data() {
    return {
      taskOnFocus: null,
    };
  },
  methods: {
    deleteTask() {
      this.$emit('deleteTask', this.task);
    },
  },
  computed: {
    coverColor() {
      return this.task.cover.backgroundColor
        ? { backgroundColor: this.task.cover.backgroundColor }
        : {};
    },
    boardLabels() {
      const labels = this.$store.getters.boardLabels;
      return labels.filter((label) => this.task.labelIds.includes(label.id));
    },
  },
};
</script>

<style>
</style>