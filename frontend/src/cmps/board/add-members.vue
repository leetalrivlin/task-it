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
          v-for="user in usersToShow"
          :key="user._id"
          class="member flex align-center space-between"
          @click="updateBoardMembers(user)"
        >
          <div class="flex space-between align-center">
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
      usersToShow: this.systemUsers,
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
      const members = this.boardMembers? this.$clone(this.boardMembers) : [];
      const userIdx = members.findIndex(
        ({ _id }) => _id === user._id
      );
      if (userIdx >= 0) {
        members.splice(userIdx, 1);
      } else {
        members.push(user);
      }
      this.$emit('updateBoardMembers', members);
    },
    filterMembers() {
      var usersToShow;
      if (!this.searchedMember || this.searchedMember === '') {
        usersToShow = this.systemUsers;
      }
      usersToShow = this.systemUsers.filter((member) => {
        return member.fullname
          .toLowerCase()
          .includes(this.searchedMember.toLowerCase());
      });
      this.usersToShow = usersToShow;
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

