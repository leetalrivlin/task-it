<template>
  <section @click.stop class="group-menu-container ">
      <div class="menu-header flex space-between">
        <h4 class="group-details-header align-items" >List Actions</h4>
        <i class="el-icon-close close-btn" @click="closeMenu"></i>
      </div>
      <div @click="deleteGroup">Archive this List</div>


  </section>
</template>

<script>
export default {
  methods:{
    closeMenu() {
      this.$emit('closeMenu');
    },
    deleteGroup(){
      this.$emit('deleteGroup')
    },
  }

}
</script>

<style>

</style>