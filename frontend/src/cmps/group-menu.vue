<template>
  <section @click.stop class="group-menu-container">
    <div class="menu-header flex align-center justify-center">
      <header class="group-details-header">List Actions</header>
      <i class="el-icon-close close-btn" @click="closeMenu"></i>
    </div>
    <hr class="group-menu-header-divider" />
    <div class="menu-opt flex align-center space-between" @click="deleteGroup">
      <p>Delete this List</p>
      <i class="el-icon-delete"></i>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    closeMenu() {
      this.$emit('closeMenu');
    },
    deleteGroup() {
      this.$emit('deleteGroup');
    },
  },
};
</script>
