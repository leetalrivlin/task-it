<template>
  <ul class="clean-list flex column group-content">
    <h2>
      {{ group.title }}
    </h2>
    <li
      @click="taskClicked(task.id)"
      v-for="task in group.tasks"
      :key="task.id"
    >
      <task :task="task" />
    </li>
    <div class="add-task" @click.stop>
      <template v-if="isAdd">
        <textarea name="" id="" cols="30" rows="2"></textarea>
        <el-button type="info" @click="saveTask">Add Task</el-button>
        <i class="el-icon-close" @click="closeTask"> </i>
      </template>
      <div v-else @click="addTask">
        <i class="el-icon-plus"></i><span>{{ addTxt }}</span>
      </div>
    </div>
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
  data() {
    return {
      isAdd: false,
      taskTxt: "",
    };
  },
  methods: {
    taskClicked(taskId) {
      console.log("taskId", taskId);
      console.log(this.$route.params.boardId);
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}/${taskId}`);
    },
    saveTask() {
      if (!this.taskTxt) return;
      this.$emit("saveTask", this.taskTxt, this.group.id);
      this.taskTxt = "";
    },
    addTask() {
      this.isAdd = true;
    },
    closeTask() {
      this.isAdd = false;
      this.taskTxt = "";
    },
  },
  computed: {
    addTxt() {
      return this.group.tasks.length ? "Add another task" : "Add a task";
    },
    // taskDetails(taskId) {
    //   return `/${this.$route.params.boardId}/${taskId}`;
    // },
  },
};
</script>

<style>
</style>