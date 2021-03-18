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
  computed: {
    board() {
      return this.$store.getters.board;
    }
  },
  methods: {
    closeDetails() {
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}`);
    },
    getTask(taskId) {
      // const board = this.$store.getters.board;
      const currTasks = this.board.groups.map(group => {
        return group.tasks.find(t => t.id === taskId);
      })
      console.log('currTasks',currTasks);
    }
  },
  created() {
    const taskId = this.$route.params.taskId;
    const task = this.getTask(taskId);
    this.$store.commit({ type: 'setTask', task });
  }
};
</script>

