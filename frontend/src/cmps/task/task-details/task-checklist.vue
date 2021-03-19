<template>
  <section class="d-checklist checklist-container">
    <font-awesome-icon class="d-icon" icon="check-square" />

    <div class="d-content">
      <h1 class="task-details-header">Checklist</h1>
      <el-progress
        :percentage="50"
        color="grey"
        type="line"
        :show-text="showTxt"
      ></el-progress>
    </div>

    <div class="d-content">
      <a
        v-if="!isAddChecklist"
        class="el-btn-details details-item-btn checklist-btn"
        @click="isAddChecklist = true"
        >Add an item</a
      >

      <form v-else>
        <el-input type="text" placeholder="Add an item" v-model="todo"></el-input>
        <div class="btn-container">
          <el-button
            class="task-details-btn"
            type="info"
            @click.prevent="saveChecklist"
            >Add</el-button
          >
          <i class="el-icon-close" @click="isAddChecklist = false"></i>
        </div>
      </form>
    </div>

    <el-checkbox
      @click="checked = !checked"
      v-model="checked"
      class="d-icon"
      name="checkbox-item"
    ></el-checkbox>
    <label class="d-content" for="checkbox-item">Manage service support</label>
  </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare);

export default {
  props: {
    task: {
      type: Object
    },
    checklist: {
      type: Object
    }
  },
  data() {
    return {
      isAddChecklist: false,
      isChecklist: false,
      todo: '',
      checked: false
    };
  },
  computed: {
    showTxt() {
      return false;
    }
  },
  methods: {
    addTodo() {
      console.log('todo saved');
    },
    saveChecklist() {
      console.log('save todo:',this.todo);
    }
  },
  created() {
    // console.log('task in created', this.task);
    console.log('empty checkbox in created', this.checklist);
    if (this.task.checklists && this.task.checklists.length > 0) {
      this.isChecklist = true;
    }
  },
  mounted() {}
};
</script>
