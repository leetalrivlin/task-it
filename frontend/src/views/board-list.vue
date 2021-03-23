<template>
  <section class="main-content main-layout board-list">
    <h1>Pick a Borad </h1>
    <!-- <button @click='getBoard'>board</button> -->
    <ul class="flex justify-center clean-list">
      <li v-for="board in boards" :key="board._id">
        <router-link :style="board.style" :to="`/board/${board._id}`">{{
          board.title
        }}</router-link>
      </li>
      <li class="">
        <i class="el-icon-plus add-board"></i>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'boardList',
  async created() {
    // await this.$store.dispatch('loadBoards');
  },
  methods: {
    // getBoard(){
    //   this.$route.params(boardId)
    // }
  },
  computed: {
    boards() {
      console.log(this.$store.getters.boards);
      return this.$store.getters.boards;
    },
  },
  mounted() {
    console.log(this.$store.getters.boards);
  },
};
</script>

<style>
</style>