<template>
  <section class=" flex column group-content">
    <h2 contenteditable="true">
      {{ group.title }}
    </h2>
    <draggable
    class="clean-list"
      :list="group.tasks"
      :move="onMove"
      tag="ul"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <!-- <ul class="clean-list flex column group-content"> -->
      <li
        @click="taskClicked(task.id)"
        v-for="task in group.tasks"
        :key="task.id"
      >
        <task :task="task" @deleteTask="deleteTask" />
      </li>
      <add-task @saveTask="saveTask" :group="group" />
      <!-- </ul> -->
    </draggable>
  </section>
</template>

<script>
import task from '../cmps/task.vue';
import addTask from '../cmps/add-task.vue';
import draggable from 'vuedraggable';

export default {
  components: {
    task,
    addTask,
    draggable,
  },
  name: 'group',
  props: {
    group: {
      type: Object,
    },
  },
  data() {
    return {
      newGroup: this.group,
      isDragging: false,
    };
  },
  methods: {
    taskClicked(taskId) {
      console.log('taskId', taskId);
      console.log(this.$route.params.boardId);
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}/${taskId}`);
    },
    saveTask(taskTitle, groupId) {
      this.$emit('saveTask', taskTitle, groupId);
    },
  
    onMove({ relatedContext, draggedContext }) {
      console.log('relatedContext', relatedContext);
      console.log('draggedContext', draggedContext);
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    deleteTask(task) {
      this.$emit('deleteTask', task);
    },
  },
  computed: {},
};
</script>

