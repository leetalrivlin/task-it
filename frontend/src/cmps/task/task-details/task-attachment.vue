<template>
  <section class="task-attachment-container d-desc">
    <font-awesome-icon class="d-icon" icon="paperclip" />
    <div class="d-content">
      <h1 class="task-details-header">Attachment</h1>
      <!-- Should be replaced to one li with a v-for on the images: -->
      <ul class="clean-list task-attachment flex column">
        <li
          class="attach-item"
          v-for="attach in task.attachments"
          :key="attach.id"
        >
          <div class="img-container ratio-attachment">
            <img :src="attach.url" alt="" />
          </div>
          <div class="img-desc">
            <h1>{{ attach.name }}</h1>
            <div class="btn-containter">
              <button class="link-btn" @click="removeAttach(attach.id)">Delete</button> -
              <a href="">Edit</a>
            </div>
          </div>
        </li>
      </ul>
      <a class="el-btn-details details-item-btn attachment-btn"
        >Add an attachment</a
      >
    </div>
  </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

library.add(faPaperclip);
export default {
  name: 'taskAttachment',
  props: {
    task: {
      type: Object,
    },
  },
  methods: {
    removeAttach(attachId) {
      this.$emit('removeAttach', attachId);
    },
  },
};
</script>
