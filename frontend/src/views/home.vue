<template>
  <section
    class="flex column align-center main-content main-layout home-container"
  >
    <div class="hero flex space-between align-center">
      <div class="flex column hero-content">
        <h1>Task-it helps teams move work forward.</h1>
        <router-link :to="`/board/6059cc912a005fb1854a5d50`"
          >Try it now</router-link
        >
      </div>
      <img src="../assets/vectors/home-page-img.png" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {},
};
</script>
