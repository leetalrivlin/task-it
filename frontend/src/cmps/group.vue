<template>
  <section v-if="group" class="flex column group-content">
    <div class="group-header">
      <input
        type="text"
        class="title flex align-center"
        v-model="group.title"
        @change="inputChange"
      />
    </div>
    <!-- <h2 contenteditable="true">
      {{ group.title }}
    </h2> -->
    <draggable
      class="clean-list"
      :list="group.tasks"
      tag="ul"
      :move="onMove"
      @change="moveTask"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <li
        @click="taskClicked(task.id)"
        v-for="task in group.tasks"
        :key="task.id"
      >
        <task :task="task" @deleteTask="deleteTask" />
      </li>
      <add-task @saveTask="saveTask" :tasksLen="group.tasks.length"  />
    </draggable>
  </section>
</template>

<script>
import task from '../cmps/task.vue';
import addTask from '../cmps/add-task.vue';
import draggable from 'vuedraggable';
const clone = require('rfdc')({ proto: true });

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
    saveTask(taskTitle) {
      this.$emit('saveTask', taskTitle, this.group.id);
    },

    moveTask(ev) {
      console.log('ev', ev.moved);
      console.log(this.group);
      this.$emit('updateGroup', clone(this.group))
    },

    saveTask(taskTitle) {
      this.$emit('saveTask', taskTitle, this.group.id);
    },
    deleteTask(task) {
      console.log(task, 'task');
      this.$emit('deleteTask', task, this.group.id);
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
      console.log(task, 'task');
      this.$emit('deleteTask', task, this.group.id);
    },
    inputChange(){
       this.$emit('changeTitle', this.group);
    }
  },
  computed: {},
};
</script>

