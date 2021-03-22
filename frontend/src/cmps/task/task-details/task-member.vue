<template>
  <section>
    <p>Members</p>
    <div class="flex justify-center align-center">
      <ul v-for="taskMember in taskMembers" :key="taskMember.id">
        <li>
          <avatar
            class="member-avatar"
            :username="taskMember.fullname"
            :src="taskMember.imgUrl"
            color="white"
            :size="30"
          ></avatar>
        </li>
      </ul>
      <el-button type="info" icon="el-icon-plus" circle></el-button>
    </div>
  </section>
</template>

<script>
import Avatar from 'vue-avatar';
export default {
  name: 'taskMember',
  components: {
    Avatar
  },
  props: {
    taskMembers: {
      type: Array
    }
  }
};
</script>
