<template>
  <section v-if="task" class="task-details" v-click-outside="closeDetails">
    <el-button
      class="el-close"
      icon="el-icon-close"
      circle
      @click="closeDetails"
    ></el-button>
    <task-cover v-if="task.cover" :task="task" @saveColor="updateTask" />
    <section class="details-grid">
      <header class="d-header header-container">
        <font-awesome-icon class="d-icon" icon="columns" />
        <div class="d-content task-title-container">
          <h1>{{ task.title }}</h1>
          <p>In list <a class="task-list-link">List name</a></p>
        </div>
      </header>
      <task-controller
        :cover="cover"
        @openChecklist="showEmptyChecklist"
        @addCover="setCover"
      />
      <section class="flex column task-main">
        <task-description :task="task" @saveDescription="updateTask" />
        <li v-if="checklists && checklists.length" class="clean-list">
          <task-checklist
            v-for="checklist in checklists"
            :key="checklist.id"
            :task="task"
            :checklist="checklist"
          />
        </li>
        <task-attachment />
      </section>
    </section>
  </section>
</template>

<script>
import { boardService } from '../../services/board.service';
import taskController from '../task/task-details/task-controller.vue';
import taskDescription from '../task/task-details/task-description.vue';
import taskChecklist from '../task/task-details/task-checklist.vue';
import taskAttachment from '../task/task-details/task-attachment.vue';
import taskCover from '../task/task-details/task-cover.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
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
    taskCover,
  },
  data() {
    return {
      checklists: [],
    };
  },
  computed: {
    task() {
      return clone(this.$store.getters.task);
    },
    // group() {
    //   return boardCopy.groups.find((group) =>
    //     group.some(({ id }) => id === this.task.id)
    //   );
    // },
    cover() {
      return this.task.cover ? true : false;
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
    showEmptyChecklist() {
      const emptyCheckList = boardService.getEmptyChecklist();
      this.checklists.push(emptyCheckList);
      console.log('this.checklists', this.checklists);
    },
    showChecklists() {
      console.log('showing checklist');
      this.checklists = this.task.checklists;
      console.log('this.checklists', this.checklists);
    },
    setCover(color) {
      console.log('color from task-details', color);
      this.task.cover = {};
      this.task.cover.backgroundColor = color;
      this.updateTask(this.task);
    },
  },
  async created() {
    try {
      const taskId = this.$route.params.taskId;
      await this.$store.commit({ type: 'setTaskById', taskId });
      if (this.task.checklists && this.task.checklists.length > 0)
        this.showChecklists();
    } catch (err) {
      console.log('error in getting the task', err);
    }
  },
};
</script>
