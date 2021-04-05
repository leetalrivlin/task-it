<template>
  <section class="task" @click="taskClicked">
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
        <div class="flex align-center icons-inner-container">
          <span v-if="task.dueDate" :style="theme">
            <i class="el-icon-time"></i>
            {{ $dayjs(task.dueDate).format('MMM DD') }}
          </span>
          <span
            v-if="task.description"
            class="flex align-center description-icon"
          >
            <img src="~@/assets/trello-icon-pack/paragraph.svg" />
          </span>
          <span
            v-if="task.attachments"
            class="flex align-center attachments-icon"
          >
            <img src="~@/assets/trello-icon-pack/attachment.svg" />
            {{ task.attachments.length }}
          </span>
          <span
            v-if="task.checklists"
            class="flex align-center checklists-icon"
          >
            <img src="~@/assets/trello-icon-pack/checkbox.svg" />
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
        <i ref="taskEditBtn" class="el-icon-edit task-action" @click.stop="toggleMenu">
          <task-menu
            v-if="isTaskMenu"
            @deleteTask="deleteTask"
            @closeMenu="toggleMenu"
            v-click-outside="toggleMenu"
        /></i>
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
      type: Object
    }
  },
  data() {
    return {
      taskOnFocus: false,
      isTaskMenu: false
    };
  },
  methods: {
    taskClicked() {
      this.$emit('taskClicked', this.task.id);
    },
    toggleMenu() {
      this.isTaskMenu = !this.isTaskMenu;
      this.$refs.taskEditBtn.style.opacity = this.isTaskMenu ? 1 : 0;
    },
    deleteTask() {
      this.$emit('deleteTask', this.task);
    }
  },
  computed: {
    coverColor() {
      return this.task.cover.backgroundColor
        ? { backgroundColor: this.task.cover.backgroundColor }
        : {};
    },
    boardLabels() {
      const labels = this.$store.getters.boardLabels;
      return labels.filter(label => this.task.labelIds.includes(label.id));
    },
    theme() {
      if (this.task.completed)
        return { backgroundColor: '#61bd4f', color: '#ffffff' };
      else if (Date.now() > this.task.dueDate)
        return { backgroundColor: '#ec9488', color: '#ffffff' };
    }
  },
  components: {
    taskMenu,
    Avatar
  }
};
</script>

<style></style>
