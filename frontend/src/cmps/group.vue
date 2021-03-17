<template>
  <ul class="clean-list flex column group-content">
    <h2>
      {{ group.title }}
    </h2>
    <li @click="taskClicked(task.id)" v-for="task in group.tasks" :key="task.id">
      <task :task="task" />
    </li>
  </ul>
</template>

<script>
import task from "../cmps/task.vue";
export default {
  components: {
    task,
  },
  name: "group",
  props: {
    group: {
      type: Object,
    },
  },
  methods: {
    taskClicked(taskId) {
      console.log("taskId", taskId);
      console.log(this.$route.params.boardId);
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}/${taskId}`);
    },
  },
  computed: {
    // taskDetails(taskId) {
    //   return `/${this.$route.params.boardId}/${taskId}`;
    // },
  },
};
</script>

<style>
</style>