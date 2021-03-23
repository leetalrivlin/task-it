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
          class="flex align-center list-item"
        >
          <span :style="{ backgroundColor: label.color }"> </span>
          <p>{{ label.title }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
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
      console.log(this.board.groups);
      //  var tasksToShow;
      // if (!this.filterBy.txt || this.filterBy.txt === '') {
      //   tasksToShow = this.board;
      // }
      // tasksToShow = this.board.filter((member) => {
      //   return member.fullname
      //     .toLowerCase()
      //     .includes(this.filterBy.txt.toLowerCase());
      // });
      // this.membersToShow = tasksToShow;
      
    },
  },
  computed: {
    labels() {
      return this.$store.getters.boardLabels;
    },
  },
};
</script>

<style>
</style>