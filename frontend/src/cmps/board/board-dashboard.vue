<template>
  <section class="window-overlay">
    <div
      class="board-dashboard-container flex column justify-center"
      v-click-outside="closeDashboard"
    >
      <i class="el-icon-close close-btn" @click="closeDashboard"></i>
      <div class="header-dashboard flex justify-center">
        <p class="dashboard-header">
          <i class="el-icon-s-data dashboard-icon" /> Dashboard
        </p>
      </div>

      <div class="data-container">
        <div class="task-amount flex">
          <div class=" task-icon flex justify-center align-center ">
            <i class="el-icon-tickets flex justify-center align-center " />
          </div>
          <div class="data-task">
            <span> {{ countTasks }}</span>
            <p>Tasks</p>
          </div>
        </div>
      </div>
      <div class="flex justify-center charts">
        <tasks-in-group class="tasks-users" :board="board" />
      </div>
    </div>
  </section>
</template>

<script>
import tasksInGroup from './tasks-in-group.vue';
export default {
  props: {
    board: {
      type: Object,
    },
  },
  methods: {
    closeDashboard() {
      this.$emit('closeDashboard');
    },
  },
  computed: {
    countTasks() {
      var tasks = 0;
      this.board.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          tasks++;
        });
      });
      return tasks;
    },
  },
  components: {
    tasksInGroup,
  },
};
</script>

<style>
</style>