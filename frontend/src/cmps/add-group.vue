<template>
  <section class="add-group">
    <transition name="slide-fade" mode="out-in">
      <a v-if="!emptyGroup" @click="createNewGroup">
        <i class="el-icon-plus"></i>
        {{ newGroupTxt }}</a
      >
      <form v-else @submit.prevent="saveGroup">
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
import { boardService } from '../services/board.service.js';
export default {
  name: 'addGroup',
  data() {
    return {
      emptyGroup: null,
    };
  },
  methods: {
    saveGroup() {
      this.$emit('saveGroup', this.emptyGroup);
      this.emptyGroup = boardService.getEmptyGroup();
    },
    createNewGroup() {
      this.isCreating = true;
      this.emptyGroup = boardService.getEmptyGroup();
    },
  },
  computed: {
    newGroupTxt() {
      return 'Add new list';
    },
  },
};
</script>
