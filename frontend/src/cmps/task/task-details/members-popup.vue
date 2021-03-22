<template>
  <section class="members-popup-container">
    <el-input
      type="text"
      placeholder="Search members"
      v-model="searchedMember"
    ></el-input>
    <p>Board Members</p>
    <ul class="clean-list">
      <li v-for="member in members" :key="member.id" class="flex align-center">{{member.fullname}} ({{member.username}})</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'membersPopup',
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
