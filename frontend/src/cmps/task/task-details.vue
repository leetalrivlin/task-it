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
    setActivity(txt) {
      const activity = boardService.getEmptyActivity();
      activity.txt = txt;
      return activity;
    },
    closeDetails() {
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}`);
    },
    setEmptyChecklist(emptyChecklist) {
      if (!this.task.checklists) this.task.checklists = [];
      this.task.checklists.push(emptyChecklist);
      const txt = `added ${emptyChecklist.title} to ${this.task.title}`;
      const activity = this.setActivity(txt);
      this.updateTask(this.task, activity);
    },
    setCover(color) {
      this.task.cover = {};
      this.task.cover.backgroundColor = color;
      const txt = 'changed cover color';
      const activity = this.setActivity(txt);
      this.updateTask(this.task, activity);
    },
    setImg(img) {
      this.task.cover = {};
      this.task.cover.img = img;
      if (!this.task.attachments) this.task.attachments = [];
      this.task.attachments.push(img);
      const txt = 'changed cover image';
      const activity = this.setActivity(txt);
      this.updateTask(this.task, activity);
    },
    setAttach(attachment) {
      if (!this.task.attachments) this.task.attachments = [];
      this.task.attachments.push(attachment);
      const txt = `attached ${attachment.name} to ${this.task.title}`;
      const activity = this.setActivity(txt);
      this.updateTask(this.task, activity);
    },
    removeAttach(attachId) {
      const idx = this.task.attachments.findIndex(({ id }) => id === attachId);
      const txt = `deleted the ${this.task.attachments[idx].name} attachment from ${this.task.title}`;
      const activity = this.setActivity(txt);
      this.task.attachments.splice(idx, 1);
      if (this.task.attachments.length === 0) delete this.task.attachments;
      this.updateTask(this.task, activity);
    },
    setLabel(label) {
      var txt;
      if (!this.task.labelIds) this.task.labelIds = [];
      const labelIdx = this.task.labelIds.findIndex(id => {
        return id === label.id;
      });
      if (labelIdx >= 0) {
        this.task.labelIds.splice(labelIdx, 1);
        txt = `removed label from ${this.task.title}`;
      } else {
        this.task.labelIds.push(label.id);
        txt = `added label to ${this.task.title}`;
      }
      const activity = this.setActivity(txt);
      this.updateTask(this.task, activity);
    },
    setMember(chosenMember) {
      var txt;
      if (!this.task.members) this.task.members = [];
      const memberIdx = this.task.members.findIndex(({ _id }) => {
        return _id === chosenMember._id;
      });
      if (memberIdx >= 0) {
        this.task.members.splice(memberIdx, 1);
        txt = `removed ${chosenMember.fullname} from ${this.task.title}`;
      } else {
        this.task.members.push(chosenMember);
        txt = `added ${chosenMember.fullname} to ${this.task.title}`;
      }
      const activity = this.setActivity(txt);
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
      const date = new Date(dueDate);
      const dateStr = `${this.$dayjs(date).format('MMM DD')} at ${this.$dayjs(
        date
      ).format('h:mm A')}`;
      const txt = `set ${this.task.title} to be due at ${dateStr}`;
      const activity = this.setActivity(txt);
      this.updateTask(this.task, activity);
    },
    removeDate() {
      delete this.task.dueDate;
      const txt = `removed the due date from ${this.task.title}`;
      const activity = this.setActivity(txt);
      this.updateTask(this.task, activity);
    },
    updateTask(task, activity = {}) {
      activity.byMember = this.$store.getters.loggedinUser
        ? this.$store.getters.loggedinUser
        : { fullname: 'Guest', imgUrl: '' };
      this.$store.dispatch({ type: 'updateTask', payload: { task, activity } });
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
    }
  },
  created() {
    const taskId = this.$route.params.taskId;
    this.$store.dispatch({ type: 'setTaskById', taskId });
  }
};
</script>
