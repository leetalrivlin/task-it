<template>
  <div id="app" :style="background" class="flex column main-app">
    <!-- <main-header-board @logout="doLogout" /> -->
    <component :is="selectedHeader" @logout="doLogout"></component>
    <router-view />
  </div>
</template>

<script>
import mainHeaderBoard from './cmps/main-header-board.vue';
import mainHeader from './cmps/main-header.vue';

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
    selectedHeader() {
      const pageName = this.$route.name;
      if (pageName === 'board' || pageName === 'taskDetails') {
        console.log('mainHeaderBoard');
        return 'mainHeaderBoard';
      } else {
        console.log('mainHeader');
        return 'mainHeader';
      }
    },
  },
  methods: {
    doLogout() {
      this.$store.dispatch({ type: 'logout' });
    },
  },
  created() {
    this.$store.dispatch('loadUsers');
    this.$store.dispatch('loadBoards');
  },
  components: {
    mainHeaderBoard,
    mainHeader,
  },
};
</script>

