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
      var tasksToShow = [];
      this.board.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (
            task.title.toLowerCase().includes(this.filterBy.txt.toLowerCase())
          )
            tasksToShow.push(task);
        });
        if (tasksToShow.length)
         this.$emit('tasksToShow', tasksToShow);
      });

      //  var taskToShow;
      // var tasksToShow = [];
      // this.board.groups.map((group) => {
      //   group.tasks.map((task) => {
      //     if (
      //       task.title.toLowerCase().includes(this.filterBy.txt.toLowerCase())
      //     )
      //       return task;
      //   });
      //   if (tasksToShow.length) tasksToShow.push(task);

      //   this.$emit('tasksToShow', tasksToShow);
      // });
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