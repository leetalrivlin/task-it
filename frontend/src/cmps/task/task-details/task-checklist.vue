<template>
  <section class="d-checklist checklist-container">
    <img src="~@/assets/trello-icon-pack/checkbox.svg" class="d-icon" />
    <div class="d-content">
      <div class="flex space-between align-center">
        <h1 class="task-details-header">{{ checklist.title }}</h1>
        <button
          class="el-btn-details details-item-btn del-checklist-btn"
          @click="deleteChecklist"
        >
          Delete
        </button>
      </div>
    </div>

    <p class="percent">{{ percentage }}%</p>
    <el-progress
      :percentage="percentage"
      color="#409EFF"
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

    <div class="d-icon"></div>
    <button
      v-if="!isAddTodos"
      class="el-btn-details details-item-btn checklist-btn d-content"
      @click="openInput"
    >
      Add an item
    </button>

    <form v-else @submit.prevent="saveTodoTxt">
      <el-input
        type="text"
        placeholder="Add an item"
        v-model="todoToAdd.txt"
        ref="todoInput"
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
  </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import checklistTodo from './checklist-todo.vue';
import { boardService } from '../../../services/board.service';

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
        if (todo.isDone) isDoneCounter++;
      });
      return Math.round((100 * isDoneCounter) / todos);
    }
  },
  methods: {
    openInput() {
      this.isAddTodos = true;
      this.$nextTick(() => this.$refs.todoInput.focus());
    },
    setEmptyTodo() {
      this.todoToAdd = boardService.getEmptyTodo();
    },
    saveTodoTxt() {
      const copyTodo = this.$clone(this.todoToAdd);
      this.checklist.todos.push(copyTodo);
      this.updateChecklist(this.checklist);
      this.setEmptyTodo();
    },
    deleteTodo(todoId) {
      const copyChecklist = this.$clone(this.checklist);
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
      const copyTask = this.$clone(this.task);
      copyTask.checklists.splice(checklistIdx, 1);
      const activity = boardService.getEmptyActivity();
      activity.txt = `removed ${this.checklist.title} from ${this.task.title}`;
      this.$emit('updateTask', copyTask, activity);
    }
  },
  created() {
    this.setEmptyTodo();
  }
};
</script>
