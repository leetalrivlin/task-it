<template>
  <form
    @click.stop
    @submit.prevent="addChecklist"
    class="flex column checklist-popup-container"
  >
    <label for="title">Title</label>
    <el-input
      type="text"
      placeholder="Checklist"
      v-model="title"
      name="title"
    ></el-input>
    <el-button @click.prevent="addChecklist" class="add-btn" type="info">Add</el-button>
  </form>
</template>

<script>
import { boardService } from '../../../../services/board.service';
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
      this.$emit('addChecklist', this.$clone(emptyCheckList));
      this.title = '';
      this.$emit('closePopup');
    }
  }
};
</script>
