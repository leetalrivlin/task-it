<template>
  <section class="window-overlay">>
    <div class="board-dashboard-container flex justify-center">
      <i class="el-icon-close close-btn" @click="closeDashboard"></i>
      <p class="dashboard-header">
        <i class="el-icon-s-data dashboard-icon" /> Dashboard
      </p>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    closeDashboard() {
      this.$emit('closeDashboard');
    },
  },
};
</script>

<style>
</style>