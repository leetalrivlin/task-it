<template>
  <section class="delete-task-container">
      <p class="warning-container">
        All actions will be removed from the activity feed and you won’t be able
        to re-open the card. There is no undo.
      </p>
    <button @click="deleteTask">Delete</button>
  </section>
</template>

<script>
export default {
  methods: {
    deleteTask() {
      console.log('deleting task');
    }
  }
};
</script>
