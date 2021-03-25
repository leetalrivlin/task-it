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
        <task-title :groups="groups" :task="task" :group="group" @updateTaskPos="updateBoard"/>
        <task-details-menu
          :members="members"
          :taskMembers="task.members"
          :cover="cover"
          :labels="boardLabels"
          :taskLableIds="task.labelIds"
          :taskId="task.id"
          :groups="groups"
          :groupId="group.id"
          @addChecklist="setEmptyChecklist"
          @addCover="setCover"
          @addImg="setImg"
          @addAttach="setAttach"
          @addLabel="setLabel"
          @updateLabel="updateBoardLabel"
          @setDueDate="setDueDate"
          @addMemberToTask="setMember"
          @deleteTask="deleteTask"
          @updateTaskPos="updateBoard"
        />
        <section class="flex column task-main">
          <div class="d-desc">
            <div class="d-icon"></div>
            <div v-if="task.members || task.labelIds || task.dueDate" class="d-content flex task-data-container">
              <task-member
                v-if="task.members"
                :taskMembers="task.members"
                :members="members"
                @addMemberToTask="setMember"
              />
              <task-label
                v-if="task.labelIds"
                :labels="boardLabels"
                :task="task"
                @addLabel="setLabel"
                @updateLabel="updateBoardLabel"
              />
              <task-date
                v-if="task.dueDate"
                :dueDate="task.dueDate"
                @setDueDate="setDueDate"
                @removeDueDate="removeDate"
              />
            </div>
          </div>
          <task-description :task="task" @saveDescription="updateTask" />
          <task-attachment
            :task="task"
            v-if="task.attachments"
            @removeAttach="removeAttach"
            @addAttach="setAttach"
          />
          <ul v-if="task.checklists" class="clean-list">
            <task-checklist
              v-for="checklist in task.checklists"
              :key="checklist.id"
              :checklist="checklist"
              :task="task"
              @updateTask="updateTask"
            />
          </ul>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import taskDetailsMenu from './task-details/task-details-menu.vue';
import taskDescription from '../task/task-details/task-description.vue';
import taskLabel from '../task/task-details/task-label.vue';
import taskMember from '../task/task-details/task-member.vue';
import taskChecklist from '../task/task-details/task-checklist.vue';
import taskAttachment from '../task/task-details/task-attachment.vue';
import taskCover from '../task/task-details/task-cover.vue';
import taskTitle from '../task/task-details/task-title.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faColumns } from '@fortawesome/free-solid-svg-icons';
import taskDate from './task-details/task-date.vue';

library.add(faColumns);

export default {
  name: 'taskDetails',
  components: {
    taskDescription,
    taskLabel,
    taskDetailsMenu,
    taskChecklist,
    taskAttachment,
    taskCover,
    taskTitle,
    taskDate,
    taskMember
  },
  computed: {
    task() {
      return this.$clone(this.$store.getters.task);
    },
    group() {
      return this.$clone(this.$store.getters.group);
    },
    groups() {
      return this.$clone(this.$store.getters.board).groups;
    },
    boardLabels() {
      return this.$clone(this.$store.getters.boardLabels);
    },
    members() {
      return this.$clone(this.$store.getters.board).members;
    },
    cover() {
      return this.task.cover ? true : false;
    },
    checklists() {
      return this.task.checklists ? this.task.checklists : [];
    }
    // group() {
    //   return boardCopy.groups.find((group) =>
    //     group.tasks.some(({ id }) => id === this.task.id)
    //   );
    // },
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
      const labelIdx = this.task.labelIds.findIndex(id => {
        return id === label.id;
      });
      if (labelIdx >= 0) {
        this.task.labelIds.splice(labelIdx, 1);
      } else {
        this.task.labelIds.push(label.id);
      }
      this.updateTask(this.task);
    },
    setMember(chosenMember) {
      if (!this.task.members) this.task.members = [];
      const memberIdx = this.task.members.findIndex(({ _id }) => {
        return _id === chosenMember._id;
      });
      if (memberIdx >= 0) {
        this.task.members.splice(memberIdx, 1);
      } else {
        this.task.members.push(chosenMember);
      }
      this.updateTask(this.task);
    },
    updateBoardLabel(updatedLabel) {
      console.log('updatedLabel', updatedLabel);
      const labelIdx = this.boardLabels.findIndex(
        ({ id }) => id === updatedLabel.id
      );
      this.boardLabels.splice(labelIdx, 1, updatedLabel);
      const copyBoard = this.$clone(this.$store.getters.board);
      copyBoard.labels = this.boardLabels;
      this.$store.dispatch({ type: 'updateBoard', board: copyBoard });
    },
    setDueDate(dueDate) {
      this.task.dueDate = dueDate;
      this.updateTask(this.task);
    },
    removeDate() {
      delete this.task.dueDate;
      this.updateTask(this.task);
    },
    deleteTask(taskId) {
      const taskIdx = this.group.tasks.findIndex(({ id }) => id === taskId);
      this.group.tasks.splice(taskIdx, 1);
      this.updateBoard(this.group);
      this.closeDetails();
    },
    updateBoard(updatedGroup) {
      const cloneBoard = this.$clone(this.$store.getters.board);
      const idx = cloneBoard.groups.findIndex(
        ({ id }) => id === updatedGroup.id
      );
      cloneBoard.groups.splice(idx, 1, updatedGroup);
      this.$store.dispatch({ type: 'updateBoard', board: cloneBoard });
      // this.closeDetails();
    }
  },
  created() {
    const taskId = this.$route.params.taskId;
    this.$store.dispatch({ type: 'setTaskById', taskId });
  },
  mounted() {
    this.setDetails();
  }
  // destroyed() {
  //   this.$store.commit({ type: 'setTask', task: null });
  // },
};
</script>
