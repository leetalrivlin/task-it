<template>
  <header class="flex align-center space-between header-layout board-header">
    <div class="flex">
      <input
        @keyup.enter="saveTitle"
        v-model="boardTitle"
        class="el-btn board-title"
      />
      <span class="devider"></span>
      <div class="members flex">
        <ul class="clean-list flex members-list">
          <li v-for="member in membersBoard" :key="member._id">
            <avatar
              class="member"
              :username="member.fullname"
              :src="member.imgUrl"
              color="white"
              :size="30"
            ></avatar>
          </li>
        </ul>
        <span>
          <button class="el-btn invite-btn" @click.stop="addMembers">
            Invite
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
          </button>
        </span>
      </div>
    </div>
    <div class="flex">
      <button class="flex el-btn dashboard-btn" @click="isDashboardOpen = true">
        <i class="el-icon-s-data dashboard-icon" />
        <p>Dashboard</p>
      </button>
      <board-dashboard
        :board="board"
        v-if="isDashboardOpen"
        @closeDashboard="closeDashboard"
        v-click-outside="closeDashboard"
      />

      <button
        class="flex align-center el-btn board-menu-btn"
        @click="isMenuOpen = true"
      >
        <i class="el-icon-more icon"></i>
        <p>Show Menu</p>
      </button>
      <transition name="slide">
        <board-menu
          @tasksToShow="tasksToShow"
          v-if="isMenuOpen"
          @closeMenu="isMenuOpen = false"
          @colorPicked="updateBoard"
          @photoPicked="updateBoard"
          @deleteBoard="deleteBoard"
          @filterBoard="filterBoard"
          :board="board"
          :activities="activities"
        />
      </transition>
    </div>
  </header>
</template>

<script>
import addMembers from './add-members';
import boardMenu from './board-menu.vue';
import Avatar from 'vue-avatar';
import AddGroup from '../add-group.vue';
import popup from '../popup.vue';
import boardDashboard from './board-dashboard.vue';

export default {
  components: {
    boardMenu,
    Avatar,
    AddGroup,
    addMembers,
    popup,
    boardDashboard,
  },
  name: 'boardHeader',
  props: {
    board: {
      type: Object,
    },
    users: {
      type: Array,
    },
    activities: {
      type: Array,
    },
  },
  data() {
    return {
      isMenuOpen: false,
      isAddMembers: false,
      isDashboardOpen: false,
      boardTitle: this.board.title,
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
    closeDashboard() {
      this.isDashboardOpen = !this.isDashboardOpen;
    },
    deleteBoard() {
      this.$emit('deleteBoard');
    },
    saveTitle() {
      console.log(this.boardTitle);
      this.$emit('saveTitle', this.boardTitle);
    },
    filterBoard(filterBy) {
      this.$emit('filterBoard', filterBy);
    },
  },
  computed: {
    membersBoard() {
      return this.board.members;
    },
  },
};
</script>
