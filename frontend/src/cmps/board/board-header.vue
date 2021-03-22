<template>
  <header class="flex align-center space-between header-layout board-header">
    <el-button class="el-btn board-title">{{ board.title }}</el-button>
    <div class="members flex">
      <avatar
        class="member"
        :username="board.createdBy.fullname"
        :src="board.createdBy.imgUrl"
        color="white"
        :size="30"
      ></avatar>

      <div v-for="member in membersBoard" :key="member._id">
        <avatar
          class="member"
          :username="member.fullname"
          :src="member.imgUrl"
          color="white"
          :size="30"
        ></avatar>
      </div>

      <span>
        <el-button class="el-btn invite-button" @click.stop="addMembers"
          >Invite
          <add-members
            @click.stop
            v-if="isAddMembers"
            :boardMembers="this.board.members"
            :allMembers="membersToAdd"
            @closeMenu="closeMenu"
        /></el-button>
      </span>
    </div>

    <el-button
      class="el-btn board-menu-btn"
      icon="el-icon-more icon"
      @click="isMenuOpen = true"
      >Show Menu</el-button
    >
    <transition name="slide">
      <board-menu
        v-if="isMenuOpen"
        @closeMenu="isMenuOpen = false"
        @colorPicked="updateBoard"
        @photoPicked="updateBoard"
      />
    </transition>
  </header>
</template>

<script>
import addMembers from './add-members';
import boardMenu from './board-menu.vue';
import Avatar from 'vue-avatar';
import AddGroup from '../add-group.vue';
export default {
  components: {
    boardMenu,
    Avatar,
    AddGroup,
    addMembers,
  },
  name: 'boardHeader',
  props: {
    board: {
      type: Object,
    },
    users: {
      type: Array,
    },
  },
  data() {
    return {
      isMenuOpen: false,
      isAddMembers: false,
    };
  },
  methods: {
    updateBoard(style) {
      this.board.style = style;
      this.$store.dispatch({ type: 'updateBoard', board: this.board });
    },
    addMembers() {
      this.isAddMembers = true;
    },
    closeMenu() {
      this.isAddMembers = !this.isAddMembers;
    },
  },
  computed: {
    membersBoard() {
      return this.board.members;
    },
    membersToAdd() {
      console.log(this.users);
    },
  },
};
</script>
