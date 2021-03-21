<template>
  <div id="app" :style="background" class="flex column main-app">
    <main-header :style="background" />
    <router-view />
  </div>
</template>

<script>
import mainHeader from './cmps/main-header';

export default {
  computed: {
    background() {
      const pageName = this.$route.name;
      if (pageName !== 'board') return;
      const style = this.$store.getters.boardStyle;
      if (!style) return;
      return {
        background: style.background,
      };
    },
  },
  components: {
    mainHeader,
  },
};
</script>

