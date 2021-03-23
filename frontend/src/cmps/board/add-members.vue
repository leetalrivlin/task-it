<template>
  <section>
    <div class="add-members-container">
      <input type="text" class="filter-members" placeholder="Enter name" />

      <ul class="clean-list">
        <li
          v-for="user in systemUsers"
          :key="user.id"
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
      console.log(user);
      const userIdx = this.boardMembers.findIndex(({ id }) => id === user.id);
      if (userIdx >= 0) {
        this.boardMembers.splice(userIdx, 1);
      } else {
        this.boardMembers.push(user);
      }
      this.$emit('updateBoardMembers', this.boardMembers);
    },
  },
  computed: {
    isUserOnBoard() {
      return (user) => {
        return (
          this.boardMembers &&
          this.boardMembers.some(({ id }) => id === user.id)
        );
      };
    },
  },
};
</script>

