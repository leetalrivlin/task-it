<template>
  <section class="task-details">
    <header class="flex space-between details-header">
      <h1>task name</h1>
    </header>
    <el-button
      class="el-close"
      icon="el-icon-close"
      circle
      @click="closeDetails"
    ></el-button>
  </section>
</template>

<script>
export default {
  name: "taskDetails",
  methods: {
    closeDetails() {
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}`);
    },
  },
};
</script>

