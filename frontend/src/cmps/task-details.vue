<template>
  <section v-if="task" class="task-details">
    <section v-if="cover" class="details-layout cover-container">
      <el-button class="cover-btn el-btn">Cover</el-button>
    </section>
    <section class="details-content">
      <header class="details-layout flex column space-between details-header">
        <h1>{{task.title}}</h1>
        <p>In list <a href="#" class="task-list-link">List name</a></p>
      </header>
      <el-button
        class="el-close"
        icon="el-icon-close"
        circle
        @click="closeDetails"
      ></el-button>
    </section>
  </section>
</template>

<script>
export default {
  name: 'taskDetails',
  data() {
    return {
      cover: true
    };
  },
  computed: {
    task() {
      const task = this.$store.getters.task;
      console.log('task',task);
      return task;
    }
  },
  methods: {
    closeDetails() {
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}`);
    },
  },
  created() {
    const taskId = this.$route.params.taskId;
    this.$store.commit({type: 'setTaskById', taskId});
    // this.$store.commit({ type: 'setTask', task });
  }
};
</script>
