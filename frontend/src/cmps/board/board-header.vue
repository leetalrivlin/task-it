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
          <popup
            v-if="isAddMembers"
            @closePopup="closeMembersPopup"
            v-click-outside="closeMembersPopup"
          >
            <template v-slot:title>
              <p>Invite to board</p>
            </template>
            <add-members
              :boardMembers="this.board.members"
              :systemUsers="this.users"
              @updateBoardMembers="updateBoardMembers"
            />
          </popup>
        </el-button>
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
        @tasksToShow="tasksToShow"
        v-if="isMenuOpen"
        @closeMenu="isMenuOpen = false"
        @colorPicked="updateBoard"
        @photoPicked="updateBoard"
        :board="board"
      />
    </transition>
  </header>
</template>

<script>
import addMembers from './add-members';
import boardMenu from './board-menu.vue';
import Avatar from 'vue-avatar';
import AddGroup from '../add-group.vue';
import popup from '../popup.vue';
export default {
  components: {
    boardMenu,
    Avatar,
    AddGroup,
    addMembers,
    popup,
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
      this.$emit('updateBoardStyle', this.board);
    },
    addMembers() {
      this.isAddMembers = true;
    },
    closeMembersPopup() {
      this.isAddMembers = !this.isAddMembers;
    },
    updateBoardMembers(updatedBoardMembers) {
      this.board.members = updatedBoardMembers;
      this.$emit('updateBoardMembers', this.board);
    },
    tasksToShow(tasks) {
      this.$emit('tasksToShow', tasks);
    },
  },
  computed: {
    membersBoard() {
      return this.board.members;
    },
  },
};
</script>
