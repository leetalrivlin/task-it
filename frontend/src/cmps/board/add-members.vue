<template>
  <section>
    <div class="flex column align-center justify-center add-members-container">
      <p>Invite to board</p>
      <i class="el-icon-close close-btn" @click.stop="closeMenu"></i>
      <hr class="divider" />
      <el-input prefix-icon="el-icon-search" > </el-input>
    </div>

    <!-- <el-input prefix-icon="el-icon-search" > </el-input> -->
  </section>
</template>



<script>
export default {
  methods: {
    closeMenu() {
      console.log('click');
      this.$emit('closeMenu');
    },
  },
};
</script>

