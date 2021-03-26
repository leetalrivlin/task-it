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

      <ul class="flex space-between clean-list data-container">
        <li class="flex column amount task-amount">
          <i class="el-icon-tickets flex justify-center align-center icon" />
          <div class="data">
            <p>Tasks</p>
            {{ countTasks }}
          </div>
        </li>
        <li class="flex column amount user-amount">
          <i class="el-icon-user flex justify-center align-center icon" />
          <div class="data">
            <p>Users</p>
            {{ countUsers }}
          </div>
        </li>
        <li class="flex column amount activity-amount">
          <i class="el-icon-time flex justify-center align-center icon" />
          <div class="data">
            <p>Activitys</p>
            <!-- {{ countActivity }} -->
          </div>
        </li>
        <li class="flex column amount comments-amount">
          <i
            class="el-icon-chat-dot-square flex justify-center align-center icon"
          />
          <div class="data">
            <p>Comments</p>
            <!-- {{ countComments }} -->
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
      this.board.members.forEach((user) => {
        users++;
      });
      return users;
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