<template>
  <section>
    <div class="add-members-container">
      <input
        @keyup.stop
        type="text"
        class="filter-members"
        placeholder="Enter name"
        v-model="searchedMember"
        @input="filterMembers"
      />

      <ul class="clean-list">
        <li
          v-for="user in membersToShow"
          :key="user._id"
          class="member flex align-center space-between"
        >
          <div
            class="flex space-between align-center"
            @click="updateBoardMembers(user)"
          >
            <avatar
              class="avatar-mem"
              :username="user.fullname"
              :src="user.imgUrl"
              color="white"
              :size="30"
            ></avatar>
            <p>{{ user.fullname }}</p>
          </div>
          <i v-if="isUserOnBoard(user)" class="el-icon-check check"> </i>
        </li>
      </ul>
    </div>
  </section>
</template>



<script>
import Avatar from 'vue-avatar';
export default {
  components: {
    Avatar,
  },
  data() {
    return {
      searchedMember: '',
      membersToShow: this.systemUsers,
    };
  },
  props: {
    systemUsers: {
      type: Array,
    },
    boardMembers: {
      type: Array,
    },
  },
  methods: {
    closeMenu() {
      this.$emit('closeMenu');
    },
    updateBoardMembers(user) {
      const userIdx = this.boardMembers.findIndex(({ _id }) => _id === user._id);
      if (userIdx >= 0) {
        this.boardMembers.splice(userIdx, 1);
      } else {
        this.boardMembers.push(user);
      }
      this.$emit('updateBoardMembers', this.boardMembers);
    },
    filterMembers() {
      var membersToShow;
      if (!this.searchedMember || this.searchedMember === '') {
        membersToShow = this.systemUsers;
      }
      membersToShow = this.systemUsers.filter((member) => {
        return member.fullname
          .toLowerCase()
          .includes(this.searchedMember.toLowerCase());
      });
      this.membersToShow = membersToShow;
    },
  },

  computed: {
    isUserOnBoard() {
      return (user) => {
        return (
          this.boardMembers &&
          this.boardMembers.some(({ _id }) => _id === user._id)
        );
      };
    },
  },
};
</script>

