<template>
  <section>
    <div class="flex align-center justify-center add-members-container">
      <p>Invite to board</p>
      <i class="el-icon-close close-btn" @click="closeMenu"></i>
    </div>
    <hr class="divider" />
  </section>
</template>



<script>
export default {
  methods: {
    closeMenu() {
      this.$emit('closeMenu');
    },
  },
};
</script>

