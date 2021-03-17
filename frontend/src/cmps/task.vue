<template>
  <section class="task">
    {{ task.title }}
  </section>
</template>

<script>
export default {
  name: "task",
  props: {
    task: {
      type: Object,
    },
  },
};
</script>

<style>
</style>