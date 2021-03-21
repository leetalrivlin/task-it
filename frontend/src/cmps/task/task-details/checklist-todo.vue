<template>
  <li class="d-todos todo-item">
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
    <div class="d-todo-content flex align-center justify-center">
      <span>{{ todo.txt }}</span>
      <i class="el-icon-more more-btn"></i>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object
    }
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
    },
    deleteTodo() {
      this.$emit('deleteTodo', this.todo.id);
    }
  }
};
</script>
