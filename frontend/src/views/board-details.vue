<template>
  <section class="board-details">
      <h1>hii</h1>
    <board-header />
    <section class="group-container"></section>
    <router-view />
  </section>
</template>

<script>
import boardHeader from "../cmps/board-header.vue";
export default {
  name: "boardDetails",
  components: { boardHeader },
};
</script>
