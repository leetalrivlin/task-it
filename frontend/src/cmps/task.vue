<template>
  <section class="task">
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
      <div class="flex align-center space-between task-details-icons">
        <div class="icons-inner-container">
          <span v-if="task.dueDate">
            <i class="el-icon-time"></i>
            {{ $dayjs(task.dueDate).format('MMM DD') }}
          </span>
          <span v-if="task.description" class="description-icon">
            <font-awesome-icon class="d-icon" icon="stream" />
          </span>
          <span v-if="task.attachments" class="attachments-icon">
            <i class="el-icon-paperclip"></i>
            {{ task.attachments.length }}
          </span>
          <span v-if="task.checklists" class="checklists-icon">
            <font-awesome-icon class="fa-nav-icon" icon="check-square" />
            {{ task.checklists.length }}
          </span>
        </div>
        <span v-if="task.members" class="members-icon">
          <ul class="flex align-center clean-list">
            <li v-for="member in task.members" :key="member.id">
              <avatar
                class="member-avatar"
                :username="member.fullname"
                :src="member.imgUrl"
                color="white"
                :size="28"
              ></avatar>
            </li>
          </ul>
        </span>
      </div>
      <div class="popup-container">
        <i @click.stop="toggleMenu" class="el-icon-edit task-action"> </i>
        <task-menu
          v-if="isTaskMenu"
          @deleteTask="deleteTask"
          @closeMenu="toggleMenu"
          v-click-outside="closeMenu"
        />
      </div>
    </section>
  </section>
</template>



<script>
import taskMenu from './task-menu';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faStream } from '@fortawesome/free-solid-svg-icons';

import Avatar from 'vue-avatar';
library.add(faCheckSquare, faStream);

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
    closeMenu() {
      this.isTaskMenu = false;
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
    Avatar,
  },
};
</script>

<style>
</style>