<template>
  <ul class="clean-list flex column group-content">
    <h2 contenteditable="true">
      {{ group.title }}
    </h2>
    <li
      @click="taskClicked(task.id)"
      v-for="task in group.tasks"
      :key="task.id"
    >
      <task :task="task" />
    </li>
    <add-task @saveTask="saveTask" :group="group" />
  </ul>
</template>

<script>
import task from '../cmps/task.vue';
import addTask from '../cmps/add-task.vue';
export default {
  components: {
    task,
    addTask,
  },
  name: 'group',
  props: {
    group: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    taskClicked(taskId) {
      console.log('taskId', taskId);
      console.log(this.$route.params.boardId);
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}/${taskId}`);
    },
    saveTask(taskTitle , groupId){
       this.$emit("saveTask",taskTitle,groupId );
    }
  },
  computed: {},
};
</script>

