<template>
  <section class="due-date">
    <p>Due Date</p>
    <p>{{dueDate}}</p>
  </section>
</template>

<script>
export default {
  name: 'dueDate',
  props: {
    dueDate: {
      type: Number,
    },
  },
};
</script>

