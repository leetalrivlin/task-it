<template>
  <section class="search-section">
    <div class="filter-text">
      <el-input prefix-icon="el-icon-search" v-model="filterBy.txt"> </el-input>
      <p class="desc-filter">Search by term, label, member, or due time.</p>
      <hr />
    </div>
    <div class="filter-lables">
      <ul class="clean-list flex column">
        <li v-for="label in labels" :key="label.id" class="list-item">
          <span :style="{ backgroundColor: label.color }">{{
            label.title
          }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        txt: '',
        labels: [],
        members: [],
      },
    };
  },
  computed: {
    labels() {
      console.log(this.$store.getters.boardLabels);
      return this.$store.getters.boardLabels;
    },
  },
};
</script>

<style>
</style>