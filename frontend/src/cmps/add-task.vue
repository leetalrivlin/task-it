<template>
  <section class="add-task" @click.stop>
    <!-- <transition name="slide-fade" mode="out-in"> -->
    <form @submit.prevent="saveTask">
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
        <i class="el-icon-close" @click="closeTask"></i>
      </div>
    </form>
    <!-- </transition> -->
  </section>
</template>

<script>
import { boardService } from '../services/board.service.js';
export default {
  props: {
    tasksLen: {
      type: Number,
    },
  },
  methods: {
    saveTask() {
      if (!this.emptyTask.title) return;
      this.$emit('saveTask', this.emptyTask);
      this.closeTask();
    },
    emptyTask() {
      this.emptyTask = boardService.getEmptyTask();
    },
    closeTask() {
      this.emptyTask = null;
      this.$emit('closePopup')
    },
  },
  computed: {
  },
  created(){
    this.emptyTask();
  }
};
</script>

