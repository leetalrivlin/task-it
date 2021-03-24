<template>
  <nav class="d-cntrlr flex column align-center cntrlr-container">
    <section class="flex column align-center nav-container">
      <p class="task-details-title btns-title">Add To Cart</p>
      <button
        class="el-btn-details open-popup-btn"
        @click.stop="isMembers = true"
      >
        <font-awesome-icon
          class="d-icon fa-nav-icon"
          :icon="['far', 'user']"
        />Members
        <popup v-if="isMembers" @closePopup="isMembers = false">
          <template v-slot:title>
            <p>Members</p>
          </template>
          <members-popup
            :members="members"
            :taskMembers="taskMembers"
            @addMemberToTask="addMemberToTask"
          />
        </popup>
      </button>
      <button @click="isLabel = !isLabel" class="el-btn-details open-popup-btn">
        <font-awesome-icon class="d-icon fa-nav-icon" icon="tag" />Labels
        <popup v-if="isLabel" @closePopup="isLabel = false">
          <template v-slot:title>
            <p>Labels</p>
          </template>
          <label-popup
            :labels="labels"
            :taskLableIds="taskLableIds"
            @labelPicked="addLabel"
            @boardLabelupdated="updateLabel"
          />
        </popup>
      </button>

      <button
        @click.stop="isChecklist = true"
        class="el-btn-details open-popup-btn"
      >
        <font-awesome-icon
          class="d-icon fa-nav-icon"
          icon="check-square"
        />Checklist
        <popup v-if="isChecklist" @closePopup="isChecklist = false">
          <template v-slot:title>
            <p>Add Checklist</p>
          </template>
          <checklist-popup @addChecklist="addChecklist" />
        </popup>
      </button>

      <button class="el-btn-details open-popup-btn" @click="openDatePopup">
        <font-awesome-icon
          class="d-icon fa-nav-icon"
          :icon="['far', 'clock']"
        />Due Date
        <el-date-picker
          ref="datePickerInput"
          class="date-picker-btn"
          type="datetime"
          placeholder="Pick a day"
          v-model="dueDate"
          @change="setDueDate"
          value-format="timestamp"
        ></el-date-picker>
      </button>

      <button
        @click="isAttach = !isAttach"
        class="el-btn-details open-popup-btn"
      >
        <font-awesome-icon
          class="d-icon fa-nav-icon"
          icon="paperclip"
        />Attachments
        <popup v-if="isAttach" @closePopup="isAttach = false">
          <template v-slot:title>
            <p>Attachments</p>
          </template>
          <attachment-popup @attachUploaded="addAttach" />
        </popup>
      </button>
      <button
        v-if="!cover"
        class="el-btn-details open-popup-btn"
        icon="el-icon-set-up fa-nav-icon"
        @click="isCoverPopUp = !isCoverPopUp"
      >
        <i class="el-icon-set-up"></i>
        Cover
        <popup v-if="isCoverPopUp" @closePopup="isCoverPopUp = false">
          <template v-slot:title>
            <p>Cover</p>
          </template>
          <cover-popup @changeColor="addCover" @uploadImg="addCoverImg" />
        </popup>
      </button>
    </section>
    <section class="flex column align-center nav-container">
      <p class="task-details-title btns-title">Actions</p>
      <button class="el-btn-details open-popup-btn">
        <i class="el-icon-right fa-nav-icon"></i>Move
      </button>
      <button
        class="el-btn-details open-popup-btn"
        @click="isDeleteTask = true"
      >
        <i class="el-icon-delete fa-nav-icon"></i>Delete
        <popup v-if="isDeleteTask" @closePopup="isDeleteTask = false">
          <template v-slot:title>
            <p>Delete card?</p>
          </template>
          <delete-task-popup :taskId="taskId" @deleteTask="deleteTask" />
        </popup>
      </button>
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
import popup from '../../popup.vue';
import coverAttachments from '../task-details/details-popup/cover-attachments.vue';
import coverPopup from '../task-details/details-popup/cover-popup.vue';
import attachmentPopup from '../task-details/details-popup/attachment-popup.vue';
import labelPopup from '../task-details/details-popup/label-popup.vue';
import checklistPopup from '../task-details/details-popup/checklist-popup.vue';
import datePopup from '../task-details/details-popup/date-popup.vue';
import membersPopup from '../task-details/details-popup/members-popup.vue';
import deleteTaskPopup from '../task-details/details-popup/delete-task-popup.vue';
import moveTaskPopup from '../task-details/details-popup/move-task-popup.vue';

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
    },
    taskMembers: {
      type: Array,
    },
    taskId: {
      type: String,
    },
  },
  data() {
    return {
      isCoverPopUp: false,
      isAttach: false,
      isLabel: false,
      isChecklist: false,
      isDate: false,
      isMembers: false,
      isDeleteTask: false,
      dueDate: '',
    };
  },
  methods: {
    addChecklist(emptyChecklist) {
      this.$emit('addChecklist', emptyChecklist);
      this.isChecklist = false;
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
    updateLabel(updatedLabel) {
      this.$emit('updateLabel', updatedLabel);
    },
    addMemberToTask(chosenMember) {
      this.$emit('addMemberToTask', chosenMember);
    },
    openDatePopup() {
      this.$refs.datePickerInput.focus();
    },
    setDueDate() {
      console.log(this.dueDate);
      this.$emit('setDueDate', this.dueDate);
    },
    deleteTask(taskId) {
      this.$emit('deleteTask', taskId);
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
    membersPopup,
    deleteTaskPopup,
    moveTaskPopup
  }
};
</script>
