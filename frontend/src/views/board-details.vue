<template>
  <section v-if="board" class="main-content flex column board-details">
    <board-header
      :board="board"
      :users="users"
      @updateBoardMembers="updateBoard"
      @saveTitle="saveTitle"
      @openMenue="isMenuOpen = true"
      :activities="board.activities"
    />
    <transition name="slide">
      <board-menu
        v-show="isMenuOpen"
        @closeMenu="isMenuOpen = false"
        @colorPicked="updateStyle"
        @photoPicked="updateStyle"
        @deleteBoard="deleteBoard"
        @filterBoard="filterBoard"
        :board="board"
        :activities="board.activities"
      />
    </transition>
    <section
      v-dragscroll:firstchilddrag
      class="flex align-start main-content main-layout board-content"
    >
      <draggable
        class="flex group-container"
        :list="board.groups"
        :force-fallback="true"
        tag="section"
        @change="moveGroup"
        @start="isDragging = true"
        @end="isDragging = false"
        ghostClass="ghost"
        chosenClass="chosen"
        dragClass="drag"
        group="groups"
      >
        <group
          v-for="group in board.groups"
          :key="group.id"
          class="group"
          @saveTask="saveTask"
          @deleteTask="deleteTask"
          @changeTitle="changeTitle"
          @moveTask="moveTask"
          @deleteGroup="deleteGroup"
          :group="group"
          :filterBy="filterBy"
        />
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
import boardMenu from '../cmps/board/board-menu.vue';

export default {
  name: 'boardDetails',
  components: {
    boardHeader,
    group,
    addGroup,
    draggable,
    boardMenu,
  },
  data() {
    return {
      boardId: null,
      isDragging: false,
      isMenuOpen: false,
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
    updateStyle(style) {
      this.board.style = style;
      this.updateBoard(this.board);
    },
    changeTitle(group) {
      const txt = `changed the title to the list ${group.title}`;
      const activity = this.setActivity(txt);
      this.updateGroup(group, activity);
    },
    saveGroup(newGroup) {
      this.board.groups.push(newGroup);
      const cloneBoard = this.$clone(this.board);
      const txt = `added a new group ${newGroup.title}`;
      const activity = this.setActivity(txt);
      this.updateBoard(cloneBoard, activity);
    },
    saveTask(task, groupId) {
      const group = this.getGroup(groupId);
      group.tasks.push(task);
      const txt = `added the task ${task.title} to ${group.title}`;
      const activity = this.setActivity(txt);
      this.updateGroup(group, activity);
    },
    moveTask(group, ev) {
      const activity = boardService.getEmptyActivity();
      activity.txt = 'moved a task';
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
      this.updateBoard(this.board, activity);
    },
    updateGroup(updatedGroup, activity = {}) {
      if (activity.txt && !activity.byMember) {
        activity.byMember = this.$store.getters.loggedinUser
          ? this.$store.getters.loggedinUser
          : { fullname: 'Guest', imgUrl: '' };
      }
      const idx = this.board.groups.findIndex(
        ({ id }) => id === updatedGroup.id
      );
      this.board.groups.splice(idx, 1, updatedGroup);
      this.updateBoard(this.board, activity);
    },
    moveGroup() {
      const txt = `moved a group`;
      const activity = this.setActivity(txt);
      this.updateBoard(this.board, activity);
    },
    getGroup(groupId) {
      return this.board.groups.find((group) => {
        return group.id === groupId;
      });
    },
    saveTitle(boardTitle) {
      this.board.title = boardTitle;
      const txt = `changed the board title to ${boardTitle}`;
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
      this.$nextTick(() => this.$router.push('/board'));
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
