<template>
  <section class="board-details">
    <h1>hii</h1>
    <board-header />
    <section v-if="board" class="group-container">
      {{board}}
    </section>
    <router-view />
  </section>
</template>

<script>
import boardHeader from "../cmps/board-header.vue";
export default {
  name: "boardDetails",
  components: { boardHeader },
  data() {
    return {
      boardId: null,
    };
  },
  methods: {
    async getBoard() {
      try {
        await this.$store.dispatch({
          type: "loadBoard",
          boardId: this.boardId,
        });
        this.board;
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
  mounted() {
    console.log(this.$route.params);
    this.boardId = this.$route.params.boardId;
    this.getBoard();
  },
};
</script>
