<template>
  <div class="add-task" @click.stop>
    <section v-if="isAdd">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="Please input"
        v-model="textarea"
        autofocus
      >
      </el-input>
      <div class="flex align-center">
        <el-button type="info" @click="saveTask">Add Task</el-button>
        <i class="el-icon-close" @click="closeTask"> </i>
      </div>
    </section>
    <a v-else @click="addTask" class="adding flex align-center">
      <i class="el-icon-plus"></i>{{ addTxt }}
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAdd: false,
      textarea: "",
    };
  },
  props: {
    group: {
      type: Object,
    },
  },
  methods: {
    saveTask() {
      if (!this.taskTxt) return;
      this.$emit("saveTask", this.taskTxt, this.group.id);
      this.textarea = "";
    },
    addTask() {
      this.isAdd = true;
    },
    closeTask() {
      this.isAdd = false;
      this.textarea = "";
    },
  },
  computed: {
    addTxt() {
      return this.group.tasks.length ? "Add another task" : "Add a task";
    },
  },
};
</script>

