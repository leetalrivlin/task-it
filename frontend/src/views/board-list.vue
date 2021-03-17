<template>
  <section class="main-layout main-content board-list">
    <h1>board list</h1>
    <!-- <button @click='getBoard'>board</button> -->
    <router-link :to="'/board/b101'">Board</router-link>
  </section>
</template>

<script>
export default {
  name: "boardList",
  created() {
    console.log("boardlist was created");
    this.$store.dispatch("loadBoards");
  },
  methods:{
    // getBoard(){
    //   this.$route.params(boardId)
    // }
  }
};
</script>

<style>
</style>