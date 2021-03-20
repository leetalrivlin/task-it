<template>
  <section class="d-checklist checklist-container">
    <font-awesome-icon class="d-icon" icon="check-square" />

    <div class="d-content">
      <h1 class="task-details-header">Checklist</h1>
      <el-progress
        :percentage="50"
        color="grey"
        type="line"
        :show-text="showTxt"
      ></el-progress>
    </div>

    <div class="d-content">
      <a
        v-if="!isAddTodos"
        class="el-btn-details details-item-btn checklist-btn"
        @click="isAddTodos = true"
        >Add an item</a
      >

      <form v-else>
        <el-input
          type="text"
          placeholder="Add an item"
          v-model="todo"
        ></el-input>
        <div class="btn-container">
          <el-button
            class="task-details-btn"
            type="info"
            @click.prevent="saveChecklist"
            >Add</el-button
          >
          <i class="el-icon-close" @click="isAddTodos = false"></i>
        </div>
      </form>
    </div>

    <div v-if="todos" class="d-todos">
      <el-checkbox
        @click="checked = !checked"
        v-model="checked"
        class="d-todo-icon"
        name="checkbox-item"
      ></el-checkbox>
      <label class="d-todo-content" for="checkbox-item"
        >Manage service support</label
      >
    </div>
  </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare);

export default {
  props: {
    checklist: {
      type: Object
    }
  },
  data() {
    return {
      isAddTodos: false,
      todos: [],
      todo: '',
      checked: false
    };
  },
  computed: {
    showTxt() {
      return false;
    }
  },
  methods: {
    addTodo() {
      console.log('todo saved');
    },
    saveChecklist() {
      console.log('save todo:', this.todo);
    }
  },
  created() {
    // console.log('task in created', this.task);
    console.log('empty checkbox in created', this.checklist);
    if (this.checklist.todos && this.checklist.todos.length > 0) {
      this.todos = this.checklist.todos;
    }
  },
  mounted() {}
};
</script>
