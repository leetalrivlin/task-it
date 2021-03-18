<template>
  <section v-if="board" class="main-layout main-content board-details">
    <board-header :board="board" />
    <section class="flex align-start board-content">
      <ul class="clean-list flex group-container">
        <li v-for="group in board.groups" :key="group.id" class="group">
          <group @saveTask="saveTask" @deleteTask="deleteTask" :group="group" />
        </li>
      </ul>
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
const clone = require('rfdc')({ proto: true });

export default {
  name: 'boardDetails',
  components: {
    boardHeader,
    group,
    addGroup,
  },
  data() {
    return {
      boardId: null,
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
      console.log('taskTitle , groupId', taskTitle, groupId);
      const group = this.board.groups.find((group) => {
        return group.id === groupId;
      });
      group.tasks.push(taskTitle);
      const idx = this.board.groups.findIndex(({ id }) => id === group.id);
      this.board.groups.splice(idx, 1, group);
      const cloneBoard = clone(this.board);
      console.log('cloneBoard', cloneBoard);
      this.$store.dispatch({ type: 'updateBoard', board: cloneBoard });
    },
    delteTask(task) {
      console.log('task', task);
      // const group = this.board.groups.find((group) => {
      //   return group.id === groupId;
      // });
      // group.tasks.push(taskTitle);
      // const idx = this.board.groups.findIndex(({ id }) => id === group.id);
      // this.board.groups.splice(idx, 1, group);
      // const cloneBoard = clone(this.board);
      // console.log('cloneBoard', cloneBoard);
      // this.$store.dispatch({ type: 'updateBoard', board: cloneBoard });
    },
  },
  computed: {
    board() {
      return clone(this.$store.getters.board);
    },
  },
  mounted() {
    console.log(this.$route.params);
    this.boardId = this.$route.params.boardId;
    this.getBoard();
  },
};
</script>
