<template>
  <section>
    <div class="flex column align-center justify-center add-members-container">
      <p>Invite to board</p>
      <i class="el-icon-close close-btn" @click.stop="closeMenu"></i>
      <hr class="add-members-divider" />
      <input type="text" class="filter-members" placeholder="Enter name" />

      <ul>
        <li v-for="member in members" :key="member.id"></li>
      </ul>
    </div>
  </section>
</template>



<script>
export default {
  props: {
    allMembers: Array,
    boardMembers: Array,
  },
  methods: {
    closeMenu() {
      console.log('click');
      this.$emit('closeMenu');
    },
  },
  computed:{
    members(){
      console.log(this.allMembers);
      return this.allMembers
    }
  }
};
</script>

