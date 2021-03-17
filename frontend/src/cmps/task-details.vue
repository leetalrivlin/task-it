<template>
  <section class="task-details">
    <section v-if="cover" class="details-layout cover-container">
      <el-button class="cover-btn el-btn">Cover</el-button>
    </section>
    <header class="details-layout flex column space-between details-header">
      <h1>task name</h1>
      <p>In list <a href="#" class="task-list-link">List name</a></p>
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
  data() {
    return {
      cover: true,
    }
  },
  methods: {
    closeDetails() {
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}`);
    },
  },
  created() {
    const boardId = this.$route.params.boardId;
    const groupId = this.$route.params.groupId;
    const taskId = this.$route.params.taskId;
    this.$store.dispatch({type: 'loadTask', boardId, groupId, taskId})
  }
};
</script>

