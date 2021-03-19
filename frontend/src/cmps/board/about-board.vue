<template>
  <div class="about-this-board-section flex column">
    <div class="header flex align-center">
      <!-- <font-awesome-icon icon="user" class="icon" /> -->
      <i class="el-icon-user icon"></i>
      <h4>Made by</h4>
    </div>
    <div class="avatar flex align-center">
      <avatar
        username="Chen Lital Liz"
        color="white"
        :size="50"
        backgroundColor="#004FCB"
      ></avatar>
      <div class="info align-center">
        <h4>Chen Leetal Liz</h4>
        <p>@cll</p>
      </div>
    </div>
    <div class="d-content flex">
      <i class="el-icon-s-unfold d-icon task-details-icon"></i>
      <h1 class="details">Description</h1>
    </div>

    <p class="discription">
      Task-it is our favorite digital organization tool, and we use it to
      organize basically everything in our life. It essentially consists of
      “tasks” that you put into “lists” on a “board” For me, Trello solves four <br>
      major productivity challenges related to teaching:
      <ul>
        <li>Keeping track of all</li>
        <li>the little details Keeping track of beginning and end of semester events</li>
        <li>Giving myself enough prep time and grading time for major assignments</li>
        <li>Coordinating with my co-teachers</li>
      </ul>
     
    </p>
  </div>
</template>

<script>
import Avatar from 'vue-avatar';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faUser } from '@fortawesome/pro-regular-svg-icons';
// library.add(faUser);
export default {
  components: {
    Avatar,
  },
};
</script>

<style>
</style>