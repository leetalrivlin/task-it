<template>
  <section class="delete-task-container">
    <p>
      All actions will be removed from the activity feed and you won’t be able
      to re-open the card. There is no undo.
    </p>
    <button class="delete-btn" @click="deleteTask">Delete</button>
  </section>
</template>

<script>
export default {
  props: {
    taskId: {
      type: String
    }
  },
  methods: {
    deleteTask() {
      this.$emit('deleteTask', this.taskId);
    }
  }
};
</script>
