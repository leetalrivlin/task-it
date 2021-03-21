<template>
  <section class="todo-popup" @click.stop>
    <p class="delete-btn" @click="deleteTodo">Delete</p>
  </section>
</template>

<script>
export default {
  name: 'todoPopUp',
  methods: {
    deleteTodo() {
      this.$emit('deleteTodo');
    }
  }
};
</script>
