<template>
  <header class="flex align-center board-header">
    <a class="el-btn board-title">{{board.title}}</a>
  </header>
</template>

<script>
export default {
  name:"boardHeader",
  props:{
    board:{
      type:Object
    }
  }

};
</script>
