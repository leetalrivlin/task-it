<template>
  <section v-if="task" class="task-details" v-click-outside="closeDetails">
    <el-button
      class="el-close"
      icon="el-icon-close"
      circle
      @click="closeDetails"
    ></el-button>
    <task-cover
      v-if="task.cover"
      :task="task"
      @saveColor="updateTask"
      @saveImg="updateTask"
    />
    <section class="details-grid">
      <section class="d-header header-container">
        <font-awesome-icon class="d-icon" icon="columns" />
        <div class="d-content task-title-container">
          <h1>{{ task.title }}</h1>
          <p>In list <a class="task-list-link">List name</a></p>
        </div>
      </section>
      <task-controller
        :cover="cover"
        @openChecklist="showEmptyChecklist"
        @addCover="setCover"
        @addImg="setImg"
      />
      <section class="flex column task-main">
        <task-description :task="task" @saveDescription="updateTask" />
        <ul v-if="task.checklists" class="clean-list">
          <task-checklist
            v-for="checklist in task.checklists"
            :key="checklist.id"
            :checklist="checklist"
            @addedTodo="updateChecklist"
          />
        </ul>
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
    taskCover
  },
  data() {
    return {
      // isShowChecklist: false
    };
  },
  computed: {
    task() {
      console.log('task',this.$store.getters.task);
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
    checklists() {
      return this.task.checklists ? this.task.checklists : [];
    }
  },
  methods: {
    setDetails() {
      this.isChecklist();
    },
    closeDetails() {
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}`);
    },
    updateTask(updatedTask) {
      this.$store.dispatch({ type: 'updateTask', task: updatedTask });
    },
    isChecklist() {
      console.log('this.task.checklists',this.task.checklists);
      this.isShowChecklist = (this.task.checklists) ?  true : false;
    },
    showEmptyChecklist() {
      const emptyCheckList = boardService.getEmptyChecklist();
      if (!this.task.checklists) this.task.checklists = [];
      this.task.checklists.push(emptyCheckList);
      this.updateTask(this.task);
      console.log('this.task',this.task);
      // this.isShowChecklist = true;
    },
    updateChecklist(updatedChecklist) {
      // this.task.checklists.push(updatedChecklist);
      const checklistIdx = this.task.checklists.findIndex(({id}) => id === updatedChecklist.id)
      this.task.checklists[checklistIdx] = updatedChecklist;
      console.log('this.task', this.task);
      this.updateTask(this.task);
    },
    setCover(color) {
      this.task.cover = {};
      this.task.cover.backgroundColor = color;
      this.updateTask(this.task);
    },
    setImg(imgUrl) {
      this.task.cover = {};
      this.task.cover.img = imgUrl;
      this.updateTask(this.task);
    }
  },
  created() {
    const taskId = this.$route.params.taskId;
    this.$store.commit({ type: 'setTaskById', taskId });
  },
  mounted() {
    this.setDetails();
  }
};
</script>
