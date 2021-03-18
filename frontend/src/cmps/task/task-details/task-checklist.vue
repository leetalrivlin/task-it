<template>
  <section class="d-checklist">
    <i class="el-icon-edit-outline d-icon task-details-icon"></i>

    <div class="d-content">
      <h1 class="task-details-header">Checklist</h1>
      <el-progress
        :percentage="50"
        color="grey"
        type="line"
        :show-text="showTxt"
      ></el-progress>
      <form @submit.prevent="saveChecklist">
        <el-input type="text" placeholder="Add an item"></el-input>
        <div class="btn-container">
          <el-button type="info" @click.prevent="addTodo">Add</el-button>
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
        <li class="clean-list"><span class="d-content">Add Task</span>
        </li>
        <!-- <li>Manage service support</li> -->
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
    },
    renderCheckList() {
      const checklists = this.task.checklists;
    }
  },
  mounted() {
    if (!this.task.checklists) this.renderCheckList();
  }
};
</script>
