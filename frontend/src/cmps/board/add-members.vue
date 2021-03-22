<template>
  <section>
    <div class="add-members-container">
      <input type="text" class="filter-members" placeholder="Enter name" />

      <ul class="clean-list">
        <li
          v-for="member in members"
          :key="member.id"
          class="member flex align-center space-between"
        >
          <div class="flex space-between align-center">
            <avatar
              class="avatar-mem"
              :username="member.fullname"
              :src="member.imgUrl"
              color="white"
              :size="30"
            ></avatar>
            <p>{{ member.fullname }}</p>
          </div>
          <i class="el-icon-check check"> </i>
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
  },
  computed: {
    members() {
      return this.systemUsers;
    },
   
  },
};
</script>

