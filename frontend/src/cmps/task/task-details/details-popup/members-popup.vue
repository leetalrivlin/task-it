<template>
  <section class="members-popup-container">
    <el-input
      @keyup.stop
      type="text"
      placeholder="Search members"
      v-model="searchedMember"
      @input="filterMembers"
    ></el-input>
    <p>Board Members</p>
    <ul class="clean-list">
      <li
        v-for="member in membersToShow"
        :key="member._id"
        class="flex space-between align-center"
        @click="addMemberToTask(member)"
      >
        <div class="flex align-center">
          <avatar
            class="member-avatar"
            :username="member.fullname"
            :src="member.imgUrl"
            color="white"
            :size="30"
          ></avatar>
          <span class="member-name"
            >{{ member.fullname }} ({{ member.username }})</span
          >
        </div>
        <i v-if="isMemberOnTask(member)" class="el-icon-check"></i>
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
    },
    taskMembers: {
      type: Array
    }
  },
  data() {
    return {
      searchedMember: '',
      membersToShow: this.members
    };
  },
  computed: {
    isMemberOnTask() {
      return member => {
        return (
          this.taskMembers &&
          this.taskMembers.some(({ _id }) => _id === member._id)
        );
      };
    }
  },
  methods: {
    addMemberToTask(member) {
      console.log('this.taskMembers', this.taskMembers);
      this.$emit('addMemberToTask', member);
    },
    filterMembers() {
      console.log(this.searchedMember);
      // console.log('this.members',this.members);
      var membersToShow;
      if (!this.searchedMember || this.searchedMember === '') membersToShow = this.members;
      membersToShow = this.members.filter(member => {
        return member.fullname.toLowerCase().includes(this.searchedMember.toLowerCase())
      });
      console.log(membersToShow);
      this.membersToShow = membersToShow;
    }
  }
};
</script>
