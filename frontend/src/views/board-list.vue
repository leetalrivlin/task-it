<template>
  <section class="main-content main-layout board-list">
    <h1>board list</h1>
    <!-- <button @click='getBoard'>board</button> -->
    <router-link :to="'/board/b102'">Board</router-link>
  </section>
</template>

<script>
export default {
  name: "boardList",
  created() {
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