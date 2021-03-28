<template>
  <div v-if="group" class="flex column group">
    <div class="flex space-between align-center group-header">
      <input
        type="text"
        class="title flex align-center"
        v-model="group.title"
        @change="inputChange"
        @keyup.enter.exact="inputChange"
      />
      <i @click="toggleMenu" class="el-icon-more group-action">
        <group-menu
          class="group-menu"
          v-if="isGroupMenu"
          @deleteGroup="deleteGroup"
          @closeMenu="toggleMenu"
          v-click-outside="toggleMenu"
        />
      </i>
    </div>
    <draggable
      class="clean-list group-main-content"
      :list="tasksToShow"
      tag="ul"
      @change="moveTask"
      @start="isDragging = true"
      @end="isDragging = false"
      dragClass="drag-task"
      group="tasks"
    >
      <li
        @click="taskClicked(task.id)"
        v-for="task in tasksToShow"
        :key="task.id"
      >
        <task :task="task" @deleteTask="deleteTask" />
      </li>
    </draggable>
    <section class="add-task-container">
      <a
        v-if="!isAddingTask"
        @click="isAddingTask = true"
        class="adding flex align-center"
      >
        <i class="el-icon-plus"></i> {{ addTxt }}
      </a>
      <add-task
        v-else
        @saveTask="saveTask"
        @closePopup="isAddingTask = false"
        :tasksLen="group.tasks.length"
      />
    </section>
  </div>
</template>

<script>
import task from '../cmps/task.vue';
import groupMenu from '../cmps/group-menu.vue';
import addTask from '../cmps/add-task.vue';
import draggable from 'vuedraggable';
import {boardService} from '../services/board.service'

export default {
  components: {
    task,
    addTask,
    draggable,
    groupMenu,
  },
  name: 'group',
  props: {
    group: {
      type: Object,
    },
    filterBy: {
      type: Object,
    },
  },
  data() {
    return {
      isDragging: false,
      isGroupMenu: false,
      isAddingTask: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isGroupMenu = !this.isGroupMenu;
    },
    taskClicked(taskId) {
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}/${taskId}`);
    },
    saveTask(task) {
      this.$emit('saveTask', task, this.group.id);
    },
    moveTask(ev) {
      this.$emit('moveTask', this.$clone(this.group), ev);
    },
    deleteTask(task) {
      this.$emit('deleteTask', task, this.group.id);
    },
    deleteGroup() {
      this.$emit('deleteGroup', this.group.id);
    },
    inputChange() {
      this.$emit('changeTitle', this.group);
    },
    closeMenu() {
      this.$emit('closeMenu');
    },
  },
  computed: {
    addTxt() {
      return this.group.tasks.length === 0 ? 'Add a task' : 'Add another task';
    },
    tasksToShow() {
      if (!this.filterBy) return this.group.tasks;
      const tasks = this.group.tasks.filter((task) => {
        if (!task.labelIds) task.labelIds = [];
        if (!task.members) task.members = [];
        return (
          task.title.toLowerCase().includes(this.filterBy.txt.toLowerCase()) &&
          (!this.filterBy.labels.length ||
            this.filterBy.labels.every((label) =>
              task.labelIds.includes(label)
            )) &&
          (!this.filterBy.members.length ||
            this.filterBy.members.every((id) =>
              task.members.some((member) => member._id === id)
            ))
        );
      });
      return tasks;
    },
  },
};
</script>

