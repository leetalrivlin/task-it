<template>
  <section
    class="flex column align-center main-content main-layout home-container"
  >
    <div class="flex space-between align-center hero">
      <div class="flex column hero-content">
        <h1 class="flex">A better way to manage tasks.</h1>
        <p>
          If you have time, <span>Task-it</span> helps you spend your time well.
        </p>
        <router-link :to="`/board/60606de5b8b4f44277b7f5da`"
          >Try it now</router-link
        >
      </div>
      <img src="../assets/vectors/home-page-img.png" />
    </div>
    <div class="main flex align-center">
      <img src="../assets/vectors/shutterstock_1390480307.jpg">
      <div class="main-content">
        <ul>
          <li>Invite your team members on click</li>
          <li>Easy adding and deleting tasks</li>
          <li>Simple and clear navigation</li>
          <li>Eye pleasing interface</li>
          <li>Get real-time updates with innovative Dashboards</li>
        </ul>
      </div>
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
