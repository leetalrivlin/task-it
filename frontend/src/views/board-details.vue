<template>
  <section v-if="board" class="main-content flex column board-details">
    <board-header
      :board="board"
      :users="users"
      @updateBoardMembers="updateBoard"
      @updateBoardStyle="updateBoard"
      @tasksToShow="tasksToShow"
      @deleteBoard="deleteBoard"
      @saveTitle="saveTitle"
      @filterBoard="filterBoard"
      :activities="board.activities"
    />
    <section class="flex align-start main-content main-layout board-content">
      <draggable
        class="flex group-container"
        :list="board.groups"
        tag="section"
        @change="moveGroup"
        @start="isDragging = true"
        @end="isDragging = false"
        ghostClass="ghost"
        chosenClass="chosen"
        dragClass="drag"
        group="groups"
      >
        <!-- <transition-group name="drag-drop"> -->
        <group
          v-for="group in board.groups"
          :key="group.id"
          class="group"
          @saveTask="saveTask"
          @deleteTask="deleteTask"
          @changeTitle="updateGroup"
          @updateGroup="updateGroup"
          @deleteGroup="deleteGroup"
          :group="group"
          :filterBy="filterBy"
        />

        <!-- </transition-group> -->
      </draggable>
      <add-group @saveGroup="saveGroup" />
      <router-view />
    </section>
  </section>
</template>

<script>
import { boardService } from '../services/board.service.js';
import boardHeader from '../cmps/board/board-header.vue';
import group from '../cmps/group.vue';
import addGroup from '../cmps/add-group.vue';
import draggable from 'vuedraggable';

export default {
  name: 'boardDetails',
  components: {
    boardHeader,
    group,
    addGroup,
    draggable,
  },
  data() {
    return {
      boardId: null,
      isDragging: false,
      filterBy: { txt: '', labels: [], members: [] },
    };
  },
  methods: {
    setActivity(txt) {
      const activity = boardService.getEmptyActivity();
      activity.txt = txt;
      activity.byMember = this.$store.getters.loggedinUser
        ? this.$store.getters.loggedinUser
        : { fullname: 'Guest', imgUrl: '' };
      return activity;
    },
    async getBoard() {
      try {
        await this.$store.dispatch({
          type: 'loadBoard',
          boardId: this.boardId,
        });
        this.board;
      } catch (err) {
        console.log(err);
      }
    },
    filterBoard(filterBy) {
      this.filterBy = filterBy;
    },
    saveGroup(newGroup) {
      this.board.groups.push(newGroup);
      const cloneBoard = this.$clone(this.board);
      const txt = `added a new group ${newGroup.title}`;
      const activity = this.setActivity(txt);
      this.$store.dispatch({
        type: 'updateBoard',
        payload: { board: cloneBoard, activity },
      });
    },
    saveTask(task, groupId) {
      const group = this.getGroup(groupId);
      group.tasks.push(task);
      const txt = `added the task ${task.title} to ${group.title}`;
      const activity = this.setActivity(txt);
      this.updateGroup(group, activity);
    },
    deleteTask(task, groupId) {
      const group = this.getGroup(groupId);
      const txt = `deleted a task from ${group.title}`;
      const activity = this.setActivity(txt);
      const taskIdx = group.tasks.findIndex(({ id }) => id === task.id);
      group.tasks.splice(taskIdx, 1);
      this.updateGroup(group, activity);
    },
    deleteGroup(groupId) {
      const group = this.getGroup(groupId);
      const txt = `deleted the list ${group.title}`;
      const activity = this.setActivity(txt);
      const groupIdx = this.board.groups.findIndex(({ id }) => id === groupId);
      this.board.groups.splice(groupIdx, 1);
      const cloneBoard = this.$clone(this.board);
      this.$store.dispatch({
        type: 'updateBoard',
        payload: { board: cloneBoard, activity },
      });
    },
    updateGroup(updatedGroup, activity) {
      const idx = this.board.groups.findIndex(
        ({ id }) => id === updatedGroup.id
      );
      this.board.groups.splice(idx, 1, updatedGroup);
      const cloneBoard = this.$clone(this.board);
      this.$store.dispatch({
        type: 'updateBoard',
        payload: { board: cloneBoard, activity },
      });
    },
    tasksToShow(tasks) {
      console.log('tasks');
    },

    moveGroup() {
      const txt = `moved a group`;
      const activity = this.setActivity(txt);
      this.$store.dispatch({
        type: 'updateBoard',
        payload: { board: this.board, activity },
      });
    },
    getGroup(groupId) {
      return this.board.groups.find((group) => {
        return group.id === groupId;
      });
    },
    saveTitle(boardTitle) {
      this.board.title = boardTitle;
      const txt = `changed the board title to ${this.board.title}`;
      const activity = this.setActivity(txt);
      this.updateBoard(this.board, activity);
    },
    updateBoard(updatedBoard, activity = {}) {
      this.$store.dispatch({
        type: 'updateBoard',
        payload: { board: updatedBoard, activity },
      });
    },
    deleteBoard() {
      this.$store.commit({
        type: 'removeBoardFromList',
        boardId: this.board._id,
      });
      this.$store.dispatch({ type: 'deleteBoard', boardId: this.board._id });
      this.$router.push('/board');
    },
  },
  computed: {
    board() {
      return this.$clone(this.$store.getters.board);
    },
    users() {
      return this.$clone(this.$store.getters.users);
    },
  },
  mounted() {
    this.boardId = this.$route.params.boardId;
    this.getBoard();
  },
  // destroyed() {
  //   this.$store.commit({ type: 'setBoard', task: null });
  // },
};
</script>
