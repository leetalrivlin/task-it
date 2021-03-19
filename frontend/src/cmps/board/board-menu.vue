<template>
  <section class="board-menu">
    <header class="menu-header flex align-center justify-center ">
      <i v-if="isBack" class="el-icon-arrow-left icon-back" @click="backMenu"></i>
      <h4>{{ title }}</h4>
      <i class="el-icon-close close-menu" @click="closeMenue"></i>
    </header>
    <hr class="board-menu-header-divider" />
    <div class="menu-content flex column">
      <div class="board-settings-menu">
        <a
          class="board-settings-menu-item flex align-center"
          @click="toggleAbout"
        >
          <i class="el-icon-info icon"></i>
          <span>About this board </span>
        </a>
        <a class="board-settings-menu-item flex align-center">
          <font-awesome-icon icon="square" class="icon" />
          <span>Change background </span>
        </a>
        <a class="board-settings-menu-item flex align-center">
          <i class="el-icon-search icon"></i>
          <span>Search cards </span>
        </a>
      </div>
      <about-board v-if="isAbout && isOption" />
    </div>
  </section>
</template>

<script>
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import aboutBoard from './about-board';
library.add(faSquare);
export default {
  data() {
    return {
      isBack:false,
      isAbout: false,
      isBgc: false,
      isSearch: false,
      isOption: false,
    };
  },
  methods: {
    closeMenue() {
      console.log('closing');
      this.$emit('closeMenu');
    },
    toggleAbout() {
      this.isAbout = true;
      this.isBack = true;
    },
    backMenu(){
       this.isAbout = false;
      this.isOption =true;
      this.isBack = false;
      this.isBgc= false;
      this.isSearch= false;
    }
  },
  computed: {
    title() {
      return !this.isOption
        ? 'Menu'
        : this.isAbout
        ? 'About this board'
        : this.isBgc
        ? 'Change background'
        : 'Search cards';
    },
  },
  components: {
    aboutBoard,
  },
};
</script>

