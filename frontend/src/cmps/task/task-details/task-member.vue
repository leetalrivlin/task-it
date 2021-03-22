<template>
  <section class="members-container">
    <p>Members</p>
    <div class="flex justify-center align-center member-avatars">
      <ul
        v-for="taskMember in taskMembers"
        :key="taskMember.id"
        class="clean-list"
      >
        <li>
          <avatar
            class="avatar-item"
            :username="taskMember.fullname"
            :src="taskMember.imgUrl"
            color="white"
            :size="30"
          ></avatar>
        </li>
      </ul>
      <el-button
        type="info"
        icon="el-icon-plus"
        class="add-member-btn"
        circle
        @click="isMembers = true"
      >
        <popup v-if="isMembers" @closePopup="isMembers = false">
          <template v-slot:title>
            <p>Members</p>
          </template>
          <members-popup
            :members="members"
            @addMemberToTask="addMemberToTask"
          />
        </popup>
      </el-button>
    </div>
  </section>
</template>

<script>
import popup from './popup.vue';
import Avatar from 'vue-avatar';
import membersPopup from './members-popup.vue';
export default {
  name: 'taskMember',
  components: {
    Avatar,
    popup,
    membersPopup
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
      isMembers: false
    };
  },
  methods: {
    addMemberToTask(chosenMember) {
      this.$emit('addMemberToTask', chosenMember);
    }
  }
};
</script>
