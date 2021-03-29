<template>
  <nav class="d-cntrlr cntrlr-container">
    <section class="flex column align-center nav-container">
      <p class="task-details-title btns-title">Add To Card</p>
      <div class="open-popup-btn-container d-menu">
        <button
          class="flex align-center el-btn-details open-popup-btn"
          @click.stop="isMembers = true"
        >
          <!-- <font-awesome-icon
            class="d-icon fa-nav-icon"
            :icon="['far', 'user']"
          /> -->
          <img src="~@/assets/trello-icon-pack/user.svg" class="fa-nav-icon">
          <p class="popup-btn-title">Members</p>
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
        <button
          @click.stop="isLabel = true"
          class="flex el-btn-details open-popup-btn"
        >
          <font-awesome-icon class="d-icon fa-nav-icon" icon="tag" />
          <p class="popup-btn-title">Labels</p>
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
          class="flex align-center el-btn-details open-popup-btn"
        >
          <!-- <font-awesome-icon class="d-icon fa-nav-icon" icon="check-square" /> -->
          <img src="~@/assets/trello-icon-pack/checkbox.svg" class="fa-nav-icon">
          <p class="popup-btn-title">Checklist</p>
          <popup v-if="isChecklist" @closePopup="isChecklist = false">
            <template v-slot:title>
              <p>Add Checklist</p>
            </template>
            <checklist-popup @addChecklist="addChecklist" @closePopup="isChecklist = false"/>
          </popup>
        </button>

        <button
          class="flex align-center el-btn-details open-popup-btn"
          @click="openDatePopup"
        >
          <!-- <font-awesome-icon
            class="d-icon fa-nav-icon"
            :icon="['far', 'clock']"
          /> -->
          <img src="~@/assets/trello-icon-pack/clock.svg" class="fa-nav-icon">
          <p class="popup-btn-title">Due Date</p>
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
          class="flex align-center el-btn-details open-popup-btn"
        >
          <img src="~@/assets/trello-icon-pack/attachment.svg" class="fa-nav-icon">
          <!-- <font-awesome-icon class="d-icon fa-nav-icon" icon="paperclip" /> -->
          <p class="popup-btn-title">Attachments</p>
          <popup v-if="isAttach" @closePopup="isAttach = false">
            <template v-slot:title>
              <p>Attachments</p>
            </template>
            <attachment-popup @attachUploaded="addAttach" />
          </popup>
        </button>
        <button
          v-if="!cover"
          class="flex align-center el-btn-details open-popup-btn"
          @click="isCoverPopUp = !isCoverPopUp"
        >
          <!-- <i class="el-icon-set-up fa-nav-icon"></i> -->
          <img src="~@/assets/trello-icon-pack/cover.svg" class="cover-icon fa-nav-icon">
          <p class="popup-btn-title">Cover</p>
          <popup v-if="isCoverPopUp" @closePopup="isCoverPopUp = false">
            <template v-slot:title>
              <p>Cover</p>
            </template>
            <cover-popup @changeColor="addCover" @uploadImg="addCoverImg" />
          </popup>
        </button>
      </div>
    </section>
    <section class="flex column align-center nav-container">
      <p class="task-details-title btns-title">Actions</p>
      <div class="open-popup-btn-container d-menu">
        <button
          class="flex el-btn-details open-popup-btn"
          @click="isMoveTask = true"
        >
          <i class="el-icon-right fa-nav-icon"></i>
          <p class="popup-btn-title">Move</p>
          <popup v-if="isMoveTask" @closePopup="isMoveTask = false">
            <template v-slot:title>
              <p>Move card</p>
            </template>
            <move-task-popup
              :groups="groups"
              :groupId="groupId"
              :taskId="taskId"
              @updateTaskPos="updateTaskPos"
              @closePopup="isMoveTask = false"
            />
          </popup>
        </button>
        <button
          class="flex el-btn-details open-popup-btn"
          @click="isDeleteTask = true"
        >
          <i class="el-icon-delete fa-nav-icon"></i>
          <p class="popup-btn-title">Delete</p>
          <popup v-if="isDeleteTask" @closePopup="isDeleteTask = false">
            <template v-slot:title>
              <p>Delete card?</p>
            </template>
            <delete-task-popup :taskId="taskId" @removeTask="removeTask" />
          </popup>
        </button>
      </div>
    </section>
  </nav>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faTag,
  faCheckSquare,
  faPaperclip
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
      type: Boolean
    },
    labels: {
      type: Array
    },
    taskLableIds: {
      type: Array
    },
    members: {
      type: Array
    },
    taskMembers: {
      type: Array
    },
    taskId: {
      type: String
    },
    groupId: {
      type: String
    },
    groups: {
      type: Array
    }
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
      isMoveTask: false,
      dueDate: ''
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
    removeTask(taskId) {
      this.$emit('removeTask', taskId);
    },
    updateTaskPos(updatedGroup, activity) {
      this.$emit('updateTaskPos', updatedGroup, activity);
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
