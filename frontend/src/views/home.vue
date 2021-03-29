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
    <div class="features flex column align-center justify-center">
      <h1>Features</h1>
      <div class="flex feature-icons">
        <section class="flex align-center column item">
          <img src="../assets/trello-icon-pack/trello-slate-blue.svg" />
          <p>
            Have as many boards as you wish, manage and edit all in one place.
          </p>
        </section>
        <section class="flex align-center column item">
          <img src="../assets/trello-icon-pack/team-slate-blue.svg" />
          <p>
            Collaborate with your team members, assign tasks easilly and
            controll the work-flow.
          </p>
        </section>
        <section class="flex align-center column item">
          <img src="../assets/trello-icon-pack/settings-slate-blue.svg" />
          <p>Apply preferences of your own and make each board your-own.</p>
        </section>
      </div>
    </div>
    <div class="flex align-center justify-center main">
      <img src="../assets/vectors/shutterstock_1390480307.png" />
        <ul class="advantages-container">
          <li>Invite your team members on click</li>
          <li>Easy adding and deleting tasks</li>
          <li>Simple and clear navigation</li>
          <li>Eye pleasing interface</li>
          <li>Get real-time updates with innovative Dashboards</li>
        </ul>
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
