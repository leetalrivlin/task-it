<template>
  <section @click.stop class="group-menu-container">
    <div class="menu-header flex space-between">
      <header class="group-details-header align-items">List Actions</header>
      <i class="el-icon-close close-btn" @click="closeMenu"></i>
    </div>
    <div class="menu-opt" @click="deleteGroup">Archive this List <i class="el-icon-delete"></i>
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