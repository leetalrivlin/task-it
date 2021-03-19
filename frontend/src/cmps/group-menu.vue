<template>
  <section @click.stop class="group-menu-container">
    <div class="menu-header flex align-center justify-center">
      <header class="group-details-header">List Actions</header>
      <i class="el-icon-close close-btn" @click="closeMenu"></i>
    </div>
    <hr class="group-menu-header-divider" />
    <div class="menu-opt" @click="deleteGroup">
      Archive this List <i class="el-icon-delete"></i>
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

<style>
</style>