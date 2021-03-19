<template>
  <section class="d-checklist checklist-container">
    <i class="el-icon-edit-outline d-icon task-details-icon"></i>

    <div class="d-content">
      <h1 class="task-details-header">Checklist</h1>
      <el-progress
        :percentage="50"
        color="grey"
        type="line"
        :show-text="showTxt"
      ></el-progress>

      <a class="el-btn-details emptyChecklist">Add an item</a>

      <form @submit.prevent="saveChecklist">
        <el-input type="text" placeholder="Add an item"></el-input>
        <div class="btn-container">
          <el-button
            class="task-details-btn"
            type="info"
            @click.prevent="addTodo"
            >Add</el-button
          >
          <i class="el-icon-close" @click="isAddTodo = false"></i>
        </div>
      </form>
    </div>
    <!-- <ul class="clean-list"> -->
    <el-checkbox
      @change="checked = !checked"
      v-model="checked"
      class="d-icon"
    ></el-checkbox>
    <li class="clean-list">
      <span class="d-content">Manage service support</span>
    </li>
    <!-- </ul> -->
  </section>
</template>

<script>
export default {
  props: {
    task: {
      type: Object
    }
  },
  data() {
    return {
      isChecklist: false,
      isAddTodo: false,
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
      console.log('checklist saved');
    }
  },
  mounted() {
    if (this.task.checklists && this.task.checklists.length > 0) {
      this.isChecklist = true;
    }
  }
};
</script>
