<template>
  <section class="window-overlay">
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
        <task-title :task="task" :group="group" @updateTask="updateTask" />
        <task-controller
          :cover="cover"
          :labels="boardLabels"
          :taskLableIds = "task.labelIds"
          @addChecklist="setEmptyChecklist"
          @addCover="setCover"
          @addImg="setImg"
          @addAttach="setAttach"
          @addLabel="setLabel"
        />
        <section class="flex column task-main">
          <task-label v-if="task.labelIds" :labels="boardLabels" :task="task" @addLabel="setLabel" />
          <task-description :task="task" @saveDescription="updateTask" />
          <ul v-if="task.checklists" class="clean-list">
            <task-checklist
              v-for="checklist in task.checklists"
              :key="checklist.id"
              :checklist="checklist"
              :task="task"
              @updateTask="updateTask"
            />
          </ul>
          <task-attachment
            :task="task"
            v-if="task.attachments"
            @removeAttach="removeAttach"
            @addAttach="setAttach"
          />
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import { boardService } from '../../services/board.service';
import taskController from '../task/task-details/task-controller.vue';
import taskDescription from '../task/task-details/task-description.vue';
import taskLabel from '../task/task-details/task-label.vue';
import taskChecklist from '../task/task-details/task-checklist.vue';
import taskAttachment from '../task/task-details/task-attachment.vue';
import taskCover from '../task/task-details/task-cover.vue';
import taskTitle from '../task/task-details/task-title.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faColumns } from '@fortawesome/free-solid-svg-icons';

library.add(faColumns);
const clone = require('rfdc')({ proto: true });

export default {
  name: 'taskDetails',
  components: {
    taskDescription,
    taskLabel,
    taskController,
    taskChecklist,
    taskAttachment,
    taskCover,
    taskTitle,
  },
  computed: {
    task() {
      return clone(this.$store.getters.task);
    },
    group() {
      return clone(this.$store.getters.group);
    },
    boardLabels() {
      return clone(this.$store.getters.boardLabels);
    },
    // group() {
    //   return boardCopy.groups.find((group) =>
    //     group.tasks.some(({ id }) => id === this.task.id)
    //   );
    // },
    cover() {
      return this.task.cover ? true : false;
    },
    checklists() {
      return this.task.checklists ? this.task.checklists : [];
    },
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
      this.isShowChecklist = this.task.checklists ? true : false;
    },
    setEmptyChecklist(emptyChecklist) {
      // const emptyCheckList = boardService.getEmptyChecklist();
      if (!this.task.checklists) this.task.checklists = [];
      this.task.checklists.push(emptyChecklist);
      this.updateTask(this.task);
    },
    setCover(color) {
      this.task.cover = {};
      this.task.cover.backgroundColor = color;
      this.updateTask(this.task);
    },
    setImg(img) {
      this.task.cover = {};
      this.task.cover.img = img;
      if (!this.task.attachments) this.task.attachments = [];
      this.task.attachments.push(img);
      this.updateTask(this.task);
    },
    setAttach(attachment) {
      console.log(attachment);
      if (!this.task.attachments) this.task.attachments = [];
      this.task.attachments.push(attachment);
      this.updateTask(this.task);
    },
    removeAttach(attachId) {
      const idx = this.task.attachments.findIndex(({ id }) => id === attachId);
      this.task.attachments.splice(idx, 1);
      if (this.task.attachments.length === 0) delete this.task.attachments;
      console.log('this.task.attachments', this.task.attachments);
      this.updateTask(this.task);
    },
    setLabel(label) {
      console.log('label', label);
      if (!this.task.labelIds) this.task.labelIds = [];
      const labelIdx = this.task.labelIds.findIndex(( id ) => {
        return id === label.id;
      });
      if (labelIdx >= 0) {
        this.task.labelIds.splice(labelIdx, 1);
      } else {
        this.task.labelIds.push(label.id);
      }
      this.updateTask(this.task);
    },
  },
  created() {
    const taskId = this.$route.params.taskId;
    this.$store.commit({ type: 'setTaskById', taskId });
  },
  mounted() {
    this.setDetails();
  },
};
</script>
