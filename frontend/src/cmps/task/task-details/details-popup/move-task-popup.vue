<template>
  <section class="move-task-container">
    <p>Select Destination</p>
    <section class="flex space-between">
      <div>
        <p>List</p>
        <el-select v-model="chosenGroup" @change="showGroupTasks">
          <el-option
            v-for="group in groups"
            :key="group.id"
            :value="group.id"
            :label="group.title"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <p>Position</p>
        <!-- <el-select v-model="value">
        <el-option
          v-for="group in groups"
          :key="group.id"
          :value="group.title"
        >
        </el-option>
      </el-select> -->
      </div>
    </section>
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
      chosenGroup: ''
    };
  },
  computed: {
    currGroup() {
      return this.groups.find(({ id }) => id === this.groupId);
    },
    tasks() {
      return this.currGroup;
    },
    tasksLength() {
      var chosenGroup;
      if (this.currGroup) chosenGroup = this.currGroup;
      chosenGroup = this.groups.find(({ id }) => id === this.chosenGroup.id);
      return chosenGroup.tasks.length;
    }
  },
  methods: {
    showGroupTasks() {
      console.log('this.chosenGroup', this.chosenGroup);
    }
  }
};
</script>
