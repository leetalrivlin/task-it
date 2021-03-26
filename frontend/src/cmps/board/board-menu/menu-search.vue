<template>
  <section class="search-section">
    <div class="filter-text">
      <el-input
        type="text"
        @keyup.stop
        v-model="filterBy.txt"
        @input="filterBoard"
      >
      </el-input>
      <p class="desc-filter">Search by term, label, member, or due time.</p>
      <hr />
    </div>
    <div class="filter-lables">
      <ul class="clean-list flex column">
        <li
          v-for="label in labels"
          :key="label.id"
          class="flex align-center space-between list-item"
        >
        <div class="flex space-between align-center">
          <span :style="{ backgroundColor: label.color }"> </span>
          <p>{{ label.title }}</p>
        </div>
         <i  class="el-icon-check check"> </i>
        </li>
      </ul>
      <hr />
    </div>
    <div class="filter-members">
      <ul class="clean-list flex column">
        <li
          v-for="member in members"
          :key="member._id"
          class="flex align-center space-between list-item"
        >
          <div class="flex space-between align-center">
            <avatar
              class="avatar-item"
              :username="member.fullname"
              :src="member.imgUrl"
              color="white"
              :size="33"
            ></avatar>
            <p>{{ member.fullname }}</p>
          </div>
          <i  class="el-icon-check check"> </i>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Avatar from 'vue-avatar';
export default {
  name: 'menuSearch',
  components: {
    Avatar,
  },
  props: {
    board: {
      type: Object,
    },
  },
  data() {
    return {
      filterBy: {
        txt: '',
        labels: [],
        members: [],
      },
    };
  },
  methods: {
    filterBoard() {
      var tasksToShow = [];
      this.board.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (
            task.title.toLowerCase().includes(this.filterBy.txt.toLowerCase())
          )
            tasksToShow.push(task);
        });
      });
      if (tasksToShow.length) {
        console.log(tasksToShow, 'tasksToShow');
        this.$emit('tasksToShow', tasksToShow);
      }
    },
  },
  computed: {
    labels() {
      return this.$store.getters.boardLabels;
    },
    members() {
      return this.board.members;
    },
    // clickMember() {
      
    // },
    // clickLabel(){
      
    //   console.log('label');
    // }
  },
};
</script>

<style>
</style>