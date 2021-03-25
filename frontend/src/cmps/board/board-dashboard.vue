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

      <div class="flex space-between data-container">
        <div class="task-amount flex">
          <div class="task-icon">
            <i
              class="el-icon-tickets flex justify-center align-center task-icon-task"
            />
          </div>
          <div class="data-task">
            <span> {{ countTasks }}</span>
            <p>Tasks</p>
          </div>
        </div>

        <div class="user-amount flex">
          <div class="user-icon">
            <i
              class="el-icon-user flex justify-center align-center user-icon-task"
            />
          </div>
          <div class="data-task">
            <span> {{ countUsers }}</span>
            <p>Users</p>
          </div>
        </div>

        <div class="activity-amount flex">
          <div class="activity-icon">
            <i
              class="el-icon-time flex justify-center align-center activity-icon-task"
            />
          </div>
          <div class="data-task">
            <span> {{ countActivity }}</span>
            <p>Activity</p>
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
    countUsers() {
      var users = 0;
      this.board.members.forEach((user) => {
        users++;
      });
      return users;
    },
  },
  components: {
    tasksInGroup,
  },
};
</script>

<style>
</style>