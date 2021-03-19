<template>
  <nav class="d-cntrlr flex column align-center cntrlr-container">
    <section class="flex column align-center nav-container">
      <h2 class="btns-title">SUGGESTED</h2>
      <el-button class="el-btn-details"><font-awesome-icon class="d-icon fa-nav-icon" :icon="['far', 'user']"/>Join</el-button>
    </section>
    <section class="flex column align-center nav-container">
      <h2 class="btns-title">ADD TO CARD</h2>
      <el-button class="el-btn-details"><font-awesome-icon class="d-icon fa-nav-icon" :icon="['far', 'user']"/>Members</el-button>
      <el-button class="el-btn-details"><font-awesome-icon class="d-icon fa-nav-icon" icon="tag" />Labels</el-button>
      <el-button class="el-btn-details"><font-awesome-icon class="d-icon fa-nav-icon" icon="check-square" />Checklist</el-button>
      <el-button class="el-btn-details"><font-awesome-icon class="d-icon fa-nav-icon" :icon="['far', 'clock']"/>Due Date</el-button>
      <el-button class="el-btn-details" ><font-awesome-icon class="d-icon fa-nav-icon" icon="paperclip" />Attachment</el-button>
      <el-button class="el-btn-details" icon="el-icon-set-up fa-nav-icon">Cover</el-button>
    </section>
  </nav>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faClock } from '@fortawesome/free-regular-svg-icons';
import { faTag, faCheckSquare, faPaperclip } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faTag, faCheckSquare, faClock, faPaperclip);
export default {};
</script>

<style></style>
