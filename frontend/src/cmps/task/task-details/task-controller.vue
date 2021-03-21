<template>
  <nav class="d-cntrlr flex column align-center cntrlr-container">
    <section class="flex column align-center nav-container">
      <h2 class="btns-title">SUGGESTED</h2>
      <el-button class="el-btn-details"
        ><font-awesome-icon
          class="d-icon fa-nav-icon"
          :icon="['far', 'user']"
        />Join</el-button
      >
    </section>
    <section class="flex column align-center nav-container">
      <h2 class="btns-title">ADD TO CARD</h2>
      <el-button class="el-btn-details"
        ><font-awesome-icon
          class="d-icon fa-nav-icon"
          :icon="['far', 'user']"
        />Members</el-button
      >
      <el-button @click="isLabel = !isLabel" class="el-btn-details"
        ><font-awesome-icon class="d-icon fa-nav-icon" icon="tag" />Labels
        <popup v-if="isLabel" @closePopup="isLabel = false">
          <template v-slot:title>
            <p>Labels</p>
          </template>
          <label-popup :labels="labels" @labelPicked="addLabel" />
        </popup>
      </el-button>
      <el-button class="el-btn-details" @click="onOpenChecklist"
        ><font-awesome-icon
          class="d-icon fa-nav-icon"
          icon="check-square"
        />Checklist</el-button
      >
      <el-button class="el-btn-details"
        ><font-awesome-icon
          class="d-icon fa-nav-icon"
          :icon="['far', 'clock']"
        />Due Date</el-button
      >
      <el-button @click="isAttach = !isAttach" class="el-btn-details"
        ><font-awesome-icon
          class="d-icon fa-nav-icon"
          icon="paperclip"
        />Attachment
        <popup v-if="isAttach" @closePopup="isAttach = false">
          <template v-slot:title>
            <p>Attachment</p>
          </template>
          <attachment-popup @attachUploaded="addAttach" />
        </popup>
      </el-button>
      <el-button
        v-if="!cover"
        class="el-btn-details"
        icon="el-icon-set-up fa-nav-icon"
        @click="isCoverPopUp = !isCoverPopUp"
        >Cover
        <popup v-if="isCoverPopUp" @closePopup="isCoverPopUp = false">
          <template v-slot:title>
            <p>Cover</p>
          </template>
          <cover-popup @changeColor="addCover" @uploadImg="addCoverImg" />
        </popup>
      </el-button>
    </section>
  </nav>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faTag,
  faCheckSquare,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import popup from './popup.vue';
import coverPopup from './cover-popup.vue';
import coverAttachments from './cover-attachments.vue';
import attachmentPopup from './attachment-popup.vue';
import labelPopup from './label-popup.vue';

library.add(faUser, faTag, faCheckSquare, faClock, faPaperclip);
export default {
  props: {
    cover: {
      type: Boolean,
    },
    labels: {
      type: Array,
    },
  },
  data() {
    return {
      isCoverPopUp: false,
      isAttach: false,
      isLabel: false,
    };
  },
  methods: {
    onOpenChecklist() {
      this.$emit('openChecklist');
    },
    addCover(color) {
      this.$emit('addCover', color);
      this.isCoverPopUp = false;
    },
    addCoverImg(img) {
      this.$emit('addImg', img);
      this.isCoverPopUp = false;
    },
    addAttach(attachment) {
      this.isAttach = false;
      this.$emit('addAttach', attachment);
    },
    addLabel(label) {
      this.$emit('addLabel', label);
    },
  },
  components: {
    popup,
    coverPopup,
    coverAttachments,
    attachmentPopup,
    labelPopup,
  },
};
</script>
