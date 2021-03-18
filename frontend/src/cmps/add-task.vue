<template>
  <div class="add-task" @click.stop>
    <section v-if="emptyTask">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="Please input"
        v-model="emptyTask.title"
        autofocus
      >
      </el-input>
      <div class="flex align-center">
        <el-button type="info" @click="saveTask">Add Task</el-button>
        <i class="el-icon-close" @click="closeTask"> </i>
      </div>
    </section>
    <a v-else @click="addTask" class="adding flex align-center">
      <i class="el-icon-plus"></i> {{ addTxt }}
    </a>
  </div>
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
    group: {
      type: Object,
    },
  },
  methods: {
    saveTask() {
      this.$emit('saveTask', this.emptyTask, this.group.id);
      this.emptyTask = boardService.getEmptyTask();
    },
    addTask() {
      this.emptyTask = boardService.getEmptyTask();
    },
    closeTask() {
      this.emptyTask =null;
    },
  },
  computed: {
    addTxt() {
      return this.group.tasks.length ? 'Add another task' : 'Add a task';
    },
  },
};
</script>

