<template>
  <li class="d-todos">
      <!-- <span type="checkbox" class="d-todo-icon checkbox" @click="isDone" :class="completed"></span> -->
    <!-- <input
      type="checkbox"
      v-model="checked"
      class="d-todo-icon"
    /> -->
    <el-checkbox
      v-model="checked"
      @input="toggleTodo"
      class="d-todo-icon"
    ></el-checkbox>
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
      this.$emit('toggleTodo', this.checked)
    }
  }
};
</script>
