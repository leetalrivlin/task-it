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

    <ul v-if="todos && todos.length > 0" class="clean-list">
      <checklist-todo v-for="todo in todos" :key="todo.id" :todo="todo" />
    </ul>

  </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import checklistTodo from './checklist-todo.vue';

library.add(faCheckSquare);

export default {
  components: {checklistTodo},
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
      const copyTodo = this.todo.slice();
      this.todos.push(copyTodo);
      console.log('copyTodo', copyTodo);
      this.todo = '';
      console.log('copyTodo', copyTodo);
    }
  },
  created() {
    console.log('todos in created', this.todos);
    console.log('empty checkbox in created', this.checklist);
    if (this.checklist.todos && this.checklist.todos.length > 0) {
      this.todos = this.checklist.todos;
    }
  },
  mounted() {}
};
</script>
