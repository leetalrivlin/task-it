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
    saveTask(taskTitle) {
      this.$emit('saveTask', taskTitle, this.group.id);
    },
    moveTask() {
      this.$emit('updateGroup', this.$clone(this.group));
    },
    // saveTask(taskTitle) {
    //   this.$emit('saveTask', taskTitle, this.group.id);
    // },
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
      console.log(this.filterBy);
      if (!this.filterBy || Object.keys(this.filterBy).length === 0)
        return this.group.tasks;
      if (
        this.filterBy.txt === '' &&
        this.filterBy.labels.length === 0 &&
        this.filterBy.members.length === 0
      )
        return this.group.tasks;
      else {
        return this.group.tasks.filter((task) => {
          return (
            task.title.toLowerCase().includes(this.filterBy.txt.toLowerCase()) &&
            task.labelIds.some((label) => this.filterBy.labels.includes(label)) &&
            task.members.some((member) =>
              this.filterBy.members.includes(member)
            )
          );
        });
      }
    },
  },
};
</script>

