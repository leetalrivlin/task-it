<template>
  <section class="move-task-container">
    <p class="task-details-title move-title" id="move-title">Select Destination</p>
    <section class="flex space-between selects-container">
      <div class="group-select">
        <label>List</label>
        <el-select v-model="chosenGroupId" @change="showGroupTasks">
          <el-option
            v-for="group in groups"
            :key="group.id"
            :value="group.id"
            :label="group.title"
          >
          </el-option>
        </el-select>
      </div>
      <div class="pos-select">
        <label>Position</label>
        <el-select v-model="chosenTaskPos">
        <el-option
          v-for="pos in tasksLen"
          :key="pos"
          :value="pos"
        >
        </el-option>
      </el-select>
      </div>
    </section>
    <el-button type="info" class="task-details-btn" @click="changeTaskPos">Move</el-button>
  </section>
</template>

<script>
export default {
  props: {
    groups: {
      type: Array
    },
    taskId: {
      type: String
    },
    groupId: {
      type: String
    }
  },
  data() {
    return {
      chosenGroupId: '',
      tasksLen: null,
      chosenTaskPos: null,
    };
  },
  computed: {
    openedTaskGroup() {
      return this.groups.find(({ id }) => id === this.groupId);
    },
  },
  methods: {
    showGroupTasks() {
      var chosenGroup;
      if (this.chosenGroupId === this.openedTaskGroup.id) chosenGroup = this.openedTaskGroup;
      chosenGroup = this.groups.find(({ id }) => id === this.chosenGroupId);
      this.tasksLen = chosenGroup.tasks.length;
    },
    changeTaskPos() {
      const newGroupIdx = this.groups.findIndex(({id}) => id === this.chosenGroupId);
      const newTaskIdx = (this.chosenTaskPos - 1);
      const currGroupIdx = this.groups.findIndex(({id}) => id === this.groupId);
      const currTaskIdx = this.groups[currGroupIdx].tasks.findIndex(({id}) => id === this.taskId);
      const currTask = this.groups[currGroupIdx].tasks.find(({id}) => id === this.taskId);
      this.groups[currGroupIdx].tasks.splice(currTaskIdx, 1);
      this.groups[newGroupIdx].tasks.splice(newTaskIdx, 0, currTask);
      this.$emit('updateTaskPos', this.groups[newGroupIdx]);
      this.$emit('updateTaskPos', this.groups[currGroupIdx]);
      this.$emit('closePopup');
    }
  }
};
</script>
