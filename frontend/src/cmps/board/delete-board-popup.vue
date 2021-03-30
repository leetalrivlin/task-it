<template>
  <section class="delete-board">
    <p>
      All actions will be removed from the activity feed and you won’t be able
      to re-open the board. There is no undo.
    </p>
    <button class="delete-btn" @click="removeBoard">Delete</button>
  </section>
</template>

<script>
export default {
  name: 'deleteBoardPopup',
  methods: {
    removeBoard() {
      this.$emit('deleteBoard');
    },
  },
};
</script>
