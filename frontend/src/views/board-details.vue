<template>
  <section class="main-layout main-content board-details">
    <board-header />
    <section class="flex align-start board-content">
      <ul v-if="board" class="clean-list flex group-container">
        <li v-for="group in board.groups" :key="group.id" class="group">
          <group :group="group" />
        </li>
      </ul>
      <section v-if="board" class="new-group">
        <form v-if="newGroup">
          <el-input
            v-model="newGroup.title"
            placeholder="Enter list title..."
            clearable
          >
          </el-input>
          <div class="btn-container">
            <el-button type="info" @click.prevent="addGroup">Save</el-button>
            <i class="el-icon-close" @click="newGroup = null"></i>
          </div>
        </form>
        <a v-else @click="createNewGroup">{{ newGroupTxt }}</a>
      </section>
      <router-view />
    </section>
  </section>
</template>

<script>
import { boardService } from "../services/board.service.js";
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
      newGroup: null,
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
    createNewGroup() {
      const emptyGroup = boardService.getEmptyGroup();
      this.newGroup = emptyGroup;
      console.log(this.newGroup);
    },
    addGroup() {
      console.log(this.newGroup);
    },
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    newGroupTxt() {
      return this.board.groups.length === 0
        ? "+ Create a list"
        : "+ Add another list";
    },
  },
  mounted() {
    console.log(this.$route.params);
    this.boardId = this.$route.params.boardId;
    this.getBoard();
  },
};
</script>
