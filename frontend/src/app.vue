<template>
  <div id="app" :style="background" class="flex column main-app">
    <main-header />
    <router-view />
  </div>
</template>

<script>
import mainHeader from './cmps/main-header';

export default {
  computed: {
    background() {
      const pageName = this.$route.name;
      if (pageName !== 'board' && pageName !== 'taskDetails') return;
      const style = this.$store.getters.boardStyle;
      if (!style) return;
      if (!style.background.includes('.jpg')) {
        return style;
      } else return { background: style.background + 'center / cover' };
    },
  },
  created() {
    this.$store.dispatch('loadUsers');
  },
  components: {
    mainHeader,
  },
};
</script>

