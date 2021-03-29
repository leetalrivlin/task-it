<template>
  <section class="flex column align-center main-content main-layout board-list">
    <h1>Pick a Borad</h1>
    <ul class="clean-list">
      <li @click="createBoard">
        <i class="el-icon-plus add-board flex justify-center align-center"></i>
      </li>
      <li v-for="board in boards" :key="board._id">
        <router-link
          :style="{
            background: board.style.background,
            backgroundSize: 'cover',
          }"
          :to="`/board/${board._id}`"
          ><p>{{ board.title }}</p>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import { boardService } from '../services/board.service.js';

export default {
  name: 'boardList',
  methods: {
    async createBoard() {
      const emptyBoard = boardService.getEmptyBoard();
      await this.$store.dispatch({ type: 'saveBoard', newBoard: emptyBoard });
      this.$nextTick(() => {
        const board = this.board;
        this.$router.push(`/board/${board._id}`);
      });
    },
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    board() {
      return this.$store.getters.board;
    },
  },
  mounted() {
    console.log(this.$store.getters.boards);
  },
};
</script>

<style>
</style>