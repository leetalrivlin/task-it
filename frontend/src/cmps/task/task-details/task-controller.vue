<template>
  <nav class="d-cntrlr flex column align-center cntrlr-container">
    <section class="flex column align-center nav-container">
      <h2 class="btns-title">SUGGESTED</h2>
      <el-button class="el-btn-details open-popup-btn"
        ><font-awesome-icon
          class="d-icon fa-nav-icon"
          :icon="['far', 'user']"
        />Join</el-button
      >
    </section>
    <section class="flex column align-center nav-container">
      <h2 class="btns-title">ADD TO CARD</h2>
      <el-button class="el-btn-details open-popup-btn" @click="isMembers = true"
        ><font-awesome-icon
          class="d-icon fa-nav-icon"
          :icon="['far', 'user']"
        />Members
        <popup v-if="isMembers" @closePopup="isMembers = false">
          <template v-slot:title>
            <p>Members</p>
          </template>
          <members-popup @addMember="addMember" :members="members"/>
        </popup>
      </el-button>
      <el-button
        @click="isLabel = !isLabel"
        class="el-btn-details open-popup-btn"
        ><font-awesome-icon class="d-icon fa-nav-icon" icon="tag" />Labels
        <popup v-if="isLabel" @closePopup="isLabel = false">
          <template v-slot:title>
            <p>Labels</p>
          </template>
          <label-popup
            :labels="labels"
            :taskLableIds="taskLableIds"
            @labelPicked="addLabel"
          />
        </popup>
      </el-button>

      <el-button
        @click="isChecklist = true"
        class="el-btn-details open-popup-btn"
        ><font-awesome-icon
          class="d-icon fa-nav-icon"
          icon="check-square"
        />Checklist
        <popup v-if="isChecklist" @closePopup="isChecklist = false">
          <template v-slot:title>
            <p>Add Checklist</p>
          </template>
          <checklist-popup @addChecklist="addChecklist" />
        </popup>
      </el-button>

      <el-button class="el-btn-details open-popup-btn" @click="isDate = !isDate"
        ><font-awesome-icon
          class="d-icon fa-nav-icon"
          :icon="['far', 'clock']"
        />Due Date
        <popup v-if="isDate" @closePopup="isDate = false">
          <template v-slot:title>
            <p>Change due date</p>
          </template>
          <date-popup />
        </popup>
      </el-button>
      
      <el-button @click="isAttach = !isAttach" class="el-btn-details open-popup-btn"
        ><font-awesome-icon
          class="d-icon fa-nav-icon"
          icon="paperclip"
        />Attachments
        <popup v-if="isAttach" @closePopup="isAttach = false">
          <template v-slot:title>
            <p>Attachments</p>
          </template>
          <attachment-popup @attachUploaded="addAttach" />
        </popup>
      </el-button>
      <el-button
        v-if="!cover"
        class="el-btn-details open-popup-btn"
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
import checklistPopup from './checklist-popup.vue';
import datePopup from './date-popup.vue';
import membersPopup from './members-popup.vue';

library.add(faUser, faTag, faCheckSquare, faClock, faPaperclip);
export default {
  props: {
    cover: {
      type: Boolean,
    },
    labels: {
      type: Array,
    },
    taskLableIds: {
      type: Array,
    },
    members: {
      type: Array,
    }
  },
  data() {
    return {
      isCoverPopUp: false,
      isAttach: false,
      isLabel: false,
      isChecklist: false,
      isDate: false,
      isMembers: false
    };
  },
  methods: {
    addChecklist(emptyChecklist) {
      this.$emit('addChecklist', emptyChecklist);
      this.isChecklist = false;
    },
    addMember(member) {
      console.log('adding member...',member);
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
    checklistPopup,
    datePopup,
    membersPopup
  },
};
</script>
