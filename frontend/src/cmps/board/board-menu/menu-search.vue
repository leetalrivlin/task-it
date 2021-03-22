<template>
  <div class="search-section">
    <el-input prefix-icon="el-icon-search" v-model="filterBy.txt"> </el-input>
    <p class="desc-filter">Search by term, label, member, or due time.</p>

    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        txt: '',
      },
    };
  },
};
</script>

<style>
</style>