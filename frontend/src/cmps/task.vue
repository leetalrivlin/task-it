<template>
  <section
    class="task"
    @mouseover="taskOnFocus = true"
    @mouseleave="taskOnFocus = false"
  >
    <section v-if="task.cover" class="task-cover" :style="coverColor">
      <img
        v-if="task.cover.img && !task.cover.backgroundColor"
        :src="task.cover.img.url"
      />
    </section>
    <section class="task-content">
      <ul v-if="task.labelIds" class="labels-list clean-list flex">
        <li v-for="label in boardLabels" :key="label.id" class="label">
          <span :style="{ backgroundColor: label.color }"></span>
        </li>
      </ul>
        <p class="task-title">
          {{ task.title }}
        </p>
       
    </section>
        <i @click.stop="toggleMenu" v-if="taskOnFocus" class="el-icon-edit task-action">
          <task-menu
            v-if="isTaskMenu"
            @deleteTask="deleteTask"
            @closeMenu="toggleMenu"
            v-click-outside="toggleMenu"
          />
        </i>
  </section>
</template>



<script>
import taskMenu from './task-menu';
export default {
  name: 'task',
  props: {
    task: {
      type: Object,
    },
  },
  data() {
    return {
      taskOnFocus: false,
      isTaskMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isTaskMenu = !this.isTaskMenu;
    },
    deleteTask() {
      this.$emit('deleteTask', this.task);
    },
  },
  computed: {
    coverColor() {
      return this.task.cover.backgroundColor
        ? { backgroundColor: this.task.cover.backgroundColor }
        : {};
    },
    boardLabels() {
      const labels = this.$store.getters.boardLabels;
      return labels.filter((label) => this.task.labelIds.includes(label.id));
    },
  },
  components: {
    taskMenu,
  },
};
</script>

<style>
</style>