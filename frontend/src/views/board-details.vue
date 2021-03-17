<template>
  <section class="board-details">
    <board-header />
    <ul v-if="board" class="clean-list flex group-container">
      <li v-for="group in board.groups" :key="group.id" class="group">
        <group :group="group" />
      </li>
    </ul>
    <router-view/>
  </section>
</template>

<script>
import boardHeader from "../cmps/board-header.vue";
import group from "../cmps/group.vue";

export default {
  name: "boardDetails",
  components: {
    boardHeader,
    group,
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
