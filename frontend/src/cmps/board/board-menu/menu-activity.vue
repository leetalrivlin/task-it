<template>
  <li class="flex justify-start align-center activity-container">
    <avatar
      class="activity-avatar"
      :username="activity.byMember.fullname || 'New Guest'"
      :src="activity.byMember.imgUrl || 'require(@/assets/imgs/guest-avatar.png)'"
      color="white"
      :size="32"
    ></avatar>
    <div class="activity-info">
      <p class="user-activity">
        <span class="userName">{{
          activity.byMember.fullname || 'Guest'
        }}</span>
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
    Avatar
  },
  props: {
    activity: {
      type: Object
    }
  },
  computed: {
  },
};
</script>
