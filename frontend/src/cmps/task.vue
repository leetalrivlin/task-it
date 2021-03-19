<template>
  <section
    class="task"
    @mouseover="taskOnFocus = true"
    @mouseleave="taskOnFocus = false"
  >
    <section v-if="task.cover" class="task-cover" :style="coverColor">
      <img v-if="task.cover.img" :src="task.cover.img">
    </section>
    <section class="task-content flex align-center space-between">
      <p class="task-title">
        {{ task.title }}
      </p>
      <i
        v-if="taskOnFocus"
        class="el-icon-delete delete-task"
        @click.stop="deleteTask"
      >
      </i>
    </section>
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
  },
};
</script>

<style>
</style>