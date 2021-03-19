<template>
  <section v-if="task" class="task-details" v-click-outside="closeDetails">
    <el-button
      class="el-close"
      icon="el-icon-close"
      circle
      @click="closeDetails"
    ></el-button>
    <task-cover v-if="task.cover" :task="task"/>
    <section class="details-grid">

      <header class="d-header header-container">
        <font-awesome-icon class="d-icon" icon="columns" />
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
import taskCover from '../task/task-details/task-cover.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faColumns } from '@fortawesome/free-solid-svg-icons';

library.add(faColumns);
const clone = require('rfdc')({ proto: true });

export default {
  name: 'taskDetails',
  components: {
    taskDescription,
    taskController,
    taskChecklist,
    taskAttachment,
    taskCover
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
