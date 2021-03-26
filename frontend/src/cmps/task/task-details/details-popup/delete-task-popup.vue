<template>
  <section class="delete-task-container">
    <p>
      All actions will be removed from the activity feed and you won’t be able
      to re-open the card. There is no undo.
    </p>
    <button class="delete-btn" @click="removeTask">Delete</button>
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
    removeTask() {
      this.$emit('removeTask', this.taskId);
    }
  }
};
</script>
