<template>
  <section v-if="board" class="main-layout main-content board-details">
    <board-header :board="board" />
    <section class="flex align-start board-content">
      <draggable
        class="clean-list flex group-container"
        :list="board.groups"
        tag="ul"
        :move="onMove"
        @change="moveGroup"
        @start="isDragging = true"
        @end="isDragging = false"
      >
        <!-- <ul class="clean-list flex group-container"> -->
        <li v-for="group in board.groups" :key="group.id" class="group">
          <group
            @saveTask="saveTask"
            @deleteTask="deleteTask"
            @changeTitle="changeTitle"
            @updateGroup="updateBoard"
            :group="group"
          />
        </li>
        <!-- </ul> -->
      </draggable>
      <add-group @saveGroup="saveGroup" />
      <router-view />
    </section>
  </section>
</template>

<script>
import { boardService } from '../services/board.service.js';
import boardHeader from '../cmps/board-header.vue';
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
    onMove({ relatedContext, draggedContext }) {
      console.log('relatedContext', relatedContext);
      console.log('draggedContext', draggedContext);
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    moveGroup(ev) {
      console.log('ev', ev.moved);
      console.log(this.board);
      // this.$emit('updateGroup', clone(this.group))
    },
  },
  computed: {
    board() {
      return clone(this.$store.getters.board);
    },
    getGroup(groupId) {
      return this.board.groups.find((group) => {
        return group.id === groupId;
      });
    },
  },
  mounted() {
    console.log('boardDetails is mounted');
    this.boardId = this.$route.params.boardId;
    this.getBoard();
  },
};
</script>
