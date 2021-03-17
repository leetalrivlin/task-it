<template>
  <section class="add-group">
    <transition name="slide-fade" mode="out-in">
      <a v-if="!emptyGroup" @click="createNewGroup">
        <i class="el-icon-plus"></i>
        {{ newGroupTxt }}</a
      >
      <form v-else>
        <el-input
          v-model="emptyGroup.title"
          placeholder="Enter list title..."
          clearable
          autofocus
        >
        </el-input>
        <div class="btn-container">
          <el-button type="info" @click.prevent="saveGroup">Save</el-button>
          <i class="el-icon-close" @click="emptyGroup = null"></i>
        </div>
      </form>
    </transition>
  </section>
</template>

<script>
import {boardService} from '../services/board.service.js'
export default {
  name: 'addGroup',
  data() {
    return {
      // isCreating: false,
      emptyGroup: null,
    };
  },
  methods: {
    saveGroup() {
      console.log('saving');
      this.$emit('saveGroup', this.emptyGroup);
      this.emptyGroup = null;
    },
    createNewGroup() {
      this.isCreating = true;
      this.emptyGroup =  boardService.getEmptyGroup();
      console.log(this.emptyGroup );
    },
  },
  computed: {
    newGroupTxt() {
      return 'Add new list';
      //   return this.board.groups.length === 0
      //     ? "Create a list"
      //     : "Add another list";
    },
  },
};
</script>
