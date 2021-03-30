<template>
  <section class="window-overlay">
    <div
      class="board-dashboard-container flex column justify-center"
      v-click-outside="closeDashboard"
    >
      <div class="header-dashboard flex align-center justify-center">
        <i class="el-icon-close close-btn" @click="closeDashboard"></i>
        <p class="dashboard-header">
          <i class="el-icon-s-data dashboard-icon" /> Dashboard
        </p>
      </div>

      <ul class="flex space-between clean-list data-container">
        <li class="flex column amount task-amount">
          <i class="el-icon-tickets flex justify-center align-center icon" />
          <div class="data">
            <p>Tasks</p>
            {{ countTasks }}
          </div>
        </li>
        <li class="flex column amount comments-amount">
          <i
            class="el-icon-chat-dot-square flex justify-center align-center icon"
          />
          <div class="data flex column">
            <p>Complited</p>
            <span>{{ countComplited }}</span>
          </div>
        </li>
        <li class="flex column amount user-amount">
          <i class="el-icon-user flex justify-center align-center icon" />
          <div class="data flex column">
            <p>Users</p>
           <span> {{ countUsers }}</span> 
          </div>
        </li>
        <li class="flex column amount activity-amount">
          <i class="el-icon-time flex justify-center align-center icon" />
          <div class="data">
            <p>Activities</p>
            {{ countActivity }}
          </div>
        </li>
      </ul>

      <div class="charts">
        <tasks-in-group class="chart" :board="board" />
        <member-task-count class="chart" :board="board" />
      </div>
    </div>
  </section>
</template>

<script>
import tasksInGroup from './tasks-in-group.vue';
import memberTaskCount from './member-task-count.vue';
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
      if (!this.board.members) return;
      this.board.members.forEach((user) => {
        users++;
      });
      return users;
    },
    countActivity() {
      var activities = 0;
      if (!this.board.activities) return;
      this.board.activities.forEach((activity) => {
        activities++;
      });
      return activities;
    },
    countComplited() {
      var completed = 0;
      this.board.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (task.completed) completed++;
        });
      });
      return completed;
    },
  },
  components: {
    tasksInGroup,
    memberTaskCount,
  },
};
</script>

<style>
</style>