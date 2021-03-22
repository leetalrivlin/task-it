<template>
  <section>
    <el-input
      type="text"
      placeholder="Search members"
      v-model="searchedMember"
    ></el-input>
    <h1>BOARD MEMBERS</h1>
    <ul>
      <li></li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'membersPopup',
  data() {
    return {
      searchedMember: ''
    };
  }
};
</script>
