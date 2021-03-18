<template>
  <section v-if="task" class="task-details">
    <section v-if="cover" class="details-layout cover-container">
      <el-button class="cover-btn el-btn">Cover</el-button>
    </section>
    <section class="details-grid">

      <header class="d-header">
          <i class="el-icon-c-scale-to-original d-icon task-details-icon"></i>
          <div class="d-content task-title-container">
            <h1>{{ task.title }}</h1>
            <p>In list <a href="#" class="task-list-link">List name</a></p>
          </div>
      </header>

      <task-controller />
      <task-description :task="task" @saveDescription="updateTask"/>

      <div class="d-checklist">
        <i class="el-icon-edit d-icon task-details-icon"></i>
        <div class="d-content">
          <h1 class="task-details-header">Cecklist</h1>
          <ul>
            <li>Add chart</li>
            <li>Manage service support</li>
          </ul>
        </div>
      </div>

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
import taskDescription from './task-description.vue';
import taskController from './task-controller.vue';

const clone = require('rfdc')({ proto: true });

export default {
  name: 'taskDetails',
  components: {taskDescription, taskController},
  data() {
    return {
      cover: true,
    };
  },
  computed: {
    task() {
      return clone(this.$store.getters.task);
    }
  },
  methods: {
    closeDetails() {
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}`);
    },
    updateTask(updatedTask) {
      this.$store.commit('setTask', task);
    }
  },
  created() {
    const taskId = this.$route.params.taskId;
    this.$store.commit({ type: 'setTaskById', taskId });

  }
};
</script>
