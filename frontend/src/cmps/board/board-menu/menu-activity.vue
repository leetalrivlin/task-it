<template>
  <li class="flex justify-start align-center activity-container">
    <avatar
      class="activity-avatar task-activity-avatar"
      :username="getUser"
      :src="getUserImg"
      color="white"
      :size="32"
    ></avatar>
    <div class="activity-info">
      <p class="user-activity">
        <span class="userName">{{ getUser }}</span>
        {{ activity.txt }}
      </p>
      <p class="created-at">{{ activity.createdAt | moment('from', 'now') }}</p>
    </div>
  </li>
</template>

<script>
import Avatar from 'vue-avatar';
export default {
  name: 'menuActivity',
  components: {
    Avatar,
  },
  props: {
    activity: {
      type: Object,
    },
  },
  computed: {
    getUser() {
      return this.activity.byMember ? this.activity.byMember.fullname : 'Guest';
    },
    getUserImg() {
      return this.activity.byMember ? this.activity.byMember.imgUrl : 'require(@/assets/imgs/guest-avatar.png)';
    }
  },
};
</script>
