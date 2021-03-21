<template>
  <section @click.stop class="task-menu-container">
    <div class="menu-header flex align-center justify-center">
      <header class="task-details-header">Task Actions</header>
      <i class="el-icon-close close-btn" @click="closeMenu"></i>
    </div>
    <hr class="task-menu-header-divider" />
    
      <div class="menu-opt flex space-between" @click="deleteTask">
        Archive this Task <i class="el-icon-delete icon-del"></i>
      </div>
   
  </section>
</template>

<script>
export default {
  methods: {
    closeMenu() {
      this.$emit('closeMenu');
    },
    deleteTask() {
      this.$emit('deleteTask');
    },
  },
};
</script>
