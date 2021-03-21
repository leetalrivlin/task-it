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
          v-model="todo.txt"
        ></el-input>
        <div class="btn-container">
          <el-button
            class="task-details-btn"
            type="info"
            @click.prevent="saveTodoTxt"
            >Add</el-button
          >
          <i class="el-icon-close" @click="isAddTodos = false"></i>
        </div>
      </form>
    </div>

    <ul v-if="checklist.todos" class="clean-list">
      <checklist-todo
        v-for="todo in checklist.todos"
        :key="todo.id"
        :todo="todo"
        @toggleTodo="updateToggleTodo"
      />
    </ul>
  </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import checklistTodo from './checklist-todo.vue';
import { boardService } from '../../../services/board.service';
const clone = require('rfdc')({ proto: true });

library.add(faCheckSquare);

export default {
  components: { checklistTodo },
  props: {
    task: {
      type: Object
    },
    checklist: {
      type: Object
    }
  },
  data() {
    return {
      isAddTodos: false,
      todo: null
    };
  },
  computed: {
    showTxt() {
      return false;
    }
  },
  methods: {
    setTodo() {
      const emptyTodo = boardService.getEmptyTodo();
      this.todo = emptyTodo;
    },
    saveTodoTxt() {
      const copyTodo = clone(this.todo);
      this.checklist.todos.push(copyTodo);
      this.updateChecklist(this.checklist);
      this.setTodo();
    },
    updateToggleTodo(isChecked) {
      const copyTodo = clone(this.todo);
      copyTodo.isDone = isChecked;
      const todoIdx = this.checklist.todos.findIndex(
        ({ id }) => id === copyTodo.id
      );
      this.checklist.todos.splice(todoIdx, 1, copyTodo);
      console.log('this.checklist after splicing todos',this.checklist);
      this.updateChecklist(this.checklist);
    },
    updateChecklist(updatedChecklist) {
      const checklistIdx = this.task.checklists.findIndex(
        ({ id }) => id === updatedChecklist.id
      );
      this.task.checklists.splice(checklistIdx, 1, updatedChecklist);
      // this.task.checklists[checklistIdx] = updatedChecklist;
      console.log('this.task send to updateTask',this.task);
      // this.$emit('updateTask',this.task);
    },
  },
  created() {
    this.setTodo();
  },
  mounted() {}
};
</script>
