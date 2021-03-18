<template>
  <section
    class="task"
    @mouseover="taskOnFocus = true"
    @mouseleave="taskOnFocus = false"
  >
    <div class="task-area">
      {{ task.title }}
    </div>
    <i
      v-if="taskOnFocus"
      class="el-icon-close delete-task"
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
};
</script>

<style>
</style>