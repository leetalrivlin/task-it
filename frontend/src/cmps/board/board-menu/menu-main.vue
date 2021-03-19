<template>
  <section class="menu-main">
    <a class="menu-main-item flex align-center" @click="toggleAbout">
      <i class="el-icon-info icon"></i>
      <span>About this board </span>
    </a>
    <a class="menu-main-item flex align-center" @click="toggleBgc">
      <font-awesome-icon icon="square" class="icon" />
      <span>Change background </span>
    </a>
    <a class="menu-main-item flex align-center" @click="toggleSearch">
      <i class="el-icon-search icon"></i>
      <span>Search cards </span>
    </a>
  </section>
</template>

<script>
export default {
  name: 'menu-main',
  methods: {
    toggleAbout() {
      this.$emit('openAbout');
    },
    toggleBgc() {
      this.$emit('openBgc');
    },
    toggleSearch() {
      this.$emit('openSearch');
    },
  },
};
</script>
