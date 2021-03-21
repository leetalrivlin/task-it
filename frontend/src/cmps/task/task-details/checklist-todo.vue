<template>
  <li class="d-todos">
    <input
      type="checkbox"
      v-model="checked"
      @change="toggleTodo"
      class="d-todo-icon"
    />
    <!-- <el-checkbox
      v-model="checked"
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
      checked: this.todo.isDone
    };
  },

  methods: {
    toggleTodo() {
      this.todo.isDone = this.checked;
      this.$emit('toggleTodo', this.checked);
    }
  }
};
</script>
