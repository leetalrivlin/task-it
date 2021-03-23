<template>
  <section class="window-overlay">
    <div
      class="board-dashboard-container flex justify-center"
      v-click-outside="closeDashboard"
    >
      <i class="el-icon-close close-btn" @click="closeDashboard"></i>
      <p class="dashboard-header">
        <i class="el-icon-s-data dashboard-icon" /> Dashboard
      </p>
      <tasks-in-group class="tasks-users" :board="board" />
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
  components: {
    tasksInGroup,
  },
};
</script>

<style>
</style>