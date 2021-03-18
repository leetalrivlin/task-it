<template>
  <section class="add-task" @click.stop>
    <transition name="slide-fade" mode="out-in">
      <a v-if="!emptyTask" @click="addTask" class="adding flex align-center">
        <i class="el-icon-plus"></i> {{ addTxt }}
      </a>
      <form v-else @submit.prevent="saveTask">
        <textarea
          @keydown.enter.exact.prevent
          @keyup.enter.exact="saveTask"
          placeholder="Enter a title for this task…"
          maxlength="120"
          v-model="emptyTask.title"
          autofocus
          class="textarea"
        >
        </textarea>
        <div class="flex align-center">
          <el-button type="info" @click="saveTask">Add Task</el-button>
          <i class="el-icon-close" @click="closeTask"> </i>
        </div>
      </form>
    </transition>
  </section>
</template>

<script>
import { boardService } from '../services/board.service.js';
export default {
  data() {
    return {
      emptyTask: null,
    };
  },
  props: {
    tasksLen: {
      type: Number,
    },
  },
  methods: {
    saveTask() {
      this.$emit('saveTask', this.emptyTask);
      this.emptyTask = boardService.getEmptyTask();
    },
    addTask() {
      this.emptyTask = boardService.getEmptyTask();
    },
    closeTask() {
      this.emptyTask = null;
    },
  },
  computed: {
    addTxt() {
      return this.tasksLen === 0 ? 'Add a task' : 'Add another task';
    },
  },
};
</script>

