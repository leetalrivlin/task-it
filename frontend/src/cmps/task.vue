<template>
  <section class="task">
    <div class="task-area">
      {{ task.title }}
    </div>
  </section>
</template>



<script>
export default {
  name: 'task',
  props: {
    task: {
      type: Object,
    },
  },
  method: {},
};
</script>

<style>
</style>