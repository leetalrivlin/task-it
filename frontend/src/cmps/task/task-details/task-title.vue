<template>
  <section class="d-header header-container">
    <font-awesome-icon class="d-icon" icon="columns" />
    <div class="d-content task-title-container">
      <input
        type="text"
        class="flex align-center"
        v-model="task.title"
        @change="updateTaskTitle"
        @keyup.enter.exact="updateTaskTitle"
      />
      <p>
        In list <a class="task-list-link">{{ groupName }}</a>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    group: {
      type: Object
    },
    task: {
      type: Object
    }
  },
  computed: {
    groupName() {
      return this.group.title;
    }
  },
  methods: {
    updateTaskTitle() {
        console.log('this.task',this.task);
      this.$emit('updateTask', this.task);
    }
  }
};
</script>
