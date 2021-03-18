<template>
  <section v-if="board" class="main-layout board-details">
    <board-header :board="board" />
    <section class="flex align-start main-content board-content">
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

const clone = require('rfdc')({ proto: true });

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
      console.log(newGroup);
      this.board.groups.push(newGroup);
      const cloneBoard = clone(this.board);
      console.log('cloneBoard', cloneBoard);
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
      console.log(groupId, 'groupId');
      const group = this.getGroup(groupId);
      const groupIdx = this.board.groups.findIndex(({ id }) => id === groupId);
      console.log(groupIdx);
      this.board.groups.splice(groupIdx, 1);
      const cloneBoard = clone(this.board);
      this.$store.dispatch({ type: 'updateBoard', board: cloneBoard });
    },
    updateBoard(updatedGroup) {
      const idx = this.board.groups.findIndex(
        ({ id }) => id === updatedGroup.id
      );
      this.board.groups.splice(idx, 1, updatedGroup);
      const cloneBoard = clone(this.board);
      this.$store.dispatch({ type: 'updateBoard', board: cloneBoard });
    },
    changeTitle(group) {
      console.log(group);
    },
    moveGroup() {
      this.$store.dispatch({ type: 'updateBoard', board: this.board });
    },
    getGroup(groupId) {
      return this.board.groups.find((group) => {
        return group.id === groupId;
      });
    },
  },
  computed: {
    board() {
      return clone(this.$store.getters.board);
    },
  },
  mounted() {
    console.log('boardDetails is mounted');
    this.boardId = this.$route.params.boardId;
    this.getBoard();
  },
};
</script>
