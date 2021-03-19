<template>
  <nav class="d-cntrlr flex column align-center cntrlr-container">
    <section class="flex column align-center nav-container">
      <h2 class="btns-title">SUGGESTED</h2>
      <el-button class="el-btn-details"><font-awesome-icon class="d-icon fa-nav-icon" :icon="['far', 'user']"/>Join</el-button>
    </section>
    <section class="flex column align-center nav-container">
      <h2 class="btns-title">ADD TO CARD</h2>
      <el-button class="el-btn-details">Members</el-button>
      <el-button class="el-btn-details">Labels</el-button>
      <el-button class="el-btn-details">Checklist</el-button>
      <el-button class="el-btn-details">Due Date</el-button>
      <el-button class="el-btn-details">Attachment</el-button>
      <el-button class="el-btn-details">Cover</el-button>
    </section>
  </nav>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-regular-svg-icons';

library.add(faUser);
export default {};
</script>

<style></style>
