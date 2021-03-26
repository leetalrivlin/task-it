<template>
  <section class="flex column board-menu">
    <section class="flex align-center space-between menu-header">
      <div class="back-btn-container">
        <i
          v-if="isBack"
          class="el-icon-arrow-left icon-back"
          @click="backMenu"
          title="go back"
        ></i>
      </div>
      <h4>{{ title }}</h4>
      <i class="el-icon-close close-menu" @click="closeMenue"></i>
    </section>
    <hr class="board-menu-header-divider" />
    <div class="flex column menu-content">
      <menu-main
        v-if="isMain"
        @openAbout="toggleAbout"
        @openBgc="toggleBgc"
        @openSearch="toggleSearch"
        @deleteBoard="deleteBoard"
      />
      <transition name="slide-in">
        <menu-about v-if="isAbout" />
      </transition>
      <transition name="slide-in">
        <menu-bgc
          v-if="isBgc"
          @colorPicked="colorPicked"
          @photoPicked="photoPicked"
        />
      </transition>
      <transition name="slide-in">
        <menu-search v-if="isSearch" :board="board" @tasksToShow="tasksToShow"/>
      </transition>
      <menu-activity />
    </div>
  </section>
</template>

<script>
import menuMain from './board-menu/menu-main.vue';
import menuAbout from './board-menu/menu-about.vue';
import menuBgc from './board-menu/menu-bgc';
import menuSearch from './board-menu/menu-search.vue';
import menuActivity from './board-menu/menu-activity.vue';

import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faSquare);

export default {
  props: {
    board: {
      type: Object,
    },
  },
  data() {
    return {
      isBack: false,
      isAbout: false,
      isBgc: false,
      isSearch: false,
      isMain: true,
    };
  },
  methods: {
    closeMenue() {
      this.$emit('closeMenu');
    },
    toggleAbout() {
      this.isAbout = true;
      this.isMain = false;
      this.isBack = true;
    },
    toggleBgc() {
      this.isBgc = true;
      this.isMain = false;

      this.isBack = true;
    },
    toggleSearch() {
      this.isSearch = true;
      this.isMain = false;

      this.isBack = true;
    },
    backMenu() {
      this.isAbout = false;
      this.isBack = false;
      this.isBgc = false;
      this.isSearch = false;
      this.isMain = true;
    },
    colorPicked(style) {
      this.$emit('colorPicked', style);
    },
    photoPicked(style) {
      this.$emit('photoPicked', style);
    },
    tasksToShow(tasks){
       this.$emit('tasksToShow', tasks);
    },
    deleteBoard(){
      this.$emit('deleteBoard')
    }
  },
  computed: {
    title() {
      if (this.isAbout) return 'About this board';
      else if (this.isBgc) return 'Change background';
      else if (this.isSearch) return 'Search cards';
      else return 'Menu';
    },
  },
  components: {
    menuMain,
    menuBgc,
    menuAbout,
    menuSearch,
    menuActivity,
  },
};
</script>
