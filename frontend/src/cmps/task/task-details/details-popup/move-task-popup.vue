<template>
  <section class="move-task-container">
    <p>Select Destination</p>
    <div>
      <p>List</p>
      <el-select v-model="value" placeholder="Select">
        <el-option
          v-for="group in groups"
          :key="group.id"
          :label="group.title"
          :value="group.title"
        >
        </el-option>
      </el-select>
    </div>
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
    },
  },
  data() {
    return {
      value: '',
    };
  },
  computed: {
      currGroup() {
          return this.groups.find(({id}) => id === this.groupId);
      }
  }
};
</script>
