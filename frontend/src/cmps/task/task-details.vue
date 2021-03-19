<template>
  <section v-if="task" class="task-details" v-click-outside="closeDetails">
    <el-button
      class="el-close"
      icon="el-icon-close"
      circle
      @click="closeDetails"
    ></el-button>
    <section v-if="task.cover" class="cover-container flex justify-center" :style="coverColor">
      <el-button class="cover-btn el-btn">Cover</el-button>
      <img v-if="task.cover.img" :src="task.cover.img" class="cover-img" />
    </section>
    <section class="details-grid">
      <header class="d-header header-container">
        <i class="el-icon-c-scale-to-original d-icon task-details-icon"></i>
        <!-- <img src="../assets/icons/clock.svg" class="d-icon task-details-icon"> -->
        <div class="d-content task-title-container">
          <h1>{{ task.title }}</h1>
          <p>In list <a class="task-list-link">List name</a></p>
        </div>
      </header>
      <task-controller />
      <section class="flex column task-main">
        <task-description :task="task" @saveDescription="updateTask" />
        <task-checklist :task="task" />
        <task-attachment />
      </section>
    </section>
  </section>
</template>

<script>
import taskController from '../task/task-details/task-controller.vue';
import taskDescription from '../task/task-details/task-description.vue';
import taskChecklist from '../task/task-details/task-checklist.vue';
import taskAttachment from '../task/task-details/task-attachment.vue';

const clone = require('rfdc')({ proto: true });

export default {
  name: 'taskDetails',
  components: {
    taskDescription,
    taskController,
    taskChecklist,
    taskAttachment,
  },
  data() {
    return {
      cover: true,
    };
  },
  computed: {
    task() {
      return clone(this.$store.getters.task);
    },
    coverColor() {
      return this.task.cover.backgroundColor
        ? { backgroundColor: this.task.cover.backgroundColor }
        : {backgroundColor: '#c2c3ca'};
    },
  },
  methods: {
    closeDetails() {
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}`);
    },
    updateTask(updatedTask) {
      this.$store.dispatch({ type: 'updateTask', task: updatedTask });
    },
  },
  created() {
    const taskId = this.$route.params.taskId;
    this.$store.commit({ type: 'setTaskById', taskId });
  },
};
</script>
