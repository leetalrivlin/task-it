<template>
  <li class="d-todos">
    <input
      type="checkbox"
      v-model="isDone"
      @change="toggleTodo"
      class="d-todo-icon"
    />
    <!-- <el-checkbox
      v-model="isDone"
      @input="toggleTodo"
      class="d-todo-icon"
    ></el-checkbox> -->
    <label class="d-todo-content" for="checkbox-item">{{ todo.txt }}</label>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object
    },
  },
  data() {
    return {
      isDone: this.todo.isDone
    };
  },

  methods: {
    toggleTodo() {
      this.todo.isDone = this.isDone;
      this.$emit('updateTodo', this.todo);
    }
  }
};
</script>
