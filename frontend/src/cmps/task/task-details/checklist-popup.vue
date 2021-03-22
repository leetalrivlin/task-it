<template>
  <form
    @submit.prevent="addChecklist"
    class="flex column checklist-popup-container"
  >
    <label for="title">Title</label>
    <el-input type="text" placeholder="Checklist" v-model="title" name="title"></el-input>
    <el-button
      @click.stop="addChecklist"
      class="add-btn"
      type="info"
      >Add</el-button>
  </form>
</template>

<script>
import { boardService } from '../../../services/board.service.js';
const clone = require('rfdc')({ proto: true });
export default {
  name: 'checklistPopup',
  data() {
    return {
      title: 'Checklist'
    };
  },
  methods: {
    addChecklist() {
      const emptyCheckList = boardService.getEmptyChecklist();
      emptyCheckList.title = this.title;
      console.log('emptyCheckList', emptyCheckList);
      this.$emit('addChecklist', clone(emptyCheckList));
      this.title = '';
    }
  }
};
</script>
