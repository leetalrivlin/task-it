<template>
  <section class="task-attachment-container d-desc">
    <font-awesome-icon class="d-icon" icon="paperclip" />
    <div class="d-content">
      <h1 class="task-details-header">Attachment</h1>
      <ul class="clean-list task-attachment flex column">
        <li
          class="attach-item flex align-center"
          v-for="attach in task.attachments"
          :key="attach.id"
        >
          <div class="img-container ratio-attachment">
            <img :src="attach.url" alt="" />
          </div>
          <div class="img-desc">
            <h1>{{ attach.name }}</h1>
            <div class="btn-containter">
              <button class="link-btn" @click="removeAttach(attach.id)">
                Delete</button
              >
              <!-- -<button class="link-btn">Edit</button> -->
            </div>
          </div>
        </li>
      </ul>
      <a
        class="el-btn-details details-item-btn attachment-btn"
        @click="isAttach = !isAttach"
        >Add an attachment
        <popup v-if="isAttach" @closePopup="isAttach = false">
          <template v-slot:title>
            <p>Attachment</p>
          </template>
          <attachment-popup @attachUploaded="addAttach" /> </popup
      ></a>
    </div>
  </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import popup from '../../popup.vue';
import attachmentPopup from '../task-details/details-popup/attachment-popup.vue';

library.add(faPaperclip);
export default {
  name: 'taskAttachment',
  props: {
    task: {
      type: Object,
    },
  },
  data() {
    return {
      isAttach: false,
    };
  },
  methods: {
    removeAttach(attachId) {
      this.$emit('removeAttach', attachId);
    },
    addAttach(attachment) {
      this.isAttach = false;
      this.$emit('addAttach', attachment);
    },
  },
  components: {
    popup,
    attachmentPopup,
  },
};
</script>
