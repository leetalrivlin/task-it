<template>
  <section class="members-popup-container">
    <el-input
      type="text"
      placeholder="Search members"
      v-model="searchedMember"
    ></el-input>
    <p>Board Members</p>
    <ul class="clean-list">
      <li
        v-for="member in members"
        :key="member.id"
        class="flex space-between align-center"
      >
        <div class="flex align-center">
          <avatar
            class="member-avatar"
            :username="member.fullname"
            :src="member.imgUrl"
            color="white"
            :size="30"
          ></avatar>
          <span class="member-name">{{ member.fullname }} ({{ member.username }})</span>
        </div>
        <i class="el-icon-check"></i>
      </li>
    </ul>
  </section>
</template>

<script>
import Avatar from 'vue-avatar';
export default {
  name: 'membersPopup',
  components: {
    Avatar
  },
  props: {
    members: {
      type: Array
    }
  },
  data() {
    return {
      searchedMember: ''
    };
  }
};
</script>
