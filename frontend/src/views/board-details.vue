<template>
  <section v-if="board" class="main-content flex column board-details">
    <board-header
      :board="board"
      :users="users"
      @updateBoardMembers="updatEntireBoard"
      @updateBoardStyle="updatEntireBoard"
      @tasksToShow="tasksToShow"
    />
    <section class="flex align-start main-content main-layout board-content">
      <draggable
        class="flex group-container"
        :list="board.groups"
        tag="section"
        @change="moveGroup"
        @start="isDragging = true"
        @end="isDragging = false"
        group="groups"
      >
        <!-- <transition-group name="drag-drop"> -->
        <group
          v-for="group in board.groups"
          :key="group.id"
          class="group"
          @saveTask="saveTask"
          @deleteTask="deleteTask"
          @changeTitle="updateBoard"
          @updateGroup="updateBoard"
          @deleteGroup="deleteGroup"
          :group="group"
          
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
    };
  },
  methods: {
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
    saveGroup(newGroup) {
      this.board.groups.push(newGroup);
      const cloneBoard = this.$clone(this.board);
      this.$store.dispatch({ type: 'updateBoard', board: cloneBoard });
    },
    saveTask(taskTitle, groupId) {
      const group = this.getGroup(groupId);
      group.tasks.push(taskTitle);
      this.updateBoard(group);
    },
    deleteTask(task, groupId) {
      const group = this.getGroup(groupId);
      const taskIdx = group.tasks.findIndex(({ id }) => id === task.id);
      group.tasks.splice(taskIdx, 1);
      this.updateBoard(group);
    },
    deleteGroup(groupId) {
      const group = this.getGroup(groupId);
      const groupIdx = this.board.groups.findIndex(({ id }) => id === groupId);
      this.board.groups.splice(groupIdx, 1);
      const cloneBoard = this.$clone(this.board);
      this.$store.dispatch({ type: 'updateBoard', board: cloneBoard });
    },
    updateBoard(updatedGroup) {
      const idx = this.board.groups.findIndex(
        ({ id }) => id === updatedGroup.id
      );
      this.board.groups.splice(idx, 1, updatedGroup);
      const cloneBoard = this.$clone(this.board);
      this.$store.dispatch({ type: 'updateBoard', board: cloneBoard });
    },
    tasksToShow(tasks) {
      
        console.log('tasks');
    },
   
    moveGroup() {
      this.$store.dispatch({ type: 'updateBoard', board: this.board });
    },
    getGroup(groupId) {
      return this.board.groups.find((group) => {
        return group.id === groupId;
      });
    },
    updatEntireBoard(updatedBoard) {
      this.$store.dispatch({ type: 'updateBoard', board: updatedBoard });
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
