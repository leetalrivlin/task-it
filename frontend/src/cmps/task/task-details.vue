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
        <task-title
          :groups="groups"
          :group="group"
          :task="task"
          @updateTask="updateTask"
          @updateTaskPos="updateBoard"
        />

        <section class="flex column task-main">
          <div
            v-if="task.members || task.labelIds || task.dueDate"
            class="d-desc"
          >
            <div class="d-content flex task-data-container">
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
          @removeTask="removeTask"
          @updateTaskPos="updateBoard"
        />
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
import { boardService } from '../../services/board.service';

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
    groups() {
      return this.$clone(this.$store.getters.board).groups;
    },
    group() {
      return this.$clone(this.$store.getters.group);
    },
    task() {
      console.log('this.$store.getters.task',this.$store.getters.task);
      return this.$clone(this.$store.getters.task);
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
  },
  methods: {
    closeDetails() {
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}`);
    },
    setEmptyChecklist(emptyChecklist) {
      if (!this.task.checklists) this.task.checklists = [];
      this.task.checklists.push(emptyChecklist);
      const activity = boardService.getEmptyActivity();
      activity.txt = `added ${emptyChecklist.title} to ${this.task.title}`;
      this.updateTask(this.task, activity);
    },
    setCover(color) {
      this.task.cover = {};
      this.task.cover.backgroundColor = color;
      const activity = boardService.getEmptyActivity();
      activity.txt = 'changed cover color';
      this.updateTask(this.task, activity);
    },
    setImg(img) {
      this.task.cover = {};
      this.task.cover.img = img;
      if (!this.task.attachments) this.task.attachments = [];
      this.task.attachments.push(img);
      this.updateTask(this.task);
    },
    setAttach(attachment) {
      if (!this.task.attachments) this.task.attachments = [];
      this.task.attachments.push(attachment);
      const activity = boardService.getEmptyActivity();
      activity.txt = `attached ${attachment.name} to ${this.task.title}`;
      this.updateTask(this.task, activity);
    },
    removeAttach(attachId) {
      const idx = this.task.attachments.findIndex(({ id }) => id === attachId);
      this.task.attachments.splice(idx, 1);
      if (this.task.attachments.length === 0) delete this.task.attachments;
      const activity = boardService.getEmptyActivity();
      activity.txt = `deleted the ${attachment.name} attachment from ${this.task.title}`;
      this.updateTask(this.task, activity);
    },
    setLabel(label) {
      const activity = boardService.getEmptyActivity();
      if (!this.task.labelIds) this.task.labelIds = [];
      const labelIdx = this.task.labelIds.findIndex(id => {
        return id === label.id;
      });
      if (labelIdx >= 0) {
        this.task.labelIds.splice(labelIdx, 1);
        activity.txt = `removed label from ${this.task.title}`;
      } else {
        this.task.labelIds.push(label.id);
        activity.txt = `added label to ${this.task.title}`;
      }
      this.updateTask(this.task, activity);
    },
    setMember(chosenMember) {
      const activity = boardService.getEmptyActivity();
      if (!this.task.members) this.task.members = [];
      const memberIdx = this.task.members.findIndex(({ _id }) => {
        return _id === chosenMember._id;
      });
      if (memberIdx >= 0) {
        this.task.members.splice(memberIdx, 1);
        activity.txt = `removed ${chosenMember.fullname} from ${this.task.title}`;
      } else {
        this.task.members.push(chosenMember);
        activity.txt = `added ${chosenMember.fullname} to ${this.task.title}`;
      }
      this.updateTask(this.task, activity);
    },
    updateBoardLabel(updatedLabel) {
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
      const activity = boardService.getEmptyActivity();
      activity.txt = `set ${this.task.title} to be due at ${dueDate}`;
      this.updateTask(this.task, activity);
    },
    removeDate() {
      delete this.task.dueDate;
      const activity = boardService.getEmptyActivity();
      activity.txt = `removed the due date from ${this.task.title}`;
      this.updateTask(this.task, activity);
    },
    updateTask(task, activity = {}) {
      this.$store.dispatch({ type: 'updateTask', payload: {task, activity}});
    },
    updateBoard(updatedGroup) {
      const cloneBoard = this.$clone(this.$store.getters.board);
      const idx = cloneBoard.groups.findIndex(
        ({ id }) => id === updatedGroup.id
      );
      cloneBoard.groups.splice(idx, 1, updatedGroup);
      this.$store.dispatch({ type: 'updateBoard', board: cloneBoard });
    },
    removeTask(taskId) {
      const taskIdx = this.group.tasks.findIndex(({ id }) => id === taskId);
      this.group.tasks.splice(taskIdx, 1);
      this.updateBoard(this.group);
      this.closeDetails();
    },
  },
  created() {
    const taskId = this.$route.params.taskId;
    console.log('taskId',taskId);
    this.$store.dispatch({ type: 'setTaskById', taskId });
  },
};
</script>
