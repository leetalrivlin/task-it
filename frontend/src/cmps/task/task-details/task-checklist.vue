<template>
  <section class="d-checklist checklist-container">
    <font-awesome-icon class="d-icon" icon="check-square" />

    <div class="d-content">
      <div class="flex space-between align-center">
      <h1 class="task-details-header">{{checklist.title}}</h1>
      <button class="el-btn-details details-item-btn del-checklist-btn" @click="deleteChecklist">Delete</button>
      </div>
    </div>
   
      <p class="d-icon percent">{{percentage}}%</p>
      <el-progress
        :percentage="percentage"
        color="grey"
        type="line"
        :show-text="showTxt"
        class="d-content flex align-center"
      ></el-progress>


    <ul v-if="checklist.todos" class="clean-list d-container">
      <checklist-todo
        v-for="todo in checklist.todos"
        :key="todo.id"
        :todo="todo"
        @updateTodo="updateTodo"
        @deleteTodo="deleteTodo"
      />
    </ul>

    <!-- <div class="d-container"> -->
      <div class="d-icon"></div>
      <a
        v-if="!isAddTodos"
        class="el-btn-details details-item-btn checklist-btn d-content"
        @click="isAddTodos = true"
        >Add an item</a
      >

      <form v-else @submit.prevent="saveTodoTxt">
        <el-input
          type="text"
          placeholder="Add an item"
          v-model="todoToAdd.txt"
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
    <!-- </div> -->

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
      todoToAdd: null
    };
  },
  computed: {
    showTxt() {
      return false;
    },
    percentage() {
      if (!this.checklist.todos || !this.checklist.todos.length) return 0;
      var isDoneCounter = 0;
      const todos = this.checklist.todos.length;
      this.checklist.todos.forEach(todo => {
        if (todo.isDone) isDoneCounter++
      })
      return Math.round((100 * isDoneCounter) / todos);
    }
  },
  methods: {
    setEmptyTodo() {
      this.todoToAdd = boardService.getEmptyTodo();
    },
    saveTodoTxt() {
      const copyTodo = clone(this.todoToAdd);
      this.checklist.todos.push(copyTodo);
      this.updateChecklist(this.checklist);
      this.setEmptyTodo();
    },
    deleteTodo(todoId) {
      const copyChecklist = clone(this.checklist);
      const todoIdx = copyChecklist.todos.findIndex(({ id }) => {
        return id === todoId;
      });
      copyChecklist.todos.splice(todoIdx, 1);
      this.updateChecklist(copyChecklist);
    },
    updateTodo(updatedTodo) {
      const todoIdx = this.checklist.todos.findIndex(
        ({ id }) => id === updatedTodo.id
      );
      this.checklist.todos.splice(todoIdx, 1, updatedTodo);
      this.updateChecklist(this.checklist);
    },
    updateChecklist(updatedChecklist) {
      const checklistIdx = this.task.checklists.findIndex(
        ({ id }) => id === updatedChecklist.id
      );
      this.task.checklists.splice(checklistIdx, 1, updatedChecklist);
      this.$emit('updateTask', this.task);
    },
    deleteChecklist() {
      const checklistIdx = this.task.checklists.findIndex(
        ({ id }) => id === this.checklist.id
      );
      const copyTask = clone(this.task);
      copyTask.checklists.splice(checklistIdx, 1);
      this.$emit('updateTask', copyTask);
    }
  },
  created() {
    this.setEmptyTodo();
  },
};
</script>
